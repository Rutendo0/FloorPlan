"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Building2, Home, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const singleStoreyCategories = [
  {
    id: "4-bedroom",
    title: "4-Bedroom Standalone",
    subtitle: "Spacious Family Living",
    description: "Expansive single-level homes with four bedrooms, perfect for growing families seeking comfort and space",
    icon: Home,
    href: "/floorplans/single-storey/4-bedroom",
    color: "bg-gradient-to-br from-green-50 to-emerald-100",
    planCount: "2 Plans",
    image: "/images/4-bed.png"
  },
  {
    id: "3-bedroom-duplex",
    title: "3-Bedroom Duplex",
    subtitle: "Efficient Design",
    description: "Contemporary duplex designs maximizing space efficiency while maintaining luxury and functionality",
    icon: Building2,
    href: "/floorplans/single-storey/3-bedroom-duplex",
    color: "bg-gradient-to-br from-blue-50 to-blue-100",
    planCount: "2 Plans",
    image: "/images/plan4.jpg"
  }
]

const singleStoreyCategories = [
  {
    id: "4-bedroom",
    title: "4-Bedroom Stand Alone",
    subtitle: "Spacious Family Living",
    description: "Elegant four-bedroom standalone homes with open layouts and premium finishes for modern family living",
    icon: Home,
    href: "/floorplans/single-storey/4-bedroom",
    color: "bg-gradient-to-br from-green-50 to-emerald-100",
    planCount: "2 Plans"
  },
  {
    id: "3-bedroom-duplex",
    title: "3-Bedroom Duplex",
    subtitle: "Single Level Duplex",
    description: "Sophisticated three-bedroom duplex designs offering comfort and style in a single storey layout",
    icon: Building2,
    href: "/floorplans/single-storey/3-bedroom-duplex",
    color: "bg-gradient-to-br from-blue-50 to-blue-100",
    planCount: "2 Plans"
  }
]

export default function SingleStoreyFloorplansPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-stone-50/80 backdrop-blur-lg border-b border-stone-300/30 px-4 sm:px-6 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-stone-600" />
            <div>
              <h1 className="text-lg sm:text-xl font-light text-stone-800 tracking-wide">
                ASHUMI ESTATES
              </h1>
              <p className="text-xs text-stone-500 uppercase tracking-wider hidden sm:block">
                Single Storey Floor Plans
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-stone-50 to-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light text-stone-900 mb-6 tracking-tight">
            Single Storey Living
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Discover our collection of elegant single level homes designed for comfort and contemporary living.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {singleStoreyCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <div key={category.id}>
                  <Link href={category.href} className="group block">
                    <div className={`${category.color} rounded-3xl p-8 sm:p-12 h-full transition-all duration-500 hover:shadow-2xl hover:shadow-stone-400/20 border border-stone-200/50`}>
                      {/* Category Header */}
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white/80 rounded-2xl backdrop-blur-sm border border-stone-200/50">
                              <IconComponent className="h-6 w-6 text-stone-700" />
                            </div>
                            <span className="text-sm text-stone-600 font-medium uppercase tracking-wider">
                              {category.planCount}
                            </span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-light text-stone-900 mb-3 tracking-tight group-hover:text-stone-700 transition-colors">
                            {category.title}
                          </h3>
                          <p className="text-stone-600 font-medium mb-2 uppercase tracking-wide text-sm">
                            {category.subtitle}
                          </p>
                          <p className="text-stone-700 leading-relaxed font-light">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex justify-between items-center">
                        <div className="group/btn p-0 h-auto text-stone-700 hover:text-stone-900 hover:bg-transparent">
                          <span className="text-base font-medium tracking-wide">
                            Explore Plans
                          </span>
                          <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-light text-stone-900 mb-1">
                            {category.planCount.split(' ')[0]}
                          </div>
                          <div className="text-xs text-stone-600 uppercase tracking-wider">
                            Available Plans
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-stone-50 to-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light text-stone-900 mb-6 tracking-tight">
              Single Storey Living
            </h1>
            <p className="text-lg sm:text-xl text-stone-600 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
              Experience the elegance of single-level living with our thoughtfully designed floor plans. 
              Choose from spacious standalone homes or efficient duplex designs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {singleStoreyCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Link href={category.href} className="group block">
                    <div className={`${category.color} rounded-3xl p-8 sm:p-12 h-full transition-all duration-500 hover:shadow-2xl hover:shadow-stone-400/20 border border-stone-200/50`}>
                      {/* Category Header */}
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white/80 rounded-2xl backdrop-blur-sm border border-stone-200/50">
                              <IconComponent className="h-6 w-6 text-stone-700" />
                            </div>
                            <span className="text-sm text-stone-600 font-medium uppercase tracking-wider">
                              {category.planCount}
                            </span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-light text-stone-900 mb-3 tracking-tight group-hover:text-stone-700 transition-colors">
                            {category.title}
                          </h3>
                          <p className="text-stone-600 font-medium mb-2 uppercase tracking-wide text-sm">
                            {category.subtitle}
                          </p>
                          <p className="text-stone-700 leading-relaxed font-light">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Preview Image */}
                      <div className="mb-8">
                        <div className="aspect-[4/3] bg-white/50 rounded-2xl overflow-hidden border border-stone-200/50 backdrop-blur-sm">
                          <Image
                            src={category.image || "/placeholder.svg"}
                            alt={category.title}
                            width={600}
                            height={450}
                            className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex justify-between items-center">
                        <Button 
                          variant="ghost" 
                          className="group/btn p-0 h-auto text-stone-700 hover:text-stone-900 hover:bg-transparent"
                        >
                          <span className="text-base font-medium tracking-wide">
                            Explore Plans
                          </span>
                          <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                        </Button>

                        <div className="text-right">
                          <div className="text-2xl font-light text-stone-900 mb-1">
                            {category.planCount.split(' ')[0]}
                          </div>
                          <div className="text-xs text-stone-600 uppercase tracking-wider">
                            Available Plans
                          </div>
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

      {/* Additional Info Section */}
      <section className="py-16 sm:py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-light text-stone-900 mb-6 tracking-tight">
            Single Storey Advantages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto">
                <Home className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium text-stone-900">Accessibility</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                No stairs means easy access for all ages and mobility levels, perfect for aging in place.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-stone-900">Efficiency</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Lower construction and maintenance costs with simplified heating, cooling, and cleaning.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                <ArrowRight className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-stone-900">Flow</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Seamless indoor-outdoor living with easy access to gardens, patios, and outdoor spaces.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}