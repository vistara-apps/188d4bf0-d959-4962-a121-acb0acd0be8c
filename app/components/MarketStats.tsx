'use client';

import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const stats = [
  { label: 'Total Volume', value: '$270k', change: '+23.6%', icon: DollarSign, color: 'from-yellow-500 to-orange-500' },
  { label: 'Active Traders', value: '4.5k', change: '+12.3%', icon: Users, color: 'from-blue-500 to-cyan-500' },
  { label: 'Markets', value: '127', change: '+8', icon: Activity, color: 'from-purple-500 to-pink-500' },
];

export function MarketStats() {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg p-6 border border-accent/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-fg">Trending Feed Apps</h3>
          <span className="text-2xl font-bold text-accent">$15,090</span>
        </div>
        <p className="text-sm text-fg/60 mb-4">Since #21 increase</p>
        <div className="space-y-2">
          <button className="w-full bg-accent hover:bg-accent/90 text-white py-2 rounded-lg text-sm font-medium transition-colors duration-200">
            Trade Now
          </button>
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm font-medium transition-colors duration-200">
            Smart Analyze
          </button>
        </div>
      </div>

      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-surface rounded-lg p-4 border border-white/10 hover:border-accent/30 transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs bg-positive/20 text-positive px-2 py-1 rounded">{stat.change}</span>
          </div>
          <p className="text-2xl font-bold text-fg mb-1">{stat.value}</p>
          <p className="text-xs text-fg/40">{stat.label}</p>
        </div>
      ))}

      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
        <h4 className="text-sm font-medium text-fg mb-2">Early Uncertainty Profits</h4>
        <p className="text-3xl font-bold text-fg mb-3">+7.4%</p>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-fg/60">Leadership</span>
            <span className="text-fg">10%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-fg/60">Dynamic</span>
            <span className="text-fg">3.8%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-fg/60">Accuracy</span>
            <span className="text-fg">15%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
