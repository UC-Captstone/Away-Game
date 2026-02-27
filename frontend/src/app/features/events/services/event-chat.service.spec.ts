import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { EventChatService } from './event-chat.service';
import { IEventChatMessage, IEventChatPage } from '../models/event-chat';
import { environment } from '../../../../environments/environment';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const BASE = `${environment.apiUrl}/event-chats`;
const EVENT_ID = 'aaaaaaaa-0000-0000-0000-000000000001';

function makeMsg(overrides: Partial<IEventChatMessage> = {}): IEventChatMessage {
  return {
    messageId: crypto.randomUUID(),
    eventId: EVENT_ID,
    userId: 'user-1',
    messageText: 'hello',
    timestamp: '2026-02-25T12:00:00+00:00',
    userName: 'Alice',
    userAvatarUrl: null,
    ...overrides,
  };
}

function makePage(
  messages: IEventChatMessage[],
  nextCursor: string | null = null,
): IEventChatPage {
  return { messages, nextCursor };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('EventChatService', () => {
  let service: EventChatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventChatService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EventChatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    service.destroy();
    // Drain any poll requests that were dispatched by the timer during the test
    // but not explicitly handled — they would otherwise cause verify() to fail.
    httpMock.match(() => true);
    httpMock.verify();
  });

  // ── initForEvent ──────────────────────────────────────────────────────────

  it('should load initial messages on initForEvent', fakeAsync(() => {
    const msgs = [makeMsg({ messageText: 'first' }), makeMsg({ messageText: 'second' })];

    service.initForEvent(EVENT_ID);

    const req = httpMock.expectOne((r) => r.url.includes(`/event/${EVENT_ID}`));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.has('since')).toBeFalse(); // no cursor on initial load
    req.flush(makePage(msgs, msgs[msgs.length - 1].timestamp));

    tick();

    const current = service.messages$.value;
    expect(current.length).toBe(2);
    expect(current[0].messageText).toBe('first');
    expect(current[1].messageText).toBe('second');
  }));

  it('should store nextCursor after initial load', fakeAsync(() => {
    const cursor = '2026-02-25T12:00:00+00:00';
    service.initForEvent(EVENT_ID);

    httpMock
      .expectOne((r) => r.url.includes(`/event/${EVENT_ID}`))
      .flush(makePage([makeMsg({ timestamp: cursor })], cursor));

    tick();

    // Access the private cursor via the service's type assertion for testing
    const svc = service as unknown as { cursor: string | null };
    expect(svc.cursor).toBe(cursor);
  }));

  it('should not re-init when called again with the same event id', fakeAsync(() => {
    const msg = makeMsg();
    service.initForEvent(EVENT_ID);
    httpMock
      .expectOne((r) => r.url.includes(`/event/${EVENT_ID}`))
      .flush(makePage([msg]));
    tick();

    // Second call with same id — no new HTTP request should fire and
    // the existing messages should be preserved.
    service.initForEvent(EVENT_ID);
    httpMock.expectNone((r) => r.url.includes(`/event/${EVENT_ID}`));
    expect(service.messages$.value.length).toBe(1);
  }));

  // ── polling ───────────────────────────────────────────────────────────────

  it('should pass since= cursor on subsequent polls', fakeAsync(() => {
    const cursor = '2026-02-25T12:00:00+00:00';

    service.initForEvent(EVENT_ID);
    httpMock
      .expectOne((r) => r.url.includes(`/event/${EVENT_ID}`))
      .flush(makePage([makeMsg({ timestamp: cursor })], cursor));
    tick();

    // Advance 3 seconds to trigger the first poll
    tick(3000);

    const pollReq = httpMock.expectOne(
      (r) => r.url.includes(`/event/${EVENT_ID}`) && r.params.get('since') === cursor,
    );
    expect(pollReq.request.method).toBe('GET');
    pollReq.flush(makePage([])); // empty poll — nothing new
  }));

  it('should append new messages from a poll and update cursor', fakeAsync(() => {
    const cursor1 = '2026-02-25T12:00:00+00:00';
    const newMsg = makeMsg({ timestamp: '2026-02-25T12:00:05+00:00', messageText: 'new!' });
    const cursor2 = newMsg.timestamp;

    service.initForEvent(EVENT_ID);
    httpMock
      .expectOne((r) => r.url.includes(`/event/${EVENT_ID}`))
      .flush(makePage([makeMsg({ timestamp: cursor1 })], cursor1));
    tick();

    tick(3000);
    httpMock
      .expectOne((r) => r.params.get('since') === cursor1)
      .flush(makePage([newMsg], cursor2));

    tick();
    expect(service.messages$.value.length).toBe(2);
    expect(service.messages$.value[1].messageText).toBe('new!');

    // Cursor must have advanced
    const svc = service as unknown as { cursor: string | null };
    expect(svc.cursor).toBe(cursor2);
  }));

  it('should deduplicate messages that arrive in both initial load and poll', fakeAsync(() => {
    const msg = makeMsg();
    service.initForEvent(EVENT_ID);
    httpMock
      .expectOne((r) => r.url.includes(`/event/${EVENT_ID}`))
      .flush(makePage([msg], msg.timestamp));
    tick();

    tick(3000);
    // Poll returns the same message again (e.g. same-second timestamp)
    httpMock
      .expectOne((r) => r.params.get('since') !== null)
      .flush(makePage([msg], msg.timestamp));
    tick();

    expect(service.messages$.value.length).toBe(1); // still 1, not 2
  }));

  // ── sendMessage ───────────────────────────────────────────────────────────

  it('should POST the message and append it to messages$', fakeAsync(() => {
    service.initForEvent(EVENT_ID);
    httpMock
      .expectOne((r) => r.url.includes(`/event/${EVENT_ID}`))
      .flush(makePage([]));
    tick();

    const newMsg = makeMsg({ messageText: 'sent!' });

    let resolved: IEventChatMessage | undefined;
    service.sendMessage('sent!').then((m) => (resolved = m));

    const postReq = httpMock.expectOne(`${BASE}/`);
    expect(postReq.request.method).toBe('POST');
    expect(postReq.request.body.messageText).toBe('sent!');
    expect(postReq.request.body.eventId).toBe(EVENT_ID);
    postReq.flush(newMsg);

    tick();
    expect(resolved?.messageText).toBe('sent!');
    expect(service.messages$.value.length).toBe(1);
  }));

  it('should set sendError$ when POST fails', fakeAsync(() => {
    service.initForEvent(EVENT_ID);
    httpMock
      .expectOne((r) => r.url.includes(`/event/${EVENT_ID}`))
      .flush(makePage([]));
    tick();

    let rejected = false;
    service.sendMessage('oops').catch(() => (rejected = true));

    httpMock.expectOne(`${BASE}/`).flush(
      { detail: 'Forbidden' },
      { status: 403, statusText: 'Forbidden' },
    );

    tick();
    expect(rejected).toBeTrue();
    expect(service.sendError$.value).toBe('Forbidden');
  }));

  // ── deleteMessage ─────────────────────────────────────────────────────────

  it('should DELETE and remove the message from messages$', fakeAsync(() => {
    const msg = makeMsg();

    service.initForEvent(EVENT_ID);
    httpMock
      .expectOne((r) => r.url.includes(`/event/${EVENT_ID}`))
      .flush(makePage([msg], msg.timestamp));
    tick();

    expect(service.messages$.value.length).toBe(1);

    let done = false;
    service.deleteMessage(msg.messageId).then(() => (done = true));

    httpMock.expectOne(`${BASE}/${msg.messageId}`).flush(null, { status: 204, statusText: 'No Content' });
    tick();

    expect(done).toBeTrue();
    expect(service.messages$.value.length).toBe(0);
  }));

  it('should set sendError$ when DELETE returns 403', fakeAsync(() => {
    const msg = makeMsg();

    service.initForEvent(EVENT_ID);
    httpMock
      .expectOne((r) => r.url.includes(`/event/${EVENT_ID}`))
      .flush(makePage([msg], msg.timestamp));
    tick();

    let rejected = false;
    service.deleteMessage(msg.messageId).catch(() => (rejected = true));

    httpMock.expectOne(`${BASE}/${msg.messageId}`).flush(
      { detail: 'You can only delete your own messages' },
      { status: 403, statusText: 'Forbidden' },
    );
    tick();

    expect(rejected).toBeTrue();
    expect(service.sendError$.value).toBe('You can only delete your own messages');
    // message should still be in the list
    expect(service.messages$.value.length).toBe(1);
  }));

  // ── destroy ───────────────────────────────────────────────────────────────

  it('should clear messages$ and stop polling on destroy', fakeAsync(() => {
    service.initForEvent(EVENT_ID);
    httpMock
      .expectOne((r) => r.url.includes(`/event/${EVENT_ID}`))
      .flush(makePage([makeMsg()]));
    tick();

    service.destroy();
    expect(service.messages$.value).toEqual([]);

    // No poll requests should fire after destroy
    tick(3000);
    httpMock.expectNone((r) => r.url.includes('/event-chats'));
  }));
});
