'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useProductsStore } from '@/store/productsStore';
import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ProductFilter';
import ProductSearch from '@/components/ProductSearch';
import ProductCategoryFilter from '@/components/ProductCategoryFilter';
import ProductPagination from '@/components/ProductPagination';

export default function ProductsPage() {
  const { loadProducts, getPaginatedProducts, isLoading, error } = useProductsStore();
  const products = getPaginatedProducts();

  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, [loadProducts, products.length]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Каталог продуктов</h1>
          <Link
            href="/create-product"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            + Создать продукт
          </Link>
        </div>
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <ProductFilter />
          <div className="flex-1 w-full sm:w-auto">
            <ProductCategoryFilter />
          </div>
        </div>
        <ProductSearch />
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <p className="text-lg text-gray-600">Загрузка продуктов...</p>
          </div>
        )}
        
        {error && (
          <div className="flex justify-center items-center py-20">
            <p className="text-lg text-red-600">Ошибка: {error}</p>
          </div>
        )}
        
        {!isLoading && !error && products.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <p className="text-lg text-gray-600">Нет продуктов для отображения</p>
          </div>
        )}
        
        {!isLoading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <ProductPagination />
          </>
        )}
      </div>
    </div>
  );
}