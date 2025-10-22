'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Project, ProjectStatus, ChecklistItem, User } from '@/types/database';
import { Plus, X, Save, Trash2 } from 'lucide-react';

interface ProjectFormProps {
  project?: Project;
  clients: Pick<User, 'id' | 'email' | 'company_name' | 'contact_person'>[];
}

export default function ProjectForm({ project, clients }: ProjectFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({
    client_id: project?.client_id || '',
    project_name: project?.project_name || '',
    description: project?.description || '',
    status: project?.status || 'discovery' as ProjectStatus,
    start_date: project?.start_date || '',
    end_date: project?.end_date || '',
    progress_percentage: project?.progress_percentage || 0,
    preview_url: project?.preview_url || '',
    next_action: project?.next_action || '',
  });

  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    project?.checklist || []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = {
        ...formData,
        checklist,
        progress_percentage: Number(formData.progress_percentage),
      };

      if (project) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(data)
          .eq('id', project.id);

        if (error) throw error;
      } else {
        // Create new project
        const { error } = await supabase
          .from('projects')
          .insert([data]);

        if (error) throw error;
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!project) return;
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;

    setDeleting(true);

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id);

      if (error) throw error;

      router.push('/admin/projects');
      router.refresh();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const addChecklistItem = () => {
    setChecklist([
      ...checklist,
      {
        id: crypto.randomUUID(),
        title: '',
        completed: false,
        created_at: new Date().toISOString(),
      },
    ]);
  };

  const updateChecklistItem = (id: string, updates: Partial<ChecklistItem>) => {
    setChecklist(checklist.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeChecklistItem = (id: string) => {
    setChecklist(checklist.filter(item => item.id !== id));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 space-y-6">
        {/* Client Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Client *
          </label>
          <select
            required
            value={formData.client_id}
            onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id} className="bg-slate-800">
                {client.company_name || client.contact_person || client.email}
              </option>
            ))}
          </select>
        </div>

        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Project Name *
          </label>
          <input
            type="text"
            required
            value={formData.project_name}
            onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project description"
          />
        </div>

        {/* Status and Progress */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Status *
            </label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="discovery" className="bg-slate-800">Discovery</option>
              <option value="design" className="bg-slate-800">Design</option>
              <option value="development" className="bg-slate-800">Development</option>
              <option value="review" className="bg-slate-800">Review</option>
              <option value="completed" className="bg-slate-800">Completed</option>
              <option value="blocked" className="bg-slate-800">Blocked</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Progress Percentage *
            </label>
            <input
              type="number"
              required
              min="0"
              max="100"
              value={formData.progress_percentage}
              onChange={(e) => setFormData({ ...formData, progress_percentage: Number(e.target.value) })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Preview URL */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Preview URL
          </label>
          <input
            type="url"
            value={formData.preview_url}
            onChange={(e) => setFormData({ ...formData, preview_url: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://preview.example.com"
          />
        </div>

        {/* Next Action */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Next Action
          </label>
          <textarea
            value={formData.next_action}
            onChange={(e) => setFormData({ ...formData, next_action: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the next action or blocker"
          />
        </div>

        {/* Checklist */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-slate-300">
              Checklist
            </label>
            <button
              type="button"
              onClick={addChecklistItem}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>

          <div className="space-y-2">
            {checklist.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={(e) => updateChecklistItem(item.id, { completed: e.target.checked })}
                  className="w-5 h-5 rounded border-white/20 bg-white/10"
                />
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateChecklistItem(item.id, { title: e.target.value })}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Task description"
                />
                <button
                  type="button"
                  onClick={() => removeChecklistItem(item.id)}
                  className="p-2 hover:bg-white/10 text-red-400 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            {project && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                {deleting ? 'Deleting...' : 'Delete Project'}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
