import { createClient } from '@/lib/supabase/server';
import SupportList from '../components/SupportList';

export default async function SupportPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [ticketsResponse, projectsResponse] = await Promise.all([
    supabase
      .from('support_tickets')
      .select('*')
      .eq('client_id', user.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('projects')
      .select('*')
      .eq('client_id', user.id)
      .order('created_at', { ascending: false })
  ]);

  return (
    <SupportList
      tickets={ticketsResponse.data || []}
      projects={projectsResponse.data || []}
      clientId={user.id}
    />
  );
}
