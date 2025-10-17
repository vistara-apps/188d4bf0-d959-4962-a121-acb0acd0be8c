'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

const apps = [
  { name: 'DeFi Swap', yes: 65, no: 35, volume: '$12.5k', trend: 'up', change: '+8.2%' },
  { name: 'NFT Gallery', yes: 45, no: 55, volume: '$8.3k', trend: 'down', change: '-3.1%' },
  { name: 'Social Hub', yes: 72, no: 28, volume: '$15.7k', trend: 'up', change: '+12.5%' },
  { name: 'Game Portal', yes: 38, no: 62, volume: '$6.2k', trend: 'down', change: '-5.4%' },
];

export function DiscoveryFeed() {
  return (
    <div className="bg-surface rounded-lg p-6 border border-white/10 shadow-market">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-fg">Discovery Feed</h2>
        <button className="text-sm text-accent hover:text-accent/80 transition-colors duration-200">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {apps.map((app, index) => (
          <div
            key={index}
            className="bg-bg/50 rounded-lg p-4 border border-white/5 hover:border-accent/30 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-accent">{app.name[0]}</span>
                </div>
                <div>
                  <h3 className="font-medium text-fg group-hover:text-accent transition-colors duration-200">
                    {app.name}
                  </h3>
                  <p className="text-xs text-fg/40">24h Vol: {app.volume}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {app.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-positive" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-negative" />
                    )}
                    <span className={`text-sm font-medium ${app.trend === 'up' ? 'text-positive' : 'text-negative'}`}>
                      {app.change}
                    </span>
                  </div>
                  <p className="text-xs text-fg/40 mt-1">YES: {app.yes}%</p>
                </div>

                <button className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  Trade
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
