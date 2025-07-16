import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '../components/Sidebar';

export const metadata: Metadata = {
  title: '2025 TECH CHALLENGE - PARC Competition Scoreboard',
  description: 'Live scoreboard for the 2025 TECH CHALLENGE: Phosphate Extraction and Fertilizer Production robotics competition',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50">
        <Sidebar />
        <main className="w-full min-h-screen">{children}</main>
      </body>
    </html>
  )
}