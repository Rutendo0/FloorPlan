
"use client"

import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function OneBedPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-stone-50/80 backdrop-blur-lg border-b border-stone-300/30 px-4 sm:px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/floorplans/apartments" className="flex items-center space-x-2 sm:space-x-3">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-stone-600" />
            <div>
              <h1 className="text-lg sm:text-xl font-light text-stone-800 tracking-wide">
                ASHUMI ESTATES
              </h1>
              <p className="text-xs text-stone-500 uppercase tracking-wider hidden sm:block">
                1-Bedroom Apartments
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* Coming Soon Content */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-stone-900 mb-6 tracking-wide">
            1-Bedroom Apartments
          </h2>
          <p className="text-xl text-stone-600 mb-8 font-light">
            Modern Living Spaces
          </p>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-12 border border-stone-200">
            <h3 className="text-2xl font-light text-stone-800 mb-4">
              Coming Soon
            </h3>
            <p className="text-stone-600 leading-relaxed max-w-2xl mx-auto">
              Our one-bedroom apartments are being designed with contemporary amenities 
              and comfortable living spaces, perfect for individuals or couples seeking 
              a modern urban lifestyle.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
