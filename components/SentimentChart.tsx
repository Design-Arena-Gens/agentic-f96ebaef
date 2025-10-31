'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface SentimentChartProps {
  data: {
    positive?: number;
    neutral?: number;
    negative?: number;
  };
}

const COLORS = {
  positive: '#10b981',
  neutral: '#f59e0b',
  negative: '#ef4444',
};

export default function SentimentChart({ data }: SentimentChartProps) {
  const chartData = [
    { name: 'Positive', value: data.positive || 0, color: COLORS.positive },
    { name: 'Neutral', value: data.neutral || 0, color: COLORS.neutral },
    { name: 'Negative', value: data.negative || 0, color: COLORS.negative },
  ].filter(item => item.value > 0);

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-surface rounded-2xl border border-primary/20 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Sentiment Analysis</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">No sentiment data available</p>
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
      <h3 className="text-lg font-bold text-white mb-6">Sentiment Analysis</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a2333',
                border: '1px solid #0f766e',
                borderRadius: '8px',
                color: '#e6eef6',
              }}
              formatter={(value: any, name: string) => [
                `${value} (${((value / total) * 100).toFixed(1)}%)`,
                name
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {chartData.map((item) => (
          <div key={item.name} className="p-4 bg-dark-bg rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-xs text-gray-500">{item.name}</p>
            </div>
            <p className="text-lg font-bold text-white">{item.value}</p>
            <p className="text-xs text-gray-400">
              {((item.value / total) * 100).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
