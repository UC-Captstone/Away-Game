import { Component, signal, WritableSignal, OnInit, OnDestroy } from '@angular/core';
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
  template: `
    <div class="h-[calc(100vh-3.5rem)] bg-slate-900 flex overflow-hidden">
      <!-- Left Panel: Friends -->
      <div
        class="flex flex-col border-r border-slate-700 bg-slate-800 overflow-y-auto"
        [class.w-full]="!selectedFriend() && isMobile"
        [class.hidden]="selectedFriend() && isMobile"
        [class.w-80]="!isMobile"
        [class.flex-shrink-0]="!isMobile"
      >
        <div class="p-4 overflow-y-auto flex-1">
          <app-friends-management
            [selectedFriendId]="selectedFriend()?.friendUserId ?? null"
            (selectedFriendChange)="onFriendSelected($event)"
          ></app-friends-management>
        </div>
      </div>

      <!-- Right Panel: DM Chat -->
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        @if (selectedFriend()) {
          <app-dm-chat
            [otherUserId]="selectedFriend()!.friendUserId"
            [otherUsername]="selectedFriend()!.friendUsername"
            [otherAvatarUrl]="selectedFriend()!.friendAvatarUrl ?? null"
            (backClicked)="selectedFriend.set(null)"
          ></app-dm-chat>
        } @else {
          <div class="flex h-full items-center justify-center text-slate-400">
            <div class="text-center">
              <p class="text-4xl mb-3">💬</p>
              <p class="text-base font-medium mb-1 text-slate-300">Select a friend to chat</p>
              <p class="text-sm">Add friends on the left and click one to open a conversation</p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
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
    this.isMobile = window.innerWidth < 768;
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
}
