import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/session';
import { verifyAdminToken } from '@/lib/jwt';

const protectedProductMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function isProtectedRequest(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) return true;
  if (!pathname.startsWith('/api/products')) return false;

  return protectedProductMethods.has(request.method);
}

export async function middleware(request: NextRequest) {
  if (!isProtectedRequest(request)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const payload = token ? await verifyAdminToken(token) : null;

  if (!payload) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/products/:path*'],
};
