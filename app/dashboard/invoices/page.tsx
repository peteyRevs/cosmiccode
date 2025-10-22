import { createClient } from '@/lib/supabase/server';
import InvoiceList from '../components/InvoiceList';

export default async function InvoicesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: invoices } = await supabase
    .from('invoices')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false });

  return <InvoiceList invoices={invoices || []} />;
}
