import Script from 'next/script'

export const metadata = {
  title: 'Barclays Tonight | Brooklyn Events, Concerts & Shows at Barclays Center',
  description: 'Find tonight\'s events at Barclays Center in Brooklyn. Live concerts, sports games, family shows, and more. Updated daily with tickets and showtimes.',
  keywords: 'Barclays Center, Brooklyn events, Barclays Center tonight, Brooklyn concerts, Nets games, Brooklyn sports, Barclays Center schedule',
  openGraph: {
    title: 'Barclays Tonight - Brooklyn Events at Barclays Center',
    description: 'Your guide to what\'s happening at Barclays Center tonight and this week',
    siteName: 'Barclays Tonight',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barclays Tonight - Brooklyn Events',
    description: 'Find tonight\'s events at Barclays Center in Brooklyn',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  )
}
