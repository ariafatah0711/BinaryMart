import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/lib/session';
import { verifyAdminToken } from '@/lib/jwt';
import Sidebar from "@/components/admin/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    redirect('/admin/login');
  }

  const payload = await verifyAdminToken(token).catch(() => null);

  if (!payload) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
