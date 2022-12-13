/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { promises, readFileSync } from 'fs';
import { Aggregate, Model } from 'mongoose';
import { parse } from 'papaparse';
import { IRawData, IUserData, IUserError } from 'src/interfaces/botanic.interfaces';
import { RawErrors, RawErrorsDocument } from './schemas/raw-errors.schema';
import { ErrorDataDocument } from "../aggregate-raw-data/schemas/error-data.schema";

@Injectable()
export class ExtractRowDataService {
	private readonly logger = new Logger(ExtractRowDataService.name);
	private readonly dirRawData = __dirname + '/../../raw-data/';
	private readonly usersListFile = 'Users_2022-12-10_2022-12-12.csv';
	private readonly eventType = 'console_message';
	private counter = 0;

	constructor(@InjectModel('raw_errors') private readonly rawErrorsModel: Model<RawErrorsDocument>) {}

	public process() {
		return new Promise((resolve) => {
			// Clean raw_errors collection before loading
			this.cleanDb().then(() => {
				// Start process Raw data
				this.logger.debug(`**********`);
				this.logger.debug(`Extract Raw data from FullStory started`);
				const csvUserFile = readFileSync(this.dirRawData + this.usersListFile, 'utf-8');
				this.logger.debug(`FullStory users list arrived`);

				parse(csvUserFile, {
					header: true,
					complete: results => {
						results.data.forEach((userData: IUserData) => {
							this.getUserErrors(userData, this.eventType).then((userErrors: IUserError[]) => {
								this.logger.debug('Found ' + userErrors.length + ' of "' + this.eventType + '" for user: ' + userData.Name);

								const rowData: IRawData[] = this.getCombinedRawData(userData, userErrors);

								this.addToDb(rowData).then(() => {
									this.logger.debug(
										'Added to database ' + rowData.length + ' "' + this.eventType + '" of user: ' + userData.Name
									);

									this.counter++;

									if (this.counter === results.data.length) {
										this.logger.debug(`Extract Raw data from FullStory completed`);
										this.logger.debug(`**********`);
										resolve(true);
										this.counter = 0
									}

								});
							});
						});
					},
				});
			});
		})
		
	}

	private async getUserErrors(userData: IUserData, eventType: string): Promise<IUserError[]> {
		const file = 'DataExport_' + userData.Name.replace(' ', '_') + '.json';
		const data = await promises.readFile(this.dirRawData + file, 'binary');

		const dataParsed = JSON.parse(data) as unknown as IUserError[];
		return dataParsed.filter(entry => entry.EventType === eventType);
	}

	private getCombinedRawData(userData: IUserData, userErrors: IUserError[]): IRawData[] {
		return userErrors.map((error: IUserError) => {
			error = {...error,
				Tenant: this.getTenant(error.PageUrl),
				EventTargetFinal: this.cleanErrorMessage(error.EventTargetText)
			};

			return { ...userData, ...error };
		}) as unknown[] as IRawData[];
	}

	private cleanErrorMessage(err: string): string {
		return err.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
	}

	private getTenant(urlFull: string): string {
		const url:URL  = new URL(urlFull);
		return url.hostname.replace('.varonis.io', '');

	}

	private async addToDb(addData): Promise<RawErrors> {
		return await this.rawErrorsModel.create(addData);
	}

	private async cleanDb(): Promise<unknown> {
		return await this.rawErrorsModel.deleteMany({});
	}

	public get errorData(): Aggregate<Array<ErrorDataDocument>> {
		return this.rawErrorsModel.aggregate(
			[
				{
					$group: {

						_id: { EventTargetFinal: "$EventTargetFinal" },
						Tenants: { $addToSet: '$Tenant' },
						SessionId: { $addToSet: '$SessionId' },
						LastMatchingSessionLink: {$addToSet: '$LastMatchingSessionLink'},
						LastPage: {$addToSet: '$LastPage'},
						count: { $sum: 1 }

					}
				},

				{
					$group:
						{
							_id: "$_id.EventTargetFinal",
							count: { $last: '$count' },
							SessionId: { $last: '$SessionId' },
							Tenants: { $last: '$Tenants' },
							LastPage: {$last: '$LastPage'},
							LastMatchingSessionLink: {$last: '$LastMatchingSessionLink'}
						}
				},
				{
					$project: {
						count: '$count',
						tenants: '$Tenants',
						sessionsCount: { $size: "$SessionId" },
						tenantsCount: { $size: "$Tenants" },
						LastMatchingSessionLink: '$LastMatchingSessionLink',
						LastPage: '$LastPage',
					}
				}
			]
		)
	}
}
