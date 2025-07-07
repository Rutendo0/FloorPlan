
"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, Share2, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

const duplexPlans = [
  {
    id: 5,
    title: "3-Bedroom Duplex",
    subtitle: "Ground Floor",
    image: "/images/3Bedroom.png",
    pdfUrl: "/floorplans/floor1.pdf",
    interiorSqft: "245 sq m",
    exteriorSqft: "25 sq m",
    bedrooms: 3,
    bathrooms: 2,
    powderRooms: 1,
    features: ["Guest bedroom with ensuite", "Main lounge", "Kitchen", "Swimming Pool", "Dining", "Veranda at the back", "Parking Space"],
    interiorImages: [
      { id: 51, name: "Master Suite with Pool View", image: "https://images.unsplash.com/photo-1631049035382-9847d7b0b8b2?w=800&h=600&fit=crop" },
      { id: 52, name: "Open Plan Lounge", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop" },
      { id: 53, name: "Modern Kitchen & Island", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop" },
      { id: 54, name: "Swimming Pool & Veranda", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop" },
      { id: 55, name: "Guest Bedroom Ensuite", image: "https://images.unsplash.com/photo-1631049035382-9847d7b0b8b2?w=800&h=600&fit=crop" },
      { id: 56, name: "Second Bedroom", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop" },
      { id: 57, name: "Third Bedroom", image: "https://images.unsplash.com/photo-1631049035382-9847d7b0b8b2?w=800&h=600&fit=crop" },
      { id: 58, name: "Master Ensuite", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop" },
      { id: 59, name: "Family Bathroom", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop" },
      { id: 60, name: "Dining Area", image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&h=600&fit=crop" }
    ]
  },
 
  
]

export default function DuplexFloorplansPage() {
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollToPlan = (index: number) => {
    setCurrentPlanIndex(index)
    setCurrentImageIndex(0)
    if (scrollContainerRef.current) {
      const planElement = scrollContainerRef.current.children[index] as HTMLElement
      planElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const nextImage = () => {
    const currentPlan = duplexPlans[currentPlanIndex]
    if (currentPlan && currentPlan.interiorImages) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % currentPlan.interiorImages.length
      )
    }
  }

  const prevImage = () => {
    const currentPlan = duplexPlans[currentPlanIndex]
    if (currentPlan && currentPlan.interiorImages) {
      setCurrentImageIndex((prev) => 
        (prev - 1 + currentPlan.interiorImages.length) % currentPlan.interiorImages.length
      )
    }
  }

  const handleImageClick = (image: any) => {
    setSelectedImage(image)
    setIsImageDialogOpen(true)
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop
      const planHeight = scrollContainerRef.current.clientHeight
      const newIndex = Math.round(scrollTop / planHeight)
      if (newIndex !== currentPlanIndex && newIndex >= 0 && newIndex < duplexPlans.length) {
        setCurrentPlanIndex(newIndex)
        setCurrentImageIndex(0)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-stone-50/80 backdrop-blur-lg border-b border-stone-300/30 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <ArrowLeft className="h-5 w-5 text-stone-600" />
            <div>
              <h1 className="text-xl font-light text-stone-800 tracking-wide">
                ASHUMI ESTATES
              </h1>
              <p className="text-xs text-stone-500 uppercase tracking-wider">
                Duplex Floor Plans
              </p>
            </div>
          </Link>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm" className="border-stone-300 text-stone-600 hover:bg-stone-100">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="border-stone-300 text-stone-600 hover:bg-stone-100">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Dots - Fixed Position */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-3">
        {duplexPlans.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentPlanIndex 
                ? "bg-amber-600 shadow-lg shadow-amber-600/50" 
                : "bg-stone-400 hover:bg-amber-400"
            }`}
            onClick={() => scrollToPlan(index)}
          />
        ))}
      </div>

      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory"
        onScroll={handleScroll}
      >
        {duplexPlans.map((plan, planIndex) => (
          <section key={plan.id} className="min-h-screen snap-start flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                {/* Plan Details - Left Side */}
                <div className="lg:col-span-5 space-y-12">
                  <div>
                    <div className="text-sm text-stone-500 uppercase tracking-[0.15em] mb-3 font-light">
                      {plan.subtitle} • Plan {plan.id}
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-light text-stone-800 mb-12 leading-tight">
                      {plan.title}
                    </h1>

                    {/* Specifications */}
                    <div className="space-y-8">
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="text-gray-600 text-sm uppercase tracking-wide">Interior Sq Ft / Sq M</span>
                        <span className="text-gray-900 font-medium">{plan.interiorSqft}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="text-gray-600 text-sm uppercase tracking-wide">Exterior Sq Ft / Sq M</span>
                        <span className="text-gray-900 font-medium">{plan.exteriorSqft}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="text-gray-600 text-sm uppercase tracking-wide">Exposure</span>
                        <span className="text-gray-900 font-medium">N.E.S.W</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="text-gray-600 text-sm uppercase tracking-wide">Bedroom/Bathroom</span>
                        <span className="text-gray-900 font-medium">{plan.bedrooms}/{plan.bathrooms}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3">
                        <span className="text-gray-600 text-sm uppercase tracking-wide">Powder Room</span>
                        <span className="text-gray-900 font-medium">{plan.powderRooms || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-6 uppercase tracking-wide">
                      Features
                    </h3>
                    <div className="space-y-2">
                      {plan.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floor Plan Image & Interior Slideshow - Right Side */}
                <div className="lg:col-span-7 space-y-16">
                  {/* Floor Plan */}
                  <div className="bg-gray-50 p-8">
                    <div className="aspect-[4/3] lg:aspect-[3/2] flex items-center justify-center bg-white">
                      <Image
                        src={plan.image || "/placeholder.svg"}
                        alt={plan.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-contain p-4"
                        priority={planIndex === 0}
                        loading={planIndex > 0 ? "lazy" : "eager"}
                      />
                    </div>
                  </div>

                  {/* Interior Images Slideshow */}
                  {plan.interiorImages && plan.interiorImages.length > 0 && planIndex === currentPlanIndex && (
                    <div className="space-y-8">
                      <div className="text-center">
                        <h3 className="text-xl font-medium text-gray-900 mb-2">Interior Showcase</h3>
                        <p className="text-gray-600 text-sm">Experience the thoughtfully designed interior spaces</p>
                      </div>

                      <div className="space-y-8">
                        {/* Slideshow */}
                        <div className="relative">
                          <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full cursor-pointer"
                                onClick={() => handleImageClick(plan.interiorImages[currentImageIndex])}
                              >
                                <Image
                                  src={plan.interiorImages[currentImageIndex].image || "/placeholder.svg"}
                                  alt={plan.interiorImages[currentImageIndex].name}
                                  width={600}
                                  height={450}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </motion.div>
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            {plan.interiorImages.length > 1 && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 p-0 shadow-sm"
                                  onClick={prevImage}
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 p-0 shadow-sm"
                                  onClick={nextImage}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </>
                            )}

                            {/* Image Counter */}
                            <div className="absolute bottom-3 left-3 bg-white/90 text-gray-800 px-3 py-1 text-xs">
                              {currentImageIndex + 1} of {plan.interiorImages.length}
                            </div>
                          </div>

                          {/* Dots Navigation */}
                          {plan.interiorImages.length > 1 && (
                            <div className="flex justify-center mt-4 space-x-2">
                              {plan.interiorImages.map((_: any, index: number) => (
                                <button
                                  key={index}
                                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                    index === currentImageIndex ? "bg-gray-800" : "bg-gray-300 hover:bg-gray-400"
                                  }`}
                                  onClick={() => setCurrentImageIndex(index)}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Current Image Info */}
                        <div className="text-center mt-6">
                          <h4 className="text-lg font-medium text-gray-900 mb-1">
                            {plan.interiorImages[currentImageIndex].name}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Thoughtfully designed spaces
                          </p>
                        </div>

                        {/* Room List */}
                        <div className="grid grid-cols-2 gap-2 mt-8">
                          {plan.interiorImages.map((room: any, index: number) => (
                            <Button
                              key={room.id}
                              variant={index === currentImageIndex ? "default" : "ghost"}
                              className={`justify-start text-left py-2 px-3 text-xs transition-all duration-200 ${
                                index === currentImageIndex 
                                  ? "bg-gray-800 text-white" 
                                  : "text-gray-600 hover:bg-gray-100 border border-gray-200"
                              }`}
                              onClick={() => setCurrentImageIndex(index)}
                            >
                              {room.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Full Screen Image Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 bg-black">
          <div className="sr-only">
            <h2>Full Screen Image View</h2>
            <p>View the selected interior image in full screen</p>
          </div>
          {selectedImage && (
            <div className="relative w-full h-full overflow-hidden">
              <div className="absolute top-6 right-6 z-20">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black/80 hover:bg-black/90 text-white border-white/20 rounded-full w-12 h-12 p-0"
                  onClick={() => setIsImageDialogOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="absolute top-6 left-6 z-20">
                <div className="bg-black/80 text-white px-6 py-3 rounded-xl backdrop-blur-sm">
                  <p className="text-sm font-medium">{selectedImage.name}</p>
                </div>
              </div>

              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.name}
                  width={1400}
                  height={1000}
                  className="max-w-full max-h-full object-contain"
                  priority
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
