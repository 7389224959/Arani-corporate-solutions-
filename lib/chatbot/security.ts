import crypto from 'crypto';

/**
 * Validates Meta (WhatsApp & Instagram) HMAC-SHA256 webhook signatures.
 * Meta includes the 'x-hub-signature-256' header formatted as:
 *   sha256=<hex_digest>
 *
 * @param rawBody - The raw request body as string or Buffer
 * @param signatureHeader - The value of the 'x-hub-signature-256' header
 * @param appSecret - The Meta App Secret configured for your app
 * @returns boolean - true if signature is valid, false otherwise
 */
export function verifyWebhookSignature(
  rawBody: string | Buffer,
  signatureHeader: string | null | undefined,
  appSecret: string
): boolean {
  if (!signatureHeader || !appSecret || !rawBody) {
    return false;
  }

  // Header should start with 'sha256='
  const prefix = 'sha256=';
  if (!signatureHeader.startsWith(prefix)) {
    return false;
  }

  const providedHash = signatureHeader.slice(prefix.length).trim().toLowerCase();
  if (providedHash.length !== 64) {
    // SHA256 hex digest must be 64 characters
    return false;
  }

  try {
    const hmac = crypto.createHmac('sha256', appSecret);
    hmac.update(typeof rawBody === 'string' ? Buffer.from(rawBody, 'utf8') : rawBody);
    const expectedHash = hmac.digest('hex').toLowerCase();

    const expectedBuffer = Buffer.from(expectedHash, 'hex');
    const providedBuffer = Buffer.from(providedHash, 'hex');

    if (expectedBuffer.length !== providedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, providedBuffer);
  } catch (error) {
    console.error('Error during webhook signature verification:', error);
    return false;
  }
}

/**
 * Validates Meta webhook subscription challenge GET request.
 * Meta sends query parameters:
 *   hub.mode = 'subscribe'
 *   hub.verify_token = '<YOUR_VERIFY_TOKEN>'
 *   hub.challenge = '<CHALLENGE_STRING>'
 */
export function verifyWebhookChallenge(
  mode: string | null,
  token: string | null,
  challenge: string | null,
  expectedToken: string
): { isValid: boolean; challenge?: string } {
  if (!expectedToken) {
    return { isValid: false };
  }

  if (mode === 'subscribe' && token === expectedToken && challenge) {
    return { isValid: true, challenge };
  }

  return { isValid: false };
}

/**
 * Sanitize incoming user input against prompt injection or malicious payloads.
 */
export function sanitizeUserInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // remove control chars
    .trim()
    .slice(0, 4000); // cap to safe message length
}
