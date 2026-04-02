"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle, Instagram, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/client"

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()
    const { error } = await supabase.from('messages').insert({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    })

    setIsSubmitting(false)
    if (!error) {
      setIsSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setIsSubmitted(false), 5000)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-4 h-4" />,
      title: "Email",
      content: "thevisual.art1@gmail.com",
      link: "mailto:thevisual.art1@gmail.com",
    },
    {
      icon: <Instagram className="w-4 h-4" />,
      title: "Instagram",
      content: "@thevisual.art1",
      link: "https://instagram.com/thevisual.art1",
    },
    {
      icon: <Phone className="w-4 h-4" />,
      title: "Phone",
      content: "+91 8105237600",
      link: "tel:+918105237600",
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      title: "Location",
      content: "Bangalore, India",
      link: "#",
    },
  ]

  return (
    <section id="contact" ref={ref} className="py-24 sm:py-32 lg:py-40 bg-card border-t border-foreground/[0.06]">
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
              Get in Touch
            </p>
          </div>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-light text-foreground leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Contact
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left â€” contact info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-foreground/65 font-light leading-[1.9] text-sm mb-12 max-w-sm">
              Open to creative collaborations, commissions, and conversations. Reach out and let&apos;s explore what we can create together.
            </p>

            <div className="space-y-0">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.07 }}
                  className="flex items-center gap-6 py-5 border-b border-foreground/[0.06] group"
                >
                  <span className="text-[9px] tracking-[0.35em] uppercase text-foreground/50 w-20 shrink-0">{info.title}</span>
                  <a
                    href={info.link}
                    className="text-foreground/80 hover:text-foreground transition-colors font-light text-sm"
                    target={info.link.startsWith("http") ? "_blank" : undefined}
                    rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {info.content}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right â€” contact form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16"
              >
                <CheckCircle className="w-8 h-8 text-foreground/40 mb-5" />
                <h3
                  className="text-2xl font-light text-foreground mb-2"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Message Sent
                </h3>
                <p className="text-foreground/40 font-light text-sm">
                  Thank you â€” I&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <div>
                    <Label htmlFor="name" className="text-[9px] tracking-[0.35em] uppercase text-foreground/55 mb-2.5 block">Name</Label>
                    <Input
                      id="name" name="name" type="text" required
                      value={formData.name} onChange={handleInputChange}
                      placeholder="Your name"
                      className="bg-transparent border-0 border-b border-foreground/25 text-foreground placeholder:text-foreground/35 focus:border-foreground/55 rounded-none text-sm px-0 h-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[9px] tracking-[0.35em] uppercase text-foreground/55 mb-2.5 block">Email</Label>
                    <Input
                      id="email" name="email" type="email" required
                      value={formData.email} onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="bg-transparent border-0 border-b border-foreground/25 text-foreground placeholder:text-foreground/35 focus:border-foreground/55 rounded-none text-sm px-0 h-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-[9px] tracking-[0.35em] uppercase text-foreground/55 mb-2.5 block">Subject</Label>
                  <Input
                    id="subject" name="subject" type="text" required
                    value={formData.subject} onChange={handleInputChange}
                    placeholder="What's this about?"
                    className="bg-transparent border-0 border-b border-foreground/25 text-foreground placeholder:text-foreground/35 focus:border-foreground/55 rounded-none text-sm px-0 h-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-[9px] tracking-[0.35em] uppercase text-foreground/55 mb-2.5 block">Message</Label>
                  <Textarea
                    id="message" name="message" required
                    value={formData.message} onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    className="bg-transparent border-0 border-b border-foreground/25 text-foreground placeholder:text-foreground/35 focus:border-foreground/55 rounded-none text-sm px-0 min-h-[120px] resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase bg-foreground text-background hover:bg-foreground/88 disabled:opacity-40 px-8 py-4 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="w-3.5 h-3.5 border border-background/40 border-t-background rounded-full animate-spin" />
                  ) : (
                    <Send className="w-3 h-3" />
                  )}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
