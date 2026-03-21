import { Component, OnInit, signal, WritableSignal } from '@angular/core';
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
  ],
})
export class UserProfileComponent implements OnInit {
  userProfile: IUserProfile | null = null;
  selectedTab: WritableSignal<string> = signal('profile');
  isLoading: WritableSignal<boolean> = signal(false);
  notificationsChanged: WritableSignal<boolean> = signal(false);
  private originalNotifications: Partial<IAccountSettings> = {};

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.loadUserProfile();
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
}
