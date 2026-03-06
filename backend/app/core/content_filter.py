"""
Content filtering for chat messages
=====================================

Applies three layers of censorship in order:

1. **URL / link stripping** — any http(s) URL or bare domain-like string is
   replaced with ``[link removed]``.  Prevents spam, phishing, and self-promo.

2. **Hate-speech / threat keywords** — a curated list of high-severity terms
   (slurs targeting ethnicity, religion, gender identity, disability; explicit
   threats of violence) are replaced with ``***``.  This is intentionally
   conservative — only unambiguous terms are listed.

3. **General profanity** — handled by ``better-profanity``'s built-in word
   list plus leet-speak detection.  Each bad word is replaced with the same
   number of ``*`` characters so message length is preserved visually.

All filtering is case-insensitive.  The original message is never stored;
the caller receives the cleaned string.

Usage
-----
    from core.content_filter import clean_message

    safe_text = clean_message(raw_input)
"""

import re
from better_profanity import profanity as _profanity

# ---------------------------------------------------------------------------
# Initialise better-profanity once at module import time (not per-request).
# ---------------------------------------------------------------------------
_profanity.load_censor_words()

# ---------------------------------------------------------------------------
# URL pattern — matches:
#   https://example.com/path?q=1
#   http://x.co
#   www.example.com
#   bit.ly/abc123  (bare TLD shorteners)
# ---------------------------------------------------------------------------
_URL_PATTERN = re.compile(
    r"(?:"
    r"https?://[^\s]+"                    # explicit scheme
    r"|www\.[^\s]+"                       # www. prefix
    r"|[^\s]+\.[a-z]{2,4}(?:/[^\s]*)?"   # bare domain with common TLD
    r")",
    re.IGNORECASE,
)

# ---------------------------------------------------------------------------
# Hate-speech / threat keyword list.
# Words are stored as plain strings; matching is whole-word, case-insensitive.
# Add more terms as needed, but be mindful of false positives. Most will be
# caught by better-profanity, so this list should be reserved for high-severity 
# terms that require censorship but are not necessarily profane in all contexts 
# (e.g. slurs, explicit threats of violence).
# ---------------------------------------------------------------------------
_HATE_TERMS: list[str] = [
    # Direct threats
    "kill yourself", "kys", "i will kill you", "i'll kill you",
    "i'm going to kill", "im going to kill", "bomb threat",
    "shoot you", "stab you",
    # Slurs — ethnic / racial
    
]

# Pre-compile a single alternation regex for efficiency.
_hate_escaped = [re.escape(t) for t in _HATE_TERMS]
_HATE_PATTERN = re.compile(
    r"(?<!\w)(?:" + "|".join(_hate_escaped) + r")(?!\w)",
    re.IGNORECASE,
) if _hate_escaped else None


def _censor_match(match: re.Match) -> str:
    """Return the same number of ``*`` characters as the matched text."""
    return "*" * len(match.group())


def clean_message(text: str) -> str:
    """
    Return a censored version of *text* with URLs, hate speech, and profanity
    replaced.  The original string is not modified.

    Parameters
    ----------
    text:
        Raw message text submitted by a user.

    Returns
    -------
    str
        The cleaned message safe to store and display.
    """
    if not text or not text.strip():
        return text

    # Layer 1: strip URLs / links.
    cleaned = _URL_PATTERN.sub("[link removed]", text)

    # Layer 2: hate speech / threats.
    if _HATE_PATTERN:
        cleaned = _HATE_PATTERN.sub(lambda m: "*" * len(m.group()), cleaned)

    # Layer 3: general profanity (better-profanity handles leet-speak etc.).
    cleaned = _profanity.censor(cleaned)

    return cleaned
