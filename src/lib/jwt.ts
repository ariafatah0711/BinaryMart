export interface AdminTokenPayload {
  sub: string;
  username: string;
  role: string;
}

interface JwtPayload extends AdminTokenPayload {
  exp: number;
}

const encoder = new TextEncoder();

function base64UrlEncode(value: string) {
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), '=');
  return atob(padded);
}

async function getSigningKey(secret: string) {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function signatureToBase64Url(signature: ArrayBuffer) {
  const bytes = new Uint8Array(signature);
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return base64UrlEncode(binary);
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
}

export async function signAdminToken(payload: AdminTokenPayload, expiresInSeconds = 60 * 60 * 24) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const body: JwtPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedBody = base64UrlEncode(JSON.stringify(body));
  const signingInput = `${encodedHeader}.${encodedBody}`;
  const key = await getSigningKey(getJwtSecret());
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(signingInput));

  return `${signingInput}.${signatureToBase64Url(signature)}`;
}

export async function verifyAdminToken(token: string): Promise<AdminTokenPayload | null> {
  const [encodedHeader, encodedBody, encodedSignature] = token.split('.');

  if (!encodedHeader || !encodedBody || !encodedSignature) {
    return null;
  }

  const signingInput = `${encodedHeader}.${encodedBody}`;
  const key = await getSigningKey(getJwtSecret());
  const expectedSignature = base64UrlDecode(encodedSignature);
  const expectedBytes = Uint8Array.from(expectedSignature, (char) => char.charCodeAt(0));
  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    expectedBytes,
    encoder.encode(signingInput)
  );

  if (!isValid) return null;

  const payload = JSON.parse(base64UrlDecode(encodedBody)) as JwtPayload;

  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return {
    sub: payload.sub,
    username: payload.username,
    role: payload.role,
  };
}
