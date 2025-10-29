export const metadata = {
  title: 'Barclays Tonight',
  description: 'Events at Barclays Center',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
