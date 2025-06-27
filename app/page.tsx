"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import PortfolioSection from "@/components/portfolio-section"
import GlobalMapSection from "@/components/global-map-section"
import VisualJournalSection from "@/components/visual-journal-section"
import ContactSection from "@/components/contact-section"
import ShopSection from "@/components/shop-section"
import NewsletterSection from "@/components/newsletter-section"
import Navigation from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-x-hidden">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">The Visual</h1>
                <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto animate-pulse" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoading && (
          <>
            <Navigation />
            <main>
              <HeroSection />
              <AboutSection />
              <PortfolioSection />
              <GlobalMapSection />
              <VisualJournalSection />
              <ContactSection />
              <ShopSection />
              <NewsletterSection />
            </main>
          </>
        )}
      </div>
    </ThemeProvider>
  )
}
