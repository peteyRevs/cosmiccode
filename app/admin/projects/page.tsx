import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import { Project, User } from '@/types/database';

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  // Fetch all projects with client info
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  // Fetch all clients
  const { data: clients } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'client');

  // Create a map of client IDs to client names
  const clientMap = new Map(
    (clients || []).map((client: User) => [
      client.id,
      client.company_name || client.contact_person || client.email || 'Unknown',
    ])
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-slate-300">Manage all client projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-semibold text-slate-300">Project Name</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-300">Client</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-300">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-300">Progress</th>
                <th className="text-left p-4 text-sm font-semibold text-slate-300">Created</th>
                <th className="text-right p-4 text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project: Project) => (
                <tr key={project.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white font-medium">{project.project_name}</td>
                  <td className="p-4 text-slate-300">{clientMap.get(project.client_id) || 'Unknown'}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : project.status === 'development'
                          ? 'bg-blue-500/20 text-blue-400'
                          : project.status === 'design'
                          ? 'bg-purple-500/20 text-purple-400'
                          : project.status === 'review'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : project.status === 'blocked'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-slate-500/20 text-slate-400'
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">{project.progress_percentage}%</td>
                  <td className="p-4 text-slate-400 text-sm">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 text-center">
          <p className="text-slate-400 text-lg">No projects yet</p>
          <p className="text-slate-500 text-sm mt-2 mb-4">
            Create your first project to get started
          </p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>
      )}
    </div>
  );
}
