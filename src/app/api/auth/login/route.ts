import prisma from '@/lib/db';
import { fail, getErrorMessage, ok } from '@/lib/api-response';
import { signAdminToken } from '@/lib/jwt';
import { verifyPassword } from '@/lib/password';
import { AUTH_COOKIE_NAME } from '@/lib/session';

export const dynamic = 'force-dynamic';

const COOKIE_MAX_AGE = 60 * 60 * 24;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const username = typeof body.username === 'string' ? body.username.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!username || !password) {
      return fail('Username and password are required', 400);
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin || !admin.isActive || !verifyPassword(password, admin.password)) {
      return fail('Invalid username or password', 401);
    }

    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });

    const token = await signAdminToken({
      sub: admin.id,
      username: admin.username,
      role: admin.role,
    });

    const response = ok({
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: COOKIE_MAX_AGE,
    });

    return response;
  } catch (error) {
    return fail(getErrorMessage(error), 500);
  }
}
