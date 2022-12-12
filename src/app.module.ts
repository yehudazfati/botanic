/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotanicSchedulerService } from './botanic-scheduler/botanic-scheduler.service';
import { ExtractRawDataModule } from './extract-raw-data/extract-raw-data.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/botanic'),
    ScheduleModule.forRoot(),
    ExtractRawDataModule
  ],
  controllers: [AppController],
  providers: [AppService, BotanicSchedulerService],
})
export class AppModule {}
