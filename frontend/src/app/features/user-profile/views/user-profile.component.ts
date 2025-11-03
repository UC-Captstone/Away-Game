import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileHeaderComponent } from '../components/profile-header/user-profile-header.component';
import { UserProfileService } from '../services/user-profile.service';
import { IUserProfile } from '../models/user-profile';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [CommonModule, BackButtonComponent, UserProfileHeaderComponent],
})
export class UserProfileComponent implements OnInit {
  userProfile!: IUserProfile;
  selectedTab = 'profile';

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfile = this.userProfileService.getUserProfile();
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
