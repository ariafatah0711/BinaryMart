export default function Footer() {
  return (
    <footer className="bg-white border-t tech-border py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-[#1060ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            <span className="font-bold text-base tracking-tight text-[#0c0c0e]">BINARYMART</span>
          </div>
          <p className="text-[11px] text-[#3b3d45] leading-relaxed">
            Designed as a final project for Data Structures & Algorithms. Made using Helios design principles to demonstrate search and sort complexity constraints.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0c0c0e] mb-4">Underlying Algorithms</h4>
          <ul className="space-y-2 text-xs text-[#3b3d45]">
            <li>Binary Search Trees</li>
            <li>Inorder Traversal</li>
            <li>Median-of-three QuickSort</li>
            <li>Performance Comparison</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0c0c0e] mb-4">Tech Stack</h4>
          <ul className="space-y-2 text-xs text-[#3b3d45]">
            <li>Next.js App Router</li>
            <li>Neon Serverless Postgres</li>
            <li>Prisma Client</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0c0c0e] mb-4">System Actions</h4>
          <ul className="space-y-2 text-xs text-[#3b3d45]">
            <li>
              <a href="#database" className="hover:text-[#1060ff] transition-all">Connection Diagnostics</a>
            </li>
            <li>
              <a href="/api/products" target="_blank" className="hover:text-[#1060ff] transition-all">JSON API Endpoint</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t tech-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400">
        <span>Copyright &copy; 2026 BinaryMart. All rights reserved.</span>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <span>SDA Course Assignment</span>
          <span>&bull;</span>
          <span>Vercel Deploy Ready</span>
        </div>
      </div>
    </footer>
  );
}
