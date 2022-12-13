/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { CreateWorkItemService } from './create-work-item/create-work-item.service';
import { ExtractRowDataService } from './extract-raw-data/extract-raw-data.service';
import { ErrorDataService } from "./aggregate-raw-data/error-data.service";
import { IAggregatedErrorData } from './interfaces/botanic.interfaces';

@Controller()
export class AppController {
	constructor(
		public extractService: ExtractRowDataService,
		public errorDataService: ErrorDataService,

				public createWorkItemService: CreateWorkItemService) {}

	@Get()
	getHello(): void {
    	// Extract data from Full Story and save it to raw_errors table
    	this.extractService.process().then(() => {
			this.extractService.errorData.then((data) => {
				const arr = data as unknown as IAggregatedErrorData[];
				this.createWorkItemService.createWorkItems(arr.slice(0, 1));
			});
		})

		//  here we need to fetch aggregated data from Mongo
		// uncomment those when performing DB integration.

		/*const parsedData = this.createWorkItemService.parseAggregatedDataToWotkItemModel();
		this.createWorkItemService.createWorkItem(parsedData).subscribe();*/
		
	}

	@Get('aggregate')
	aggregate(): void {
    	// Extract data from Full Story and save it to raw_errors table
    	this.extractService.errorData.then((data) => {
			this.errorDataService.insertAggregateData(data);
			console.log(data);
		});
	}
}
