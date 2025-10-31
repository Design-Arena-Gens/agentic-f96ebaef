'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AnalyzeForm from '@/components/AnalyzeForm';
import ProductResults from '@/components/ProductResults';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  const [activeTab, setActiveTab] = useState('analyze');
  const [jobId, setJobId] = useState<string | null>(null);

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-dark-surface/95 backdrop-blur-sm border-b border-primary/20"
      >
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <MagnifyingGlassIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MeeshoLens</h1>
              <p className="text-xs text-gray-400">Real-Time Product Analyzer</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {activeTab === 'analyze' && (
          <>
            {!jobId ? (
              <AnalyzeForm onJobCreated={setJobId} />
            ) : (
              <ProductResults jobId={jobId} onReset={() => setJobId(null)} />
            )}
          </>
        )}

        {activeTab === 'history' && (
          <div className="text-center py-20">
            <p className="text-gray-400">History feature coming soon</p>
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="text-center py-20">
            <p className="text-gray-400">Compare feature coming soon</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="text-center py-20">
            <p className="text-gray-400">Settings coming soon</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  );
}
