import { Routes } from '@angular/router';
import { AuthGuard } from './features/auth/guards/auth.guard';
import { protectedGuard } from './features/auth/guards/protected.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login.component').then((m) => m.LoginComponent),
    // Nathan: set up later
    //canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/auth/components/signup/signup.component').then((m) => m.SignupComponent),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/user-profile/views/user-profile.component').then(
        (m) => m.UserProfileComponent,
      ),
    canActivate: [protectedGuard],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/views/home.component').then((m) => m.HomeComponent),
    canActivate: [protectedGuard],
  },
  {
    path: 'events',
    loadComponent: () =>
      import('./features/event-search/views/event-search.component').then(
        (m) => m.EventSearchComponent,
      ),
  },
  {
    path: 'game-details',
    loadComponent: () =>
      import('./features/game-details/views/game-details.component').then(
        (m) => m.GameDetailsComponent,
      ),
    canActivate: [protectedGuard],
  },
];
