import './globals.css'
import '@/styles/GlobalColors.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import UserStoreInit from '@/stores/userStoreInit'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Almaklist',
  description: 'Manage shopping lists together',
  manifest: '/manifest.json'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/Logo.ico' sizes='any' />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FFF7F5" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#161925" />
      </head>
      <body className={inter.className}>
        <UserStoreInit />
        {children}
      </body>
    </html>
  )
}
