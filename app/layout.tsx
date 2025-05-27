import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aurith AI',
  description: 'Created by Aurith AI',
  generator: 'Aurith AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
