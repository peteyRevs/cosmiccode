import { createClient } from '@/lib/supabase/server';
import MessagesList from '../components/MessagesList';

export default async function MessagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [projectsResponse, messagesResponse] = await Promise.all([
    supabase
      .from('projects')
      .select('*')
      .eq('client_id', user.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
  ]);

  return (
    <MessagesList
      initialProjects={projectsResponse.data || []}
      initialMessages={messagesResponse.data || []}
      currentUserId={user.id}
    />
  );
}
