import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { IHeaderInfo } from '../../models/header';

@Component({
  selector: 'app-user-profile-header',
  templateUrl: './user-profile-header.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class UserProfileHeaderComponent {
  @Input() profileHeaderInfo!: IHeaderInfo;

  // Nathan
  // placeholder for handling avatar change event
  // implement actual upload logic later
  onAvatarChange(event: Event): void {
    console.log('new image uploaded');
  }
}
