/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CreateWorkItemService } from './create-work-item.service';

@Module({
  imports: [],
  providers: [CreateWorkItemService],
  exports: [CreateWorkItemService],
})
export class CreateWorkItemModule {}