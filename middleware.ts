import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/session';

const protectedProductMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function isProtectedRequest(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/admin/login') return false;
  if (pathname.startsWith('/admin')) return true;
  if (pathname.startsWith('/api/admin')) return true;
  if (!pathname.startsWith('/api/products')) return false;
  return protectedProductMethods.has(request.method);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (pathname === '/admin/login') {
    if (token) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (pathname === '/admin') {
    if (token) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (!isProtectedRequest(request)) {
    return NextResponse.next();
  }

  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
