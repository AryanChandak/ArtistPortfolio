"use client"

import { useEffect, useRef, useState, ReactNode } from "react"
import { motion } from "framer-motion"
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface ImageLightboxProps {
  src: string
  alt: string
  onClose: () => void
  infoPanel?: ReactNode
}

const MIN = 1
const MAX = 5

export default function ImageLightbox({ src, alt, onClose, infoPanel }: ImageLightboxProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const clamp = (v: number) => Math.min(MAX, Math.max(MIN, v))

  const applyScale = (newScale: number) => {
    const s = clamp(newScale)
    setScale(s)
    if (s <= MIN) setPosition({ x: 0, y: 0 })
  }

  // Non-passive wheel for scroll-to-zoom
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      setScale((prev) => {
        const next = clamp(prev - e.deltaY / 300)
        if (next <= MIN) setPosition({ x: 0, y: 0 })
        return next
      })
    }
    el.addEventListener("wheel", handler, { passive: false })
    return () => el.removeEventListener("wheel", handler)
  }, [])

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onCloseRef.current() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= MIN) return
    dragRef.current = true
    setIsDragging(true)
    lastPos.current = { x: e.clientX, y: e.clientY }
    e.preventDefault()
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current) return
    const dx = e.clientX - lastPos.current.x
    const dy = e.clientY - lastPos.current.y
    lastPos.current = { x: e.clientX, y: e.clientY }
    setPosition((p) => ({ x: p.x + dx, y: p.y + dy }))
  }

  const stopDrag = () => { dragRef.current = false; setIsDragging(false) }
  const reset = () => { setScale(1); setPosition({ x: 0, y: 0 }) }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-5 right-5 z-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`relative max-w-5xl w-full flex flex-col ${infoPanel ? "lg:flex-row" : ""} rounded-xl overflow-hidden shadow-2xl border border-white/10`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Zoomable image area */}
        <div
          ref={containerRef}
          className={`relative bg-black overflow-hidden ${infoPanel ? "lg:w-3/5" : "w-full"} select-none ${
            scale > MIN ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
          }`}
          style={{ minHeight: 320 }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="w-full h-64 sm:h-[50vh] lg:h-[70vh] object-contain pointer-events-none"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.15s ease",
              willChange: "transform",
            }}
          />

          {/* Controls pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
            <button onClick={() => applyScale(scale - 0.5)} className="text-white/70 hover:text-white p-1 transition">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-white/60 text-xs w-12 text-center tabular-nums">{Math.round(scale * 100)}%</span>
            <button onClick={() => applyScale(scale + 0.5)} className="text-white/70 hover:text-white p-1 transition">
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-px h-3 bg-white/20 mx-1" />
            <button onClick={reset} className="text-white/70 hover:text-white p-1 transition">
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {scale === MIN && (
            <p className="absolute top-3 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-widest uppercase pointer-events-none whitespace-nowrap">
              Scroll to zoom · drag to pan
            </p>
          )}
        </div>

        {/* Optional info panel */}
        {infoPanel && (
          <div className="lg:w-2/5 bg-card p-8 overflow-y-auto" style={{ maxHeight: "70vh" }}>
            {infoPanel}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
