'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link href="/catalog" className="text-blue-600 font-medium mb-6 inline-block">
          ← Back to Catalog
        </Link>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-500">{error || 'The product you are looking for does not exist.'}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <Link href="/catalog" className="text-blue-600 font-medium mb-6 inline-block">
        ← Back to Catalog
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img src={product.image} alt={product.name} className="w-full rounded-lg border" />
        </div>

        <div>
          <span className="text-sm text-blue-600 font-semibold">{product.category}</span>
          <h1 className="text-4xl font-bold mt-2">{product.name}</h1>
          <p className="text-gray-500 mt-2">Brand: {product.brand}</p>
          <p className="text-3xl font-bold mt-4">Rp {product.price.toLocaleString('id-ID')}</p>
          <p className="mt-6 text-gray-700">{product.description}</p>

          <div className="mt-8 space-y-2">
            {product.specifications && (
              <div className="mt-8">
                <h2 className="font-bold text-xl mb-4">Specifications</h2>
                <div className="border rounded-md">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b p-3">
                      <span className="font-medium">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <p>⭐ Rating: {product.rating}</p>
            <p>🔥 Popularity: {product.popularity}</p>
            <p>📦 Stock: {product.stock}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
