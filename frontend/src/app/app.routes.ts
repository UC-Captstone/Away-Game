import { Routes } from '@angular/router';
import { AuthGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login.component').then((m) => m.Login),
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/auth/components/signup/signup.component').then((m) => m.Signup),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/user-profile/views/user-profile.component').then(
        (m) => m.UserProfileComponent,
      ),
  },
];
