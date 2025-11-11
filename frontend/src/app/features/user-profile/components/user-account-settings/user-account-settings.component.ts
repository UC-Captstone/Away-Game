import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IAccountSettings } from '../../models/account-settings';
import { ITeam } from '../../../../shared/models/team';
import { FormsModule } from '@angular/forms';
import { TeamSelectorComponent } from '../../../../shared/components/team-selector/team-selector.component';
import { PopupModalComponent } from '../../../../shared/components/popup-modal/popup-modal.component';
import { IVerificationForm } from '../../models/verification-form';
import { UserProfileService } from '../../services/user-profile.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-account-settings',
  templateUrl: './user-account-settings.component.html',
  standalone: true,
  imports: [FormsModule, TeamSelectorComponent, PopupModalComponent],
})
export class UserAccountSettingsComponent {
  @Output() settingsUpdated: EventEmitter<void> = new EventEmitter<void>();
  @Output() verificationSubmitted: EventEmitter<void> = new EventEmitter<void>();
  @Input() accountSettings!: IAccountSettings;
  @Input() favoriteTeams!: ITeam[];
  @Input() verificationStatus!: boolean;

  originalAccountSettings: IAccountSettings | null = null;
  editableAccountSettings: IAccountSettings = {} as IAccountSettings;
  originalFavoriteTeams: ITeam[] = [];
  editableFavoriteTeams: ITeam[] = [];
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordValid: boolean = false;
  showVerificationModal: boolean = false;
  verificationForm: IVerificationForm = {
    reasoning: '',
    representedTeams: [],
  };
  infoChanged: boolean = false;
  favoriteTeamsChanged: boolean = false;
  showDeleteModal: boolean = false;
  deleteConfirmText: string = '';
  isLoading: boolean = false;

  get hasAppliedForVerification(): boolean {
    return !!this.accountSettings?.appliedForVerification;
  }

  get isUserVerified(): boolean {
    return !!this.verificationStatus;
  }

  constructor(private userProfileService: UserProfileService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accountSettings'] && this.accountSettings) {
      this.originalAccountSettings = this.deepClone(this.accountSettings);
      this.editableAccountSettings = this.deepClone(this.accountSettings);
      this.infoChanged = false;
    }

    if (changes['favoriteTeams'] && this.favoriteTeams) {
      this.originalFavoriteTeams = this.deepClone(this.favoriteTeams || []);
      this.editableFavoriteTeams = this.deepClone(this.favoriteTeams || []);
      this.favoriteTeamsChanged = false;
    }
  }

  checkIfChanged() {
    this.infoChanged =
      !!this.originalAccountSettings &&
      JSON.stringify(this.originalAccountSettings) !== JSON.stringify(this.editableAccountSettings);

    const origIds = (this.originalFavoriteTeams || []).map((t) => String((t as any).teamID)).sort();
    const editIds = (this.editableFavoriteTeams || []).map((t) => String((t as any).teamID)).sort();
    this.favoriteTeamsChanged = JSON.stringify(origIds) !== JSON.stringify(editIds);
  }

  onInfoUpdate() {
    console.log('Updated Account Info:', this.editableAccountSettings);

    this.isLoading = true;

    const requests = [];

    if (this.infoChanged) {
      requests.push(this.userProfileService.updateAccountInfo(this.editableAccountSettings));
    }

    if (this.favoriteTeamsChanged) {
      const teamIDs = this.editableFavoriteTeams.map((team) => team.teamID);
      requests.push(this.userProfileService.updateFavoriteTeams(teamIDs));
    }

    if (requests.length === 0) {
      this.isLoading = false;
      return;
    }

    forkJoin(requests).subscribe({
      next: () => {
        console.log('Updates completed successfully');

        this.settingsUpdated.emit();

        if (this.infoChanged) {
          this.originalAccountSettings = this.deepClone(this.editableAccountSettings);
          this.infoChanged = false;
        }
        if (this.favoriteTeamsChanged) {
          this.originalFavoriteTeams = this.deepClone(this.editableFavoriteTeams);
          this.favoriteTeamsChanged = false;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to update account info or favorite teams', error);
        this.isLoading = false;
      },
    });
  }

  onFavoriteTeamsChanged(teams: ITeam[]) {
    this.editableFavoriteTeams = teams || [];
    this.checkIfChanged();

    console.log('Favorite teams changed:', teams);
  }

  onPasswordChange() {
    const passwordPattern = /^(?=.{8,})/;

    this.passwordValid =
      passwordPattern.test(this.currentPassword) &&
      passwordPattern.test(this.newPassword) &&
      this.newPassword === this.confirmPassword &&
      this.currentPassword !== this.newPassword;
  }

  onUpdatePassword() {
    console.log('Password updated:', this.newPassword);

    this.userProfileService.updateUserPassword(this.newPassword);

    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordValid = false;
  }

  openVerificationModal(): void {
    this.showVerificationModal = true;
  }

  closeVerificationModal(): void {
    this.showVerificationModal = false;
  }

  onVerificationTeamsChanged(teams: ITeam[]): void {
    this.verificationForm.representedTeams = teams || [];
  }

  submitVerificationApplication(): void {
    this.isLoading = true;
    this.userProfileService.submitVerificationApplications(this.verificationForm).subscribe({
      next: () => {
        console.log('Verification application submitted:', this.verificationForm);
        this.verificationSubmitted.emit();
        this.closeVerificationModal();
        this.isLoading = false;
      },
      error: (error) => {
        //Nathan: implement error handling UI in helper function
        console.error('Failed to submit verification application', error);
        this.isLoading = false;
      },
    });
  }

  openDeleteModal() {
    this.deleteConfirmText = '';
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDeleteAccount() {
    if (this.deleteConfirmText !== 'DELETE') return;
    this.userProfileService.deleteUserAccount().subscribe({
      next: () => {
        console.log('User account deleted');
        this.closeDeleteModal();
        // Nathan: Redirect user to signup page after account deletion
      },
      error: (error) => {
        //Nathan: implement error handling UI in helper function
        console.error('Failed to delete user account', error);
      },
    });
  }

  private deepClone<T>(obj: T): T {
    return obj ? JSON.parse(JSON.stringify(obj)) : (obj as T);
  }
}
