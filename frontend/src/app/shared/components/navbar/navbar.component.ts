import { Component, EventEmitter, Output, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { INavBar } from '../../models/navbar';

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

  constructor(private userService: UserService) {}

  ngOnInit() {
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
}
