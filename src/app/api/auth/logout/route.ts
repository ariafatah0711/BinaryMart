import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/session';

export const dynamic = 'force-dynamic';

function makeLogoutRedirect(request: NextRequest) {
  const url = new URL('/admin/login', request.url);
  const response = NextResponse.redirect(url);
  response.cookies.set(AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  return response;
}

export async function GET(request: NextRequest) {
  return makeLogoutRedirect(request);
}

export async function POST(request: NextRequest) {
  return makeLogoutRedirect(request);
}
