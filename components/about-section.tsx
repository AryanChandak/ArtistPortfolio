"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section id="about" ref={ref} className="py-24 sm:py-32 lg:py-40 bg-card border-t border-foreground/[0.06]">
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
              Biography
            </p>
          </div>
        </motion.div>

        {/* Two column â€” text + portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start mb-24 sm:mb-32">

          {/* Left â€” biography text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-light text-foreground leading-[1.05] mb-10"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Puja<br />Dhanuka
            </h2>

            <div className="w-10 h-px bg-foreground/12 mb-10" />

            <div className="space-y-5 text-foreground/50 font-light leading-[1.9] text-[15px]">
              <p>
                A visual storyteller who believes every image holds the power to transcend language, culture, and time.
              </p>
              <p>
                Over the years, I have evolved from capturing moments to crafting entire visual narratives â€” work spanning digital art, photography, and immersive experiences that speak directly to the soul.
              </p>
              <p>
                Each piece in my portfolio represents a chapter in an ongoing exploration of human emotion, natural beauty, and the intersection of technology with art.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-foreground/[0.06]">
              {[
                { number: "500+", label: "Projects" },
                { number: "100+", label: "Connections" },
                { number: "20+", label: "Years" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                >
                  <p
                    className="text-3xl sm:text-4xl font-light text-foreground mb-1.5"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {stat.number}
                  </p>
                  <p className="text-[8px] tracking-[0.35em] uppercase text-foreground/28">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right â€” artist portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.25 }}
          >
            <div className="relative overflow-hidden bg-muted aspect-[3/4]">
              <img
                src="/images/puja-dhanuka.jpg"
                alt="Puja Dhanuka — Artist"
                className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-[8px] tracking-[0.35em] uppercase text-foreground/40">Puja Dhanuka</p>
              <p className="text-[8px] tracking-[0.25em] uppercase text-foreground/30">Visual Artist</p>
            </div>
          </motion.div>
        </div>

        {/* Process â€” horizontal grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border-t border-foreground/[0.06] pt-16"
        >
          <p className="text-[8px] tracking-[0.55em] uppercase text-foreground/25 mb-10 font-light">
            Creative Process
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
            {[
              { n: "01", title: "Inspiration", desc: "Finding the spark in everyday moments" },
              { n: "02", title: "Concept", desc: "Developing the visual narrative" },
              { n: "03", title: "Creation", desc: "Bringing ideas to life through art" },
              { n: "04", title: "Refinement", desc: "Perfecting every detail" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="border-t border-foreground/[0.06] pt-6"
              >
                <p className="text-[8px] tracking-[0.4em] uppercase text-foreground/20 mb-4 font-light">
                  {item.n}
                </p>
                <p
                  className="text-base font-light text-foreground/75 mb-2"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {item.title}
                </p>
                <p className="text-xs font-light text-foreground/35 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default AboutSection

