"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const HeroSection = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])

  const scrollToPortfolio = () => {
    const element = document.querySelector("#portfolio")
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen bg-background flex flex-col overflow-hidden"
    >
      {/* â”€â”€ Title zone â”€â”€ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 pt-28 sm:pt-32 pb-10 px-6 sm:px-8 lg:px-16 border-b border-foreground/[0.06]"
      >
        <div className="max-w-screen-2xl mx-auto flex items-end justify-between gap-6">

          {/* Main exhibition title */}
          <div>
            <p className="text-[9px] tracking-[0.55em] uppercase text-foreground/25 mb-5 font-light">
              Opening Exhibition â€” 2026
            </p>
            <h1
              className="font-light text-foreground leading-[0.88] tracking-[-0.01em]"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(4rem, 11vw, 11rem)",
              }}
            >
              The
              <br />
              <em className="italic">Visual</em>
            </h1>
          </div>

          {/* Side descriptor â€” desktop only */}
          <div className="hidden lg:flex flex-col items-end text-right shrink-0 gap-5 pb-2">
            <div className="w-px h-14 bg-foreground/10 ml-auto" />
            <div
              className="text-[9px] tracking-[0.3em] uppercase text-foreground/28 leading-[2.4] font-light"
            >
              <p>Puja Dhanuka</p>
              <p>Visual Artist</p>
              <p>Bangalore, India</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* â”€â”€ Featured artwork â”€â”€ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
          className="relative z-10 px-6 sm:px-8 lg:px-16 py-8 flex flex-col cursor-pointer group"
        onClick={scrollToPortfolio}
      >
        <div className="max-w-screen-2xl mx-auto w-full flex-1 flex flex-col">

          {/* Artwork image */}
          <div className="relative overflow-hidden" style={{ height: 'clamp(300px, 50vh, 600px)' }}>
            <motion.img
              style={{ scale: imgScale }}
              src="/placeholder.svg?height=900&width=1600"
              alt="Forest Cross â€” Featured Artwork"
              className="w-full h-full object-cover"
            />
            {/* Subtle hover layer */}
            <div className="absolute inset-0 bg-background/0 group-hover:bg-foreground/[0.03] transition-colors duration-700" />
          </div>

          {/* Gallery label row */}
          <div className="flex items-start justify-between pt-5 pb-1">
            <div>
              <p className="text-[8px] tracking-[0.45em] uppercase text-foreground/25 mb-1.5">
                I. Featured Work
              </p>
              <p
                className="text-sm font-light text-foreground/70"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Forest Cross, 2026
              </p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); scrollToPortfolio() }}
              className="flex items-center gap-1.5 text-[9px] tracking-[0.3em] uppercase text-foreground/25 hover:text-foreground/60 transition-colors mt-1 group/btn"
            >
              View Works
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
