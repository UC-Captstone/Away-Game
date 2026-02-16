import { Component, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
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
  protected readonly title = signal('frontend');

  showNavbar: WritableSignal<boolean> = signal(true);
  isLoading: WritableSignal<boolean> = signal(false);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const hiddenRoutes = ['/login', '/signup', '/profile', '/login#/factor-one'];
        this.showNavbar.set(!hiddenRoutes.includes(event.urlAfterRedirects));
      });
  }

  onNavBarLoading(value: boolean): void {
    this.isLoading.set(value);
  }
}
