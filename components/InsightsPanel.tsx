'use client';

import { motion } from 'framer-motion';
import { SparklesIcon, ChartBarIcon, UserGroupIcon, LightBulbIcon } from '@heroicons/react/24/outline';

interface InsightsPanelProps {
  insights: {
    summary?: string;
    buyingStyle?: string;
    salesBehavior?: string;
    keyTopics?: string[];
    estimatedRevenue?: number;
  };
}

export default function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-surface rounded-2xl border border-primary/20 p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <SparklesIcon className="w-6 h-6 text-accent" />
        <h3 className="text-lg font-bold text-white">AI Insights</h3>
      </div>

      <div className="space-y-4">
        {/* Summary */}
        {insights.summary && (
          <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl">
            <p className="text-sm text-gray-300 leading-relaxed">
              {insights.summary}
            </p>
          </div>
        )}

        {/* Insights Grid */}
        <div className="grid gap-4">
          {/* Buying Style */}
          {insights.buyingStyle && (
            <div className="flex gap-4 p-4 bg-dark-bg rounded-xl">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <UserGroupIcon className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-1">Buying Pattern</p>
                <p className="text-sm text-gray-400">{insights.buyingStyle}</p>
              </div>
            </div>
          )}

          {/* Sales Behavior */}
          {insights.salesBehavior && (
            <div className="flex gap-4 p-4 bg-dark-bg rounded-xl">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-1">Sales Trend</p>
                <p className="text-sm text-gray-400">{insights.salesBehavior}</p>
              </div>
            </div>
          )}

          {/* Key Topics */}
          {insights.keyTopics && insights.keyTopics.length > 0 && (
            <div className="flex gap-4 p-4 bg-dark-bg rounded-xl">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <LightBulbIcon className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-2">Key Topics</p>
                <div className="flex flex-wrap gap-2">
                  {insights.keyTopics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-dark-surface border border-primary/20 rounded-full text-xs text-gray-300"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Estimated Revenue */}
          {insights.estimatedRevenue && (
            <div className="p-4 bg-gradient-to-r from-primary to-accent rounded-xl">
              <p className="text-sm text-white/80 mb-1">Estimated Monthly Revenue</p>
              <p className="text-2xl font-bold text-white">
                ₹{insights.estimatedRevenue.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-white/60 mt-2">
                *Based on engagement patterns and market analysis
              </p>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
          <p className="text-xs text-yellow-400/80">
            <strong>Note:</strong> Insights are AI-generated estimates based on available data and should be used as guidance only.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
