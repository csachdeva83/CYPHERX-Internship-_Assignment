import { ThemeProvider } from '@/components/providers/theme-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'Kanban board application created by Cherish Sachdeva',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
            <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                storageKey='theme'
            >
                {children}
            </ThemeProvider>
        </body>
    </html>
  )
}
