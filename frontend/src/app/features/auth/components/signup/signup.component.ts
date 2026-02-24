import { Component, inject, effect, signal } from '@angular/core';
import { ClerkService, ClerkSignUpComponent } from '@jsrob/ngx-clerk';
import type { SignUpProps } from '@clerk/types';
import { dark } from '@clerk/themes';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [ClerkSignUpComponent],
  standalone: true,
})
export class SignupComponent {
  signUpProps: SignUpProps = {
    appearance: {
      baseTheme: dark,
      variables: {
        colorPrimary: '#0ea5e9',
        colorDanger: '#f97316',
        colorBackground: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        colorInputBackground: '#1f2937',
        colorText: '#f8fafc',
        borderRadius: '16px',
      },
      elements: {
        rootBox:
          'rounded-3xl overflow-hidden bg-gradient-to-b from-slate-800 to-slate-950 shadow-2xl p-1',
        card: 'bg-transparent border border-slate-800 rounded-3xl shadow-lg backdrop-blur-md p-6',
        headerTitle: 'text-3xl font-semibold text-sky-400',
        headerSubtitle: 'text-slate-400 text-sm',
        formButtonPrimary:
          'bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-lg transition-colors',
        formFieldInput:
          'bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 rounded-lg focus:border-sky-500 focus:ring-sky-500',
        formFieldLabel: 'text-slate-300 text-sm',
        footerAction: 'text-slate-400 text-sm',
        footerActionLink: 'text-orange-400 hover:text-orange-500 font-medium transition-colors',
        dividerText: 'text-slate-500',
        socialButtonsIconButton:
          'bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg',
      },
      layout: {
        logoPlacement: 'none',
        socialButtonsVariant: 'iconButton',
        socialButtonsPlacement: 'bottom',
      },
    },
  };
  private hasSynced = signal(false);
  private isSyncing = signal(false);
  private clerkService = inject(ClerkService);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      const session = this.clerkService.session();

      if (session && session.id && !this.hasSynced() && !this.isSyncing()) {
        this.isSyncing.set(true);

        this.authService.syncUser().subscribe({
          next: () => {
            console.log('User Synced Successfully');
            this.hasSynced.set(true);
            this.isSyncing.set(false);
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Sync Error:', err);
            this.isSyncing.set(false);

            //Nathan: improve later on to be a popup noti
            if (err.status === 401) {
              console.error('Authentication failed. Please try signing in again.');
            } else if (err.status >= 500) {
              console.error('Server error. Please try again later.');
            }
          },
        });
      }
    });
  }
}
