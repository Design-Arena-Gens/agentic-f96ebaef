'use client';

import { motion } from 'framer-motion';
import { StarIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface Review {
  text: string;
  rating: number;
  date: string;
  verified: boolean;
  sentiment?: string;
}

interface ReviewsListProps {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  const [expanded, setExpanded] = useState(false);
  const displayReviews = expanded ? reviews : reviews.slice(0, 5);

  if (!reviews || reviews.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-surface rounded-2xl border border-primary/20 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Customer Reviews</h3>
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews available</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-surface rounded-2xl border border-primary/20 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Customer Reviews</h3>
        <span className="text-sm text-gray-400">{reviews.length} total</span>
      </div>

      <div className="space-y-4">
        {displayReviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 bg-dark-bg rounded-lg border border-primary/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                {review.verified && (
                  <CheckBadgeIcon className="w-5 h-5 text-green-400" title="Verified Purchase" />
                )}
              </div>
              <span className="text-xs text-gray-500">
                {new Date(review.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>

            {/* Review Text */}
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              {review.text}
            </p>

            {/* Sentiment Badge */}
            {review.sentiment && (
              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                review.sentiment === 'positive'
                  ? 'bg-green-500/10 text-green-400'
                  : review.sentiment === 'negative'
                  ? 'bg-red-500/10 text-red-400'
                  : 'bg-yellow-500/10 text-yellow-400'
              }`}>
                {review.sentiment.charAt(0).toUpperCase() + review.sentiment.slice(1)}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Show More Button */}
      {reviews.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-4 py-3 bg-dark-bg border border-primary/20 rounded-lg text-sm text-gray-300 hover:border-primary transition-colors"
        >
          {expanded ? 'Show Less' : `Show ${reviews.length - 5} More Reviews`}
        </button>
      )}
    </motion.div>
  );
}
