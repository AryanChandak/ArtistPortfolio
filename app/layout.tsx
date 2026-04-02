import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "The Visual - Contemporary Visual Artist & Storyteller",
  description:
    "Where Art Meets Innovation. Explore the portfolio of The Visual - a contemporary artist specializing in digital art, photography, and immersive visual experiences that inspire and transcend boundaries.",
  keywords:
    "visual artist, digital art, photography, contemporary art, visual storytelling, art portfolio, creative design, The Visual",
  authors: [{ name: "Puja Dhanuka" }],
  creator: "Puja Dhanuka",
  publisher: "Puja Dhanuka",
  openGraph: {
    title: "The Visual - Contemporary Visual Artist & Storyteller",
    description: "Where Art Meets Innovation • Visual Stories That Inspire",
    url: "https://thevisual.com",
    siteName: "The Visual",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "The Visual - Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Visual - Contemporary Visual Artist & Storyteller",
    description: "Where Art Meets Innovation • Visual Stories That Inspire",
    images: ["/placeholder.svg?height=630&width=1200"],
    creator: "@thevisual",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

import ClientLayout from "@/components/client-layout"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://thevisual.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
