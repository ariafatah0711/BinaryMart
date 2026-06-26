import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            <span>SDA Final Project — BST & QuickSort</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Enterprise Product Catalog
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mt-4 max-w-2xl leading-relaxed">
            BinaryMart implements <span className="text-blue-400 font-semibold">Binary Search Trees</span> for instant
            product lookups and <span className="text-blue-400 font-semibold">QuickSort</span> for real-time sorting
            — all powered by Neon PostgreSQL.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link
              href="/catalog"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 text-sm font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2"
            >
              Browse Catalog
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/algorithms"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 text-sm font-semibold rounded-lg transition-all"
            >
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
