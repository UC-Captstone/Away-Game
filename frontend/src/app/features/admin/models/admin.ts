export interface AdminOverview {
  totalUsers: number;
  activeUsers: number;
  totalEvents: number;
  eventsToday: number;
  gamesToday: number;
  verifiedCreators: number;
  pendingApprovals: number;
}

export interface AdminLeague {
  leagueCode: string;
  leagueName: string;
  espnSport: string | null;
  espnLeague: string | null;
  isActive: boolean;
}

export interface AdminUser {
  userId: string;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  profilePictureUrl: string | null;
  isVerified: boolean;
  pendingVerification: boolean;
  role: string;
  createdAt: string;
}
