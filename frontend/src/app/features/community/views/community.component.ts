import { Component, signal, WritableSignal, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription, EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FriendsManagementComponent } from '../components/friends-management.component';
import { DMChatComponent } from '../components/dm-chat.component';
import { IFriendship } from '../../../shared/models/friends';
import { FriendsService } from '../../../shared/services/friends.service';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, FriendsManagementComponent, DMChatComponent],
  templateUrl: './community.component.html',
})
export class CommunityComponent implements OnInit, OnDestroy {
  selectedFriend: WritableSignal<IFriendship | null> = signal(null);
  isMobile = false;

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private friendsService: FriendsService,
  ) {}

  ngOnInit(): void {
    this.updateViewportMode();
    this.subs.add(
      this.route.queryParams
        .pipe(
          switchMap((params) => {
            const friendId = params['friend'];
            if (!friendId) return EMPTY;
            return this.friendsService.getFriends().pipe(
              switchMap((friends) => {
                const friend = friends.find((f) => f.friendUserId === friendId);
                if (friend) this.selectedFriend.set(friend);
                return EMPTY;
              }),
            );
          }),
        )
        .subscribe({
          error: (err) => console.error('Error loading friend:', err),
        }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onFriendSelected(friend: IFriendship): void {
    this.selectedFriend.set(friend);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateViewportMode();
  }

  private updateViewportMode(): void {
    this.isMobile = window.innerWidth < 1024;
  }
}
