'use client';

import { useEffect, useState } from 'react';
import { AppShell } from './components/AppShell';
import { HeroSection } from './components/HeroSection';
import { TrendingChart } from './components/TrendingChart';
import { DiscoveryFeed } from './components/DiscoveryFeed';
import { MarketStats } from './components/MarketStats';
import { PaymentDemo } from './components/PaymentDemo';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="animate-pulse text-fg">Loading Predictors...</div>
      </div>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <HeroSection />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TrendingChart />
            <DiscoveryFeed />
          </div>
          
          <div className="space-y-6">
            <PaymentDemo />
            <MarketStats />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
