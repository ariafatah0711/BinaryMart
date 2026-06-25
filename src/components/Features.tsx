export default function Features() {
  return (
    <section id="features">
      {    <section id="features" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b tech-border">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl font-bold tracking-tight text-[#0c0c0e]">Core Computational Mechanics</h2>
          <p className="text-sm text-[#3b3d45]">Our tech stack directly maps data structure nodes to your screen.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-[6px] border tech-border shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-[6px] bg-[#1060ff]/10 flex items-center justify-center text-[#1060ff]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-bold text-[#0c0c0e]">Dual BST Search Index</h3>
              <p className="text-xs text-[#3b3d45] leading-relaxed">
                Segregated tree indexing allows O(log n) searches on products by direct Name strings and category clusters concurrently.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-[6px] border tech-border shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-[6px] bg-[#1060ff]/10 flex items-center justify-center text-[#1060ff]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </div>
              <h3 className="font-bold text-[#0c0c0e]">Median-of-Three QuickSort</h3>
              <p className="text-xs text-[#3b3d45] leading-relaxed">
                Optimized in-place pivot selector prevents worst-case complexity and sorts pricing, ratings and popularity instantly.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-[6px] border tech-border shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-[6px] bg-[#1060ff]/10 flex items-center justify-center text-[#1060ff]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="font-bold text-[#0c0c0e]">Neon PostgreSQL + Prisma</h3>
              <p className="text-xs text-[#3b3d45] leading-relaxed">
                Relational schema mapped with Prisma Client. Complete ACID transactions synchronized with in-memory indexes.
              </p>
            </div>
          </div>
        </div>
      </section>
}
    </section>
  );
}