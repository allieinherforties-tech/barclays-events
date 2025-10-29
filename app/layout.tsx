export const metadata = {
  title: 'Barclays Tonight - Brooklyn Events',
  description: 'Discover upcoming events at Barclays Center in Brooklyn',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
