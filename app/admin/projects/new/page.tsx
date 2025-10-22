import { createClient } from '@/lib/supabase/server';
import ProjectForm from '../../components/ProjectForm';

export default async function NewProjectPage() {
  const supabase = await createClient();

  // Fetch all clients for the dropdown
  const { data: clients } = await supabase
    .from('users')
    .select('id, email, company_name, contact_person')
    .eq('role', 'client')
    .order('company_name');

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Create New Project</h1>
      <ProjectForm clients={clients || []} />
    </div>
  );
}
