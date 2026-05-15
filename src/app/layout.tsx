import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { FloatingCta } from '@/components/ui/FloatingCta'
import { Analytics } from '@vercel/analytics/next'
import settings from '../../content/site/settings.json'

const rubik = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['400', '500', '600', '700'],
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

const { ga4, gtm, googleAds, metaPixel } = settings.analytics

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${rubik.variable} ${inter.variable}`}>
      <head>
        {/* Google Tag Manager */}
        {gtm && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
          </Script>
        )}
        {/* Google Analytics GA4 */}
        {ga4 && !gtm && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}');`}
            </Script>
          </>
        )}
        {/* Google Ads */}
        {googleAds && !gtm && (
          <Script id="gads" strategy="afterInteractive">
            {`gtag('config','${googleAds}');`}
          </Script>
        )}
        {/* Meta Pixel */}
        {metaPixel && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixel}');fbq('track','PageView');`}
          </Script>
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        {gtm && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtm}`}
              height="0" width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCta />
        <Analytics />
      </body>
    </html>
  )
}
