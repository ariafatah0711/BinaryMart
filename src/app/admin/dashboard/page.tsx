"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data.products || []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  const totalCategories = new Set(
    products.map((product) => product.category)
  ).size;

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-slate-500 text-sm font-medium">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-2">
      {/* Page Header */}
      <div className="flex flex-col gap-1.5 border-b border-slate-100 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 text-sm">
          Ringkasan performa katalog produk dan inventaris BinaryMart Anda.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all duration-300 flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Total Products
            </p>
            <p className="text-4xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
              {totalProducts}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all duration-300 flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Total Stock
            </p>
            <p className="text-4xl font-extrabold text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">
              {totalStock}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all duration-300 flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Categories
            </p>
            <p className="text-4xl font-extrabold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
              {totalCategories}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Recent Products Section */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Products
          </h2>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            5 Produk Terbaru
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {products.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              Belum ada produk terdaftar.
            </div>
          ) : (
            products.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="p-5 flex items-center justify-between hover:bg-slate-50/40 transition-colors duration-150"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                    {product.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-900 text-sm">
                      {product.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      ID: {product.id}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    {product.category}
                  </span>
                  <div className="text-right min-w-[80px]">
                    <div className="text-sm font-bold text-slate-900">
                      Stok: {product.stock}
                    </div>
                    <div className="text-xs text-slate-500">
                      Unit
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}