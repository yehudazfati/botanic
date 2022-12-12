/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { ExtractRowDataService } from './extract-raw-data/extract-raw-data.service';

@Controller()
export class AppController {
	constructor(public extractService: ExtractRowDataService) {}

	@Get()
	getHello(): void {
    // Extract data from Full Story and save it to raw_errors table
    this.extractService.process();
	}
}
