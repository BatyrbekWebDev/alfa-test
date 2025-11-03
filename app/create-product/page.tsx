'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProductsStore } from '@/store/productsStore';

const productSchema = z.object({
  title: z.string().min(1, 'Название обязательно').min(3, 'Название должно быть не менее 3 символов'),
  description: z.string().min(1, 'Описание обязательно').min(10, 'Описание должно быть не менее 10 символов'),
  price: z.number().min(0.01, 'Цена должна быть больше 0'),
  discountPercentage: z.number().min(0).max(100, 'Скидка не может быть больше 100%').default(0),
  rating: z.number().min(0).max(5, 'Рейтинг не может быть больше 5').default(0),
  stock: z.number().min(0, 'Количество не может быть отрицательным').default(0),
  brand: z.string().min(1, 'Бренд обязателен'),
  category: z.string().min(1, 'Категория обязательна'),
  thumbnail: z.string().url('Введите корректный URL изображения'),
  images: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function CreateProductPage() {
  const router = useRouter();
  const { addProduct } = useProductsStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      discountPercentage: 0,
      rating: 0,
      stock: 0,
    },
  });

  const onSubmit = (data: ProductFormData) => {
    const images = data.images ? data.images.split(',').map(img => img.trim()).filter(img => img) : [];
    
    addProduct({
      title: data.title,
      description: data.description,
      price: data.price,
      discountPercentage: data.discountPercentage,
      rating: data.rating,
      stock: data.stock,
      brand: data.brand,
      category: data.category,
      thumbnail: data.thumbnail,
      images: images.length > 0 ? images : [data.thumbnail],
    });

    router.push('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Создать новый продукт</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Название продукта *
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Описание *
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Цена ($) *
            </label>
            <input
              type="number"
              id="price"
              step="0.01"
              {...register('price', { valueAsNumber: true })}
              className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700 mb-2">
              Скидка (%)
            </label>
            <input
              type="number"
              id="discountPercentage"
              step="0.01"
              {...register('discountPercentage', { valueAsNumber: true })}
              className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                errors.discountPercentage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.discountPercentage && (
              <p className="mt-1 text-sm text-red-600">{errors.discountPercentage.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
              Рейтинг (0-5)
            </label>
            <input
              type="number"
              id="rating"
              step="0.01"
              {...register('rating', { valueAsNumber: true })}
              className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                errors.rating ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.rating && (
              <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
              Количество на складе
            </label>
            <input
              type="number"
              id="stock"
              {...register('stock', { valueAsNumber: true })}
              className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                errors.stock ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.stock && (
              <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
              Бренд *
            </label>
            <input
              type="text"
              id="brand"
              {...register('brand')}
              className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                errors.brand ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.brand && (
              <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Категория *
            </label>
            <input
              type="text"
              id="category"
              {...register('category')}
              className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
              URL изображения (thumbnail) *
            </label>
            <input
              type="url"
              id="thumbnail"
              {...register('thumbnail')}
              placeholder="https://example.com/image.jpg"
              className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                errors.thumbnail ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.thumbnail && (
              <p className="mt-1 text-sm text-red-600">{errors.thumbnail.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
              Дополнительные изображения (URL через запятую)
            </label>
            <input
              type="text"
              id="images"
              {...register('images')}
              placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">Введите URL изображений через запятую</p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Создание...' : 'Создать продукт'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/products')}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

