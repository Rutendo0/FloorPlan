
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Building2, Home, Users } from "lucide-react"

const apartmentCategories = [
  {
    id: "studio-first-floor",
    title: "Studio Apartments",
    subtitle: "First Floor",
    description: "Compact and efficient studio living spaces perfect for young professionals",
    icon: Home,
    href: "/floorplans/apartments/studio-first-floor",
    color: "bg-gradient-to-br from-purple-50 to-purple-100",
    planCount: "Coming Soon"
  },
  {
    id: "one-bed",
    title: "1-Bed Apartments",
    subtitle: "Modern Living",
    description: "Comfortable one-bedroom apartments with contemporary amenities",
    icon: Building2,
    href: "/floorplans/apartments/one-bed",
    color: "bg-gradient-to-br from-blue-50 to-blue-100",
    planCount: "Coming Soon"
  },
  {
    id: "two-bed-second-floor",
    title: "2-Bed Apartments",
    subtitle: "Second Floor",
    description: "Spacious two-bedroom units ideal for couples and small families",
    icon: Users,
    href: "/floorplans/apartments/two-bed-second-floor",
    color: "bg-gradient-to-br from-green-50 to-emerald-100",
    planCount: "Coming Soon"
  },
  {
    id: "three-bed-third-floor",
    title: "3-Bed Apartments",
    subtitle: "Third Floor",
    description: "Luxurious three-bedroom apartments with premium finishes and city views",
    icon: Building2,
    href: "/floorplans/apartments/three-bed-third-floor",
    color: "bg-gradient-to-br from-amber-50 to-yellow-100",
    planCount: "Coming Soon"
  }
]

export default function ApartmentsFloorplansPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

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
                Apartment Floor Plans
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* Apartment Categories */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-light text-stone-900 mb-4 tracking-wide">
              Apartment Living
            </h2>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto font-light">
              Discover our collection of modern apartment designs across multiple floors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {apartmentCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <div
                  key={category.id}
                  onMouseEnter={() => setHoveredCard(category.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group"
                >
                  <Link href={category.href}>
                    <div className={`${category.color} rounded-2xl p-6 h-full border border-stone-200 hover:shadow-xl transition-all duration-500 cursor-pointer ${
                      hoveredCard === category.id ? 'scale-105' : ''
                    }`}>
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-white/80 rounded-xl shadow-sm">
                          <IconComponent className="h-6 w-6 text-stone-700" />
                        </div>
                        <div className="text-xs text-stone-600 font-medium bg-white/60 px-2 py-1 rounded-full">
                          {category.planCount}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-light text-stone-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-stone-600 text-xs uppercase tracking-wider mb-4 font-light">
                        {category.subtitle}
                      </p>
                      <p className="text-stone-700 leading-relaxed text-sm font-light">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
