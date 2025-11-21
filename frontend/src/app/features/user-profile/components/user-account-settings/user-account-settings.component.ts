import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  WritableSignal,
  signal,
} from '@angular/core';
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

  originalAccountSettings: WritableSignal<IAccountSettings | null> = signal(null);
  editableAccountSettings: WritableSignal<IAccountSettings> = signal({} as IAccountSettings);
  originalFavoriteTeams: WritableSignal<ITeam[]> = signal([]);
  editableFavoriteTeams: WritableSignal<ITeam[]> = signal([]);
  currentPassword: WritableSignal<string> = signal('');
  newPassword: WritableSignal<string> = signal('');
  confirmPassword: WritableSignal<string> = signal('');
  passwordValid: WritableSignal<boolean> = signal(false);
  showVerificationModal: WritableSignal<boolean> = signal(false);
  verificationForm: WritableSignal<IVerificationForm> = signal({
    reasoning: '',
    representedTeams: [],
  });
  infoChanged: WritableSignal<boolean> = signal(false);
  favoriteTeamsChanged: WritableSignal<boolean> = signal(false);
  showDeleteModal: WritableSignal<boolean> = signal(false);
  deleteConfirmText: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);

  get hasAppliedForVerification(): boolean {
    return !!this.accountSettings?.appliedForVerification;
  }

  get isUserVerified(): boolean {
    return !!this.verificationStatus;
  }

  constructor(private userProfileService: UserProfileService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accountSettings'] && this.accountSettings) {
      this.originalAccountSettings.set(this.deepClone(this.accountSettings));
      this.editableAccountSettings.set(this.deepClone(this.accountSettings));
      this.infoChanged.set(false);
    }

    if (changes['favoriteTeams'] && this.favoriteTeams) {
      this.originalFavoriteTeams.set(this.deepClone(this.favoriteTeams || []));
      this.editableFavoriteTeams.set(this.deepClone(this.favoriteTeams || []));
      this.favoriteTeamsChanged.set(false);
    }
  }

  checkIfChanged() {
    this.infoChanged.set(
      !!this.originalAccountSettings &&
        JSON.stringify(this.originalAccountSettings) !==
          JSON.stringify(this.editableAccountSettings),
    );

    const origIds = (this.originalFavoriteTeams() || [])
      .map((t) => String((t as any).teamID))
      .sort();
    const editIds = (this.editableFavoriteTeams() || [])
      .map((t) => String((t as any).teamID))
      .sort();
    this.favoriteTeamsChanged.set(JSON.stringify(origIds) !== JSON.stringify(editIds));
  }

  onInfoUpdate() {
    console.log('Updated Account Info:', this.editableAccountSettings);

    this.isLoading.set(true);

    const requests = [];

    if (this.infoChanged()) {
      requests.push(this.userProfileService.updateAccountInfo(this.editableAccountSettings()));
    }

    if (this.favoriteTeamsChanged()) {
      const teamIDs = this.editableFavoriteTeams().map((team) => team.teamID);
      requests.push(this.userProfileService.updateFavoriteTeams(teamIDs));
    }

    if (requests.length === 0) {
      this.isLoading.set(false);
      return;
    }

    forkJoin(requests).subscribe({
      next: () => {
        console.log('Updates completed successfully');

        this.settingsUpdated.emit();

        if (this.infoChanged()) {
          this.originalAccountSettings.set(this.deepClone(this.editableAccountSettings()));
          this.infoChanged.set(false);
        }
        if (this.favoriteTeamsChanged()) {
          this.originalFavoriteTeams.set(this.deepClone(this.editableFavoriteTeams()));
          this.favoriteTeamsChanged.set(false);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        //Nathan: implement error handling UI in helper function
        console.error('Failed to update account info or favorite teams', error);
        this.isLoading.set(false);
      },
    });
  }

  onFavoriteTeamsChanged(teams: ITeam[]) {
    this.editableFavoriteTeams.set(teams || []);
    this.checkIfChanged();

    console.log('Favorite teams changed:', teams);
  }

  onPasswordChange() {
    const passwordPattern = /^(?=.{8,})/;

    this.passwordValid.set(
      passwordPattern.test(this.currentPassword()) &&
        passwordPattern.test(this.newPassword()) &&
        this.newPassword() === this.confirmPassword() &&
        this.currentPassword() !== this.newPassword(),
    );
  }

  onUpdatePassword() {
    console.log('Password updated:', this.newPassword());

    this.userProfileService.updateUserPassword(this.newPassword());

    this.currentPassword.set('');
    this.newPassword.set('');
    this.confirmPassword.set('');
    this.passwordValid.set(false);
  }

  openVerificationModal(): void {
    this.showVerificationModal.set(true);
  }

  closeVerificationModal(): void {
    this.showVerificationModal.set(false);
  }

  onVerificationTeamsChanged(teams: ITeam[]): void {
    const current = this.verificationForm();
    this.verificationForm.set({ ...current, representedTeams: teams || [] });
  }

  submitVerificationApplication(): void {
    this.isLoading.set(true);
    this.userProfileService.submitVerificationApplications(this.verificationForm()).subscribe({
      next: () => {
        console.log('Verification application submitted:', this.verificationForm);
        this.verificationSubmitted.emit();
        this.closeVerificationModal();
        this.isLoading.set(false);
      },
      error: (error) => {
        //Nathan: implement error handling UI in helper function
        console.error('Failed to submit verification application', error);
        this.isLoading.set(false);
      },
    });
  }

  openDeleteModal() {
    this.deleteConfirmText.set('');
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
  }

  confirmDeleteAccount() {
    if (this.deleteConfirmText() !== 'DELETE') return;
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
