"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ShoppingBag, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { useCart } from "./cart-context"
import ImageLightbox from "@/components/image-lightbox"

interface Product {
  id: string
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

const ShopSection = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [lightboxProduct, setLightboxProduct] = useState<Product | null>(null)
  const { addToCart } = useCart()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    const fetchShopItems = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('shop_items').select('*').order('created_at', { ascending: false })
      if (data) {
        const formatted = data.map(item => ({
          ...item,
          originalPrice: item.original_price,
          externalLink: item.external_link
        }))
        setProducts(formatted)
      }
    }
    fetchShopItems()
  }, [])

  return (
    <section id="shop" ref={ref} className="py-24 sm:py-32 lg:py-40 bg-card border-t border-foreground/[0.06]">
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
              Available Editions
            </p>
          </div>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-light text-foreground leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Shop
          </h2>
        </motion.div>

        {/* Products grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="group cursor-pointer"
                onClick={() => setLightboxProduct(product)}
              >
                <div className="relative overflow-hidden bg-muted aspect-[4/5] mb-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] filter saturate-90 group-hover:saturate-100"
                  />
                  {product.featured && (
                    <div className="absolute top-3 left-3 text-[7px] tracking-[0.3em] uppercase bg-foreground text-background px-2.5 py-1.5">
                      Edition
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[8px] tracking-[0.3em] uppercase text-foreground/25 mb-1">
                      {product.category}
                    </p>
                    <h3
                      className="text-base font-light text-foreground truncate group-hover:text-foreground/60 transition-colors duration-300"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {product.title}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-sm font-light text-foreground/70">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-foreground/20 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, category: product.category, quantity: 1 })
                    }}
                    className="text-foreground/20 hover:text-foreground transition-colors mt-3 shrink-0"
                    aria-label="Add to cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
            <p className="text-foreground/25 font-light italic" style={{ fontFamily: "var(--font-playfair), serif" }}>
              No editions available at this time.
            </p>
          </motion.div>
        )}

        {/* Commission CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-24 sm:mt-32 border-t border-foreground/[0.06] pt-16 grid sm:grid-cols-2 items-center gap-8"
        >
          <div>
            <p className="text-[8px] tracking-[0.5em] uppercase text-foreground/25 mb-3 font-light">Bespoke Work</p>
            <h3
              className="text-3xl sm:text-4xl font-light text-foreground leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Commission a<br />
              <em className="italic">Piece</em>
            </h3>
          </div>
          <div>
            <p className="text-foreground/45 font-light leading-[1.8] text-sm mb-6">
              Personalized commissions and custom artwork crafted to your vision. Each piece is a unique collaboration shaped by your story.
            </p>
            <button
              onClick={() => { const el = document.querySelector('#contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase text-foreground/40 hover:text-foreground border border-foreground/15 hover:border-foreground/35 px-6 py-3.5 transition-all duration-300"
            >
              Begin a conversation
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxProduct && (
            <ImageLightbox
              src={lightboxProduct.image || "/placeholder.svg"}
              alt={lightboxProduct.title}
              onClose={() => setLightboxProduct(null)}
              infoPanel={
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-foreground/35 border border-border px-2.5 py-1">
                      {lightboxProduct.category}
                    </span>
                    <h2 className="text-3xl mt-5 mb-3 text-foreground font-light leading-tight"
                        style={{ fontFamily: "var(--font-playfair), serif" }}>
                      {lightboxProduct.title}
                    </h2>
                    <div className="w-8 h-px bg-foreground/15 mb-5" />
                    <p className="text-foreground/45 text-sm font-light leading-relaxed mb-8">
                      {lightboxProduct.description}
                    </p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-light text-foreground">{lightboxProduct.price}</span>
                      {lightboxProduct.originalPrice && (
                        <span className="text-sm text-foreground/25 line-through">{lightboxProduct.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <Button
                    className="w-full bg-foreground text-background hover:bg-foreground/88 text-[9px] tracking-[0.25em] uppercase py-6 rounded-none mt-8"
                    onClick={() => {
                      addToCart({ id: lightboxProduct.id, title: lightboxProduct.title, price: lightboxProduct.price, image: lightboxProduct.image, category: lightboxProduct.category, quantity: 1 })
                      setLightboxProduct(null)
                    }}
                  >
                    Add to Cart
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

export default ShopSection
