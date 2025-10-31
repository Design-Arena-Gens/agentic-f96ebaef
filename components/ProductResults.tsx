'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import ProgressIndicator from './ProgressIndicator';
import ProductCard from './ProductCard';
import PriceChart from './PriceChart';
import SentimentChart from './SentimentChart';
import ReviewsList from './ReviewsList';
import InsightsPanel from './InsightsPanel';

interface ProductResultsProps {
  jobId: string;
  onReset: () => void;
}

export default function ProductResults({ jobId, onReset }: ProductResultsProps) {
  const [range, setRange] = useState<'1m' | '6m' | 'life'>('1m');

  // Poll job status
  const { data: status } = useQuery({
    queryKey: ['job-status', jobId],
    queryFn: async () => {
      const response = await axios.get(`/api/status/${jobId}`);
      return response.data;
    },
    refetchInterval: (query) => {
      return query.state.data?.status === 'completed' ? false : 2000;
    },
  });

  // Fetch results when completed
  const { data: results, isLoading: resultsLoading } = useQuery({
    queryKey: ['results', jobId, range],
    queryFn: async () => {
      const response = await axios.get(`/api/results/${jobId}?range=${range}`);
      return response.data;
    },
    enabled: status?.status === 'completed',
  });

  const isAnalyzing = !status || status.status !== 'completed';

  if (isAnalyzing) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <ProgressIndicator progress={status?.progress || 0} message={status?.message || 'Starting analysis...'} />
      </div>
    );
  }

  if (resultsLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="text-sm">New Analysis</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-dark-surface border border-primary/20 rounded-lg text-sm text-gray-300 hover:border-primary transition-colors"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      {/* Product Card */}
      <ProductCard product={results?.product} />

      {/* Time Range Filter */}
      <div className="flex gap-2 bg-dark-surface p-2 rounded-xl border border-primary/10">
        {[
          { value: '1m', label: '1 Month' },
          { value: '6m', label: '6 Months' },
          { value: 'life', label: 'Lifetime' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setRange(option.value as any)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              range === option.value
                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Price Chart */}
      <PriceChart data={results?.priceHistory || []} />

      {/* Sentiment Overview */}
      <SentimentChart data={results?.sentiment || {}} />

      {/* Key Insights */}
      <InsightsPanel insights={results?.insights || {}} />

      {/* Reviews */}
      <ReviewsList reviews={results?.reviews || []} />
    </motion.div>
  );
}
