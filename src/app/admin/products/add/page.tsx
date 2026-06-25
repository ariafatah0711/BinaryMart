"use client";

import ProductForm from "@/components/admin/ProductForm";

export default function AddProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Add Product
      </h1>

      <ProductForm />
    </div>
  );
}