import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PARC Dashboard",
  description: "PARC Competition Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <a href="/" className="text-xl font-bold text-orange-600">
                  PARC Dashboard
                </a>
                <div className="hidden md:flex space-x-6">
                  <a href="/games" className="text-gray-700 hover:text-orange-600 transition-colors">
                    Games
                  </a>
                  <a href="/stars/scoring" className="text-gray-700 hover:text-orange-600 transition-colors">
                    Stars Scoring
                  </a>
                  <a href="/tech/scoring" className="text-gray-700 hover:text-orange-600 transition-colors">
                    Tech Scoring
                  </a>
                  <a href="/public" className="text-gray-700 hover:text-orange-600 transition-colors">
                    Public Scoreboard
                  </a>
                  <a href="/tournament" className="text-gray-700 hover:text-orange-600 transition-colors">
                    Tournament
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}