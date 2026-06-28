'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import FeaturesSection from '@/components/FeaturesSection';
import ProductsSection from '@/components/ProductsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

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
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<'connecting' | 'connected' | 'failed'>('connecting');
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data?.products ?? data.products ?? []);
          setDbStatus('connected');
        } else {
          setDbStatus('failed');
          setDbError(data.error || 'Failed to fetch products');
        }
      })
      .catch((err) => {
        setDbStatus('failed');
        setDbError(err.message || 'Network error');
      })
      .finally(() => setProductsLoading(false));
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="flex-1 flex flex-col">
      <HeroSection />
      <StatsBar productsCount={products.length} categoriesCount={categories.length} dbStatus={dbStatus} />
      <FeaturesSection />

      {/* Algorithms CTA */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 text-white flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">See Algorithms in Action</h2>
            <p className="text-slate-500 mt-3 text-sm max-w-lg mx-auto">
              Watch BST and QuickSort process real product data step by step. Click through each phase and see exactly how the algorithms work.
            </p>
            <Link
              href="/algorithms"
              className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-semibold rounded-lg transition-all shadow-lg"
            >
              Explore Algorithms
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <ProductsSection products={products} isLoading={productsLoading} />
      <CTASection />
      <Footer />
    </div>
  );
}
