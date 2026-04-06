import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output, WritableSignal, signal, computed } from '@angular/core';
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
  @Output() pickerOpening = new EventEmitter<void>();

  isPickerOpen = false;
  searchTerm: WritableSignal<string> = signal('');

  filteredTeams = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.availableTeams;
    }
    return this.availableTeams.filter(
      (team) =>
        team.displayName.toLowerCase().includes(term) ||
        team.teamName.toLowerCase().includes(term)
    );
  });

  openPicker(): void {
    this.blurActiveElement();
    this.pickerOpening.emit();
    this.isPickerOpen = true;
  }

  closePicker(): void {
    this.blurActiveElement();
    this.isPickerOpen = false;
    this.searchTerm.set('');
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

  private blurActiveElement(): void {
    if (typeof document === 'undefined') {
      return;
    }

    const active = document.activeElement as HTMLElement | null;
    active?.blur();
  }
}
