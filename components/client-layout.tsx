"use client"

import React from "react"
import { CartProvider } from "./cart-context"
import CartDrawer from "./cart-drawer"
import { ThemeProvider } from "./theme-provider"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </ThemeProvider>
  )
}
