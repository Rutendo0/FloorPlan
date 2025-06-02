"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Home, Ruler, Download } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-light tracking-wide text-gray-900">GOODHOPE RESIDENCES</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/floorplans" className="text-gray-600 hover:text-gray-900 transition-colors">
              Floor Plans
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl lg:text-6xl font-extralight text-gray-900 mb-6">
                Luxury Living
                <br />
                <span className="text-gray-600">Redefined</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover our collection of thoughtfully designed floor plans that blend modern sophistication with
                functional elegance. Each residence offers premium finishes and spacious layouts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/floorplans">
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                    Explore Floor Plans
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
             
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-2xl flex items-center justify-center">
                <Home className="h-24 w-24 text-gray-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}
