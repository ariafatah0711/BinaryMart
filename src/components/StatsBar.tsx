interface StatsBarProps {
  productsCount: number;
  categoriesCount: number;
  dbStatus: "connecting" | "connected" | "failed";
}

export default function StatsBar({ productsCount, categoriesCount, dbStatus }: StatsBarProps) {
  return (
    <div className="bg-white border-b tech-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="text-slate-600">{productsCount} Products</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-slate-600">{categoriesCount} Categories</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-violet-500"></span>
          <span className="text-slate-600">BST + QuickSort</span>
        </div>
        <div className="flex items-center gap-2">
          {dbStatus === "connected" && (
            <>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-green-700 font-medium">Neon DB Active</span>
            </>
          )}
          {dbStatus === "connecting" && (
            <>
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
              <span className="text-yellow-600">Connecting...</span>
            </>
          )}
          {dbStatus === "failed" && (
            <>
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="text-red-600">DB Offline</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
