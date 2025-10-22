import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ProjectForm from '../../components/ProjectForm';

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  // Fetch the project
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!project) {
    notFound();
  }

  // Fetch all clients for the dropdown
  const { data: clients } = await supabase
    .from('users')
    .select('id, email, company_name, contact_person')
    .eq('role', 'client')
    .order('company_name');

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Edit Project</h1>
      <ProjectForm project={project} clients={clients || []} />
    </div>
  );
}
