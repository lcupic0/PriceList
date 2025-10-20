import type { Metadata } from 'next'
import clsx from "clsx";
import { 
  Inter,
  Montserrat,
  Josefin_Sans,
  Dancing_Script,
  Metrophobic,
  News_Cycle
} from 'next/font/google'
import './globals.css'
import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/footer/Footer';
import {pages} from '@/config'

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
});
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script", 
})
const metrophobic = Metrophobic({
  subsets: ["latin"],
  variable: "--font-metrophobic",
  weight: "400",
})
const newsCycle = News_Cycle({
  subsets: ["latin"],
  variable: "--font-news-cycle",
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Caffe Bar Korolar | Cjenik',
  description: 'Potpuni cjenik za Caffe Bar Korolar - Split.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(montserrat.variable, josefinSans.variable, dancingScript.variable, metrophobic.variable, newsCycle.variable)}
    >
      <body>
        <div className="layout">
          <Navigation />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}