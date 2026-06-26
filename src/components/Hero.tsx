export default function Hero() {
  return (
    <header className="relative bg-white border-b tech-border overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#1060ff]/10 text-[#1060ff] text-xs font-semibold px-3 py-1 rounded-full border border-[#1060ff]/20">
            <span>SDA Final Project</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1060ff] animate-pulse"></span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0c0c0e] leading-tight">
            Enterprise Catalog Optimized with <span className="text-[#1060ff]">BST & Quick Sort</span>
          </h1>
          <p className="text-base text-[#3b3d45] max-w-xl leading-relaxed">
            BinaryMart implements high-performance Binary Search Trees for immediate category/name lookups and robust in-place Quick Sort algorithms for real-time price and popularity sequencing.
          </p>
          <div className="flex items-center space-x-4">
            <a 
              href="#catalog" 
              className="bg-[#1060ff] hover:bg-[#0c56e9] text-white px-5 py-3 text-sm font-semibold rounded-[6px] transition-all shadow-md flex items-center space-x-2"
            >
              <span>View Products</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a 
              href="#database" 
              className="bg-white hover:bg-gray-50 border tech-border text-[#3b3d45] px-5 py-3 text-sm font-semibold rounded-[6px] transition-all shadow-sm"
            >
              Check DB Connection
            </a>
          </div>
        </div>
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="w-80 h-80 rounded-[6px] tech-border bg-gray-50 p-6 flex flex-col justify-between shadow-lg relative">
            <div className="absolute top-0 right-0 p-3 flex space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e52228]/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#008a22]/80"></span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-[#1060ff]">ROOT_NODE</span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>
              <div className="bg-white p-3 rounded-[6px] border tech-border shadow-sm">
                <div className="text-xs font-semibold text-[#0c0c0e]">BST Inorder Sequence</div>
                <div className="text-[10px] font-mono text-[#3b3d45] mt-1">Left {"->"} Root {"->"} Right</div>
              </div>
            </div>
            <div className="h-28 flex items-end justify-between space-x-2 bg-white/50 p-2 rounded-[6px] border tech-border">
              <div className="w-full bg-[#1060ff]/30 h-1/3 rounded-[3px]"></div>
              <div className="w-full bg-[#1060ff]/60 h-2/3 rounded-[3px]"></div>
              <div className="w-full bg-[#1060ff] h-full rounded-[3px]"></div>
              <div className="w-full bg-[#1060ff]/80 h-3/4 rounded-[3px]"></div>
              <div className="w-full bg-[#1060ff]/40 h-1/2 rounded-[3px]"></div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-gray-400">QUICKSORT_ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}