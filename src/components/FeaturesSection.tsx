import Link from "next/link";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900">Core Algorithms</h2>
          <p className="text-slate-500 mt-3 text-sm">Two fundamental data structures powering every product search and sort operation.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Binary Search Tree</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Products are indexed in a BST by name and category, enabling O(log n) search complexity.
              Inorder traversal returns alphabetically sorted results instantly.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">QuickSort</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Products are sorted using the QuickSort algorithm with configurable order. Sort by price, rating,
              popularity, or name in ascending or descending order.
            </p>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link href="/algorithms" className="text-blue-600 font-medium text-sm hover:underline">
            View Technical Details &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
