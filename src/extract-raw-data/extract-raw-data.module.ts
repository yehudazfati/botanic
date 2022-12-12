/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExtractRowDataService } from './extract-raw-data.service';
import { RawErrorsSchema } from './schemas/raw-errors.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'raw_errors', schema: RawErrorsSchema }])],
  providers: [ExtractRowDataService],
  exports: [ExtractRowDataService],
})
export class ExtractRawDataModule {}