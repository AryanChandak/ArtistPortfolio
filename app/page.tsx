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

// Smooth scroll-reveal wrapper
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 1,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Quick elegant loader
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loader"
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center overflow-hidden"
            >
              <div className="text-center overflow-hidden mb-6">
                <motion.h1
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-[var(--font-playfair)] text-6xl md:text-8xl font-light text-foreground leading-tight"
                >
                  The <span className="text-primary italic pr-4">Visual</span>
                </motion.h1>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[300px] h-[1px] bg-primary/40 mx-auto"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navigation />
            <main>
              <HeroSection />

              <ScrollReveal>
                <AboutSection />
              </ScrollReveal>

              <ScrollReveal>
                <PortfolioSection />
              </ScrollReveal>

              <ScrollReveal>
                <ShopSection />
              </ScrollReveal>

              <ScrollReveal>
                <GlobalMapSection />
              </ScrollReveal>

              <ScrollReveal>
                <VisualJournalSection />
              </ScrollReveal>

              <ScrollReveal>
                <ContactSection />
              </ScrollReveal>

              <ScrollReveal>
                <NewsletterSection />
              </ScrollReveal>
            </main>
          </motion.div>
        )}
      </div>
  )
}
