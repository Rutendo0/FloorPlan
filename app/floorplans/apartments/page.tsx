
"use client"

import type React from "react"
import Link from "next/link"
import { ArrowLeft, Building2, Home, Users } from "lucide-react"

const apartmentCategories = [
  {
    id: "studio-first-floor",
    title: "Studio Apartments",
    subtitle: "First Floor",
    description: "Compact and efficient studio apartments on the first floor, perfect for young professionals",
    icon: Home,
    href: "/floorplans/apartments/studio-first-floor",
    color: "bg-gradient-to-br from-purple-50 to-purple-100",
    planCount: "Coming Soon",
    floor: "1st Floor"
  },
  {
    id: "one-bed",
    title: "1-Bedroom Apartments",
    subtitle: "Modern Living",
    description: "Comfortable one-bedroom apartments with contemporary amenities and open layouts",
    icon: Building2,
    href: "/floorplans/apartments/one-bed",
    color: "bg-gradient-to-br from-blue-50 to-blue-100",
    planCount: "Coming Soon",
    floor: "Second Floor"
  },
  {
    id: "two-bed-second-floor",
    title: "2-Bedroom Apartments",
    subtitle: "Second Floor",
    description: "Spacious two-bedroom apartments on the second floor with family-friendly layouts",
    icon: Users,
    href: "/floorplans/apartments/two-bed-second-floor",
    color: "bg-gradient-to-br from-green-50 to-emerald-100",
    planCount: "Coming Soon",
    floor: "2nd Floor"
  },
  {
    id: "three-bed-third-floor",
    title: "3-Bedroom Apartments",
    subtitle: "Third Floor",
    description: "Premium three-bedroom apartments on the third floor with panoramic views",
    icon: Building2,
    href: "/floorplans/apartments/three-bed-third-floor",
    color: "bg-gradient-to-br from-amber-50 to-yellow-100",
    planCount: "Coming Soon",
    floor: "3rd Floor"
  }
]

export default function ApartmentsFloorplansPage() {
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

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-stone-900 mb-6 tracking-wide">
            Apartment Living
          </h2>
          <p className="text-xl text-stone-600 mb-12 font-light">
            Modern Urban Lifestyle
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apartmentCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.id} href={category.href}>
                  <div className={`${category.color} rounded-3xl p-8 lg:p-10 h-full border border-stone-200 hover:shadow-2xl transition-all duration-500 group cursor-pointer hover:scale-105`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-4 bg-white/80 rounded-2xl shadow-sm">
                        <IconComponent className="h-8 w-8 text-stone-700" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-stone-600 font-medium bg-white/60 px-3 py-1 rounded-full mb-2">
                          {category.planCount}
                        </div>
                        <div className="text-xs text-stone-500 bg-white/40 px-2 py-1 rounded-full">
                          {category.floor}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-light text-stone-900 mb-3 tracking-wide group-hover:text-stone-700 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-stone-700 mb-4 font-medium">
                        {category.subtitle}
                      </p>
                      <p className="text-stone-600 leading-relaxed text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
