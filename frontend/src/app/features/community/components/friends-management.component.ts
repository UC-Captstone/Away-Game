import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  Input,
  EventEmitter,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription, forkJoin, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FriendsService } from '../../../shared/services/friends.service';
import { IFriendRequest, IFriendship, IUserSearchResult } from '../../../shared/models/friends';

@Component({
  selector: 'app-friends-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './friends-management.component.html',
})
export class FriendsManagementComponent implements OnInit, OnDestroy {
  @Input() selectedFriendId: string | null = null;
  @Output() selectedFriendChange = new EventEmitter<IFriendship>();

  friends: WritableSignal<IFriendship[]> = signal([]);
  sentRequests: WritableSignal<IFriendRequest[]> = signal([]);
  receivedRequests: WritableSignal<IFriendRequest[]> = signal([]);
  loading: WritableSignal<boolean> = signal(true);
  searchResults: WritableSignal<IUserSearchResult[]> = signal([]);
  searching: WritableSignal<boolean> = signal(false);
  sendingToUserId: WritableSignal<string | null> = signal(null);
  requestError: WritableSignal<string> = signal('');
  processingRequestId: WritableSignal<string | null> = signal(null);
  removingFriendId: WritableSignal<string | null> = signal(null);

  searchQuery: string = '';
  hasSearched = false;

  private searchSubject = new Subject<string>();
  private subs = new Subscription();
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private lastDataSignature = '';
  private isRefreshing = false;

  constructor(private friendsService: FriendsService) {}

  ngOnInit(): void {
    this.loadData(true);
    this.startPolling();
    this.subs.add(
      this.searchSubject
        .pipe(
          debounceTime(350),
          distinctUntilChanged(),
          switchMap((q) => {
            if (!q.trim()) {
              this.searchResults.set([]);
              this.searching.set(false);
              return of([] as IUserSearchResult[]);
            }
            this.searching.set(true);
            return this.friendsService.searchUsers(q.trim());
          }),
        )
        .subscribe({
          next: (results) => {
            this.searchResults.set(results);
            this.searching.set(false);
            this.hasSearched = true;
          },
          error: () => {
            this.searchResults.set([]);
            this.searching.set(false);
          },
        }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  onSearchQueryChange(value: string): void {
    if (!value.trim()) {
      this.searchResults.set([]);
      this.hasSearched = false;
    }
    this.searchSubject.next(value);
  }

  onSearchNow(): void {
    if (this.searchQuery.trim()) {
      this.searching.set(true);
      this.subs.add(
        this.friendsService.searchUsers(this.searchQuery.trim()).subscribe({
          next: (results) => {
            this.searchResults.set(results);
            this.searching.set(false);
            this.hasSearched = true;
          },
          error: () => {
            this.searchResults.set([]);
            this.searching.set(false);
          },
        }),
      );
    }
  }

  onSendRequestToUser(userId: string): void {
    this.sendingToUserId.set(userId);
    this.requestError.set('');
    this.subs.add(
      this.friendsService.sendFriendRequest(userId).subscribe({
        next: (req) => {
          this.sentRequests.set([req, ...this.sentRequests()]);
          this.sendingToUserId.set(null);
          this.loadData(true);
        },
        error: (err) => {
          this.requestError.set(err.error?.detail || 'Failed to send request');
          this.sendingToUserId.set(null);
        },
      }),
    );
  }

  isFriend(userId: string): boolean {
    return this.friends().some((f) => f.friendUserId === userId);
  }

  isPending(userId: string): boolean {
    return (
      this.sentRequests().some((r) => r.receiverId === userId) ||
      this.receivedRequests().some((r) => r.senderId === userId)
    );
  }

  alreadyFriendOrPending(userId: string): boolean {
    return this.isFriend(userId) || this.isPending(userId);
  }

  private loadData(force = false): void {
    if (this.isRefreshing) return;
    this.isRefreshing = true;
    if (force) {
      this.loading.set(true);
    }

    this.subs.add(
      forkJoin({
        friends: this.friendsService.getFriends(),
        sentRequests: this.friendsService.getSentFriendRequests(),
        receivedRequests: this.friendsService.getReceivedFriendRequests(),
      }).subscribe({
        next: (data) => {
          const signature = JSON.stringify({
            friends: data.friends.map((f) => [
              f.friendshipId,
              f.friendUserId,
              f.friendUsername,
              f.friendAvatarUrl,
              f.createdAt,
            ]),
            sent: data.sentRequests.map((r) => [
              r.requestId,
              r.receiverId,
              r.receiverAvatarUrl,
              r.status,
              r.updatedAt,
              r.createdAt,
            ]),
            received: data.receivedRequests.map((r) => [
              r.requestId,
              r.senderId,
              r.senderAvatarUrl,
              r.status,
              r.updatedAt,
              r.createdAt,
            ]),
          });

          if (force || signature !== this.lastDataSignature) {
            this.friends.set(data.friends);
            this.sentRequests.set(data.sentRequests);
            this.receivedRequests.set(data.receivedRequests);
            this.lastDataSignature = signature;

            if (this.selectedFriendId) {
              const updatedSelected = data.friends.find((f) => f.friendUserId === this.selectedFriendId);
              if (updatedSelected) {
                this.selectedFriendChange.emit(updatedSelected);
              }
            }
          }

          this.loading.set(false);
          this.isRefreshing = false;
        },
        error: (err) => {
          console.error('Error refreshing friends data:', err);
          this.loading.set(false);
          this.isRefreshing = false;
        },
      }),
    );
  }

  private startPolling(): void {
    this.pollTimer = setInterval(() => {
      if (document.hidden) return;
      this.loadData();
    }, 10000);
  }

  onAcceptRequest(requestId: string): void {
    this.processingRequestId.set(requestId);
    this.subs.add(
      this.friendsService.acceptFriendRequest(requestId).subscribe({
        next: () => {
          this.receivedRequests.set(
            this.receivedRequests().filter((r) => r.requestId !== requestId),
          );
          this.loadData(true);
          this.processingRequestId.set(null);
        },
        error: (err) => {
          console.error('Error accepting request:', err);
          this.processingRequestId.set(null);
        },
      }),
    );
  }

  onRejectRequest(requestId: string): void {
    this.processingRequestId.set(requestId);
    this.subs.add(
      this.friendsService.rejectFriendRequest(requestId).subscribe({
        next: () => {
          this.receivedRequests.set(
            this.receivedRequests().filter((r) => r.requestId !== requestId),
          );
          this.loadData(true);
          this.processingRequestId.set(null);
        },
        error: (err) => {
          console.error('Error rejecting request:', err);
          this.processingRequestId.set(null);
        },
      }),
    );
  }

  onRemoveFriend(friendUserId: string): void {
    this.removingFriendId.set(friendUserId);
    this.subs.add(
      this.friendsService.removeFriend(friendUserId).subscribe({
        next: () => {
          this.friends.set(this.friends().filter((f) => f.friendUserId !== friendUserId));
          this.loadData(true);
          this.removingFriendId.set(null);
        },
        error: (err) => {
          console.error('Error removing friend:', err);
          this.removingFriendId.set(null);
        },
      }),
    );
  }

  onSelectFriend(friend: IFriendship): void {
    this.selectedFriendChange.emit(friend);
  }
}
