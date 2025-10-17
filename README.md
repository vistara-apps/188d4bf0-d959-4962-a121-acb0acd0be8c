# Predictors - Base Mini App

A social prediction market for speculating on the future success of apps, integrated directly into Farcaster and powered by Base.

## Features

- **Yes/No Share Trading**: Buy and sell prediction shares for app success
- **Dynamic Discovery Feed**: Personalized feed of emerging apps ranked by market odds
- **Farcaster Integration**: Native Farcaster Frames for seamless social participation
- **Gasless Trading**: Smooth, gas-sponsored trading experience with instant confirmations
- **Real-time Updates**: Live market data and notifications

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (L2 on Ethereum)
- **Wallet**: OnchainKit for wallet integration
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
├── components/          # React components
│   ├── AppShell.tsx    # Main layout wrapper
│   ├── Header.tsx      # Top navigation
│   ├── Sidebar.tsx     # Side navigation
│   ├── HeroSection.tsx # Hero with stats
│   ├── TrendingChart.tsx # Market chart
│   ├── DiscoveryFeed.tsx # App discovery
│   └── MarketStats.tsx # Market statistics
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

## Deployment

Deploy to Vercel:

```bash
npm run build
```

## License

MIT
