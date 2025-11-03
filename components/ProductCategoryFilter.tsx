'use client';

import { useProductsStore } from '@/store/productsStore';

export default function ProductCategoryFilter() {
  const { categoryFilter, setCategoryFilter, getCategories } = useProductsStore();
  const categories = getCategories();

  return (
    <div className="mb-6">
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Все категории</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

