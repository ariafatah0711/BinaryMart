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

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        const products =
          data.data?.products ??
          data.products ??
          [];

        const found = products.find(
          (p: Product) => String(p.id) === String(id)
        );

        setProduct(found || null);
      });
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">
          Loading....
        </h1>
      </div>
    );
  }

  <Link
  href="/catalog"
  className="text-blue-600 font-medium mb-6 inline-block"
>
  ← Back to Catalog
</Link>

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg border"
          />
        </div>

        <div>
          <span className="text-sm text-blue-600 font-semibold">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold mt-2">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-2">
            Brand: {product.brand}
          </p>

          <p className="text-3xl font-bold mt-4">
            Rp {product.price.toLocaleString('id-ID')}
          </p>

          <p className="mt-6 text-gray-700">
            {product.description}
          </p>

          <div className="mt-8 space-y-2">
            {product.specifications && (
          <div className="mt-8">
            <h2 className="font-bold text-xl mb-4">
              Specifications
            </h2>

            <div className="border rounded-md">
              {Object.entries(product.specifications).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b p-3"
                  >
                    <span className="font-medium">
                      {key}
                    </span>

                    <span className="text-gray-600">
                      {value}
                    </span>
                  </div>
                )
              )}
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