import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileHeaderComponent } from '../components/profile-header/user-profile-header.component';
import { UserProfileService } from '../services/user-profile.service';
import { IUserProfile } from '../models/user-profile';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { UserAccountSettingsComponent } from '../components/user-account-settings/user-account-settings.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [
    CommonModule,
    BackButtonComponent,
    UserProfileHeaderComponent,
    UserAccountSettingsComponent,
  ],
})
export class UserProfileComponent implements OnInit {
  userProfile!: IUserProfile;
  selectedTab = 'profile';
  isLoading: boolean = false;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  refreshProfile(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    this.isLoading = true;
    this.userProfileService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
        this.isLoading = false;
      },
    });
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
