'use client';

import { MagnifyingGlassIcon, ClockIcon, ArrowsRightLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'analyze', label: 'Analyze', icon: MagnifyingGlassIcon },
  { id: 'history', label: 'History', icon: ClockIcon },
  { id: 'compare', label: 'Compare', icon: ArrowsRightLeftIcon },
  { id: 'settings', label: 'Settings', icon: Cog6ToothIcon },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-surface/95 backdrop-blur-sm border-t border-primary/20 z-50">
      <div className="max-w-2xl mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className={`w-6 h-6 relative z-10 ${isActive ? 'text-accent' : 'text-gray-400'}`} />
                <span className={`text-xs relative z-10 ${isActive ? 'text-accent font-medium' : 'text-gray-400'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
