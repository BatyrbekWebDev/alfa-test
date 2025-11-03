'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useProductsStore } from '@/store/productsStore';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleLike, deleteProduct, isLiked } = useProductsStore();
  const liked = isLiked(Number(product.id));

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(Number(product.id));
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Вы уверены, что хотите удалить этот продукт?')) {
      deleteProduct(Number(product.id));
    }
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative flex flex-col h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
        <button
          onClick={handleLikeClick}
          className="absolute top-3 right-12 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          aria-label={liked ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          {liked ? (
            <AiFillHeart className="w-6 h-6 text-red-500" />
          ) : (
            <AiOutlineHeart className="w-6 h-6 text-gray-600" />
          )}
        </button>

        <button
          onClick={handleDeleteClick}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          aria-label="Удалить продукт"
        >
          <MdDelete className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors" />
        </button>

        <div className="relative w-full h-48 bg-gray-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-col grow p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-3 grow">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-bold text-blue-600">
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                -{product.discountPercentage.toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}