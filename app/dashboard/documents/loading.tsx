export default function DocumentsLoading() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-white">Documents</h1>
          <div className="h-10 w-32 bg-white/20 rounded-lg animate-pulse" />
        </div>
        <p className="text-slate-300 mb-6">Access your project files and deliverables</p>

        {/* Search skeleton */}
        <div className="relative mb-6 animate-pulse">
          <div className="h-12 bg-white/10 border border-white/20 rounded-xl" />
        </div>
      </div>

      {/* Documents List Skeleton */}
      <div className="grid gap-4">
        {[1, 2, 3, 4].map((i) => (
          <DocumentCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function DocumentCardSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 animate-pulse">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="p-3 rounded-lg bg-white/20 flex-shrink-0">
          <div className="w-6 h-6 bg-white/20 rounded" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* File name */}
          <div className="h-6 bg-white/20 rounded w-2/3 mb-2" />
          {/* Description */}
          <div className="h-4 bg-white/10 rounded w-full mb-1" />
          <div className="h-4 bg-white/10 rounded w-3/4 mb-4" />

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 w-24 bg-white/10 rounded" />
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-20 bg-white/10 rounded-lg" />
            <div className="h-10 w-28 bg-white/10 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
