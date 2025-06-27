"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { X, ExternalLink, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PortfolioItem {
  id: number
  title: string
  category: string
  image: string
  description: string
  tags: string[]
  year: string
  client?: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Digital Dreams",
    category: "Digital Art",
    image: "/placeholder.svg?height=400&width=600",
    description: "An exploration of digital consciousness through abstract visual narratives.",
    tags: ["Digital Art", "Abstract", "Conceptual"],
    year: "2024",
    client: "Personal Project",
  },
  {
    id: 2,
    title: "Urban Pulse",
    category: "Photography",
    image: "/placeholder.svg?height=400&width=600",
    description: "Capturing the rhythm and energy of metropolitan life.",
    tags: ["Photography", "Urban", "Street"],
    year: "2023",
    client: "City Magazine",
  },
  {
    id: 3,
    title: "Nature's Symphony",
    category: "Photography",
    image: "/placeholder.svg?height=400&width=600",
    description: "A visual journey through untouched landscapes and natural wonders.",
    tags: ["Photography", "Nature", "Landscape"],
    year: "2024",
    client: "National Geographic",
  },
  {
    id: 4,
    title: "Neon Futures",
    category: "Digital Art",
    image: "/placeholder.svg?height=400&width=600",
    description: "Cyberpunk-inspired visions of tomorrow's world.",
    tags: ["Digital Art", "Cyberpunk", "Futuristic"],
    year: "2023",
    client: "Tech Conference",
  },
  {
    id: 5,
    title: "Human Connections",
    category: "Portrait",
    image: "/placeholder.svg?height=400&width=600",
    description: "Intimate portraits exploring human emotion and connection.",
    tags: ["Portrait", "Emotion", "Human"],
    year: "2024",
    client: "Art Gallery",
  },
  {
    id: 6,
    title: "Abstract Realms",
    category: "Digital Art",
    image: "/placeholder.svg?height=400&width=600",
    description: "Pushing the boundaries of digital expression and form.",
    tags: ["Digital Art", "Abstract", "Experimental"],
    year: "2023",
    client: "Design Studio",
  },
]

const categories = ["All", "Digital Art", "Photography", "Portrait"]

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const filteredItems =
    selectedCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === selectedCategory)

  return (
    <section id="portfolio" ref={ref} className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Portfolio
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A curated collection of visual stories that define my artistic journey
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm sm:text-base px-4 sm:px-6 py-2 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 aspect-[4/3]">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.category}</p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.title}
                    className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-t-2xl"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                    onClick={() => setSelectedItem(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {selectedItem.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs sm:text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{selectedItem.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
                    {selectedItem.description}
                  </p>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500 dark:text-gray-400 mb-6 gap-2">
                    <span>Year: {selectedItem.year}</span>
                    <span>Client: {selectedItem.client}</span>
                  </div>

                  <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Full Project
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default PortfolioSection
