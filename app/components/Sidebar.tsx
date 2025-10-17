'use client';

import { Home, TrendingUp, Wallet, BarChart3, Bell, Settings2 } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { icon: Home, label: 'Overview', active: true },
  { icon: TrendingUp, label: 'Markets', active: false },
  { icon: Wallet, label: 'Portfolio', active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: Bell, label: 'Notifications', active: false },
  { icon: Settings2, label: 'Settings', active: false },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('Overview');

  return (
    <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-white/10">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-fg">Predictors</span>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          
          return (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-fg/60 hover:text-fg hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg p-4">
          <p className="text-sm font-medium text-fg mb-2">New to Predictors?</p>
          <p className="text-xs text-fg/60 mb-3">Learn how to predict and earn rewards</p>
          <button className="w-full bg-accent hover:bg-accent/90 text-white text-sm font-medium py-2 rounded-lg transition-colors duration-200">
            Get Started
          </button>
        </div>
      </div>
    </aside>
  );
}
