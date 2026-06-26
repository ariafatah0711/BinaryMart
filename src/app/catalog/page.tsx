'use client';

import { useEffect, useState } from 'react';

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
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data?.products ?? data.products ?? []);
      })
      .catch(console.error);
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((product) => {
    const matchSearch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === '' ||
      product.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case 'price-low':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case 'price-high':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;

    case 'rating':
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;

    case 'popularity':
      sortedProducts.sort((a, b) => b.popularity - a.popularity);
      break;
  }

  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const currentProducts =
    sortedProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Product Catalog</h1>
        <p className="text-gray-500 mt-2">
          Browse all available products.
        </p>
      </div>

      <div className="mb-6 flex gap-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-md px-4 py-2"
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
          className="flex-1 border rounded-md px-4 py-2"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-md px-4 py-2"
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-md overflow-hidden bg-white shadow-sm"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <span className="text-xs text-blue-600 font-semibold">
                {product.category}
              </span>

              <h2 className="font-bold text-lg mt-2">
                {product.name}
              </h2>

              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="font-bold">
                  Rp {product.price.toLocaleString('id-ID')}
                </span>

                <a href={`/products/${product.id}`}
                  className="text-blue-600 font-medium"
                >
                  Detail
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 mt-10">
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.max(prev - 1, 1)
            )
          }
          disabled={currentPage === 1}
          className="border px-4 py-2 rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, totalPages)
            )
          }
          disabled={currentPage === totalPages}
          className="border px-4 py-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}
