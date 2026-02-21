import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdaptiveChatPollerService } from '../../../shared/services/adaptive-chat-poller.service';
import { EventChatService } from '../../../shared/services/event-chat.service';
import { IEventChatMessage } from '../../../shared/models/event-chat';

@Component({
  selector: 'app-chat-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 800px; margin: 2rem auto; padding: 1rem;">
      <h2>Event Chat Test</h2>
      
      <div style="margin-bottom: 1rem;">
        <button (click)="startTest()" [disabled]="isPolling">Start Polling</button>
        <button (click)="stopTest()" [disabled]="!isPolling">Stop Polling</button>
        <span style="margin-left: 1rem;">
          Interval: {{ currentInterval }}ms | Messages: {{ messageCount }}
        </span>
      </div>

      <div style="border: 1px solid #ccc; height: 400px; overflow-y: auto; padding: 1rem; margin-bottom: 1rem;">
        <div *ngFor="let msg of messages" style="margin-bottom: 1rem; padding: 0.5rem; background: #f5f5f5;">
          <div><strong>{{ msg.userName || 'Unknown' }}</strong> - {{ msg.timestamp | date:'short' }}</div>
          <div>{{ msg.messageText }}</div>
        </div>
      </div>

      <div style="display: flex; gap: 0.5rem;">
        <input 
          [(ngModel)]="messageText" 
          (keyup.enter)="sendMessage()"
          (input)="onTyping()"
          placeholder="Type a message..."
          style="flex: 1; padding: 0.5rem;"
        />
        <button (click)="sendMessage()">Send</button>
      </div>

      <div style="margin-top: 1rem; padding: 1rem; background: #e8f4f8;">
        <h3>Debug Info</h3>
        <pre>{{ debugInfo }}</pre>
      </div>
    </div>
  `
})
export class ChatTestComponent implements OnInit, OnDestroy {
  // Test event ID from test data
  eventId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  // Test user ID from test data
  userId = '11111111-1111-1111-1111-111111111111';
  
  messages: IEventChatMessage[] = [];
  messageText = '';
  isPolling = false;
  currentInterval = 0;
  messageCount = 0;
  debugInfo = '';

  constructor(
    private chatPoller: AdaptiveChatPollerService,
    private chatService: EventChatService
  ) {}

  ngOnInit() {
    console.log('Chat Test Component Initialized');
    console.log('Event ID:', this.eventId);
    console.log('User ID:', this.userId);
  }

  async startTest() {
    console.log('Starting chat test...');
    this.isPolling = true;

    // Load initial messages
    await this.chatPoller.loadInitialMessages(this.eventId, 50);

    // Start polling
    this.chatPoller.startPolling(this.eventId).subscribe(messages => {
      this.messages = messages;
      this.messageCount = messages.length;
      this.currentInterval = this.chatPoller.getCurrentInterval();
      this.updateDebugInfo();
    });

    // Add visibility listener
    document.addEventListener('visibilitychange', this.handleVisibility);
  }

  stopTest() {
    console.log('Stopping chat test...');
    this.chatPoller.stopPolling();
    this.isPolling = false;
    document.removeEventListener('visibilitychange', this.handleVisibility);
  }

  sendMessage() {
    if (!this.messageText.trim()) return;

    const message = {
      eventId: this.eventId,
      userId: this.userId,
      messageText: this.messageText.trim()
    };

    console.log('Sending message:', message);

    this.chatService.sendMessage(message).subscribe({
      next: (response) => {
        console.log('Message sent successfully:', response);
        this.messageText = '';
        this.chatPoller.boostPolling();
      },
      error: (error) => {
        console.error('Error sending message:', error);
        alert('Failed to send message. Check console for details.');
      }
    });
  }

  onTyping() {
    this.chatPoller.boostPolling();
  }

  private handleVisibility = () => {
    if (document.hidden) {
      console.log('Tab hidden - throttling');
      this.chatPoller.throttlePolling();
    } else {
      console.log('Tab visible - boosting');
      this.chatPoller.boostPolling();
    }
  };

  private updateDebugInfo() {
    this.debugInfo = `
Polling: ${this.isPolling ? 'Active' : 'Stopped'}
Current Interval: ${this.currentInterval}ms
Message Count: ${this.messageCount}
Last Update: ${new Date().toLocaleTimeString()}
Event ID: ${this.eventId}
User ID: ${this.userId}
    `.trim();
  }

  ngOnDestroy() {
    this.stopTest();
  }
}
