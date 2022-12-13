/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { BotanicSchedulerService } from './botanic-scheduler/botanic-scheduler.service';
import { CreateWorkItemModule } from './create-work-item/create-work-item.module';
import { ExtractRawDataModule } from './extract-raw-data/extract-raw-data.module';
import { ErrorDataModule } from "./aggregate-raw-data/error-data.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/botanic'),
    ScheduleModule.forRoot(),
    ExtractRawDataModule,
    CreateWorkItemModule,
    ErrorDataModule
  ],
  controllers: [AppController],
  providers: [BotanicSchedulerService],
})
export class AppModule {}
