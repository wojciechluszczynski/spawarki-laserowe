import type { Metadata } from 'next'
import { Rubik, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { FloatingCta } from '@/components/ui/FloatingCta'
import { Analytics } from '@vercel/analytics/next'

const rubik = Rubik({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-rubik',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Spawarki laserowe fiber - katalog, porownania, poradniki zakupowe',
  description: 'Katalog spawarek laserowych BLink Laser: specyfikacje, porownania modeli i poradniki zakupowe. Doradztwo techniczne dla firm produkcyjnych.',
  openGraph: {
    title: 'Spawarki laserowe fiber - katalog i porownania',
    description: 'Katalog spawarek laserowych BLink Laser z porownanami i poradnikami zakupowymi.',
    images: ['/og/og-default.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${rubik.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCta />
        <Analytics />
      </body>
    </html>
  )
}
