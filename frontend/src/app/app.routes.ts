import { Routes } from '@angular/router';
import { AuthGuard } from './features/auth/guards/auth.guard';

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
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/views/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'chat-test',
    loadComponent: () =>
      import('./features/events/chat-test/chat-test.component').then(
        (m) => m.ChatTestComponent,
      ),
  },
];
