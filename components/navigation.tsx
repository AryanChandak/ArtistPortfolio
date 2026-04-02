"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Menu, X, ShoppingBag } from "lucide-react"
import { useTheme } from "next-themes"
import { useCart } from "./cart-context"

const navItems = [
  { name: "Works", href: "#portfolio" },
  { name: "About", href: "#about" },
  { name: "Journal", href: "#journal" },
  { name: "Shop", href: "#shop" },
  { name: "Contact", href: "#contact" },
]

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { totalItems, setIsCartOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-foreground/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Brand */}
          <button
            onClick={() => scrollToSection("#hero")}
            className="transition-opacity hover:opacity-50 duration-300"
          >
            <span
              className="text-[11px] tracking-[0.38em] uppercase font-light text-foreground"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              The Visual
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-[10px] tracking-[0.22em] uppercase text-foreground/35 hover:text-foreground transition-colors duration-300 relative group py-1"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground/30 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden md:flex text-foreground/30 hover:text-foreground transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-foreground/30 hover:text-foreground transition-colors duration-300"
              aria-label="Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-foreground text-background text-[7px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="md:hidden text-foreground/40 hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-background border-t border-foreground/[0.06] overflow-hidden"
          >
            <div className="max-w-screen-2xl mx-auto px-6 py-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-[10px] tracking-[0.25em] uppercase text-foreground/40 hover:text-foreground transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => { setTheme(theme === "dark" ? "light" : "dark"); setIsMobileMenuOpen(false) }}
                className="text-left text-[10px] tracking-[0.25em] uppercase text-foreground/25 hover:text-foreground/60 transition-colors mt-2 pt-4 border-t border-foreground/[0.06]"
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navigation

