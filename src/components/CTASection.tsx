import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white">Ready to explore the catalog?</h2>
        <p className="text-blue-100 mt-3 text-sm max-w-xl mx-auto">
          Search, filter, and sort through our product database powered by BST indexing and QuickSort.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            href="/catalog"
            className="bg-white text-blue-700 px-6 py-3 text-sm font-bold rounded-lg hover:bg-blue-50 transition-all shadow-lg"
          >
            Open Catalog
          </Link>
          <Link
            href="/algorithms"
            className="bg-blue-500/30 text-white border border-white/20 px-6 py-3 text-sm font-semibold rounded-lg hover:bg-blue-500/40 transition-all"
          >
            Learn About Algorithms
          </Link>
        </div>
      </div>
    </section>
  );
}
