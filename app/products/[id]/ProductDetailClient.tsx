'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdArrowBack, MdEdit } from 'react-icons/md';
import { useProductsStore } from '@/store/productsStore';

export default function ProductDetailClient() {
  const params = useParams();
  const { products, toggleLike, isLiked, loadProducts, isLoading } = useProductsStore();
  const productId = typeof params.id === 'string' ? parseInt(params.id, 10) : NaN;
  const product = !isNaN(productId) ? products.find((p) => p.id === productId) : undefined;

  useEffect(() => {
    if (products.length === 0 && !isLoading) {
      loadProducts();
    }
  }, [products.length, isLoading, loadProducts]);

  if (isLoading || (products.length === 0 && !product)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Загрузка продукта...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Продукт не найден</h2>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Вернуться к списку продуктов
          </Link>
        </div>
      </div>
    );
  }

  const liked = isLiked(product.id);

  const handleLikeClick = () => {
    toggleLike(product.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <MdArrowBack className="w-5 h-5" />
            Назад к списку
          </Link>
          <Link
            href={`/products/${product.id}/edit`}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MdEdit className="w-5 h-5" />
            Редактировать
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative w-full h-96 md:h-full min-h-[400px] bg-gray-100">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                <button
                  onClick={handleLikeClick}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label={liked ? 'Убрать из избранного' : 'Добавить в избранное'}
                >
                  {liked ? (
                    <AiFillHeart className="w-8 h-8 text-red-500" />
                  ) : (
                    <AiOutlineHeart className="w-8 h-8 text-gray-600" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-blue-600">
                  ${product.price}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-lg text-green-600 bg-green-100 px-3 py-1 rounded">
                    Скидка {product.discountPercentage.toFixed(0)}%
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <span className="text-xl text-yellow-500">★</span>
                  <span className="text-lg text-gray-700">{product.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-lg text-gray-700">
                  В наличии: {product.stock} шт.
                </span>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Описание</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Бренд:</span>
                  <span className="text-gray-600">{product.brand}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Категория:</span>
                  <span className="text-gray-600 capitalize">{product.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">ID продукта:</span>
                  <span className="text-gray-600">#{product.id}</span>
                </div>
              </div>

              {product.images && product.images.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Дополнительные изображения
                  </h2>
                  <div className="grid grid-cols-3 gap-2">
                    {product.images.slice(0, 3).map((image, index) => (
                      <div
                        key={index}
                        className="relative w-full h-24 bg-gray-100 rounded overflow-hidden"
                      >
                        <Image
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, 150px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

