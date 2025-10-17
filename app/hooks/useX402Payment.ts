'use client';

import { useState, useCallback } from 'react';
import { useWalletClient, useAccount, usePublicClient } from 'wagmi';
import axios from 'axios';
import { parseUnits, formatUnits, type Address } from 'viem';
import { USDC_ADDRESS, ERC20_ABI } from '../config/constants';

interface X402PaymentOptions {
  amount: string; // Amount in USDC (e.g., "10.50")
  recipient: Address;
  metadata?: Record<string, unknown>;
}

interface PaymentResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

interface PaymentStatus {
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
}

export function useX402Payment() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  
  const [status, setStatus] = useState<PaymentStatus>({
    isPending: false,
    isConfirming: false,
    isSuccess: false,
    isError: false,
    error: null,
  });

  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  /**
   * Execute a payment using x402 protocol with USDC on Base
   */
  const executePayment = useCallback(
    async (options: X402PaymentOptions): Promise<PaymentResult> => {
      try {
        // Reset status
        setStatus({
          isPending: true,
          isConfirming: false,
          isSuccess: false,
          isError: false,
          error: null,
        });
        setTransactionHash(null);

        // Validation
        if (!address) {
          throw new Error('Wallet not connected');
        }

        if (!walletClient) {
          throw new Error('Wallet client not available');
        }

        if (!publicClient) {
          throw new Error('Public client not available');
        }

        // Convert amount to proper decimals (USDC uses 6 decimals)
        const amountInWei = parseUnits(options.amount, 6);

        // Step 1: Check USDC balance
        const balance = await publicClient.readContract({
          address: USDC_ADDRESS,
          abi: ERC20_ABI,
          functionName: 'balanceOf',
          args: [address],
        }) as bigint;

        if (balance < amountInWei) {
          throw new Error(
            `Insufficient USDC balance. You have ${formatUnits(balance, 6)} USDC, but need ${options.amount} USDC`
          );
        }

        // Step 2: Prepare payment request with x402 headers
        const paymentRequest = {
          from: address,
          to: options.recipient,
          amount: options.amount,
          token: USDC_ADDRESS,
          chainId: publicClient.chain.id,
          metadata: options.metadata,
        };

        // Step 3: Create x402-axios instance with custom headers
        const x402Client = axios.create({
          headers: {
            'X-402-Protocol': 'USDC-Base',
            'X-402-Version': '1.0',
            'Content-Type': 'application/json',
          },
        });

        // Step 4: Execute the transfer transaction
        console.log('Executing USDC transfer...', paymentRequest);
        
        const hash = await walletClient.writeContract({
          address: USDC_ADDRESS,
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [options.recipient, amountInWei],
          account: address,
        });

        setTransactionHash(hash);
        setStatus((prev) => ({ ...prev, isPending: false, isConfirming: true }));

        // Step 5: Wait for transaction confirmation
        console.log('Waiting for transaction confirmation...', hash);
        
        const receipt = await publicClient.waitForTransactionReceipt({
          hash,
          confirmations: 1,
        });

        if (receipt.status === 'reverted') {
          throw new Error('Transaction reverted');
        }

        // Step 6: Notify x402 backend about the payment (if you have a backend)
        try {
          await x402Client.post('/api/x402/notify', {
            ...paymentRequest,
            transactionHash: hash,
            receipt: {
              blockNumber: receipt.blockNumber.toString(),
              status: receipt.status,
              gasUsed: receipt.gasUsed.toString(),
            },
          });
        } catch (notifyError) {
          // Don't fail the payment if notification fails
          console.warn('Failed to notify x402 backend:', notifyError);
        }

        setStatus({
          isPending: false,
          isConfirming: false,
          isSuccess: true,
          isError: false,
          error: null,
        });

        return {
          success: true,
          transactionHash: hash,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Payment failed';
        
        setStatus({
          isPending: false,
          isConfirming: false,
          isSuccess: false,
          isError: true,
          error: error instanceof Error ? error : new Error(errorMessage),
        });

        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    [address, walletClient, publicClient]
  );

  /**
   * Check USDC balance for the connected wallet
   */
  const checkBalance = useCallback(async (): Promise<string | null> => {
    if (!address || !publicClient) {
      return null;
    }

    try {
      const balance = await publicClient.readContract({
        address: USDC_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [address],
      }) as bigint;

      return formatUnits(balance, 6);
    } catch (error) {
      console.error('Failed to check balance:', error);
      return null;
    }
  }, [address, publicClient]);

  /**
   * Reset the payment status
   */
  const reset = useCallback(() => {
    setStatus({
      isPending: false,
      isConfirming: false,
      isSuccess: false,
      isError: false,
      error: null,
    });
    setTransactionHash(null);
  }, []);

  return {
    executePayment,
    checkBalance,
    reset,
    status,
    transactionHash,
  };
}
