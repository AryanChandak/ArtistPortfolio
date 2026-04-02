"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Calendar, ArrowUpRight } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import ImageLightbox from "@/components/image-lightbox"

interface JournalEntry {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: string
  featured: boolean
}

const VisualJournalSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [lightboxEntry, setLightboxEntry] = useState<JournalEntry | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) {
          setJournalEntries(
            data.map((row) => ({
              id: row.id,
              title: row.title,
              excerpt: row.excerpt,
              date: row.date,
              readTime: row.read_time ?? '',
              category: row.category,
              image: row.image || '/placeholder.svg?height=300&width=400',
              featured: row.featured ?? false,
            }))
          )
        }
      })
  }, [])

  const featuredEntry = journalEntries.find((entry) => entry.featured)
  const regularEntries = journalEntries.filter((entry) => !entry.featured)

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section id="journal" ref={ref} className="py-24 sm:py-32 lg:py-40 bg-background border-t border-foreground/[0.06]">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 sm:mb-20"
        >
          <div className="flex items-center gap-5 mb-8">
            <div className="w-6 h-px bg-foreground/20" />
            <p className="text-[8px] tracking-[0.55em] uppercase text-foreground/28 font-light">
              Insights &amp; Stories
            </p>
          </div>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-light text-foreground leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Visual Journal
          </h2>
        </motion.div>

        {/* Featured entry â€” horizontal */}
        {featuredEntry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-16 sm:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center border-b border-foreground/[0.06] pb-16 sm:pb-20"
          >
            <div
              className="relative overflow-hidden bg-muted aspect-[4/3] cursor-pointer group"
              onClick={() => setLightboxEntry(featuredEntry)}
            >
              <img
                src={featuredEntry.image || "/placeholder.svg"}
                alt={featuredEntry.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] filter saturate-90 group-hover:saturate-100"
              />
            </div>
            <div>
              <p className="text-[8px] tracking-[0.4em] uppercase text-foreground/25 mb-4">
                {featuredEntry.category} Â· {formatDate(featuredEntry.date)}
              </p>
              <h3
                className="text-3xl sm:text-4xl font-light text-foreground leading-tight mb-5"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {featuredEntry.title}
              </h3>
              <p className="text-foreground/45 font-light leading-[1.8] text-sm mb-8">
                {featuredEntry.excerpt}
              </p>
              <button
                onClick={() => setLightboxEntry(featuredEntry)}
                className="inline-flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase text-foreground/35 hover:text-foreground transition-colors"
              >
                Read More <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Regular entries grid */}
        {regularEntries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-12"
          >
            {regularEntries.map((entry, index) => (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + index * 0.07 }}
                className="group cursor-pointer"
                onClick={() => setLightboxEntry(entry)}
              >
                <div className="relative overflow-hidden bg-muted aspect-[4/3] mb-4">
                  <img
                    src={entry.image || "/placeholder.svg"}
                    alt={entry.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] filter saturate-90 group-hover:saturate-100"
                  />
                </div>
                <p className="text-[8px] tracking-[0.35em] uppercase text-foreground/22 mb-2">
                  {entry.category} Â· {formatDate(entry.date)}
                </p>
                <h3
                  className="text-base font-light text-foreground group-hover:text-foreground/60 transition-colors leading-snug"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {entry.title}
                </h3>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Empty state */}
        {journalEntries.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
            <p className="text-foreground/25 font-light italic" style={{ fontFamily: "var(--font-playfair), serif" }}>
              No journal entries yet.
            </p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {lightboxEntry && (
          <ImageLightbox
            src={lightboxEntry.image || "/placeholder.svg"}
            alt={lightboxEntry.title}
            onClose={() => setLightboxEntry(null)}
            infoPanel={
              <div className="flex flex-col h-full justify-between">
                <div>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-foreground/35 border border-border px-2.5 py-1">
                    {lightboxEntry.category}
                  </span>
                  <h2 className="text-3xl mt-5 mb-3 text-foreground font-light leading-tight"
                      style={{ fontFamily: "var(--font-playfair), serif" }}>
                    {lightboxEntry.title}
                  </h2>
                  <div className="w-8 h-px bg-foreground/15 mb-5" />
                  <p className="text-foreground/45 text-sm font-light leading-relaxed mb-6">
                    {lightboxEntry.excerpt}
                  </p>
                  <p className="text-[9px] tracking-[0.25em] uppercase text-foreground/25">
                    {formatDate(lightboxEntry.date)}
                    {lightboxEntry.readTime ? ` Â· ${lightboxEntry.readTime} read` : ""}
                  </p>
                </div>
              </div>
            }
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default VisualJournalSection
