'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface PriceChartProps {
  data: Array<{ date: string; price: number }>;
}

export default function PriceChart({ data }: PriceChartProps) {
  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-surface rounded-2xl border border-primary/20 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Price Trends</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">No price history available</p>
        </div>
      </motion.div>
    );
  }

  const minPrice = Math.min(...data.map(d => d.price));
  const maxPrice = Math.max(...data.map(d => d.price));
  const priceChange = data.length > 1 ? ((data[data.length - 1].price - data[0].price) / data[0].price) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-surface rounded-2xl border border-primary/20 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Price Trends</h3>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
          priceChange > 0 ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
        }`}>
          <span className="text-sm font-semibold">
            {priceChange > 0 ? '+' : ''}{priceChange.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2333" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              domain={[minPrice * 0.95, maxPrice * 1.05]}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a2333',
                border: '1px solid #0f766e',
                borderRadius: '8px',
                color: '#e6eef6',
              }}
              labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              formatter={(value: any) => [`₹${value}`, 'Price']}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ fill: '#06b6d4', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-dark-bg rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Lowest Price</p>
          <p className="text-lg font-bold text-green-400">₹{minPrice}</p>
        </div>
        <div className="p-4 bg-dark-bg rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Highest Price</p>
          <p className="text-lg font-bold text-red-400">₹{maxPrice}</p>
        </div>
      </div>
    </motion.div>
  );
}
