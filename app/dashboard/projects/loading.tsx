export default function ProjectsLoading() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
        <p className="text-slate-300">View and track all your projects</p>
      </div>

      <div className="grid gap-6">
        {[1, 2, 3].map((i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Project name */}
          <div className="h-8 bg-white/20 rounded-lg w-1/3 mb-2" />
          {/* Description */}
          <div className="h-4 bg-white/10 rounded w-2/3 mb-2" />
          <div className="h-4 bg-white/10 rounded w-1/2" />
        </div>
        {/* Status badge */}
        <div className="h-10 w-24 bg-white/20 rounded-full ml-4" />
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 w-16 bg-white/10 rounded" />
          <div className="h-4 w-10 bg-white/20 rounded" />
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div className="bg-white/20 h-3 rounded-full w-1/2" />
        </div>
      </div>

      {/* Project Details */}
      <div className="flex items-center gap-6 mb-4">
        <div className="h-4 w-32 bg-white/10 rounded" />
        <div className="h-4 w-32 bg-white/10 rounded" />
        <div className="h-4 w-32 bg-white/10 rounded" />
      </div>

      {/* Next Action */}
      <div className="mb-4 p-4 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 bg-white/20 rounded-full mt-0.5" />
          <div className="flex-1">
            <div className="h-4 bg-white/20 rounded w-24 mb-2" />
            <div className="h-4 bg-white/10 rounded w-full mb-1" />
            <div className="h-4 bg-white/10 rounded w-3/4" />
          </div>
        </div>
      </div>

      {/* Preview Link */}
      <div className="mb-4">
        <div className="h-10 w-32 bg-white/10 rounded-lg" />
      </div>

      {/* Checklist */}
      <div className="border-t border-white/10 pt-4">
        <div className="h-4 w-16 bg-white/20 rounded mb-3" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded border-2 border-white/20" />
              <div className="h-4 bg-white/10 rounded flex-1" />
            </div>
          ))}
        </div>
        <div className="mt-3 h-3 w-40 bg-white/10 rounded" />
      </div>
    </div>
  );
}
