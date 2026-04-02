"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import ImageLightbox from "@/components/image-lightbox"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"

interface PortfolioItem {
  id: string
  title: string
  category: string
  image: string
  description: string
  tags: string[]
  year: string
  client?: string
}

const categories = ["All", "Digital Art", "Photography", "Portrait", "Prints", "Commission"]

const PortfolioSection = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    const fetchPortfolio = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("portfolio_items").select("*").order("created_at", { ascending: false })
      if (data) setPortfolioItems(data)
    }
    fetchPortfolio()
  }, [])

  const filteredItems =
    selectedCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory)

  return (
    <section id="portfolio" ref={ref} className="py-24 sm:py-32 lg:py-40 bg-background border-t border-foreground/[0.06]">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 sm:mb-18"
        >
          <div className="flex items-center gap-5 mb-8">
            <div className="w-6 h-px bg-foreground/20" />
            <p className="text-[8px] tracking-[0.55em] uppercase text-foreground/28 font-light">
              Selected Works
            </p>
          </div>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-light text-foreground leading-[1.05]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Portfolio
          </h2>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-8 mb-12 border-b border-foreground/[0.06] pb-5"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-[10px] tracking-[0.22em] uppercase pb-2 transition-all duration-300 relative ${
                selectedCategory === category
                  ? "text-foreground"
                  : "text-foreground/28 hover:text-foreground/55"
              }`}
            >
              {category}
              {selectedCategory === category && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute -bottom-[21px] left-0 right-0 h-px bg-foreground/35"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Gallery grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-14 lg:gap-y-18">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                {/* Artwork image */}
                <div className="relative overflow-hidden bg-muted aspect-[4/5] mb-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] filter saturate-90 group-hover:saturate-100"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.04] transition-colors duration-500" />
                </div>

                {/* Gallery label */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[8px] tracking-[0.4em] uppercase text-foreground/22 mb-1.5 font-light">
                      {item.year}{item.client ? ` Â· ${item.client}` : ` Â· ${item.category}`}
                    </p>
                    <h3
                      className="text-base font-light text-foreground/80 group-hover:text-foreground transition-colors duration-300 truncate"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-foreground/15 group-hover:text-foreground/40 transition-colors mt-[18px] shrink-0" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
            <p
              className="text-foreground/22 font-light italic"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              No works curated in this category yet.
            </p>
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedItem && (
            <ImageLightbox
              src={selectedItem.image || "/placeholder.svg"}
              alt={selectedItem.title}
              onClose={() => setSelectedItem(null)}
              infoPanel={
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {selectedItem.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedItem.tags.map((tag) => (
                          <span key={tag} className="text-[9px] uppercase tracking-[0.22em] text-foreground/50 border border-border px-2 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3
                      className="text-3xl sm:text-4xl font-light mb-4 text-foreground leading-tight"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {selectedItem.title}
                    </h3>
                    <div className="w-8 h-px bg-foreground/15 mb-6" />
                    <p className="text-foreground/55 mb-8 text-sm leading-relaxed font-light">
                      {selectedItem.description}
                    </p>
                    <div className="flex flex-col gap-3 text-[10px] tracking-widest text-foreground/35 mb-8 uppercase border-t border-border pt-6">
                      {selectedItem.year && (
                        <div className="flex justify-between">
                          <span>Year</span>
                          <span className="text-foreground/65">{selectedItem.year}</span>
                        </div>
                      )}
                      {selectedItem.client && (
                        <div className="flex justify-between">
                          <span>Client</span>
                          <span className="text-foreground/65">{selectedItem.client}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Category</span>
                        <span className="text-foreground/65">{selectedItem.category}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-foreground text-background hover:bg-foreground/85 text-[10px] tracking-[0.25em] uppercase py-6 rounded-none transition-all duration-300">
                    <ExternalLink className="w-3.5 h-3.5 mr-3" />
                    View Exhibition
                  </Button>
                </div>
              }
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default PortfolioSection
