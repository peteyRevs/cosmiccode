export default function InvoicesLoading() {
  return (
    <>
      {/* Header with Summary Stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Invoices</h1>
        <p className="text-slate-300 mb-6">Track payments and billing history</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 animate-pulse">
              <div className="h-4 w-32 bg-white/10 rounded mb-2" />
              <div className="h-8 w-24 bg-white/20 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Invoices List Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <InvoiceCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}

function InvoiceCardSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Invoice number */}
          <div className="h-6 bg-white/20 rounded w-32 mb-2" />
          {/* Project name */}
          <div className="h-4 bg-white/10 rounded w-48" />
        </div>
        {/* Status badge */}
        <div className="h-8 w-20 bg-white/20 rounded-full ml-4" />
      </div>

      {/* Amount and dates */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div className="h-3 w-16 bg-white/10 rounded mb-2" />
            <div className="h-5 bg-white/20 rounded w-24" />
          </div>
        ))}
      </div>

      {/* Line Items */}
      <div className="border-t border-white/10 pt-4">
        <div className="h-4 w-24 bg-white/20 rounded mb-3" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-4 bg-white/10 rounded flex-1 mr-4" />
              <div className="h-4 w-20 bg-white/20 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Action button */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="h-10 w-32 bg-white/10 rounded-lg" />
      </div>
    </div>
  );
}
