import { ok } from '@/lib/api-response';
import { AUTH_COOKIE_NAME } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = ok({ loggedOut: true });

  response.cookies.set(AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return response;
}
