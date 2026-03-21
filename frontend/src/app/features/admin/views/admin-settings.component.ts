import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { AdminLeague, AdminOverview, AdminUser } from '../models/admin';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
})
export class AdminSettingsComponent implements OnInit {
  selectedTab: WritableSignal<string> = signal('Overview');

  overview: AdminOverview | null = null;
  overviewLoading = signal(false);

  leagues: AdminLeague[] = [];
  leaguesLoading = signal(false);

  pendingUsers: AdminUser[] = [];
  pendingLoading = signal(false);

  verifiedCreators: AdminUser[] = [];
  creatorsLoading = signal(false);

  allUsers: AdminUser[] = [];
  usersLoading = signal(false);
  userSearchQuery = '';
  passwordInputs: Record<string, string> = {};
  passwordSuccess: Record<string, boolean> = {};
  passwordError: Record<string, string> = {};

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadOverview();
  }

  selectTab(tab: string): void {
    this.selectedTab.set(tab);
    switch (tab) {
      case 'Overview':
        if (!this.overview) this.loadOverview();
        break;
      case 'LeagueSettings':
        if (!this.leagues.length) this.loadLeagues();
        break;
      case 'PendingApprovals':
        this.loadPendingApprovals();
        break;
      case 'RevokeStatus':
        this.loadVerifiedCreators();
        break;
      case 'UserManagement':
        if (!this.allUsers.length) this.loadAllUsers();
        break;
    }
  }

  private loadOverview(): void {
    this.overviewLoading.set(true);
    this.adminService.getOverview().subscribe({
      next: (data) => {
        this.overview = data;
        this.overviewLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load overview', err);
        this.overviewLoading.set(false);
      },
    });
  }

  private loadLeagues(): void {
    this.leaguesLoading.set(true);
    this.adminService.getLeagues().subscribe({
      next: (data) => {
        this.leagues = data;
        this.leaguesLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load leagues', err);
        this.leaguesLoading.set(false);
      },
    });
  }

  toggleLeagueActive(league: AdminLeague): void {
    const newValue = !league.isActive;
    this.adminService.setLeagueActive(league.leagueCode, newValue).subscribe({
      next: (updated) => {
        const idx = this.leagues.findIndex((l) => l.leagueCode === updated.leagueCode);
        if (idx !== -1) this.leagues[idx] = updated;
      },
      error: (err) => console.error('Failed to update league', err),
    });
  }

  private loadPendingApprovals(): void {
    this.pendingLoading.set(true);
    this.adminService.getPendingApprovals().subscribe({
      next: (data) => {
        this.pendingUsers = data;
        this.pendingLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load pending approvals', err);
        this.pendingLoading.set(false);
      },
    });
  }

  approveUser(user: AdminUser): void {
    this.adminService.approveVerification(user.userId).subscribe({
      next: () => {
        this.pendingUsers = this.pendingUsers.filter((u) => u.userId !== user.userId);
      },
      error: (err) => console.error('Failed to approve user', err),
    });
  }

  denyUser(user: AdminUser): void {
    this.adminService.denyVerification(user.userId).subscribe({
      next: () => {
        this.pendingUsers = this.pendingUsers.filter((u) => u.userId !== user.userId);
      },
      error: (err) => console.error('Failed to deny user', err),
    });
  }

  private loadVerifiedCreators(): void {
    this.creatorsLoading.set(true);
    this.adminService.getVerifiedCreators().subscribe({
      next: (data) => {
        this.verifiedCreators = data;
        this.creatorsLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load verified creators', err);
        this.creatorsLoading.set(false);
      },
    });
  }

  revokeCreator(user: AdminUser): void {
    this.adminService.revokeCreatorStatus(user.userId).subscribe({
      next: () => {
        this.verifiedCreators = this.verifiedCreators.filter((u) => u.userId !== user.userId);
      },
      error: (err) => console.error('Failed to revoke status', err),
    });
  }

  private loadAllUsers(): void {
    this.usersLoading.set(true);
    this.adminService.getAllUsers().subscribe({
      next: (data) => {
        this.allUsers = data;
        this.usersLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load users', err);
        this.usersLoading.set(false);
      },
    });
  }

  get filteredUsers(): AdminUser[] {
    const q = this.userSearchQuery.toLowerCase();
    if (!q) return this.allUsers;
    return this.allUsers.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    );
  }

  deactivateUser(user: AdminUser): void {
    this.adminService.deactivateUser(user.userId).subscribe({
      next: () => {
        this.allUsers = this.allUsers.filter((u) => u.userId !== user.userId);
      },
      error: (err) => console.error('Failed to deactivate user', err),
    });
  }

  resetPassword(user: AdminUser): void {
    const pw = this.passwordInputs[user.userId]?.trim();
    if (!pw) return;
    delete this.passwordError[user.userId];
    this.adminService.resetPassword(user.userId, pw).subscribe({
      next: () => {
        this.passwordInputs[user.userId] = '';
        this.passwordSuccess[user.userId] = true;
        setTimeout(() => delete this.passwordSuccess[user.userId], 3000);
      },
      error: (err) => {
        this.passwordError[user.userId] = err?.error?.detail ?? 'Failed to reset password';
      },
    });
  }

  displayName(user: AdminUser): string {
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
    if (user.firstName) return user.firstName;
    return user.username;
  }
}
