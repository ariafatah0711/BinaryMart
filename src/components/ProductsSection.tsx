import Link from "next/link";
import ProductImage from "@/components/ProductImage";

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

interface ProductsSectionProps {
  products: Product[];
  isLoading?: boolean;
}

export default function ProductsSection({ products, isLoading }: ProductsSectionProps) {
  if (isLoading) {
    return (
      <section id="catalog" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
            <p className="text-sm text-slate-400">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section id="catalog" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <svg className="w-14 h-14 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-lg font-semibold text-slate-700">No Products Yet</h3>
            <p className="text-sm text-slate-500 mt-1">Run <code className="bg-slate-100 px-2 py-0.5 rounded text-xs">npm run seed</code> to add sample data.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="catalog" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Products</h2>
            <p className="text-slate-500 text-sm mt-1">Browse our collection of tech products.</p>
          </div>
          <Link
            href="/catalog"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View Full Catalog
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50 transition-all overflow-hidden flex flex-col"
            >
              <div className="relative h-52 bg-slate-100 overflow-hidden">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-700 uppercase shadow-sm">
                  {product.category}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{product.brand}</span>
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">{product.description}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-base font-extrabold text-slate-900">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Detail &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
