"use client";

import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  dbStatus?: "connecting" | "connected" | "failed";
  dbError?: string | null;
}

export default function Navbar({ dbStatus, dbError }: NavbarProps) {
  const [showError, setShowError] = useState(false);

  return (
    <nav className="tech-border bg-white/90 backdrop-blur sticky top-0 z-50 border-t-0 border-x-0 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 shrink-0">
          <svg className="w-6 h-6 text-[#1060ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
          <span className="font-bold text-lg tracking-tight text-[#0c0c0e]">
            BINARY<span className="text-[#1060ff]">MART</span>
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <a href="/#features" className="text-sm font-medium text-[#3b3d45] hover:text-[#1060ff] transition-all hidden sm:inline">Features</a>
          <a href="/#catalog" className="text-sm font-medium text-[#3b3d45] hover:text-[#1060ff] transition-all hidden sm:inline">Products</a>
          <Link href="/catalog" className="text-sm font-medium text-[#3b3d45] hover:text-[#1060ff] transition-all hidden sm:inline">Catalog</Link>
          <Link href="/algorithms" className="text-sm font-medium text-[#3b3d45] hover:text-[#1060ff] transition-all hidden sm:inline">Algorithms</Link>
          <Link href="/admin/login" className="text-sm font-medium text-[#3b3d45] hover:text-[#1060ff] transition-all hidden sm:inline">Admin</Link>

          {dbStatus && (
            <div className="ml-2">
              {dbStatus === "connected" && (
                <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-green-50 border border-green-200">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-green-700 font-medium whitespace-nowrap">DB Online</span>
                </div>
              )}
              {dbStatus === "connecting" && (
                <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-yellow-50 border border-yellow-200">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                  <span className="text-yellow-600 font-medium">DB...</span>
                </div>
              )}
              {dbStatus === "failed" && (
                <div className="relative">
                  <button
                    onClick={() => setShowError(!showError)}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-red-50 border border-red-200 hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-red-700 font-medium whitespace-nowrap">DB Offline</span>
                  </button>
                  {showError && dbError && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-red-200 rounded-lg shadow-lg p-3 text-xs text-red-700 z-50">
                      <p className="font-medium mb-1">Connection Failed</p>
                      <p className="text-red-600 break-words">{dbError}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <Link
            href="/catalog"
            className="bg-[#1060ff] hover:bg-[#0c56e9] text-white px-4 py-2 text-xs font-semibold rounded-[6px] transition-all shadow-sm flex items-center space-x-2"
          >
            <span>Explore</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
