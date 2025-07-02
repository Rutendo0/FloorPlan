
"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Building2, Home, Building, ArrowRight, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const categories = [
  {
    id: "duplex",
    title: "Duplex Plans",
    subtitle: "Double Storey & Semi-Detached",
    description: "Spacious duplex designs perfect for modern families seeking luxury and functionality",
    icon: Building2,
    href: "/floorplans/duplex",
    color: "bg-gradient-to-br from-blue-50 to-blue-100",
    planCount: "3 Plans"
  },
  {
    id: "single-storey",
    title: "Single Storey Plans", 
    subtitle: "Ground Floor Living",
    description: "Elegant single level homes with open layouts and seamless indoor-outdoor flow",
    icon: Home,
    href: "/floorplans/single-storey",
    color: "bg-gradient-to-br from-green-50 to-emerald-100",
    planCount: "2 Plans"
  },
  {
    id: "double-storey",
    title: "Double Storey Plans",
    subtitle: "Two Level Living",
    description: "Multi-level designs maximizing space, privacy, and architectural sophistication",
    icon: Building,
    href: "/floorplans/double-storey", 
    color: "bg-gradient-to-br from-amber-50 to-yellow-100",
    planCount: "3 Plans"
  }
]

const features = [
  {
    title: "Premium Design",
    description: "Every floor plan reflects our commitment to architectural excellence and luxury living",
    icon: "🏛️"
  },
  {
    title: "Flexible Layouts", 
    description: "Adaptable spaces that grow with your family's changing needs and lifestyle",
    icon: "📐"
  },
  {
    title: "Quality Assurance",
    description: "Each design undergoes rigorous review to ensure the highest standards of construction",
    icon: "✨"
  }
]

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
      {/* Navigation Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-stone-200/50 px-6 py-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-light text-stone-900 tracking-[0.2em]">
              <Link href="/" className="hover:text-amber-600 transition-all duration-300">
                ASHUMI ESTATES
              </Link>
            </h1>
            <p className="text-xs text-stone-500 tracking-[0.3em] uppercase mt-1 font-light">
              Luxury Redefined
            </p>
          </motion.div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/floorplans" className="text-stone-600 hover:text-amber-600 transition-colors text-sm uppercase tracking-wider font-medium">
              All Plans
            </Link>
            <Link href="#contact" className="text-stone-600 hover:text-amber-600 transition-colors text-sm uppercase tracking-wider font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-transparent to-stone-100/30"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl lg:text-8xl font-extralight text-stone-900 mb-8 tracking-tight leading-tight">
              Your Dream Home
              <span className="block text-amber-600 italic font-light text-4xl lg:text-6xl">Starts Here</span>
            </h1>
            <p className="text-xl lg:text-2xl text-stone-600 max-w-4xl mx-auto leading-relaxed font-light mb-12">
              Discover our exclusive collection of luxury floor plans, meticulously crafted for discerning homeowners 
              who demand excellence in every detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                asChild
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-light tracking-wide rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/floorplans">
                  Explore Floor Plans
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-stone-300 text-stone-700 hover:border-amber-600 hover:text-amber-600 px-8 py-4 text-lg font-light tracking-wide rounded-xl"
              >
                Schedule Consultation
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-stone-200/50">
              <div className="text-4xl font-light text-stone-900 mb-2">8+</div>
              <div className="text-stone-600 uppercase tracking-wider text-sm font-light">Unique Plans</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-stone-200/50">
              <div className="text-4xl font-light text-stone-900 mb-2">15+</div>
              <div className="text-stone-600 uppercase tracking-wider text-sm font-light">Years Experience</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-stone-200/50">
              <div className="text-4xl font-light text-stone-900 mb-2">100%</div>
              <div className="text-stone-600 uppercase tracking-wider text-sm font-light">Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floor Plan Categories */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-6xl font-light text-stone-900 mb-8 tracking-wide">
              Browse by Category
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
              Each category represents a different approach to luxury living, designed to match your unique lifestyle and preferences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {categories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  onMouseEnter={() => setHoveredCard(category.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Link href={category.href}>
                    <div className={`${category.color} rounded-3xl p-8 lg:p-10 h-full border border-stone-200 hover:shadow-2xl transition-all duration-500 group cursor-pointer ${
                      hoveredCard === category.id ? 'scale-105' : ''
                    }`}>
                      <div className="flex items-center justify-between mb-8">
                        <div className="p-4 bg-white/80 rounded-2xl shadow-sm">
                          <IconComponent className="h-8 w-8 text-stone-700" />
                        </div>
                        <div className="text-sm text-stone-600 font-medium bg-white/60 px-3 py-1 rounded-full">
                          {category.planCount}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-light text-stone-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-stone-600 text-sm uppercase tracking-wider mb-6 font-light">
                        {category.subtitle}
                      </p>
                      <p className="text-stone-700 leading-relaxed mb-8 font-light">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center text-amber-600 group-hover:translate-x-2 transition-transform duration-300">
                        <span className="text-sm uppercase tracking-wider font-medium mr-2">Explore Plans</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-light mb-8 tracking-wide">
              Why Choose Ashumi
            </h2>
            <p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed font-light">
              Our commitment to excellence extends beyond beautiful designs to exceptional service and quality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-4 text-amber-400">
                  {feature.title}
                </h3>
                <p className="text-stone-300 leading-relaxed font-light">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-amber-50 to-stone-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-light text-stone-900 mb-8 tracking-wide">
              Ready to Build Your Dream?
            </h2>
            <p className="text-xl text-stone-600 mb-12 leading-relaxed font-light">
              Let's discuss how we can bring your vision to life with our premium floor plans and expert guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-light tracking-wide rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/floorplans">
                  View All Floor Plans
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-stone-400 text-stone-700 hover:border-amber-600 hover:text-amber-600 px-8 py-4 text-lg font-light tracking-wide rounded-xl"
              >
                Contact Our Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-light mb-8 tracking-wide">
                Get in Touch
              </h2>
              <p className="text-xl text-stone-300 mb-12 leading-relaxed font-light">
                Ready to start your journey? Our team is here to help you find the perfect floor plan for your dream home.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-600 rounded-xl">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Call Us</div>
                    <div className="text-stone-300">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-600 rounded-xl">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Email Us</div>
                    <div className="text-stone-300">info@ashumiestates.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-600 rounded-xl">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Visit Us</div>
                    <div className="text-stone-300">123 Luxury Lane, Premium District</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-light mb-6">Schedule a Consultation</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-stone-300 focus:outline-none focus:border-amber-600 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-stone-300 focus:outline-none focus:border-amber-600 transition-colors"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-stone-300 focus:outline-none focus:border-amber-600 transition-colors"
                />
                <textarea
                  placeholder="Tell us about your dream home..."
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-stone-300 focus:outline-none focus:border-amber-600 transition-colors resize-none"
                />
                <Button 
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg font-light tracking-wide rounded-xl transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-light tracking-[0.2em]">ASHUMI ESTATES</h3>
              <p className="text-stone-400 text-sm mt-1">Luxury Redefined</p>
            </div>
            <div className="text-stone-400 text-sm">
              © 2024 Ashumi Estates. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
