import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfileHeaderComponent } from '../components/profile-header/user-profile-header.component';
import { UserProfileService } from '../services/user-profile.service';
import { IUserProfile } from '../models/user-profile';
import { IAccountSettings } from '../models/account-settings';
import { RouterLink } from '@angular/router';
import { UserAccountSettingsComponent } from '../components/user-account-settings/user-account-settings.component';
import { EventTileComponent } from '../../../shared/components/event-tile/event-tile.component';
import { ChatTileComponent } from '../components/chat-tile/chat-tile.component';
import { MyAlertsComponent } from '../components/my-alerts/my-alerts.component';
import { TeamService } from '../../../shared/services/team.service';
import { ITeam } from '../../../shared/models/team';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    UserProfileHeaderComponent,
    UserAccountSettingsComponent,
    EventTileComponent,
    ChatTileComponent,
    MyAlertsComponent,
    BackButtonComponent,
  ],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile: IUserProfile | null = null;
  availableTeams: ITeam[] = [];
  private teamsLoaded = false;
  selectedTab: WritableSignal<string> = signal('profile');
  isLoading: WritableSignal<boolean> = signal(false);
  isSavingProfilePicture: WritableSignal<boolean> = signal(false);
  toastMessage: WritableSignal<string | null> = signal(null);
  toastType: WritableSignal<'success' | 'error'> = signal('success');

  private toastTimer: ReturnType<typeof setTimeout> | null = null;
  notificationsChanged: WritableSignal<boolean> = signal(false);
  private originalNotifications: Partial<IAccountSettings> = {};

  constructor(
    private userProfileService: UserProfileService,
    private teamService: TeamService,
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
      this.toastTimer = null;
    }
  }

  refreshProfile(): void {
    this.loadUserProfile();
  }

  selectTab(tab: string) {
    this.selectedTab.set(tab);
    if (tab === 'Notifications' && this.userProfile) {
      const s = this.userProfile.accountSettings;
      this.originalNotifications = {
        enableNearbyEventNotifications: s.enableNearbyEventNotifications,
        enableFavoriteTeamNotifications: s.enableFavoriteTeamNotifications,
        enableSafetyAlertNotifications: s.enableSafetyAlertNotifications,
      };
      this.notificationsChanged.set(false);
    }
  }

  onNotificationChange() {
    if (!this.userProfile) return;
    const s = this.userProfile.accountSettings;
    this.notificationsChanged.set(
      s.enableNearbyEventNotifications !== this.originalNotifications.enableNearbyEventNotifications ||
      s.enableFavoriteTeamNotifications !== this.originalNotifications.enableFavoriteTeamNotifications ||
      s.enableSafetyAlertNotifications !== this.originalNotifications.enableSafetyAlertNotifications,
    );
  }

  saveNotifications(settings: IAccountSettings) {
    this.userProfileService.updateAccountInfo(settings).subscribe({
      next: () => {
        this.originalNotifications = {
          enableNearbyEventNotifications: settings.enableNearbyEventNotifications,
          enableFavoriteTeamNotifications: settings.enableFavoriteTeamNotifications,
          enableSafetyAlertNotifications: settings.enableSafetyAlertNotifications,
        };
        this.notificationsChanged.set(false);
      },
      error: (err) => console.error('Failed to save notifications', err),
    });
  }

  onPickerOpening(): void {
    if (!this.teamsLoaded) {
      this.loadTeamChoices();
    }
  }

  onProfilePictureSelected(profilePictureUrl: string | null): void {
    if (this.isSavingProfilePicture()) {
      return;
    }

    this.isSavingProfilePicture.set(true);
    this.userProfileService.updateProfilePicture(profilePictureUrl).subscribe({
      next: () => {
        this.loadUserProfile();
        this.isSavingProfilePicture.set(false);
        this.showToast(
          profilePictureUrl
            ? 'Profile picture updated successfully.'
            : 'Profile picture reset to default.',
          'success',
        );
        window.dispatchEvent(
          new CustomEvent('away-game:profile-picture-updated', {
            detail: { profilePictureUrl },
          }),
        );
      },
      error: (error) => {
        console.error('Error updating profile picture:', error);
        this.isSavingProfilePicture.set(false);
        this.showToast(error?.error?.detail || 'Failed to update profile picture.', 'error');
      },
    });
  }

  dismissToast(): void {
    this.toastMessage.set(null);
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
      this.toastTimer = null;
    }
  }

  private loadUserProfile(): void {
    this.isLoading.set(true);
    this.userProfileService.getUserProfile().subscribe({
      next: (profile) => {
        console.log('profile', profile);
        this.userProfile = profile;
        this.isLoading.set(false);
      },
      error: (error) => {
        //Nathan: implement error handling UI in helper function
        console.error('Error fetching user profile:', error);
        this.isLoading.set(false);
      },
    });
  }

  private loadTeamChoices(): void {
    this.teamService.getAllTeams().subscribe({
      next: (teams) => {
        const seenLogos = new Set<string>();
        const deduped: ITeam[] = [];

        for (const team of teams) {
          if (!team.logoUrl) {
            continue;
          }
          if (seenLogos.has(team.logoUrl)) {
            continue;
          }
          seenLogos.add(team.logoUrl);
          deduped.push(team);
        }

        this.availableTeams = deduped;
        this.teamsLoaded = true;
      },
      error: (error) => {
        console.error('Error loading teams for profile pictures:', error);
      },
    });
  }

  private showToast(message: string, type: 'success' | 'error'): void {
    this.toastType.set(type);
    this.toastMessage.set(message);

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastTimer = setTimeout(() => {
      this.toastMessage.set(null);
      this.toastTimer = null;
    }, 3000);
  }
}
