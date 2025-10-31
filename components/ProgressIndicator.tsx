'use client';

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  progress: number;
  message: string;
}

export default function ProgressIndicator({ progress, message }: ProgressIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto p-8 bg-dark-surface rounded-2xl border border-primary/20"
    >
      {/* Animated Icon */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-20"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-primary to-accent"
          />
        </div>

        {/* Message */}
        <p className="text-center text-gray-300 font-medium">{message}</p>
        <p className="text-center text-sm text-gray-500">{Math.round(progress)}% complete</p>
      </div>

      {/* Steps */}
      <div className="mt-8 space-y-3">
        {[
          { label: 'Fetching product data', done: progress > 25 },
          { label: 'Analyzing reviews', done: progress > 50 },
          { label: 'Generating insights', done: progress > 75 },
          { label: 'Finalizing results', done: progress >= 100 },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
              step.done ? 'border-accent bg-accent' : 'border-gray-600'
            }`}>
              {step.done && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={`text-sm ${step.done ? 'text-white' : 'text-gray-500'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
