'use client';

import { useProductsStore } from '@/store/productsStore';

export default function ProductFilter() {
  const { filter, setFilter } = useProductsStore();

  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => setFilter('all')}
        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
          filter === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Все продукты
      </button>
      <button
        onClick={() => setFilter('favorites')}
        className={`px-6 py-2 rounded-full font-medium transition-colors ${
          filter === 'favorites'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Избранное
      </button>
    </div>
  );
}