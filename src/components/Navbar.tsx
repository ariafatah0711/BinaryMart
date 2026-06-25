export default function Navbar() {
  return (
    <nav className="tech-border bg-white/90 backdrop-blur sticky top-0 z-50 border-t-0 border-x-0 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        { <nav className="tech-border bg-white/90 backdrop-blur sticky top-0 z-50 border-t-0 border-x-0 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Custom SVG Logo inspired by Helios / HashiCorp */}
            <svg className="w-6 h-6 text-[#1060ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
            <span className="font-bold text-lg tracking-tight text-[#0c0c0e]">
              BINARY<span className="text-[#1060ff]">MART</span>
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium text-[#3b3d45] hover:text-[#1060ff] transition-all">Features</a>
            <a href="#database" className="text-sm font-medium text-[#3b3d45] hover:text-[#1060ff] transition-all">Database Status</a>
            <a href="#catalog" className="text-sm font-medium text-[#3b3d45] hover:text-[#1060ff] transition-all">Products</a>
            <a 
              href="/catalog" 
              className="bg-[#1060ff] hover:bg-[#0c56e9] text-white px-4 py-2 text-xs font-semibold rounded-[6px] transition-all shadow-sm flex items-center space-x-2"
            >
              <span>Explore Catalog</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </nav>}

      </div>
    </nav>
  );
}