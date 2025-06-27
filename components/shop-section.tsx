"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, ShoppingCart, Star, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  title: string
  description: string
  price: string
  originalPrice?: string
  image: string
  category: string
  rating: number
  reviews: number
  featured: boolean
  externalLink: string
}

const products: Product[] = [
  {
    id: 1,
    title: "Digital Dreams Collection",
    description:
      "A curated set of 10 high-resolution digital artworks exploring the intersection of technology and consciousness.",
    price: "$299",
    originalPrice: "$399",
    image: "/placeholder.svg?height=300&width=300",
    category: "Digital Art",
    rating: 4.9,
    reviews: 127,
    featured: true,
    externalLink: "https://etsy.com/shop/thevisual",
  },
  {
    id: 2,
    title: "Urban Pulse Photography Book",
    description: "A 200-page coffee table book featuring the best of my street photography from around the world.",
    price: "$89",
    image: "/placeholder.svg?height=300&width=300",
    category: "Photography",
    rating: 4.8,
    reviews: 89,
    featured: false,
    externalLink: "https://amazon.com/urban-pulse-photography",
  },
  {
    id: 3,
    title: "Limited Edition Prints Set",
    description:
      "Museum-quality prints of my most popular works, available in various sizes. Limited to 100 copies each.",
    price: "$149",
    originalPrice: "$199",
    image: "/placeholder.svg?height=300&width=300",
    category: "Prints",
    rating: 5.0,
    reviews: 45,
    featured: true,
    externalLink: "https://saatchiart.com/thevisual",
  },
  {
    id: 4,
    title: "Visual Storytelling Course",
    description:
      "Learn my techniques for creating compelling visual narratives. Includes 8 hours of video content and resources.",
    price: "$199",
    image: "/placeholder.svg?height=300&width=300",
    category: "Education",
    rating: 4.7,
    reviews: 234,
    featured: false,
    externalLink: "https://udemy.com/visual-storytelling-masterclass",
  },
  {
    id: 5,
    title: "Nature's Symphony Calendar 2024",
    description: "A premium wall calendar featuring 12 of my finest landscape photographs with inspirational quotes.",
    price: "$29",
    image: "/placeholder.svg?height=300&width=300",
    category: "Merchandise",
    rating: 4.6,
    reviews: 156,
    featured: false,
    externalLink: "https://redbubble.com/people/thevisual",
  },
  {
    id: 6,
    title: "Custom Portrait Commission",
    description: "Personalized digital portrait in my signature style. Perfect for gifts or personal collection.",
    price: "$499",
    image: "/placeholder.svg?height=300&width=300",
    category: "Commission",
    rating: 4.9,
    reviews: 67,
    featured: true,
    externalLink: "mailto:commissions@thevisual.com",
  },
]

const ShopSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const featuredProducts = products.filter((product) => product.featured)
  const regularProducts = products.filter((product) => !product.featured)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : i < rating
              ? "text-yellow-400 fill-current opacity-50"
              : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <section id="shop" ref={ref} className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 rounded-full px-4 py-2">
              <Package className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Art & Merchandise</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Shop
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Take home a piece of my artistic journey with prints, books, and exclusive collections
          </p>
        </motion.div>

        {/* Featured Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">Featured Items</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group relative bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                  Featured
                </Badge>

                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {renderStars(product.rating)}
                      <span className="text-xs sm:text-sm text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl sm:text-2xl font-bold text-purple-600">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm sm:text-lg text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                    >
                      <a href={product.externalLink} target="_blank" rel="noopener noreferrer">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Regular Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">More Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {regularProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="group bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {renderStars(product.rating)}
                      <span className="text-xs sm:text-sm text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-xs sm:text-sm line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg sm:text-xl font-bold text-purple-600">{product.price}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent"
                    >
                      <a href={product.externalLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-12 sm:mt-16 p-6 sm:p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-200 dark:border-purple-800"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Looking for Something Custom?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            I offer personalized commissions and custom artwork tailored to your vision. Let's collaborate to create
            something unique just for you.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-3">
            Request Custom Work
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default ShopSection
