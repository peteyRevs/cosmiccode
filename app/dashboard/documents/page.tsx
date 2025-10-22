import { createClient } from '@/lib/supabase/server';
import DocumentsList from '../components/DocumentsList';

export default async function DocumentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [docsResponse, projectsResponse] = await Promise.all([
    supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('projects')
      .select('*')
      .eq('client_id', user.id)
      .order('created_at', { ascending: false })
  ]);

  return (
    <DocumentsList
      initialDocuments={docsResponse.data || []}
      projects={projectsResponse.data || []}
    />
  );
}
