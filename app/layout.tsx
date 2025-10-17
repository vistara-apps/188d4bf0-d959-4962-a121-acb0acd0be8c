import type { Metadata } from 'next'
import { Providers } from './components/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Predictors - Predict App Success',
  description: 'Predict app success, drive discovery, earn rewards on Base',
  openGraph: {
    title: 'Predictors',
    description: 'Predict app success, drive discovery, earn rewards',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
