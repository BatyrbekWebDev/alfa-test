'use client';

import { useProductsStore } from '@/store/productsStore';

export default function ProductSearch() {
  const { searchQuery, setSearchQuery } = useProductsStore();

  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск по названию или описанию..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

