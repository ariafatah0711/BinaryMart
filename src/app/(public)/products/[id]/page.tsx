'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
  specifications: Record<string, string>;
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.data.product);
        } else {
          setError(data.error || 'Product not found');
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="animate-pulse space-y-6">
            <div className="h-5 w-36 rounded bg-slate-200" />
            <div className="grid gap-8 lg:grid-cols-[minmax(0,520px)_1fr]">
              <div className="aspect-[4/3] rounded-[6px] bg-slate-200" />
              <div className="rounded-[6px] border border-slate-200 bg-white p-6">
                <div className="h-5 w-24 rounded bg-slate-200" />
                <div className="mt-4 h-10 w-3/4 rounded bg-slate-200" />
                <div className="mt-4 h-8 w-32 rounded bg-slate-200" />
                <div className="mt-6 h-24 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <Link href="/catalog" className="mb-6 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700">
            &larr; Back to Catalog
          </Link>
          <div className="rounded-[6px] border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-slate-950">Product Not Found</h1>
            <p className="mt-2 text-slate-500">{error || 'The product you are looking for does not exist.'}</p>
          </div>
        </div>
      </main>
    );
  }

  const specifications = Object.entries(product.specifications || {});

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <Link href="/catalog" className="mb-6 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700">
          &larr; Back to Catalog
        </Link>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,520px)_1fr] lg:items-start">
          <div className="overflow-hidden rounded-[6px] border border-slate-200 bg-white shadow-sm">
            <ProductImage
              src={product.image}
              alt={product.name}
              className="aspect-[4/3] w-full bg-slate-100 object-cover"
            />
          </div>

          <section className="rounded-[6px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-[6px] bg-blue-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
                {product.category}
              </span>
              <span className="text-sm font-medium text-slate-500">Brand: {product.brand}</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">{product.name}</h1>
            <p className="mt-3 text-3xl font-extrabold text-slate-950">Rp {product.price.toLocaleString('id-ID')}</p>
            <p className="mt-5 text-sm leading-6 text-slate-600">{product.description}</p>

            <div className="mt-6 grid grid-cols-3 gap-3 border-y border-slate-100 py-4">
              <div>
                <p className="text-xs font-medium text-slate-400">Rating</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{product.rating}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Popularity</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{product.popularity}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Stock</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{product.stock}</p>
              </div>
            </div>

            {specifications.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-bold text-slate-950">Specifications</h2>
                <div className="mt-3 overflow-hidden rounded-[6px] border border-slate-200">
                  {specifications.map(([key, value]) => (
                    <div key={key} className="grid grid-cols-[130px_1fr] gap-4 border-b border-slate-100 px-4 py-3 last:border-b-0">
                      <span className="text-sm font-semibold text-slate-700">{key}</span>
                      <span className="text-sm text-slate-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
