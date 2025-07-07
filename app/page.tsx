
"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl font-extralight text-stone-900 tracking-[0.3em] mb-6"
          >
            ASHUMI ESTATES
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-stone-600 tracking-[0.2em] uppercase font-light mb-8"
          >
            Luxury Redefined
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

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
          </nav>
        </div>
      </header>

      {/* Floor Plan Categories */}
      <section className="py-20 lg:py-32">
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
      </section>

      
    </div>
  )
}
