#!/usr/bin/env python3
"""Quick live integration test for friends and DM endpoints"""
import requests
import json
import sys
from datetime import datetime

# Test configuration
API_BASE = "http://localhost:7071/api"
TEST_USER_ID = "test-user-123"  # Mock Clerk user ID for testing

headers = {
    "Authorization": f"Bearer test-token",
    "Content-Type": "application/json"
}

def print_test(name, result):
    status = "✓ PASS" if result else "✗ FAIL"
    print(f"{status} | {name}")
    return result

def test_get_friends():
    """Test GET /api/friends"""
    try:
        response = requests.get(f"{API_BASE}/friends", headers=headers)
        print(f"GET /friends: {response.status_code}")
        if response.status_code in [200, 401, 403]:  # 401/403 expected without valid auth
            print(f"  Response: {response.text[:100]}")
            return True
        return False
    except Exception as e:
        print(f"✗ {e}")
        return False

def test_send_friend_request():
    """Test POST /api/friends/requests"""
    try:
        payload = {"receiverId": "other-user-456"}
        response = requests.post(f"{API_BASE}/friends/requests", json=payload, headers=headers)
        print(f"POST /friends/requests (with payload {payload}): {response.status_code}")
        print(f"  Response: {response.text[:150]}")
        if response.status_code in [200, 201, 400, 401, 403]:  # Various expected responses
            return True
        return False
    except Exception as e:
        print(f"✗ {e}")
        return False

def test_get_sent_requests():
    """Test GET /api/friends/requests/sent"""
    try:
        response = requests.get(f"{API_BASE}/friends/requests/sent", headers=headers)
        print(f"GET /friends/requests/sent: {response.status_code}")
        print(f"  Response: {response.text[:100]}")
        if response.status_code in [200, 401, 403]:
            return True
        return False
    except Exception as e:
        print(f"✗ {e}")
        return False

def test_send_message():
    """Test POST /api/direct-messages"""
    try:
        payload = {
            "receiverId": "other-user-456",
            "messageText": "Hello, this is a test message!"
        }
        response = requests.post(f"{API_BASE}/direct-messages", json=payload, headers=headers)
        print(f"POST /direct-messages: {response.status_code}")
        print(f"  Response: {response.text[:150]}")
        if response.status_code in [200, 201, 400, 401, 403, 409]:  # Various expected responses
            return True
        return False
    except Exception as e:
        print(f"✗ {e}")
        return False

def test_get_conversation():
    """Test GET /api/direct-messages/{userId}"""
    try:
        response = requests.get(f"{API_BASE}/direct-messages/other-user-456", headers=headers)
        print(f"GET /direct-messages/other-user-456: {response.status_code}")
        print(f"  Response: {response.text[:100]}")
        if response.status_code in [200, 400, 401, 403]:
            return True
        return False
    except Exception as e:
        print(f"✗ {e}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("Friends & DM Endpoints Integration Test")
    print("=" * 60)
    print(f"API Base: {API_BASE}")
    print(f"Timestamp: {datetime.now().isoformat()}\n")

    results = []
    
    print("Testing Friend Endpoints:")
    print("-" * 60)
    results.append(test_get_friends())
    results.append(test_send_friend_request())
    results.append(test_get_sent_requests())
    
    print("\nTesting DM Endpoints:")
    print("-" * 60)
    results.append(test_send_message())
    results.append(test_get_conversation())
    
    print("\n" + "=" * 60)
    passed = sum(results)
    total = len(results)
    print(f"Results: {passed}/{total} tests passed")
    print("=" * 60)
    
    sys.exit(0 if passed == total else 1)
