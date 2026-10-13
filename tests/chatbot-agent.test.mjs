import assert from 'node:assert';
import { generateFallbackResponse } from '../lib/chatbot/agent.ts';
import { parseWhatsAppWebhook, parseInstagramWebhook } from '../lib/chatbot/webhook.ts';
import {
  getOrCreateChatSession,
  saveChatMessage,
  getChatHistory,
} from '../lib/chatbot/db.ts';

console.log('--- RUNNING CHATBOT AGENT & WEBHOOK TESTS ---');

// TEST 1: Fallback Agent Human Hand-off Detection
{
  const res = generateFallbackResponse('I want to speak with a human recruiter please');
  assert.strictEqual(res.humanHandoffRequested, true, 'Should detect human handoff');
  assert.ok(res.replyText.includes('Senior Talent Consultant'), 'Should confirm consultant handoff');
  console.log('✔ Test 1 Passed: Human hand-off detection triggers successfully');
}

// TEST 2: Candidate Lead Extraction & Banking Response
{
  const candidateMsg = 'Hi, I have 3 years experience as Credit Analyst. My phone is 9876543210 and email rahul@bank.com';
  const res = generateFallbackResponse(candidateMsg);
  
  assert.ok(res.extractedLead, 'Should extract candidate lead');
  assert.strictEqual(res.extractedLead.leadType, 'candidate');
  assert.strictEqual(res.extractedLead.phone, '9876543210');
  assert.strictEqual(res.extractedLead.email, 'rahul@bank.com');
  assert.ok(res.buttons.length > 0, 'Should return quick action buttons');
  console.log('✔ Test 2 Passed: Candidate lead and contact extraction works');
}

// TEST 3: Employer Intent Extraction
{
  const employerMsg = 'We need to hire 10 Branch Relationship Managers for our private bank. Urgent requirement. Call 9811223344';
  const res = generateFallbackResponse(employerMsg);

  assert.ok(res.extractedLead, 'Should extract employer lead');
  assert.strictEqual(res.extractedLead.leadType, 'employer');
  assert.strictEqual(res.extractedLead.urgency, 'Immediate');
  assert.strictEqual(res.extractedLead.phone, '9811223344');
  console.log('✔ Test 3 Passed: Employer intent and vacancy requirement detected');
}

// TEST 4: Career Counselling Intent
{
  const counselMsg = 'I want career counselling for banking careers. Contact 9988776655';
  const res = generateFallbackResponse(counselMsg);

  assert.ok(res.extractedLead, 'Should extract counselling lead');
  assert.strictEqual(res.extractedLead.leadType, 'counselling');
  assert.ok(res.replyText.toLowerCase().includes('counselling'));
  console.log('✔ Test 4 Passed: Career counselling booking intent handled');
}

// TEST 5: WhatsApp Webhook Payload Parser
{
  const waPayload = {
    object: 'whatsapp_business_account',
    entry: [
      {
        id: 'WHATSAPP_BUSINESS_ACCOUNT_ID',
        changes: [
          {
            value: {
              messaging_product: 'whatsapp',
              metadata: { display_phone_number: '15550234567', phone_number_id: '123456789' },
              contacts: [{ profile: { name: 'Aarav Mehta' }, wa_id: '919876543210' }],
              messages: [
                {
                  from: '919876543210',
                  id: 'wamid.HBgLMTE5ODc2NTQzMjEwFQIAEhgWM0VCNTAw',
                  timestamp: '1728345600',
                  text: { body: 'Interested in Wealth Management roles' },
                  type: 'text',
                },
              ],
            },
            field: 'messages',
          },
        ],
      },
    ],
  };

  const parsed = parseWhatsAppWebhook(waPayload);
  assert.strictEqual(parsed.length, 1);
  assert.strictEqual(parsed[0].channel, 'whatsapp');
  assert.strictEqual(parsed[0].senderId, '919876543210');
  assert.strictEqual(parsed[0].userName, 'Aarav Mehta');
  assert.strictEqual(parsed[0].text, 'Interested in Wealth Management roles');
  console.log('✔ Test 5 Passed: WhatsApp webhook payload parsed successfully');
}

// TEST 6: Instagram Webhook Payload Parser
{
  const igPayload = {
    object: 'instagram',
    entry: [
      {
        id: 'PAGE_ID_123',
        time: 1728345600,
        messaging: [
          {
            sender: { id: 'IG_USER_9988' },
            recipient: { id: 'PAGE_ID_123' },
            timestamp: 1728345600000,
            message: {
              mid: 'm_mid_ig_12345',
              text: 'Are you hiring freshers for banking operations?',
            },
          },
        ],
      },
    ],
  };

  const parsed = parseInstagramWebhook(igPayload);
  assert.strictEqual(parsed.length, 1);
  assert.strictEqual(parsed[0].channel, 'instagram');
  assert.strictEqual(parsed[0].senderId, 'IG_USER_9988');
  assert.strictEqual(parsed[0].text, 'Are you hiring freshers for banking operations?');
  console.log('✔ Test 6 Passed: Instagram webhook payload parsed successfully');
}

// TEST 7: DB Session & Message Store
{
  const session = await getOrCreateChatSession('whatsapp', '+919999988888', 'Test Candidate');
  assert.ok(session.id);
  assert.strictEqual(session.channel_user_id, '+919999988888');

  const msg = await saveChatMessage({
    sessionId: session.id,
    sender: 'user',
    channel: 'whatsapp',
    content: 'Testing message persistence',
  });
  assert.ok(msg.id);
  assert.strictEqual(msg.content, 'Testing message persistence');

  const history = await getChatHistory(session.id);
  assert.ok(history.length >= 1);
  console.log('✔ Test 7 Passed: DB Session and message operations succeed');
}

console.log('All chatbot agent & webhook tests passed successfully!\n');
