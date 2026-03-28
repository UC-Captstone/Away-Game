import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IHeaderInfo } from '../../models/header';
import { ITeam } from '../../../../shared/models/team';

@Component({
  selector: 'app-user-profile-header',
  templateUrl: './user-profile-header.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class UserProfileHeaderComponent {
  @Input() profileHeaderInfo!: IHeaderInfo;
  @Input() availableTeams: ITeam[] = [];
  @Input() isSavingPicture = false;
  @Output() profilePictureSelected = new EventEmitter<string | null>();

  isPickerOpen = false;

  openPicker(): void {
    this.isPickerOpen = true;
  }

  closePicker(): void {
    this.isPickerOpen = false;
  }

  onSelectProfilePicture(logoUrl: string): void {
    this.profilePictureSelected.emit(logoUrl);
    this.closePicker();
  }

  onResetProfilePicture(): void {
    this.profilePictureSelected.emit(null);
    this.closePicker();
  }

  isCurrentPicture(logoUrl: string): boolean {
    return (this.profileHeaderInfo?.profilePictureUrl || '') === logoUrl;
  }

  trackByTeamId(_: number, team: ITeam): number {
    return team.teamId;
  }
}
