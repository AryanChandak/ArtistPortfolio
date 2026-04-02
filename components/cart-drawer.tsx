"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react"
import { useCart } from "./cart-context"
import { Button } from "@/components/ui/button"

const CartDrawer = () => {
  const { cartItems, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, subtotal } = useCart()

  const generateWhatsAppLink = () => {
    const phoneNumber = "918105237600" 
    const baseUrl = "https://wa.me/"
    
    let message = "Hi! I'd like to order the following from your portfolio:\n\n"
    
    cartItems.forEach(item => {
      message += `- ${item.title} (${item.quantity}x) - ${item.price}\n`
    })
    
    message += `\nTotal: ₹${subtotal.toLocaleString()}\n\n`
    message += "Please let me know the next steps for payment and shipping!"
    
    return `${baseUrl}${phoneNumber}?text=${encodeURIComponent(message)}`
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-background border-l border-primary/8 shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
              <div className="p-6 border-b border-primary/8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-[var(--font-playfair)] tracking-wide uppercase text-foreground">Your Selection</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-primary/30 hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-2">
                     <ShoppingBag className="w-8 h-8 text-primary/40" />
                  </div>
                  <p className="text-foreground/50 font-light italic text-lg tracking-wide">Your gallery selection is empty.</p>
                  <Button 
                    variant="link" 
                    onClick={() => setIsCartOpen(false)}
                    className="text-primary uppercase tracking-[0.2em] text-xs"
                  >
                    Continue Browsing
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-6 group"
                  >
                    <div className="w-24 h-32 shrink-0 bg-muted overflow-hidden border border-border/50 transition-transform duration-500 group-hover:scale-105">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-primary/70 mb-1">{item.category}</p>
                        <h3 className="text-lg font-[var(--font-playfair)] text-foreground leading-tight">{item.title}</h3>
                        <p className="text-foreground/60 text-sm mt-1">{item.price}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-border px-2 py-1 gap-4">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-foreground/40 hover:text-primary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-4 text-center font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-foreground/40 hover:text-primary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-foreground/30 hover:text-destructive transition-colors p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {cartItems.length > 0 && (
              <div className="p-8 border-t border-border bg-muted/5 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm tracking-widest text-foreground/50 uppercase">
                    <span>Subtotal</span>
                    <span className="text-foreground">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm tracking-widest text-foreground/50 uppercase">
                     <span>Shipping</span>
                     <span className="text-primary italic">Calculated at checkout</span>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between items-end">
                    <span className="text-xs uppercase tracking-[0.3em] text-foreground/40">Total Amount</span>
                    <span className="text-2xl font-[var(--font-playfair)] text-foreground">₹{subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  onClick={() => window.open(generateWhatsAppLink(), "_blank")}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 text-xs tracking-[0.3em] uppercase group glow-gold"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                
                <p className="text-[10px] text-center text-foreground/40 uppercase tracking-widest">
                  Secure editorial checkout enabled
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
