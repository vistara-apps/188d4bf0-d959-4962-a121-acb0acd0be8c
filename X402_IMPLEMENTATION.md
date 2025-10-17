# X402 Payment Flow Implementation

## Overview
This implementation provides a complete x402 payment flow using wagmi's `useWalletClient` and x402-axios for USDC payments on Base.

## Architecture

### Core Components

#### 1. Wagmi Configuration (`app/config/wagmi.ts`)
- Configures wagmi with Base chain
- Sets up Coinbase Wallet connector with Smart Wallet support
- Provides injected wallet support

#### 2. Payment Hook (`app/hooks/useX402Payment.ts`)
The main payment hook that provides:
- `executePayment()` - Executes USDC transfers with x402 protocol headers
- `checkBalance()` - Retrieves USDC balance for connected wallet
- `reset()` - Resets payment state
- `status` - Current payment status (pending, confirming, success, error)
- `transactionHash` - Transaction hash when available

#### 3. Payment Demo Component (`app/components/PaymentDemo.tsx`)
Interactive UI for testing payments with:
- Wallet connection status
- Balance display
- Amount and recipient inputs
- Transaction status tracking
- Error handling display

#### 4. Updated Header (`app/components/Header.tsx`)
- Wallet connection/disconnection
- Address display
- Connection status indicator

#### 5. Backend Endpoint (`app/api/x402/notify/route.ts`)
- Receives payment notifications
- Validates x402 protocol headers
- Logs payment details (ready for database integration)

## Features Implemented

### ✅ Wagmi Integration
- [x] useWalletClient for transaction signing
- [x] useAccount for wallet state
- [x] usePublicClient for blockchain reads
- [x] Proper wagmi configuration with Base chain

### ✅ X402 Protocol
- [x] X402-axios integration with custom headers
- [x] Protocol version headers (X-402-Protocol, X-402-Version)
- [x] Payment metadata support
- [x] Backend notification endpoint

### ✅ USDC on Base
- [x] USDC contract integration (0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
- [x] ERC20 token ABI
- [x] Balance checking
- [x] Transfer functionality
- [x] Proper decimal handling (6 decimals for USDC)

### ✅ Transaction Confirmation
- [x] Transaction hash tracking
- [x] Confirmation waiting with `waitForTransactionReceipt`
- [x] Receipt validation
- [x] Block number and gas tracking
- [x] Real-time status updates

### ✅ Error Handling
- [x] Wallet connection validation
- [x] Balance checking before payment
- [x] Transaction revert detection
- [x] User-friendly error messages
- [x] Graceful failure handling
- [x] Backend notification fallback

## Testing Guide

### Prerequisites
1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (optional):
   ```bash
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key
   ```

3. Build the project:
   ```bash
   npm run build
   ```

### Running the Application

1. Start development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)

### Test Scenarios

#### 1. Wallet Connection Test
- Click "Connect Wallet" button
- Approve wallet connection
- Verify address displays in header
- Check that PaymentDemo shows your USDC balance

#### 2. Balance Check Test
- Ensure wallet is connected
- Verify USDC balance displays correctly
- Balance should show with 6 decimal precision

#### 3. Successful Payment Test
**Setup:**
- Have USDC in your wallet on Base
- Use a valid recipient address

**Steps:**
1. Enter amount (e.g., "10")
2. Enter recipient address
3. Click "Send Payment"
4. Approve transaction in wallet
5. Wait for confirmation

**Expected:**
- Status changes: Preparing → Confirming → Success
- Transaction hash appears with Basescan link
- Balance updates after payment
- Backend receives notification (check logs)

#### 4. Insufficient Balance Test
**Setup:**
- Enter amount larger than your balance

**Steps:**
1. Enter large amount
2. Click "Send Payment"

**Expected:**
- Error message with current balance and required amount
- No transaction submitted
- Payment status shows error

#### 5. Invalid Recipient Test
**Setup:**
- Leave recipient as 0x000...000 or use invalid address

**Steps:**
1. Try to send payment

**Expected:**
- Alert about invalid recipient
- No transaction attempted

#### 6. Transaction Rejection Test
**Setup:**
- Start a payment

**Steps:**
1. Reject transaction in wallet

**Expected:**
- Error status
- User-friendly error message
- Ability to retry

#### 7. Network Error Test
**Setup:**
- Disconnect internet or switch to wrong network

**Steps:**
1. Try to execute payment

**Expected:**
- Appropriate error message
- No funds lost
- Clean error recovery

### Backend Testing

#### Test X402 Notification Endpoint

**Check Status:**
```bash
curl http://localhost:3000/api/x402/notify
```

**Expected Response:**
```json
{
  "status": "operational",
  "protocol": "X402",
  "version": "1.0",
  "supportedChains": ["base"],
  "supportedTokens": ["USDC"]
}
```

**Simulate Payment Notification:**
```bash
curl -X POST http://localhost:3000/api/x402/notify \
  -H "Content-Type: application/json" \
  -H "X-402-Protocol: USDC-Base" \
  -H "X-402-Version: 1.0" \
  -d '{
    "from": "0x...",
    "to": "0x...",
    "amount": "10",
    "transactionHash": "0x...",
    "chainId": 8453,
    "metadata": {
      "purpose": "test"
    }
  }'
```

## Implementation Details

### Payment Flow Sequence

1. **Initialization**
   - User connects wallet via wagmi
   - Hook fetches USDC balance
   - UI displays current state

2. **Payment Request**
   - User enters amount and recipient
   - Validation checks run
   - Balance verified

3. **Transaction Preparation**
   - Amount converted to 6-decimal format
   - X402 headers prepared
   - Payment metadata attached

4. **Transaction Execution**
   - `walletClient.writeContract()` called
   - User approves in wallet
   - Transaction hash received

5. **Confirmation**
   - `waitForTransactionReceipt()` monitors transaction
   - Status updates in real-time
   - Receipt validated

6. **Notification**
   - Backend endpoint receives payment details
   - Transaction logged
   - (Optional) Database updated

### Key Code Patterns

**Balance Checking:**
```typescript
const balance = await publicClient.readContract({
  address: USDC_ADDRESS,
  abi: ERC20_ABI,
  functionName: 'balanceOf',
  args: [address],
}) as bigint;
```

**Transaction Execution:**
```typescript
const hash = await walletClient.writeContract({
  address: USDC_ADDRESS,
  abi: ERC20_ABI,
  functionName: 'transfer',
  args: [recipient, amountInWei],
  account: address,
});
```

**X402 Headers:**
```typescript
const x402Client = axios.create({
  headers: {
    'X-402-Protocol': 'USDC-Base',
    'X-402-Version': '1.0',
    'Content-Type': 'application/json',
  },
});
```

## Troubleshooting

### Common Issues

**"Wallet not connected"**
- Ensure wallet is connected via header button
- Check that wagmi provider is properly configured
- Verify wallet supports Base network

**"Insufficient USDC balance"**
- Check actual USDC balance on Base
- Verify you're on Base network (chainId: 8453)
- Ensure amount includes proper decimals

**Transaction fails**
- Check gas balance (need ETH on Base for gas)
- Verify recipient address is valid
- Confirm USDC contract address is correct

**Backend notification fails**
- Check API route is accessible
- Verify x402 headers are correct
- Review server logs for errors

## Next Steps

### Production Enhancements
1. Add database for payment tracking
2. Implement webhook system for external notifications
3. Add payment analytics and reporting
4. Implement retry logic for failed notifications
5. Add payment receipt generation
6. Integrate with accounting systems

### Security Improvements
1. Add rate limiting to API endpoints
2. Implement signature verification for notifications
3. Add transaction validation
4. Monitor for suspicious patterns
5. Add audit logging

### UX Improvements
1. Add payment history
2. Implement saved recipient addresses
3. Add QR code scanning
4. Show gas estimates
5. Add payment scheduling

## Resources

- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)
- [Base Documentation](https://docs.base.org/)
- [USDC on Base](https://basescan.org/address/0x833589fcd6edb6e08f4c7c32d4f71b54bda02913)
- [OnchainKit](https://onchainkit.xyz/)

## Support

For issues or questions:
1. Check console logs for detailed error messages
2. Review transaction on Basescan
3. Verify wallet configuration
4. Test with small amounts first
