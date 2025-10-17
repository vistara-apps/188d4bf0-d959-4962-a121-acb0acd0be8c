'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { DollarSign, Send, CheckCircle, XCircle, Loader2, Wallet } from 'lucide-react';
import { useX402Payment } from '../hooks/useX402Payment';
import type { Address } from 'viem';

export function PaymentDemo() {
  const { address, isConnected } = useAccount();
  const { executePayment, checkBalance, status, transactionHash, reset } = useX402Payment();
  
  const [amount, setAmount] = useState('10');
  const [recipient, setRecipient] = useState('0x0000000000000000000000000000000000000000');
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected) {
      checkBalance().then(setBalance);
    }
  }, [isConnected, checkBalance]);

  const handlePayment = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!recipient || recipient === '0x0000000000000000000000000000000000000000') {
      alert('Please enter a valid recipient address');
      return;
    }

    const result = await executePayment({
      amount,
      recipient: recipient as Address,
      metadata: {
        purpose: 'prediction_market',
        timestamp: new Date().toISOString(),
      },
    });

    if (result.success) {
      // Refresh balance after successful payment
      const newBalance = await checkBalance();
      setBalance(newBalance);
    }
  };

  const getStatusIcon = () => {
    if (status.isPending) {
      return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
    }
    if (status.isConfirming) {
      return <Loader2 className="w-5 h-5 animate-spin text-yellow-500" />;
    }
    if (status.isSuccess) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    if (status.isError) {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
    return null;
  };

  const getStatusText = () => {
    if (status.isPending) {
      return 'Preparing transaction...';
    }
    if (status.isConfirming) {
      return 'Waiting for confirmation...';
    }
    if (status.isSuccess) {
      return 'Payment successful!';
    }
    if (status.isError) {
      return `Error: ${status.error?.message}`;
    }
    return null;
  };

  return (
    <div className="bg-surface border border-white/10 rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-fg">X402 Payment Demo</h3>
          <p className="text-sm text-fg/60">Test USDC payments on Base</p>
        </div>
      </div>

      {!isConnected ? (
        <div className="text-center py-8 space-y-4">
          <Wallet className="w-12 h-12 text-fg/40 mx-auto" />
          <p className="text-fg/60">Connect your wallet to make payments</p>
        </div>
      ) : (
        <>
          {balance !== null && (
            <div className="bg-bg/50 border border-white/5 rounded-lg p-4">
              <div className="text-sm text-fg/60">Your USDC Balance</div>
              <div className="text-2xl font-bold text-fg mt-1">{balance} USDC</div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-fg mb-2">
                Amount (USDC)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10.00"
                className="w-full bg-bg border border-white/10 rounded-lg px-4 py-2 text-fg focus:outline-none focus:ring-2 focus:ring-accent/50"
                disabled={status.isPending || status.isConfirming}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-fg mb-2">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="w-full bg-bg border border-white/10 rounded-lg px-4 py-2 text-fg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                disabled={status.isPending || status.isConfirming}
              />
            </div>

            <button
              onClick={handlePayment}
              disabled={status.isPending || status.isConfirming}
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 disabled:bg-accent/50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
              <Send className="w-5 h-5" />
              {status.isPending || status.isConfirming ? 'Processing...' : 'Send Payment'}
            </button>
          </div>

          {(status.isPending || status.isConfirming || status.isSuccess || status.isError) && (
            <div className="bg-bg/50 border border-white/10 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                {getStatusIcon()}
                <span className="text-sm text-fg">{getStatusText()}</span>
              </div>

              {transactionHash && (
                <div className="text-xs text-fg/60 break-all">
                  <span className="font-medium">Transaction:</span>{' '}
                  <a
                    href={`https://basescan.org/tx/${transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {transactionHash}
                  </a>
                </div>
              )}

              {(status.isSuccess || status.isError) && (
                <button
                  onClick={reset}
                  className="text-sm text-accent hover:underline"
                >
                  Make another payment
                </button>
              )}
            </div>
          )}
        </>
      )}

      <div className="text-xs text-fg/40 space-y-1">
        <p>✓ Uses wagmi useWalletClient for signing</p>
        <p>✓ X402-axios integration for payment protocol</p>
        <p>✓ USDC on Base (0x833589...)</p>
        <p>✓ Transaction confirmation tracking</p>
        <p>✓ Comprehensive error handling</p>
      </div>
    </div>
  );
}
