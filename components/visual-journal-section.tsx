"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

const journalEntries: JournalEntry[] = [
  {
    id: 1,
    title: "The Evolution of Digital Art in the Modern Era",
    excerpt:
      "Exploring how technology has transformed the way we create and perceive art, from traditional mediums to digital canvases.",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Digital Art",
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: 2,
    title: "Capturing Emotions Through Street Photography",
    excerpt:
      "The art of finding extraordinary moments in ordinary life and the techniques that make street photography so compelling.",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Photography",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: 3,
    title: "Color Theory in Visual Storytelling",
    excerpt:
      "Understanding how colors influence emotions and narrative in visual art, and practical applications for artists.",
    date: "2024-01-05",
    readTime: "10 min read",
    category: "Theory",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: 4,
    title: "Behind the Scenes: My Latest Exhibition",
    excerpt:
      "A personal journey through the creation and curation of my recent solo exhibition, including challenges and breakthroughs.",
    date: "2023-12-28",
    readTime: "12 min read",
    category: "Personal",
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: 5,
    title: "The Future of Immersive Art Experiences",
    excerpt:
      "Exploring virtual reality, augmented reality, and interactive installations as the next frontier in artistic expression.",
    date: "2023-12-20",
    readTime: "7 min read",
    category: "Technology",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: 6,
    title: "Finding Inspiration in Unexpected Places",
    excerpt: "How everyday moments and overlooked details can spark creative breakthroughs and artistic innovation.",
    date: "2023-12-15",
    readTime: "5 min read",
    category: "Inspiration",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
]

const VisualJournalSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const featuredEntry = journalEntries.find((entry) => entry.featured)
  const regularEntries = journalEntries.filter((entry) => !entry.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section id="journal" ref={ref} className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 rounded-full px-4 py-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Insights & Stories</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Visual Journal
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts, insights, and stories from my artistic journey
          </p>
        </motion.div>

        {/* Featured Article */}
        {featuredEntry && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 sm:mb-16"
          >
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 sm:p-8 border border-purple-200 dark:border-purple-800">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">Featured</Badge>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">{featuredEntry.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-base sm:text-lg">{featuredEntry.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(featuredEntry.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredEntry.readTime}
                    </div>
                    <Badge variant="outline">{featuredEntry.category}</Badge>
                  </div>
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="relative order-1 lg:order-2">
                  <img
                    src={featuredEntry.image || "/placeholder.svg"}
                    alt={featuredEntry.title}
                    className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Articles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {regularEntries.map((entry, index) => (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={entry.image || "/placeholder.svg"}
                    alt={entry.title}
                    className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="text-xs">
                      {entry.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                    {entry.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base line-clamp-3">
                    {entry.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {formatDate(entry.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      {entry.readTime}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent px-6 sm:px-8"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default VisualJournalSection
