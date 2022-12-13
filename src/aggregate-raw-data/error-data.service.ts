import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aggregate, Model } from 'mongoose';
import { ErrorDataDocument } from "./schemas/error-data.schema";

@Injectable()
export class ErrorDataService {
    private readonly logger = new Logger(ErrorDataService.name);

    constructor(
        @InjectModel('error_data') private readonly errorDataDocumentModel: Model<ErrorDataDocument>,
                ) {
    }


    insertAggregateData(data: Array<ErrorDataDocument>) {
        console.log(data)

    }
}
