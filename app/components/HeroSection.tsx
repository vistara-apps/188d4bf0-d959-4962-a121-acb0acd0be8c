'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-surface to-surface/50 rounded-lg p-6 md:p-8 border border-white/10 shadow-card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-fg mb-2">
            APP/ODDS
          </h1>
          <p className="text-fg/60">Are you on <span className="text-positive">YES</span> or <span className="text-negative">NO</span> side</p>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-6">
          <div className="text-center">
            <p className="text-xs text-fg/60 mb-1">YES</p>
            <p className="text-2xl font-bold text-positive">3.46</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-fg/60 mb-1">NO</p>
            <p className="text-2xl font-bold text-negative">$55,000</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-fg/60 mb-1">Total</p>
            <p className="text-2xl font-bold text-fg">13,2550</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-bg/50 rounded-lg p-4 border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-fg/60">DexMee Mars</span>
            <span className="text-xs bg-positive/20 text-positive px-2 py-1 rounded">+12.5%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-fg">$5.7k</span>
            <TrendingUp className="w-5 h-5 text-positive" />
          </div>
          <div className="mt-2 text-xs text-fg/40">24h Volume</div>
        </div>

        <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg p-4 border border-accent/20">
          <div className="text-sm text-fg/80 mb-2">Trending Feed Apps</div>
          <div className="text-3xl font-bold text-fg mb-1">$15,090</div>
          <div className="text-xs text-positive">Since #21 increase</div>
        </div>
      </div>
    </div>
  );
}
