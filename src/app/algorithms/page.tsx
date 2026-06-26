import Link from 'next/link';

export default function AlgorithmsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-sm text-slate-900">
            BINARY<span className="text-blue-600">MART</span>
          </Link>
          <Link href="/catalog" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
            &larr; Back to Catalog
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Algorithms Behind BinaryMart
        </h1>
        <p className="text-slate-500 mt-3 text-lg">
          How BST and QuickSort power the product catalog search and sort operations.
        </p>

        {/* BST */}
        <section className="mt-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Binary Search Tree</h2>
              <p className="text-sm text-slate-500">File: <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs">src/lib/algorithms/bst.ts</code></p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              The BST stores products keyed by their lowercase name. Insertion maintains the BST property:
              left child <span className="font-mono text-xs">&lt;</span> parent <span className="font-mono text-xs">&lt;</span> right child.
              Search performs an inorder traversal, collecting any product whose name, category, or brand
              contains the search term.
            </p>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 text-xs font-mono overflow-x-auto">
              <pre>{`class TreeNode<T> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  constructor(public key: string, public product: T) {}
}

class ProductSearchTree<T> {
  insert(product: T) { /* BST insert by name */ }
  search(term: string): T[] {
    /* inorder traversal, collects matches */
  }
}`}</pre>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-800 text-xs uppercase tracking-wider">Best Case</p>
                <p className="text-green-700 text-lg font-bold mt-1">O(log n)</p>
                <p className="text-green-600 text-xs mt-0.5">Balanced tree</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-semibold text-red-800 text-xs uppercase tracking-wider">Worst Case</p>
                <p className="text-red-700 text-lg font-bold mt-1">O(n)</p>
                <p className="text-red-600 text-xs mt-0.5">Skewed tree</p>
              </div>
            </div>
          </div>
        </section>

        {/* QuickSort */}
        <section className="mt-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">QuickSort</h2>
              <p className="text-sm text-slate-500">File: <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs">src/lib/algorithms/quicksort.ts</code></p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              The QuickSort implementation uses the first element as pivot. Elements are partitioned into
              lower and higher arrays, then recursively sorted. A <code className="bg-slate-100 px-1 rounded text-xs">withOrder</code> wrapper
              supports ascending/descending sort by swapping the comparator.
            </p>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 text-xs font-mono overflow-x-auto">
              <pre>{`function quickSort<T>(
  items: T[],
  compare: (a: T, b: T) => number
): T[] {
  if (items.length <= 1) return items;
  const [pivot, ...rest] = items;
  const lower = rest.filter(x => compare(x, pivot) < 0);
  const higher = rest.filter(x => compare(x, pivot) >= 0);
  return [
    ...quickSort(lower, compare),
    pivot,
    ...quickSort(higher, compare),
  ];
}`}</pre>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-800 text-xs uppercase tracking-wider">Best / Average</p>
                <p className="text-green-700 text-lg font-bold mt-1">O(n log n)</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-semibold text-red-800 text-xs uppercase tracking-wider">Worst Case</p>
                <p className="text-red-700 text-lg font-bold mt-1">O(n²)</p>
                <p className="text-red-600 text-xs mt-0.5">Already sorted</p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="mt-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">System Architecture</h2>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-8">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Frontend</p>
                <p className="font-bold text-slate-900 mt-1">Next.js 14</p>
                <p className="text-xs text-slate-500">App Router + Tailwind</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">API Layer</p>
                <p className="font-bold text-slate-900 mt-1">Route Handlers</p>
                <p className="text-xs text-slate-500">BST + QuickSort</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Database</p>
                <p className="font-bold text-slate-900 mt-1">Neon PostgreSQL</p>
                <p className="text-xs text-slate-500">Prisma ORM</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-semibold rounded-lg transition-all shadow-lg"
          >
            Try the Catalog
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
