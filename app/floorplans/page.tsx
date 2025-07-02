"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Building2, Home, Building } from "lucide-react"
import { motion } from "framer-motion"

const categories = [
  {
    id: "duplex",
    title: "Duplex Plans",
    subtitle: "Double Storey & Semi-Detached",
    description: "Spacious duplex designs perfect for modern families seeking luxury and functionality",
    icon: Building2,
    href: "/floorplans/duplex",
    color: "from-blue-50 to-blue-100",
    planCount: "3 Plans",
    image: "/images/3Bedroom.png"
  },
  {
    id: "single-storey",
    title: "Single Storey Plans", 
    subtitle: "Ground Floor Living",
    description: "Elegant single level homes with open layouts and seamless indoor-outdoor flow",
    icon: Home,
    href: "/floorplans/single-storey",
    color: "from-green-50 to-emerald-100",
    planCount: "2 Plans",
    image: "/images/plan4.jpg"
  },
  {
    id: "double-storey",
    title: "Double Storey Plans",
    subtitle: "Two Level Living",
    description: "Multi-level designs maximizing space, privacy, and architectural sophistication",
    icon: Building,
    href: "/floorplans/double-storey", 
    color: "from-amber-50 to-yellow-100",
    planCount: "3 Plans",
    image: "/images/Double Storey 3Bedroom.png"
  }
]

export default function FloorplansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
      {/* Elegant Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-stone-200/50 px-6 py-8 sticky top-0 z-50 shadow-sm">
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
          <div className="text-sm text-stone-600 uppercase tracking-[0.25em] font-light">
            Floor Plans Collection
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-stone-100/20"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-7xl font-extralight text-stone-900 mb-8 tracking-tight leading-tight">
              Architectural
              <span className="block text-amber-600 italic font-light">Excellence</span>
            </h1>
            <p className="text-xl lg:text-2xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
              Discover our curated collection of luxury floor plans, where every detail reflects
              our commitment to sophisticated living and timeless design.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-3 text-stone-600">
                <div className="w-12 h-px bg-amber-600"></div>
                <span className="text-sm uppercase tracking-wider font-light">Premium Designs</span>
              </div>
              <div className="flex items-center gap-3 text-stone-600">
                <div className="w-12 h-px bg-amber-600"></div>
                <span className="text-sm uppercase tracking-wider font-light">Luxury Living</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-stone-900 mb-6 tracking-wide">
            Our Collection
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Choose from our carefully curated categories of luxury floor plans
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link href={category.href} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20`}></div>
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={500}
                      height={375}
                      className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                      priority={index < 3}
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-medium text-stone-700 uppercase tracking-wider">
                          {category.planCount}
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <category.icon className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-light text-stone-900 group-hover:text-amber-600 transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-stone-500 text-sm uppercase tracking-wider font-light">
                          {category.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-stone-600 leading-relaxed mb-6 font-light">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-light text-stone-900">{category.planCount}</span>
                      <div className="flex items-center text-amber-600 group-hover:translate-x-2 transition-transform duration-300">
                        <span className="text-sm uppercase tracking-wider font-medium mr-2">Explore</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}