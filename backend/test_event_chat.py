"""
Quick unit tests for the event-chat schemas and route helpers.

No database or Azure Functions runtime required.

Run with:
    cd backend
    python -m pytest test_event_chat.py -v          # if pytest is installed
    python test_event_chat.py                        # plain Python fallback
"""

import sys
import types
import unittest
import uuid
from datetime import datetime, timezone


# ---------------------------------------------------------------------------
# Make the app package importable without a running runtime.
# Run this file from the `backend/` directory:
#   python test_event_chat.py          OR
#   python -m pytest test_event_chat.py -v
# ---------------------------------------------------------------------------
sys.path.insert(0, "app")

from schemas.event_chat import EventChatCreate, EventChatPage, EventChatRead  # type: ignore[import]  # noqa: E402


# ---------------------------------------------------------------------------
# Helper: build a lightweight fake ORM object that looks like EventChat
#         with an eagerly-loaded .user relationship
# ---------------------------------------------------------------------------
def _make_orm_msg(
    *,
    message_id=None,
    event_id=None,
    user_id=None,
    message_text="hello",
    timestamp=None,
    username="tester",
    profile_picture_url="https://example.com/avatar.png",
):
    msg = types.SimpleNamespace()
    msg.message_id = message_id or uuid.uuid4()
    msg.event_id = event_id or uuid.uuid4()
    msg.user_id = user_id or uuid.uuid4()
    msg.message_text = message_text
    msg.timestamp = timestamp or datetime(2026, 2, 25, 12, 0, 0)

    user = types.SimpleNamespace()
    user.username = username
    user.profile_picture_url = profile_picture_url
    msg.user = user

    return msg


# ---------------------------------------------------------------------------
# Schema tests
# ---------------------------------------------------------------------------
class TestEventChatCreateSchema(unittest.TestCase):
    """EventChatCreate validation rules."""

    def test_valid_message(self):
        obj = EventChatCreate(event_id=str(uuid.uuid4()), message_text="Hey!")
        self.assertEqual(obj.message_text, "Hey!")

    def test_rejects_empty_string(self):
        from pydantic import ValidationError
        with self.assertRaises(ValidationError):
            EventChatCreate(event_id=str(uuid.uuid4()), message_text="")

    def test_rejects_message_over_1000_chars(self):
        from pydantic import ValidationError
        with self.assertRaises(ValidationError):
            EventChatCreate(event_id=str(uuid.uuid4()), message_text="x" * 1001)

    def test_exactly_1000_chars_is_valid(self):
        obj = EventChatCreate(event_id=str(uuid.uuid4()), message_text="x" * 1000)
        self.assertEqual(len(obj.message_text), 1000)

    def test_no_user_id_field(self):
        """user_id must not be accepted in the request body."""
        obj = EventChatCreate(
            event_id=str(uuid.uuid4()),
            message_text="test",
            user_id=str(uuid.uuid4()),  # should be silently ignored / not exist on obj
        )
        self.assertFalse(hasattr(obj, "user_id"), "user_id must not be on EventChatCreate")

    def test_camel_case_alias(self):
        """Frontend sends camelCase — schema must accept it."""
        obj = EventChatCreate.model_validate(
            {"eventId": str(uuid.uuid4()), "messageText": "alias test"}
        )
        self.assertEqual(obj.message_text, "alias test")


class TestEventChatReadSchema(unittest.TestCase):
    """EventChatRead model_validator extracts user fields from ORM object."""

    def test_extracts_user_name_and_avatar(self):
        orm = _make_orm_msg(username="alice", profile_picture_url="https://img/a.jpg")
        read = EventChatRead.model_validate(orm)
        self.assertEqual(read.user_name, "alice")
        self.assertEqual(read.user_avatar_url, "https://img/a.jpg")

    def test_null_user_relationship(self):
        orm = _make_orm_msg()
        orm.user = None
        read = EventChatRead.model_validate(orm)
        self.assertIsNone(read.user_name)
        self.assertIsNone(read.user_avatar_url)

    def test_message_fields_preserved(self):
        mid = uuid.uuid4()
        eid = uuid.uuid4()
        uid = uuid.uuid4()
        ts = datetime(2026, 1, 1, 0, 0, 0)
        orm = _make_orm_msg(
            message_id=mid, event_id=eid, user_id=uid,
            message_text="preserved", timestamp=ts,
        )
        read = EventChatRead.model_validate(orm)
        self.assertEqual(read.message_id, mid)
        self.assertEqual(read.event_id, eid)
        self.assertEqual(read.user_id, uid)
        self.assertEqual(read.message_text, "preserved")
        self.assertEqual(read.timestamp, ts)

    def test_camel_case_serialisation(self):
        orm = _make_orm_msg(username="bob")
        read = EventChatRead.model_validate(orm)
        d = read.model_dump(by_alias=True)
        self.assertIn("messageId", d)
        self.assertIn("userName", d)
        self.assertIn("userAvatarUrl", d)
        self.assertNotIn("message_id", d)


class TestEventChatPageSchema(unittest.TestCase):
    """EventChatPage cursor envelope."""

    def _make_read(self):
        return EventChatRead.model_validate(_make_orm_msg())

    def test_empty_page(self):
        page = EventChatPage(messages=[], next_cursor=None)
        self.assertEqual(page.messages, [])
        self.assertIsNone(page.next_cursor)

    def test_page_with_cursor(self):
        msg = self._make_read()
        page = EventChatPage(messages=[msg], next_cursor="2026-02-25T12:00:00+00:00")
        self.assertEqual(len(page.messages), 1)
        self.assertEqual(page.next_cursor, "2026-02-25T12:00:00+00:00")

    def test_camel_alias_on_serialise(self):
        page = EventChatPage(messages=[], next_cursor="2026-02-25T00:00:00+00:00")
        d = page.model_dump(by_alias=True)
        self.assertIn("nextCursor", d)
        self.assertNotIn("next_cursor", d)


# ---------------------------------------------------------------------------
# Route helper: since-cursor parsing (extracted from the route logic)
# ---------------------------------------------------------------------------
class TestSinceCursorParsing(unittest.TestCase):
    """Verify the ISO-8601 → naive UTC datetime conversion used in the route."""

    def _parse(self, raw: str) -> datetime:
        """Mirror the parsing logic from the route so we can unit-test it."""
        dt = datetime.fromisoformat(raw.replace("Z", "+00:00"))
        if dt.tzinfo is not None:
            dt = dt.astimezone(timezone.utc).replace(tzinfo=None)
        return dt

    def test_z_suffix(self):
        dt = self._parse("2026-02-25T12:30:00Z")
        self.assertEqual(dt, datetime(2026, 2, 25, 12, 30, 0))
        self.assertIsNone(dt.tzinfo)

    def test_plus_offset(self):
        dt = self._parse("2026-02-25T12:30:00+00:00")
        self.assertEqual(dt, datetime(2026, 2, 25, 12, 30, 0))

    def test_non_utc_offset_normalised(self):
        # +05:00 → UTC should subtract 5 hours
        dt = self._parse("2026-02-25T17:30:00+05:00")
        self.assertEqual(dt, datetime(2026, 2, 25, 12, 30, 0))

    def test_invalid_string_raises(self):
        with self.assertRaises(ValueError):
            self._parse("not-a-date")


# ---------------------------------------------------------------------------
# Entry point so the file can be run directly without pytest
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    result = unittest.main(verbosity=2, exit=False)
    sys.exit(0 if result.result.wasSuccessful() else 1)
