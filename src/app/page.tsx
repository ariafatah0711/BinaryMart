'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import FeaturesSection from '@/components/FeaturesSection';
import AlgorithmVisualizer from '@/components/AlgorithmVisualizer';
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
      });
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="flex-1 flex flex-col">
      <Navbar dbStatus={dbStatus} dbError={dbError} />
      <HeroSection />
      <StatsBar productsCount={products.length} categoriesCount={categories.length} dbStatus={dbStatus} />
      <FeaturesSection />
      <AlgorithmVisualizer />
      <ProductsSection products={products} />
      <CTASection />
      <Footer />
    </div>
  );
}
