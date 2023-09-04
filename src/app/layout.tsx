import './globals.css'
import '@/styles/GlobalColors.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Almaklist',
  description: 'Manage shopping lists together'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
