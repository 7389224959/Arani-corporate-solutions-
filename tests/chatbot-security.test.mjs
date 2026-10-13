import assert from 'node:assert';
import crypto from 'node:crypto';
import {
  verifyWebhookSignature,
  verifyWebhookChallenge,
  sanitizeUserInput,
} from '../lib/chatbot/security.ts';

console.log('--- RUNNING CHATBOT SECURITY TESTS ---');

// TEST 1: Valid HMAC-SHA256 Signature Verification
{
  const secret = 'test_secret_12345';
  const payload = JSON.stringify({ object: 'whatsapp_business_account', test: true });
  const hash = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const signatureHeader = `sha256=${hash}`;

  const isValid = verifyWebhookSignature(payload, signatureHeader, secret);
  assert.strictEqual(isValid, true, 'Valid signature should verify successfully');
  console.log('✔ Test 1 Passed: Valid HMAC-SHA256 signature verifies successfully');
}

// TEST 2: Tampered Payload Rejection
{
  const secret = 'test_secret_12345';
  const originalPayload = JSON.stringify({ message: 'hello' });
  const tamperedPayload = JSON.stringify({ message: 'hello tampered' });
  const hash = crypto.createHmac('sha256', secret).update(originalPayload).digest('hex');
  const signatureHeader = `sha256=${hash}`;

  const isValid = verifyWebhookSignature(tamperedPayload, signatureHeader, secret);
  assert.strictEqual(isValid, false, 'Tampered payload must be rejected');
  console.log('✔ Test 2 Passed: Tampered payload is rejected');
}

// TEST 3: Wrong Secret Rejection
{
  const secret = 'test_secret_12345';
  const wrongSecret = 'wrong_secret_99999';
  const payload = 'some raw body text';
  const hash = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const signatureHeader = `sha256=${hash}`;

  const isValid = verifyWebhookSignature(payload, signatureHeader, wrongSecret);
  assert.strictEqual(isValid, false, 'Wrong secret must be rejected');
  console.log('✔ Test 3 Passed: Wrong secret is rejected');
}

// TEST 4: Malformed or Missing Signature Header
{
  const secret = 'test_secret_12345';
  const payload = 'body';

  assert.strictEqual(verifyWebhookSignature(payload, null, secret), false);
  assert.strictEqual(verifyWebhookSignature(payload, undefined, secret), false);
  assert.strictEqual(verifyWebhookSignature(payload, '', secret), false);
  assert.strictEqual(verifyWebhookSignature(payload, 'sha1=12345', secret), false);
  assert.strictEqual(verifyWebhookSignature(payload, 'sha256=invalidlength', secret), false);
  console.log('✔ Test 4 Passed: Malformed or missing headers handled safely');
}

// TEST 5: Meta Webhook Challenge Verification
{
  const expectedToken = 'aranii_meta_webhook_verify_token_2026';
  const challenge = 'random_challenge_code_12345';

  const valid = verifyWebhookChallenge('subscribe', expectedToken, challenge, expectedToken);
  assert.strictEqual(valid.isValid, true);
  assert.strictEqual(valid.challenge, challenge);

  const invalidMode = verifyWebhookChallenge('unsubscribe', expectedToken, challenge, expectedToken);
  assert.strictEqual(invalidMode.isValid, false);

  const invalidToken = verifyWebhookChallenge('subscribe', 'wrong_token', challenge, expectedToken);
  assert.strictEqual(invalidToken.isValid, false);
  console.log('✔ Test 5 Passed: Meta Webhook Challenge verification works accurately');
}

// TEST 6: User Input Sanitization
{
  const dirty = 'Hello\u0000World\u0007! Looking for job';
  const clean = sanitizeUserInput(dirty);
  assert.strictEqual(clean.includes('\u0000'), false);
  assert.strictEqual(clean.includes('\u0007'), false);
  assert.strictEqual(clean, 'HelloWorld! Looking for job');
  console.log('✔ Test 6 Passed: User input sanitization cleans control characters');
}

console.log('All chatbot security tests passed successfully!\n');
