'use client';

import { motion } from 'framer-motion';
import { StarIcon, UserIcon, TagIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-surface rounded-2xl border border-primary/20 overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-800">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <TagIcon className="w-20 h-20 text-gray-600" />
          </div>
        )}
        {product.discount > 0 && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-lg">
            {product.discount}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-white leading-tight">
          {product.title}
        </h2>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-accent">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 bg-dark-bg rounded-lg">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-sm font-bold text-white">{product.rating || 'N/A'}</p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-dark-bg rounded-lg">
            <UserIcon className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm font-bold text-white">{product.reviewCount || 0}</p>
              <p className="text-xs text-gray-500">Reviews</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-dark-bg rounded-lg">
            <TagIcon className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-sm font-bold text-white">{product.stock || 'In Stock'}</p>
              <p className="text-xs text-gray-500">Status</p>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
          <div>
            <p className="text-xs text-gray-500">Seller</p>
            <p className="text-sm font-medium text-white">{product.seller || 'Unknown'}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Category</p>
            <p className="text-sm font-medium text-white">{product.category || 'General'}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
