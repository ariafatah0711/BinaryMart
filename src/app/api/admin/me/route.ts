import prisma from '@/lib/db';
import { fail, ok } from '@/lib/api-response';
import { getCurrentAdminToken } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET() {
  const token = await getCurrentAdminToken();

  if (!token) {
    return fail('Unauthorized', 401);
  }

  const admin = await prisma.admin.findUnique({
    where: { id: token.sub },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      lastLoginAt: true,
    },
  });

  if (!admin || !admin.isActive) {
    return fail('Unauthorized', 401);
  }

  return ok({ admin });
}
