import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BotanicSchedulerService } from "./botanic-scheduler/botanic-scheduler.service";

@Controller()
export class AppController {
  constructor(public botanicSchedulerService: BotanicSchedulerService) {}

  @Get()
  getHello(): string {
    return this.botanicSchedulerService.dataInfo();
  }
}
