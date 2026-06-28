'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';

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

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const getSortParams = (sort: string) => {
    switch (sort) {
      case 'price-low': return { sort: 'price', order: 'asc' };
      case 'price-high': return { sort: 'price', order: 'desc' };
      case 'rating': return { sort: 'rating', order: 'desc' };
      case 'popularity': return { sort: 'popularity', order: 'desc' };
      default: return { sort: '', order: 'asc' };
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (selectedCategory) params.set('category', selectedCategory);

    const { sort, order } = getSortParams(sortBy);
    if (sort) { params.set('sort', sort); params.set('order', order); }

    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data?.data?.products ?? data?.products ?? []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, selectedCategory, sortBy]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        const all = data?.data?.products ?? data?.products ?? [];
        setCategories(Array.from(new Set(all.map((p: Product) => p.category))));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    fetchProducts();
  }, [fetchProducts]);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);
  const inputClassName = "h-11 rounded-[6px] border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  const skeletonItems = Array.from({ length: productsPerPage }, (_, index) => index);

  return (
    <main className="bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="mb-8 flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">Catalog</span>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-950">Product Catalog</h1>
              <p className="text-slate-500 mt-2">Browse all available products.</p>
            </div>
            <p className="text-sm font-medium text-slate-500">
              {isLoading ? 'Updating products...' : `${products.length} product${products.length === 1 ? '' : 's'} found`}
            </p>
          </div>
        </div>

        <div className="mb-6 grid gap-3 rounded-[6px] border border-slate-200 bg-white p-3 shadow-sm sm:grid-cols-[180px_1fr_200px]">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={inputClassName}
            aria-label="Sort products"
          >
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
            <option value="popularity">Most Popular</option>
          </select>

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={inputClassName}
            aria-label="Search products"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={inputClassName}
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <section className="min-h-[760px]">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading products">
              {skeletonItems.map((item) => (
                <div key={item} className="overflow-hidden rounded-[6px] border border-slate-200 bg-white shadow-sm">
                  <div className="h-52 animate-pulse bg-slate-200" />
                  <div className="p-4">
                    <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                    <div className="mt-3 h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                    <div className="mt-3 space-y-2">
                      <div className="h-3 animate-pulse rounded bg-slate-100" />
                      <div className="h-3 w-4/5 animate-pulse rounded bg-slate-100" />
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                      <div className="h-4 w-14 animate-pulse rounded bg-slate-100" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex min-h-[420px] items-center justify-center rounded-[6px] border border-dashed border-slate-300 bg-white px-6 text-center">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">No products found</h2>
                <p className="mt-2 text-sm text-slate-500">Try another search, category, or sorting option.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentProducts.map((product) => (
                  <article key={product.id} className="flex min-h-[390px] flex-col overflow-hidden rounded-[6px] border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
                    <div className="h-52 bg-slate-100">
                      <ProductImage src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">{product.category}</span>
                        <span className="text-xs font-medium text-slate-400">{product.brand}</span>
                      </div>
                      <h2 className="mt-2 text-lg font-bold leading-snug text-slate-950">{product.name}</h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{product.description}</p>
                      <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                        <span className="font-bold text-slate-950">Rp {product.price.toLocaleString('id-ID')}</span>
                        <Link href={`/products/${product.id}`} className="shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-700">
                          Detail
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 flex min-h-11 flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="h-10 rounded-[6px] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="min-w-28 text-center text-sm font-medium text-slate-600">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="h-10 rounded-[6px] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
