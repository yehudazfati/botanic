/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RawErrorsDocument = HydratedDocument<RawErrors>;

@Schema()
export class RawErrors {
	@Prop()
	Created: string;
	@Prop()
	Uid: string;
	@Prop()
	Name: string;
	@Prop()
	Email: string;
	@Prop()
	LastPage: string;
	@Prop()
	Tenant: string;
	@Prop()
	NumSessions: string;
	@Prop()
	LastSessionTime: string;
	@Prop()
	LastSessionSec: string;
	@Prop()
	LastSessionActiveSec: string;
	@Prop()
	LastSessionNumPages: string;
	@Prop()
	LastSessionNumEvents: string;
	@Prop()
	LastBrowser: string;
	@Prop()
	LastDevice: string;
	@Prop()
	LastOperatingSystem: string;
	@Prop()
	TotalSec: string;
	@Prop()
	TotalActiveSec: string;
	@Prop()
	AvgSessionSec: string;
	@Prop()
	AvgSessionActiveSec: string;
	@Prop()
	NumEvents: string;
	@Prop()
	LastMatchingIp: string;
	@Prop()
	LastMatchingLatLong: string;
	@Prop()
	IndvId: number;
	@Prop()
	UserId: number;
	@Prop()
	SessionId: number;
	@Prop()
	PageId: number;
	@Prop()
	EventStart: string;
	@Prop()
	EventType: string;
	@Prop()
	EventTargetText: string;
	@Prop()
	EventTargetFinal: string;
	@Prop()
	PageUrl: string;
	@Prop()
	PageRefererUrl: string;
	@Prop()
	PageIp: string;
	@Prop()
	PageAgent: string;
	@Prop()
	PageBrowser: string;
	@Prop()
	PageDevice: string;
	@Prop()
	PageOperatingSystem: string;
	@Prop()
	PageNumInfos: number;
	@Prop()
	PageNumWarnings: number;
	@Prop()
	PageNumErrors: number;
	@Prop()
	UserAppKey: string;
	@Prop()
	UserDisplayName: string;
	@Prop()
	UserEmail: string;
	@Prop()
	PageLatLong: string;
	@Prop()
	PageDuration: number;
	@Prop()
	PageActiveDuration: number;
}

export const RawErrorsSchema = SchemaFactory.createForClass(RawErrors);
