'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LinkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

interface AnalyzeFormProps {
  onJobCreated: (jobId: string) => void;
}

export default function AnalyzeForm({ onJobCreated }: AnalyzeFormProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.includes('meesho.com')) {
      setError('Please enter a valid Meesho product URL');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/analyze', { url });
      onJobCreated(response.data.jobId);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to analyze product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Hero Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <SparklesIcon className="w-4 h-4 text-accent" />
          <span className="text-sm text-accent font-medium">AI-Powered Analysis</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Analyze Any Meesho Product
        </h2>
        <p className="text-gray-400 text-sm">
          Get real-time insights, reviews, and price trends instantly
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Meesho product URL here..."
            className="w-full pl-12 pr-4 py-4 bg-dark-surface border border-primary/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            disabled={loading}
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}

        <button
          type="submit"
          disabled={loading || !url}
          className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Analyzing...
            </span>
          ) : (
            'Analyze Product'
          )}
        </button>
      </form>

      {/* Example */}
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-2">Example:</p>
        <button
          onClick={() => setUrl('https://www.meesho.com/example-product/p/12345')}
          className="text-xs text-accent hover:underline"
        >
          https://www.meesho.com/example-product/p/12345
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4 pt-6">
        {[
          { icon: '📊', label: 'Price Trends' },
          { icon: '⭐', label: 'Review Analysis' },
          { icon: '🎯', label: 'Buy Patterns' },
          { icon: '💡', label: 'AI Insights' },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-4 bg-dark-surface rounded-xl border border-primary/10"
          >
            <span className="text-2xl">{feature.icon}</span>
            <span className="text-sm text-gray-300">{feature.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-dark-surface/50 border border-primary/10 rounded-xl">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-400">Privacy Notice:</strong> We fetch live data from public sources only.
          No personal information is collected. Analysis is performed in real-time for each request.
        </p>
      </div>
    </motion.div>
  );
}
