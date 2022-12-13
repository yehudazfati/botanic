/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorDataSchema } from "./schemas/error-data.schema";
import { ErrorDataService } from "./error-data.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'error_data', schema: ErrorDataSchema }])],
    providers: [ErrorDataService],
    exports: [ErrorDataService],
})
export class ErrorDataModule {
}