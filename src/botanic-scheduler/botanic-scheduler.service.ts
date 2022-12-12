import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BotanicSchedulerService {
    private readonly logger = new Logger(BotanicSchedulerService.name);

    private fsItemCount = 0;
    private botanicDataItemCount = 0;
    private tfsItemCount = 0;

    public dataInfo(): string {
        return `${ this.fsItemCount }${ this.botanicDataItemCount }${ this.tfsItemCount }`;
    }

    @Cron(CronExpression.EVERY_5_SECONDS)
    readFsDataAndSaveToDb() {
        this.fsItemCount++;
        this.logger.debug(`https get fullstroy ${ this.fsItemCount }`);
        this.logger.debug('fullstroy data validation');
        this.logger.debug('insert mongodb  -> fs-data');
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    createBotanicData() {
        this.botanicDataItemCount++;

        this.logger.debug(`https find all mongodb ${ this.botanicDataItemCount }`);
        this.logger.debug('data converting -> botanic-data');
        this.logger.debug('insert mongodb -> botanic-data');
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    createActionItem() {
        this.tfsItemCount++;

        this.logger.debug(`find all mongodb -> botanic-data ${ this.tfsItemCount }`);
        this.logger.debug('TFS\\JIRA\\ -> botanic-data');
    }
}
