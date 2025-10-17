# Predictors - Base Mini App

A social prediction market for speculating on the future success of apps, integrated directly into Farcaster and powered by Base.

## Features

- **Yes/No Share Trading**: Buy and sell prediction shares for app success
- **Dynamic Discovery Feed**: Personalized feed of emerging apps ranked by market odds
- **Farcaster Integration**: Native Farcaster Frames for seamless social participation
- **X402 Payment Integration**: USDC payments on Base with full transaction tracking
- **Gasless Trading**: Smooth, gas-sponsored trading experience with instant confirmations
- **Real-time Updates**: Live market data and notifications

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (L2 on Ethereum)
- **Wallet**: Wagmi v2 + OnchainKit for wallet integration
- **Payments**: X402 protocol with USDC on Base
- **Social**: Farcaster MiniKit for social features
- **Styling**: Tailwind CSS with BASE theme
- **TypeScript**: Full type safety

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

3. Add your OnchainKit API key to `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── api/
│   └── x402/
│       └── notify/     # X402 payment notifications
├── components/          # React components
│   ├── AppShell.tsx    # Main layout wrapper
│   ├── Header.tsx      # Top navigation with wallet
│   ├── Sidebar.tsx     # Side navigation
│   ├── HeroSection.tsx # Hero with stats
│   ├── TrendingChart.tsx # Market chart
│   ├── DiscoveryFeed.tsx # App discovery
│   ├── MarketStats.tsx # Market statistics
│   ├── PaymentDemo.tsx # X402 payment testing
│   └── Providers.tsx   # Wagmi & OnchainKit providers
├── config/
│   ├── wagmi.ts        # Wagmi configuration
│   └── constants.ts    # USDC contract & ABIs
├── hooks/
│   └── useX402Payment.ts # Payment hook
├── layout.tsx          # Root layout
├── page.tsx           # Home page
└── globals.css        # Global styles

public/
└── .well-known/
    └── farcaster.json # Farcaster manifest
```

## Design System

- **Theme**: BASE (dark blue background, Base blue accents)
- **Colors**: CSS variables for easy theming
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent 8px grid system
- **Animations**: Smooth transitions with cubic-bezier easing

## X402 Payment Integration

This project includes a complete x402 payment flow for USDC on Base. See detailed documentation:

- **[X402_IMPLEMENTATION.md](./X402_IMPLEMENTATION.md)** - Complete implementation guide
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Quick summary

### Quick Test

1. Connect your wallet (Coinbase Wallet recommended)
2. Find the "X402 Payment Demo" card on the main page
3. Enter amount and recipient address
4. Click "Send Payment" and approve in wallet
5. Watch transaction confirmation in real-time

### Features

- ✅ Wagmi useWalletClient integration
- ✅ USDC on Base support (0x833589...2913)
- ✅ Transaction confirmation tracking
- ✅ Comprehensive error handling
- ✅ Real-time status updates
- ✅ X402 protocol headers
- ✅ Backend notification endpoint

## Deployment

Deploy to Vercel:

```bash
npm run build
npm start
```

Or deploy directly:
- **Production**: https://app-acd0be8c-c31x.vercel.app

## License

MIT
