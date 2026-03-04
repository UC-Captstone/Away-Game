import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { IChatMessage, IChatPage } from '../models/chat';
import { ChatService } from './chat.service';

const BASE = `${environment.apiUrl}/event-chats`;
const EVENT_ID = 'aaaaaaaa-0000-0000-0000-000000000001';

function makeMsg(overrides: Partial<IChatMessage> = {}): IChatMessage {
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

function makePage(messages: IChatMessage[], nextCursor: string | null = null): IChatPage {
  return { messages, nextCursor };
}

describe('ChatService', () => {
  let service: ChatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ChatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    service.destroy();
    httpMock.match(() => true);
    httpMock.verify();
  });

  it('should load initial messages on initForEvent', fakeAsync(() => {
    const msgs = [makeMsg({ messageText: 'first' }), makeMsg({ messageText: 'second' })];

    service.initForEvent(EVENT_ID);

    const req = httpMock.expectOne((r) => r.url.includes(`/event/${EVENT_ID}`));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.has('since')).toBeFalse();
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

    const svc = service as unknown as { cursor: string | null };
    expect(svc.cursor).toBe(cursor);
  }));

  it('should not re-init when called again with the same event id', fakeAsync(() => {
    const msg = makeMsg();
    service.initForEvent(EVENT_ID);
    httpMock.expectOne((r) => r.url.includes(`/event/${EVENT_ID}`)).flush(makePage([msg]));
    tick();

    service.initForEvent(EVENT_ID);
    httpMock.expectNone((r) => r.url.includes(`/event/${EVENT_ID}`));
    expect(service.messages$.value.length).toBe(1);
  }));

  it('should pass since cursor on subsequent polls', fakeAsync(() => {
    const cursor = '2026-02-25T12:00:00+00:00';

    service.initForEvent(EVENT_ID);
    httpMock
      .expectOne((r) => r.url.includes(`/event/${EVENT_ID}`))
      .flush(makePage([makeMsg({ timestamp: cursor })], cursor));
    tick();

    tick(3000);

    const pollReq = httpMock.expectOne(
      (r) => r.url.includes(`/event/${EVENT_ID}`) && r.params.get('since') === cursor,
    );
    expect(pollReq.request.method).toBe('GET');
    pollReq.flush(makePage([]));
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
    httpMock.expectOne((r) => r.params.get('since') === cursor1).flush(makePage([newMsg], cursor2));

    tick();
    expect(service.messages$.value.length).toBe(2);
    expect(service.messages$.value[1].messageText).toBe('new!');

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
    httpMock.expectOne((r) => r.params.get('since') !== null).flush(makePage([msg], msg.timestamp));
    tick();

    expect(service.messages$.value.length).toBe(1);
  }));

  it('should POST the message and append it to messages$', fakeAsync(() => {
    service.initForEvent(EVENT_ID);
    httpMock.expectOne((r) => r.url.includes(`/event/${EVENT_ID}`)).flush(makePage([]));
    tick();

    const newMsg = makeMsg({ messageText: 'sent!' });

    let resolved: IChatMessage | undefined;
    service.sendMessage('sent!').then((message) => (resolved = message));

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
    httpMock.expectOne((r) => r.url.includes(`/event/${EVENT_ID}`)).flush(makePage([]));
    tick();

    let rejected = false;
    service.sendMessage('oops').catch(() => (rejected = true));

    httpMock
      .expectOne(`${BASE}/`)
      .flush({ detail: 'Forbidden' }, { status: 403, statusText: 'Forbidden' });

    tick();
    expect(rejected).toBeTrue();
    expect(service.sendError$.value).toBe('Forbidden');
  }));

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

    httpMock
      .expectOne(`${BASE}/${msg.messageId}`)
      .flush(null, { status: 204, statusText: 'No Content' });
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
    expect(service.messages$.value.length).toBe(1);
  }));

  it('should discard stale responses when switching events rapidly', fakeAsync(() => {
    const EVENT_ID_B = 'bbbbbbbb-0000-0000-0000-000000000002';
    const msgsB = [makeMsg({ messageText: 'from B', eventId: EVENT_ID_B })];

    service.initForEvent(EVENT_ID);
    const reqA = httpMock.expectOne((r) => r.url.includes(`/event/${EVENT_ID}`));

    service.initForEvent(EVENT_ID_B);
    expect(reqA.cancelled).toBeTrue();

    const reqB = httpMock.expectOne((r) => r.url.includes(`/event/${EVENT_ID_B}`));
    reqB.flush(makePage(msgsB));
    tick();

    expect(service.messages$.value.length).toBe(1);
    expect(service.messages$.value[0].messageText).toBe('from B');
  }));

  it('should clear messages$ and stop polling on destroy', fakeAsync(() => {
    service.initForEvent(EVENT_ID);
    httpMock.expectOne((r) => r.url.includes(`/event/${EVENT_ID}`)).flush(makePage([makeMsg()]));
    tick();

    service.destroy();
    expect(service.messages$.value).toEqual([]);

    tick(3000);
    httpMock.expectNone((r) => r.url.includes('/event-chats'));
  }));
});