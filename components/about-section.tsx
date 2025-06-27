"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section id="about" ref={ref} className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div style={{ y, opacity }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              About The Vision
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-700 dark:text-gray-300"
            >
              <p>
                I am a visual storyteller who believes that every image holds the power to transcend language, culture,
                and time. My journey began with a simple camera and an insatiable curiosity about the world around me.
              </p>

              <p>
                Over the years, I've evolved from capturing moments to crafting entire visual narratives that speak to
                the soul. My work spans across digital art, photography, and immersive experiences that challenge
                conventional boundaries.
              </p>

              <p>
                Each piece in my portfolio represents a chapter in my ongoing exploration of human emotion, natural
                beauty, and the intersection of technology with art. I believe in the power of visuals to create
                connections and inspire change.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 sm:mt-8 grid grid-cols-3 gap-4 sm:gap-6"
            >
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">500+</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-2xl sm:text-3xl font-bold text-pink-600">100+</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Connections</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">20+</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Years</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/placeholder.svg?height=600&width=500"
                alt="The Visual Artist"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />

              {/* Overlay content */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-2">Creating Visual Stories</h3>
                <p className="text-sm opacity-90">Every frame tells a story</p>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -top-4 -right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -bottom-4 -left-4 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-30"
            />

            {/* Decorative grid */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-pink-500/5 rounded-2xl" />
          </motion.div>
        </motion.div>

        {/* Additional content to fill space */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Creative Process</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: "01", title: "Inspiration", desc: "Finding the spark in everyday moments" },
              { step: "02", title: "Conceptualization", desc: "Developing the visual narrative" },
              { step: "03", title: "Creation", desc: "Bringing ideas to life through art" },
              { step: "04", title: "Refinement", desc: "Perfecting every detail" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl font-bold text-purple-600 mb-3">{item.step}</div>
                <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
