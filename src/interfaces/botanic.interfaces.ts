import { ErrorData } from "src/aggregate-raw-data/schemas/error-data.schema";

/* eslint-disable prettier/prettier */
export interface IUserData {
	Created: string;
	Uid: string;
	Name: string;
	Email: string;
	LastPage: string;
	NumSessions: string;
	LastSessionTime: string;
	LastSessionSec: string;
	LastSessionActiveSec: string;
	LastSessionNumPages: string;
	LastSessionNumEvents: string;
	LastBrowser: string;
	LastDevice: string;
	LastOperatingSystem: string;
	TotalSec: string;
	TotalActiveSec: string;
	AvgSessionSec: string;
	AvgSessionActiveSec: string;
	NumEvents: string;
	LastMatchingIp: string;
	LastMatchingLatLong: string;	
	LastMatchingSessionLink: string;
}

export interface IUserError {
	IndvId: number;
	UserId: number;
	SessionId: number;
	PageId: number;
	EventStart: string;
	EventType: string;
	EventTargetText: string;
	EventTargetFinal: string;
	PageUrl: string;
	Tenant: string;
	PageRefererUrl: string;
	PageIp: string;
	PageAgent: string;
	PageBrowser: string;
	PageDevice: string;
	PageOperatingSystem: string;
	PageNumInfos: number;
	PageNumWarnings: number;
	PageNumErrors: number;
	UserAppKey: string;
	UserDisplayName: string;
	UserEmail: string;
	PageLatLong: string;
	PageDuration: number;
	PageActiveDuration: number;
}

export interface IAggregatedErrorData extends ErrorData {
	_id: string;
	LastMatchingSessionLink: string[];
	LastPage: string[];
}

export type IRawData = IUserData & IUserError; 