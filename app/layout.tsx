import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ subsets: ['latin'], variable: '--font-poppins', weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Mernache Meubles | Mobilier & savoir-faire depuis 1993',
  description: 'Mernache Meubles, maison de mobilier et de savoir-faire à Bejaïa, Algérie. Collections, mobilier sur mesure et showroom depuis 1993.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#084F53',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr" className="bg-white"><body className={`${inter.variable} ${poppins.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
