import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { User } from '@/types/database';

export const metadata: Metadata = {
  title: "Admin Dashboard | Cosmic Code",
  description: "Manage clients, projects, invoices, and support tickets.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect('/login');
  }

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .single();

  // Check if user is admin
  if ((user as User)?.role !== 'admin') {
    redirect('/dashboard/projects');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      {/* Admin Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <nav className="flex items-center gap-4">
                <Link
                  href="/admin/projects"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Projects
                </Link>
                <Link
                  href="/admin/clients"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Clients
                </Link>
                <Link
                  href="/admin/invoices"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Invoices
                </Link>
              </nav>
            </div>
            <div className="text-sm text-slate-400">
              Admin: {(user as User)?.email}
            </div>
          </div>
        </div>
      </header>

      <main className="p-8">
        {children}
      </main>
    </div>
  );
}
