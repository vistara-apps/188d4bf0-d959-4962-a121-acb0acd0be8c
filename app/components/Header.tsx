'use client';

import { Bell, Search, Wallet, CheckCircle, XCircle } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';

export function Header() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [showWalletMenu, setShowWalletMenu] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleWalletClick = () => {
    if (isConnected) {
      setShowWalletMenu(!showWalletMenu);
    } else {
      // Connect with the first available connector (Coinbase Wallet)
      const connector = connectors[0];
      if (connector) {
        connect({ connector });
      }
    }
  };

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

          <div className="relative">
            <button
              onClick={handleWalletClick}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              {isConnected ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">
                    {formatAddress(address!)}
                  </span>
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">Connect Wallet</span>
                </>
              )}
            </button>

            {showWalletMenu && isConnected && (
              <div className="absolute right-0 mt-2 w-48 bg-surface border border-white/10 rounded-lg shadow-lg py-2">
                <button
                  onClick={() => {
                    disconnect();
                    setShowWalletMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-fg hover:bg-white/5 transition-colors duration-200 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Disconnect
                </button>
              </div>
            )}
          </div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-medium">
            {isConnected && address ? address.slice(2, 3).toUpperCase() : 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}
