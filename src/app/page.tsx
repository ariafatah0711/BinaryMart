'use client';

import React, { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  popularity: number;
  stock: number;
  description: string;
  image: string;
  specifications: Record<string, string>;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'failed'>('connecting');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
          setStatus('connected');
        } else {
          setStatus('failed');
          setErrorMsg(data.error || 'Failed to fetch products');
        }
      })
      .catch((err) => {
        setStatus('failed');
        setErrorMsg(err.message || 'Network error');
      });
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* Navbar */}
      <nav className="tech-border bg-white/90 backdrop-blur sticky top-0 z-50 border-t-0 border-x-0 border-b">
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
              href="#catalog" 
              className="bg-[#1060ff] hover:bg-[#0c56e9] text-white px-4 py-2 text-xs font-semibold rounded-[6px] transition-all shadow-sm flex items-center space-x-2"
            >
              <span>Explore Catalog</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
          {/* Abstract Grid Visualizer Graphic */}
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

      {/* Feature Section */}
      <section id="features" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b tech-border">
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

      {/* Database connection indicator */}
      <section id="database" className="py-12 bg-gray-50 border-b tech-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-[6px] border tech-border shadow-sm flex flex-col sm:flex-row items-center justify-between">
            <div className="space-y-1 mb-4 sm:mb-0">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#3b3d45]">Database Connectivity</div>
              <h3 className="text-lg font-bold text-[#0c0c0e]">Real-time Live Sync with Neon Server</h3>
            </div>
            <div className="flex items-center space-x-3">
              {status === 'connecting' && (
                <>
                  <span className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></span>
                  <span className="text-sm font-medium text-yellow-600">Connecting to Neon...</span>
                </>
              )}
              {status === 'connected' && (
                <>
                  <span className="w-3 h-3 rounded-full bg-[#008a22] animate-ping"></span>
                  <span className="w-3 h-3 rounded-full bg-[#008a22] absolute"></span>
                  <span className="text-sm font-medium text-[#008a22] pl-4">Connected to Neon DB Successfully</span>
                </>
              )}
              {status === 'failed' && (
                <>
                  <span className="w-3 h-3 rounded-full bg-[#e52228]"></span>
                  <div className="text-left">
                    <span className="text-sm font-medium text-[#e52228]">Connection Failed</span>
                    <p className="text-[10px] text-gray-500 mt-1 max-w-xs">{errorMsg}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section id="catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b tech-border pb-6 mb-8">
          <div>
            <h2 className="text-xl font-bold text-[#0c0c0e]">Current Catalog Status</h2>
            <p className="text-xs text-[#3b3d45]">Showing live rows synced from the PostgreSQL database.</p>
          </div>
          <div className="mt-4 sm:mt-0 bg-gray-100 text-[#3b3d45] text-xs font-semibold px-3 py-1.5 rounded-[5px] border tech-border">
            Total Database Records: {products.length}
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-[6px] border tech-border">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-sm font-bold text-[#0c0c0e]">No Products Loaded</h3>
            <p className="text-xs text-[#3b3d45] mt-1">Make sure you have specified correct database credentials in .env</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-[6px] border tech-border hover:shadow-md transition-all flex flex-col justify-between overflow-hidden">
                <div className="relative h-48 w-full bg-gray-100 border-b tech-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-2 left-2 bg-white/95 backdrop-blur px-2.5 py-1 rounded-[4px] border tech-border text-[10px] font-bold text-[#0c0c0e] uppercase">
                    {product.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{product.brand}</span>
                      <div className="flex items-center space-x-1">
                        <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-bold text-[#0c0c0e]">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-[#0c0c0e] text-sm line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-[#3b3d45] line-clamp-2 leading-relaxed">{product.description}</p>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t tech-border flex items-center justify-between">
                    <span className="text-sm font-extrabold text-[#0c0c0e]">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Popularity: {product.popularity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
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
          <span>Copyright © 2026 BinaryMart. All rights reserved.</span>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <span>SDA Course Assignment</span>
            <span>•</span>
            <span>Vercel Deploy Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
