import { cookies } from 'next/headers';
import { verifyAdminToken } from './jwt';

export const AUTH_COOKIE_NAME = 'binarymart_admin_token';

export async function getCurrentAdminToken() {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyAdminToken(token);
}
