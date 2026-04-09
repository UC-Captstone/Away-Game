import { Component, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, NavigationError, Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/navbar/navbar.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  private readonly chunkRetryStorageKey = 'chunk-load-retried';

  protected readonly title = signal('frontend');

  showNavbar: WritableSignal<boolean> = signal(true);
  isLoading: WritableSignal<boolean> = signal(false);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const nav = event as NavigationEnd;
        const hiddenRoutes = ['/login', '/signup', '/profile', '/login#/factor-one'];
        this.showNavbar.set(!hiddenRoutes.includes(nav.urlAfterRedirects));
        sessionStorage.removeItem(this.chunkRetryStorageKey);
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationError))
      .subscribe((event) => {
        const navError = event as NavigationError;
        const message = String(navError.error?.message ?? navError.error ?? '');
        const isChunkLoadFailure =
          message.includes('Failed to fetch dynamically imported module') ||
          message.includes('Importing a module script failed');

        if (!isChunkLoadFailure) {
          return;
        }

        const hasRetried = sessionStorage.getItem(this.chunkRetryStorageKey) === 'true';
        if (!hasRetried) {
          sessionStorage.setItem(this.chunkRetryStorageKey, 'true');
          window.location.reload();
          return;
        }

        console.error('Lazy-loaded chunk failed after one reload attempt:', navError);
        this.router.navigateByUrl('/home');
      });
  }

  onNavBarLoading(value: boolean): void {
    this.isLoading.set(value);
  }
}
