"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, Camera, Award, Globe } from "lucide-react"

interface Location {
  id: number
  name: string
  country: string
  x: number
  y: number
  projects: number
  type: "exhibition" | "project" | "award"
  year: string
  description: string
}

const locations: Location[] = [
  { id: 1, name: "New York", country: "USA", x: 25, y: 35, projects: 15, type: "exhibition", year: "2024", description: "Solo exhibition at MoMA" },
  { id: 2, name: "London", country: "UK", x: 50, y: 25, projects: 12, type: "project", year: "2023", description: "Fashion week photography" },
  { id: 3, name: "Tokyo", country: "Japan", x: 85, y: 40, projects: 8, type: "award", year: "2024", description: "International Photography Award" },
  { id: 4, name: "Paris", country: "France", x: 52, y: 30, projects: 10, type: "exhibition", year: "2023", description: "Group exhibition at Louvre" },
  { id: 5, name: "Sydney", country: "Australia", x: 88, y: 75, projects: 6, type: "project", year: "2024", description: "Nature documentary series" },
  { id: 6, name: "SÃ£o Paulo", country: "Brazil", x: 35, y: 70, projects: 9, type: "project", year: "2023", description: "Street art collaboration" },
  { id: 7, name: "Dubai", country: "UAE", x: 65, y: 45, projects: 7, type: "exhibition", year: "2024", description: "Digital art showcase" },
  { id: 8, name: "Mumbai", country: "India", x: 72, y: 50, projects: 11, type: "project", year: "2023", description: "Cultural heritage project" },
]

const GlobalMapSection = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const getIcon = (type: string) => {
    switch (type) {
      case "exhibition": return <Award className="w-3 h-3" />
      case "project": return <Camera className="w-3 h-3" />
      case "award": return <Award className="w-3 h-3" />
      default: return <MapPin className="w-3 h-3" />
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case "exhibition": return "bg-primary"
      case "project": return "bg-muted-foreground"
      case "award": return "bg-primary/80"
      default: return "bg-primary/60"
    }
  }

  return (
    <section id="map" ref={ref} className="py-24 sm:py-32 lg:py-40 bg-card border-t border-foreground/[0.06]">
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
              Global Reach
            </p>
          </div>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-light text-foreground leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Global Presence
          </h2>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative border border-foreground/[0.06]"
        >
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[480px] bg-background overflow-hidden">
            {/* World map silhouette */}
            <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full opacity-[0.06]">
              <path d="M150 200 L300 180 L350 220 L320 280 L200 300 L150 250 Z" fill="currentColor" className="text-foreground" />
              <path d="M400 150 L600 140 L650 200 L600 250 L450 260 L400 200 Z" fill="currentColor" className="text-foreground" />
              <path d="M700 180 L850 170 L900 220 L850 270 L750 280 L700 230 Z" fill="currentColor" className="text-foreground" />
              <path d="M200 350 L400 340 L450 380 L400 420 L250 430 L200 390 Z" fill="currentColor" className="text-foreground" />
            </svg>

            {/* Connection lines */}
            <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full opacity-[0.08]">
              {locations.map((location) => (
                <motion.line
                  key={`line-${location.id}`}
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: 1 + location.id * 0.15 }}
                  x1={locations[0].x * 10}
                  y1={locations[0].y * 5}
                  x2={location.x * 10}
                  y2={location.y * 5}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4,6"
                  className="text-foreground"
                />
              ))}
            </svg>

            {/* Location pins */}
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                onMouseEnter={() => setHoveredLocation(location)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => setSelectedLocation(selectedLocation?.id === location.id ? null : location)}
              >
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="w-2 h-2 bg-foreground/60 rounded-full relative"
                >
                  <motion.div
                    animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                    className="absolute inset-0 bg-foreground/30 rounded-full"
                  />
                </motion.div>

                {hoveredLocation?.id === location.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 bg-background border border-foreground/10 px-3 py-2 text-[9px] whitespace-nowrap z-10"
                  >
                    <p className="text-foreground/70 font-light">{location.name}</p>
                    <p className="text-foreground/30 tracking-[0.15em] uppercase text-[7px]">{location.country}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="px-6 py-4 border-t border-foreground/[0.06] flex flex-wrap gap-8">
            {[
              { label: "Exhibitions", type: "exhibition" },
              { label: "Projects", type: "project" },
              { label: "Awards", type: "award" },
            ].map((item) => (
              <div key={item.type} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full" />
                <span className="text-[8px] tracking-[0.3em] uppercase text-foreground/28">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Selected location */}
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 border border-foreground/[0.06] p-6 sm:p-8 flex items-start justify-between gap-6"
          >
            <div>
              <p className="text-[8px] tracking-[0.4em] uppercase text-foreground/25 mb-2">
                {selectedLocation.type} Â· {selectedLocation.year}
              </p>
              <h3
                className="text-xl font-light text-foreground mb-2 leading-snug"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {selectedLocation.name}, {selectedLocation.country}
              </h3>
              <p className="text-foreground/40 text-sm font-light">{selectedLocation.description}</p>
            </div>
            <button
              onClick={() => setSelectedLocation(null)}
              className="text-foreground/20 hover:text-foreground text-base transition-colors shrink-0 mt-1"
            >
              Ã—
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default GlobalMapSection
