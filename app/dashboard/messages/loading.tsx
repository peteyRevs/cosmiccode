export default function MessagesLoading() {
  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
        <p className="text-slate-300">Communicate with your project team</p>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex gap-4 min-h-0 animate-pulse">
        {/* Project Sidebar Skeleton */}
        <div className="w-64 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4">
          <div className="h-4 w-20 bg-white/20 rounded mb-3" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 rounded-lg bg-white/5">
                <div className="h-5 bg-white/20 rounded w-3/4 mb-2" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* Messages Area Skeleton */}
        <div className="flex-1 flex flex-col bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 min-w-0">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10">
            <div className="h-6 bg-white/20 rounded w-1/3 mb-2" />
            <div className="h-4 bg-white/10 rounded w-1/2" />
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Message bubbles */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    i % 2 === 0 ? 'bg-blue-500/20' : 'bg-white/10'
                  }`}
                >
                  <div className="h-4 bg-white/20 rounded w-48 mb-2" />
                  <div className="h-4 bg-white/20 rounded w-32 mb-2" />
                  <div className="h-3 bg-white/10 rounded w-24" />
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-3 w-11 h-11 bg-white/10 rounded-lg" />
              <div className="flex-1 h-12 bg-white/10 rounded-xl" />
              <div className="p-3 w-11 h-11 bg-blue-500/20 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
