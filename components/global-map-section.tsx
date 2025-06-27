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
  {
    id: 1,
    name: "New York",
    country: "USA",
    x: 25,
    y: 35,
    projects: 15,
    type: "exhibition",
    year: "2024",
    description: "Solo exhibition at MoMA",
  },
  {
    id: 2,
    name: "London",
    country: "UK",
    x: 50,
    y: 25,
    projects: 12,
    type: "project",
    year: "2023",
    description: "Fashion week photography",
  },
  {
    id: 3,
    name: "Tokyo",
    country: "Japan",
    x: 85,
    y: 40,
    projects: 8,
    type: "award",
    year: "2024",
    description: "International Photography Award",
  },
  {
    id: 4,
    name: "Paris",
    country: "France",
    x: 52,
    y: 30,
    projects: 10,
    type: "exhibition",
    year: "2023",
    description: "Group exhibition at Louvre",
  },
  {
    id: 5,
    name: "Sydney",
    country: "Australia",
    x: 88,
    y: 75,
    projects: 6,
    type: "project",
    year: "2024",
    description: "Nature documentary series",
  },
  {
    id: 6,
    name: "São Paulo",
    country: "Brazil",
    x: 35,
    y: 70,
    projects: 9,
    type: "project",
    year: "2023",
    description: "Street art collaboration",
  },
  {
    id: 7,
    name: "Dubai",
    country: "UAE",
    x: 65,
    y: 45,
    projects: 7,
    type: "exhibition",
    year: "2024",
    description: "Digital art showcase",
  },
  {
    id: 8,
    name: "Mumbai",
    country: "India",
    x: 72,
    y: 50,
    projects: 11,
    type: "project",
    year: "2023",
    description: "Cultural heritage project",
  },
]

const GlobalMapSection = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const getIcon = (type: string) => {
    switch (type) {
      case "exhibition":
        return <Award className="w-3 h-3 sm:w-4 sm:h-4" />
      case "project":
        return <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
      case "award":
        return <Award className="w-3 h-3 sm:w-4 sm:h-4" />
      default:
        return <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case "exhibition":
        return "bg-purple-500"
      case "project":
        return "bg-pink-500"
      case "award":
        return "bg-yellow-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <section id="map" ref={ref} className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 rounded-full px-4 py-2">
              <Globe className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Global Reach</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Global Presence
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my artistic journey across continents and cultures
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl"
        >
          {/* World Map SVG */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden">
            {/* Enhanced world map background */}
            <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full opacity-20">
              {/* Continents (more detailed shapes) */}
              <path
                d="M150 200 L300 180 L350 220 L320 280 L200 300 L150 250 Z"
                fill="currentColor"
                className="text-gray-400"
              />
              <path
                d="M400 150 L600 140 L650 200 L600 250 L450 260 L400 200 Z"
                fill="currentColor"
                className="text-gray-400"
              />
              <path
                d="M700 180 L850 170 L900 220 L850 270 L750 280 L700 230 Z"
                fill="currentColor"
                className="text-gray-400"
              />
              <path
                d="M200 350 L400 340 L450 380 L400 420 L250 430 L200 390 Z"
                fill="currentColor"
                className="text-gray-400"
              />
            </svg>

            {/* Connection lines */}
            <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full opacity-30">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              {locations.map((location, index) => (
                <motion.line
                  key={`line-${location.id}`}
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: 1 + index * 0.2 }}
                  x1={locations[0].x * 10}
                  y1={locations[0].y * 5}
                  x2={location.x * 10}
                  y2={location.y * 5}
                  stroke="url(#gradient)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              ))}
            </svg>

            {/* Location pins */}
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                onMouseEnter={() => setHoveredLocation(location)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => setSelectedLocation(location)}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-6 h-6 sm:w-8 sm:h-8 ${getColor(location.type)} rounded-full flex items-center justify-center text-white shadow-lg relative`}
                >
                  {getIcon(location.type)}

                  {/* Pulse animation */}
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className={`absolute inset-0 ${getColor(location.type)} rounded-full`}
                  />
                </motion.div>

                {/* Tooltip */}
                {hoveredLocation?.id === location.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap z-10"
                  >
                    <div className="font-semibold">{location.name}</div>
                    <div className="opacity-80">{location.projects} projects</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full" />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Exhibitions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-pink-500 rounded-full" />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full" />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Awards</span>
            </div>
          </div>
        </motion.div>

        {/* Selected location details */}
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 sm:mt-8 bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  {selectedLocation.name}, {selectedLocation.country}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
                  {selectedLocation.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <span>Year: {selectedLocation.year}</span>
                  <span>Projects: {selectedLocation.projects}</span>
                  <span className="capitalize">Type: {selectedLocation.type}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default GlobalMapSection
