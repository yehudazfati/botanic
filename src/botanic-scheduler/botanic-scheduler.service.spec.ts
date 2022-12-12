import { Test, TestingModule } from '@nestjs/testing';
import { BotanicSchedulerService } from './botanic-scheduler.service';

describe('BotanicSchedulerService', () => {
  let service: BotanicSchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotanicSchedulerService],
    }).compile();

    service = module.get<BotanicSchedulerService>(BotanicSchedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
