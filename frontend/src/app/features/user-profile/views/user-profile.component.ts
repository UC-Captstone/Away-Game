import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileHeaderComponent } from '../components/profile-header/user-profile-header.component';
import { UserProfileService } from '../services/user-profile.service';
import { IUserProfile } from '../models/user-profile';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { UserAccountSettingsComponent } from '../components/user-account-settings/user-account-settings.component';
import { EventTileComponent } from '../../../shared/components/event-tile/event-tile.component';
import { ChatTileComponent } from '../components/chat-tile/chat-tile.component';
import { MyAlertsComponent } from '../components/my-alerts/my-alerts.component';
import { TeamService } from '../../../shared/services/team.service';
import { ITeam } from '../../../shared/models/team';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [
    CommonModule,
    BackButtonComponent,
    UserProfileHeaderComponent,
    UserAccountSettingsComponent,
    EventTileComponent,
    ChatTileComponent,
    MyAlertsComponent,
  ],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile: IUserProfile | null = null;
  availableTeams: ITeam[] = [];
  selectedTab: WritableSignal<string> = signal('profile');
  isLoading: WritableSignal<boolean> = signal(false);
  isSavingProfilePicture: WritableSignal<boolean> = signal(false);
  toastMessage: WritableSignal<string | null> = signal(null);
  toastType: WritableSignal<'success' | 'error'> = signal('success');

  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private userProfileService: UserProfileService,
    private teamService: TeamService,
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadTeamChoices();
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
