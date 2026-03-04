import { ILocation } from './location';

export type SafetyAlertSeverity = 'Low' | 'Medium' | 'High';

export interface ISafetyAlert {
	alertId: string;

	reporterUserId?: string;
	alertTypeId?: string;
	gameId?: number | null;
	venueId?: number | null;
	gameDate?: Date | null;
	latitude?: number | null;
	longitude?: number | null;
	createdAt?: Date;

	severity: SafetyAlertSeverity;
	title: string;
	description: string;
	dateTime: Date;
	location: ILocation;
}
