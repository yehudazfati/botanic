import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { BotanicSchedulerService } from './botanic-scheduler/botanic-scheduler.service';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/botanic'),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, BotanicSchedulerService],
})
export class AppModule {}
