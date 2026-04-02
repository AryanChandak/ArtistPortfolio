"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle, Send } from "lucide-react"
import { Input } from "@/components/ui/input"

const NewsletterSection = () => {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubscribing(true)
    setTimeout(() => {
      setIsSubscribing(false)
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 5000)
    }, 2000)
  }

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 lg:py-40 bg-background border-t border-foreground/[0.06]"
    >
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          {isSubscribed ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8">
              <CheckCircle className="w-7 h-7 text-foreground/35 mb-5" />
              <h2
                className="text-3xl sm:text-4xl font-light text-foreground mb-3"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Welcome
              </h2>
              <p className="text-foreground/38 font-light text-sm">
                You&apos;re subscribed. Check your inbox for a welcome note.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center gap-5 mb-8">
                <div className="w-6 h-px bg-foreground/20" />
                <p className="text-[8px] tracking-[0.55em] uppercase text-foreground/28 font-light">
                  Stay Connected
                </p>
              </div>
              <h2
                className="text-5xl sm:text-6xl font-light text-foreground mb-6 leading-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Stay<br /><em className="italic">Inspired</em>
              </h2>
              <p className="text-foreground/40 font-light text-sm leading-[1.9] mb-10">
                Exclusive insights, early access to new works, and stories from the creative process — delivered quietly to your inbox.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-0 border-b border-foreground/15 pb-px">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-transparent border-0 text-foreground placeholder:text-foreground/20 text-sm rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="text-[9px] tracking-[0.3em] uppercase text-foreground/40 hover:text-foreground disabled:opacity-30 transition-colors pl-4 shrink-0"
                >
                  {isSubscribing ? "..." : "Subscribe"}
                </button>
              </form>
              <p className="text-[8px] tracking-[0.2em] uppercase text-foreground/20 mt-5">
                No spam. Unsubscribe at any time.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default NewsletterSection

