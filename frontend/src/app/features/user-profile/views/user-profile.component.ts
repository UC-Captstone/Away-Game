import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileHeaderComponent } from '../components/profile-header/user-profile-header.component';
import { UserProfileService } from '../services/user-profile.service';
import { IUserProfile } from '../models/user-profile';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { UserAccountSettingsComponent } from '../components/user-account-settings/user-account-settings.component';
import { EventTileComponent } from '../../../shared/components/event-tile/event-tile.component';
import { ChatTileComponent } from '../components/chat-tile/chat-tile.component';

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
  ],
})
export class UserProfileComponent implements OnInit {
  userProfile: IUserProfile | null = null;
  selectedTab: WritableSignal<string> = signal('profile');
  isLoading: WritableSignal<boolean> = signal(false);

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  refreshProfile(): void {
    this.loadUserProfile();
  }

  selectTab(tab: string) {
    this.selectedTab.set(tab);
  }

  removeSavedEvent(eventId: string): void {
    const profile = this.userProfile;
    if (!profile) {
      return;
    }

    this.userProfile = {
      ...profile,
      savedEvents: profile.savedEvents.filter((event) => event.eventId !== eventId),
    };
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
