import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, WritableSignal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ClerkService } from '@jsrob/ngx-clerk';
import { AuthService } from '../../../features/auth/services/auth.service';
import { INavBar } from '../../models/navbar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
})
export class NavBarComponent {
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  navBarInfo!: INavBar;
  isMenuOpen: WritableSignal<boolean> = signal(false);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private clerkService: ClerkService,
    private router: Router,
  ) {}

  ngOnInit() {
    const clerk = this.clerkService.clerk();
    const isSignedIn = !!clerk?.session;

    if (!isSignedIn) {
      this.isLoading.emit(false);
      return;
    }

    this.isLoading.emit(true);
    this.userService.getNavBarInfo().subscribe({
      next: (navBarInfo: INavBar) => {
        this.navBarInfo = navBarInfo;
        this.isLoading.emit(false);
      },
      error: (error) => {
        console.error('Error fetching profile picture:', error);
        this.isLoading.emit(false);
      },
    });
  }

  async onSignOut(): Promise<void> {
    try {
      this.authService.clearInternalToken();
      await this.clerkService.clerk()?.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      this.authService.clearInternalToken();
      this.router.navigate(['/login']);
    }
  }
}