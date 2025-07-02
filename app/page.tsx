
"use client"

import type React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Building2, Home, Building } from "lucide-react"

const categories = [
  {
    id: "duplex",
    title: "Duplex Plans",
    subtitle: "Double Storey & Semi-Detached",
    description: "Spacious duplex designs perfect for modern families",
    icon: Building2,
    href: "/floorplans/duplex",
    color: "bg-blue-50 hover:bg-blue-100 border-blue-200"
  },
  {
    id: "single-storey",
    title: "Single Storey Plans", 
    subtitle: "Ground Floor Living",
    description: "Elegant single level homes with open layouts",
    icon: Home,
    href: "/floorplans/single-storey",
    color: "bg-green-50 hover:bg-green-100 border-green-200"
  },
  {
    id: "double-storey",
    title: "Double Storey Plans",
    subtitle: "Two Level Living",
    description: "Multi-level designs maximizing space and privacy",
    icon: Building,
    href: "/floorplans/double-storey", 
    color: "bg-amber-50 hover:bg-amber-100 border-amber-200"
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-light text-gray-900 tracking-wide">
            ASHUMI ESTATES
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-light tracking-wider uppercase">
            Luxury Redefined
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-wide">
              Floor Plans
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Discover our collection of thoughtfully designed homes, crafted for modern living 
              and exceptional comfort.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {categories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Link href={category.href}>
                    <div className={`${category.color} border rounded-lg p-8 lg:p-10 transition-all duration-300 hover:shadow-lg cursor-pointer group`}>
                      <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-8 w-8 text-gray-700" />
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-2 tracking-wide">
                          {category.title}
                        </h3>
                        
                        <p className="text-sm text-gray-500 uppercase tracking-wider mb-4 font-light">
                          {category.subtitle}
                        </p>
                        
                        <p className="text-gray-600 font-light leading-relaxed">
                          {category.description}
                        </p>
                        
                        <div className="mt-6">
                          <span className="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md group-hover:bg-gray-800 transition-colors duration-300">
                            Explore Plans →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-500 font-light">
            © 2024 Ashumi Estates. An Unforgettable Experience.
          </p>
        </div>
      </footer>
    </div>
  )
}
