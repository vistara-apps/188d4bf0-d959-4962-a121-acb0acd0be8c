'use client';

import { Bell, Search, Wallet } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-surface/80 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-16">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-fg/40" />
            <input
              type="text"
              placeholder="Search apps to predict..."
              className="w-full bg-bg border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-fg placeholder:text-fg/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors duration-200">
            <Bell className="w-5 h-5 text-fg/60" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-negative rounded-full"></span>
          </button>

          <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">Connect Wallet</span>
          </button>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-medium">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
