export type SafetyAlertSeverity = 'low' | 'medium' | 'high';
export type SafetyAlertSource = 'admin' | 'user';

export interface ISafetyAlert {
  alertId: string;
  reporterUserId: string;
  alertTypeId: string;
  gameId?: number | null;
  venueId?: number | null;
  title: string;
  description?: string | null;
  source: SafetyAlertSource;
  severity: SafetyAlertSeverity;
  latitude?: number | null;
  longitude?: number | null;
  expiresAt?: string | null;
  isActive: boolean;
  isOfficial: boolean;
  createdAt: string;
}

export interface ISafetyAlertCreate {
  alertTypeId: string;
  gameId?: number | null;
  venueId?: number | null;
  title: string;
  description?: string | null;
  severity?: SafetyAlertSeverity;
  isOfficial?: boolean;
  latitude?: number | null;
  longitude?: number | null;
  expiresAt?: string | null;
}

export interface ISafetyAlertUpdate {
  alertTypeId?: string;
  gameId?: number | null;
  venueId?: number | null;
  title?: string;
  description?: string | null;
  severity?: SafetyAlertSeverity;
  latitude?: number | null;
  longitude?: number | null;
  expiresAt?: string | null;
  isActive?: boolean;
}
