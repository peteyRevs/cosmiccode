export default function SupportLoading() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-white">Support</h1>
          <div className="h-10 w-32 bg-white/20 rounded-lg animate-pulse" />
        </div>
        <p className="text-slate-300 mb-6">Get help and submit support tickets</p>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 animate-pulse">
              <div className="h-4 w-24 bg-white/10 rounded mb-2" />
              <div className="h-8 w-16 bg-white/20 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Tickets List Skeleton */}
      <div className="space-y-6">
        {/* Active Tickets Section */}
        <div>
          <div className="flex items-center gap-2 mb-4 animate-pulse">
            <div className="w-5 h-5 bg-white/20 rounded-full" />
            <div className="h-6 w-48 bg-white/20 rounded" />
          </div>
          <div className="grid gap-4">
            {[1, 2].map((i) => (
              <TicketCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Resolved Tickets Section */}
        <div>
          <div className="flex items-center gap-2 mb-4 animate-pulse">
            <div className="w-5 h-5 bg-white/20 rounded-full" />
            <div className="h-6 w-48 bg-white/20 rounded" />
          </div>
          <div className="grid gap-4">
            {[1].map((i) => (
              <TicketCardSkeleton key={i} resolved />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TicketCardSkeleton({ resolved = false }: { resolved?: boolean }) {
  return (
    <div
      className={`backdrop-blur-xl rounded-xl p-6 border animate-pulse ${
        resolved
          ? 'bg-white/5 border-white/10 opacity-75'
          : 'bg-white/10 border-white/20'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Subject */}
          <div className="h-6 bg-white/20 rounded w-2/3 mb-2" />
          {/* Project name */}
          <div className="h-4 bg-white/10 rounded w-1/3" />
        </div>
        {/* Badges */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          {!resolved && (
            <div className="h-6 w-16 bg-white/20 rounded-full" />
          )}
          <div className="h-6 w-20 bg-white/20 rounded-full" />
        </div>
      </div>

      {/* Description */}
      <div className="mb-4 space-y-2">
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-5/6" />
        <div className="h-4 bg-white/10 rounded w-4/6" />
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
        <div className="h-4 w-32 bg-white/10 rounded" />
        {!resolved && (
          <div className="h-4 w-40 bg-white/10 rounded" />
        )}
      </div>
    </div>
  );
}
