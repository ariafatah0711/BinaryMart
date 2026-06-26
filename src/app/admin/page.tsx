import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/lib/session';
import { verifyAdminToken } from '@/lib/jwt';

export default async function AdminRoot() {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;

  if (token) {
    const payload = await verifyAdminToken(token).catch(() => null);
    if (payload) {
      redirect('/admin/dashboard');
    }
  }

  redirect('/admin/login');
}
