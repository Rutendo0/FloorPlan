
"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, Share2, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

const fourBedroomDuplexPlans = [
  {
    id: 401,
    title: "4-Bedroom Double Storey Duplex",
    subtitle: "Ground Floor",
    image: "/images/4-bedroom1.png",
    pdfUrl: "/floorplans/floor1.pdf",
    interiorSqft: "340 sq m",
    exteriorSqft: "25 sq m",
    bedrooms: 2,
    bathrooms: 2,
    powderRooms: 1,
    features: ["Ground floor master bedroom", "Guest bedroom with ensuite", "Main lounge", "Modern kitchen", "Dining area", "Double garage"],
    interiorImages: [
      { id: 4011, name: "Spacious Master Bedroom", image: "https://images.unsplash.com/photo-1631049035382-9847d7b0b8b2?w=800&h=600&fit=crop" },
      { id: 4012, name: "Family Living Area", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop" },
      { id: 4013, name: "Contemporary Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop" },
      { id: 4014, name: "Formal Dining Room", image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&h=600&fit=crop" },
      { id: 4015, name: "Guest Bedroom", image: "https://images.unsplash.com/photo-1631049035382-9847d7b0b8b2?w=800&h=600&fit=crop" },
      { id: 4016, name: "Guest Ensuite", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop" },
      { id: 4017, name: "Main Bathroom", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop" },
      { id: 4018, name: "Powder Room", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop" }
    ]
  },
  {
    id: 402,
    title: "4-Bedroom Double Storey Duplex",
    subtitle: "First Floor",
    image: "/images/4-Bedroom.png",
    pdfUrl: "/floorplans/floor1.pdf",
    interiorSqft: "250 sq m",
    exteriorSqft: "15 sq m",
    bedrooms: 2,
    bathrooms: 1,
    powderRooms: 0,
    features: ["Two additional bedrooms", "Family bathroom", "Upper level living area", "Study nook", "Private balcony access", "Built-in storage"],
    interiorImages: [
      { id: 4021, name: "Upper Level Master Suite", image: "https://images.unsplash.com/photo-1631049035382-9847d7b0b8b2?w=800&h=600&fit=crop" },
      { id: 4022, name: "Second Bedroom", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop" },
      { id: 4023, name: "Third Bedroom", image: "https://images.unsplash.com/photo-1631049035382-9847d7b0b8b2?w=800&h=600&fit=crop" },
      { id: 4024, name: "Fourth Bedroom", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop" },
      { id: 4025, name: "Upper Living Area", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=600&fit=crop" },
      { id: 4026, name: "Family Bathroom", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop" },
      { id: 4027, name: "Study Nook", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop" },
      { id: 4028, name: "Private Balcony", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop" }
    ]
  }
]

export default function FourBedroomDuplexDoubleStoreyPage() {
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
    const currentPlan = fourBedroomDuplexPlans[currentPlanIndex]
    if (currentPlan && currentPlan.interiorImages) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % currentPlan.interiorImages.length
      )
    }
  }

  const prevImage = () => {
    const currentPlan = fourBedroomDuplexPlans[currentPlanIndex]
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
      if (newIndex !== currentPlanIndex && newIndex >= 0 && newIndex < fourBedroomDuplexPlans.length) {
        setCurrentPlanIndex(newIndex)
        setCurrentImageIndex(0)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-stone-50/80 backdrop-blur-lg border-b border-stone-300/30 px-4 sm:px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/floorplans/double-storey" className="flex items-center space-x-2 sm:space-x-3">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-stone-600" />
            <div>
              <h1 className="text-lg sm:text-xl font-light text-stone-800 tracking-wide">
                ASHUMI ESTATES
              </h1>
              <p className="text-xs text-stone-500 uppercase tracking-wider hidden sm:block">
                4-Bedroom Double Storey Duplex
              </p>
            </div>
          </Link>
          <div className="flex space-x-2 sm:space-x-3">
            <Button variant="outline" size="sm" className="border-stone-300 text-stone-600 hover:bg-stone-100 hidden sm:flex">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="border-stone-300 text-stone-600 hover:bg-stone-100 sm:hidden">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="border-stone-300 text-stone-600 hover:bg-stone-100 hidden sm:flex">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="border-stone-300 text-stone-600 hover:bg-stone-100 sm:hidden">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Dots - Fixed Position */}
      <div className="fixed right-2 sm:right-8 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-3 sm:space-y-4">
        {fourBedroomDuplexPlans.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentPlanIndex 
                ? "bg-amber-600 shadow-lg shadow-amber-600/50" 
                : "bg-amber-400/30 hover:bg-amber-400/50"
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
        {fourBedroomDuplexPlans.map((plan, planIndex) => (
          <div key={plan.id}>
            {/* Section Divider - appears between plans */}
            {planIndex > 0 && (
              <div className="h-32 flex items-center justify-center bg-gradient-to-b from-stone-100 to-white border-t border-b border-stone-200">
                <div className="text-center">
                  <div className="w-20 h-px bg-amber-600 mx-auto mb-4"></div>
                  <p className="text-stone-500 text-sm uppercase tracking-[0.2em] font-light">
                    {plan.subtitle}
                  </p>
                  <div className="w-20 h-px bg-amber-600 mx-auto mt-4"></div>
                </div>
              </div>
            )}

            <section className="min-h-screen snap-start flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
                  {/* Plan Details - Left Side */}
                  <div className="lg:col-span-5 space-y-6 sm:space-y-8">
                    <div>
                      <div className="text-sm text-stone-500 uppercase tracking-[0.15em] mb-3 font-light">
                        {plan.subtitle} • Plan {plan.id}
                      </div>
                      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-light text-stone-800 mb-6 sm:mb-8 tracking-tight leading-tight">
                        {plan.title}
                      </h1>

                      {/* Specifications */}
                      <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200">
                        <h3 className="text-lg font-medium text-stone-900 mb-6 uppercase tracking-wider">
                          Specifications
                        </h3>
                        <div className="space-y-6">
                          <div className="flex justify-between items-center py-4 border-b border-stone-200 last:border-b-0">
                            <span className="text-stone-600 font-light">Interior Space</span>
                            <span className="text-stone-900 font-medium">{plan.interiorSqft}</span>
                          </div>
                          <div className="flex justify-between items-center py-4 border-b border-stone-200 last:border-b-0">
                            <span className="text-stone-600 font-light">Exterior Space</span>
                            <span className="text-stone-900 font-medium">{plan.exteriorSqft}</span>
                          </div>
                          <div className="flex justify-between items-center py-4 border-b border-stone-200 last:border-b-0">
                            <span className="text-stone-600 font-light">Exposure</span>
                            <span className="text-stone-900 font-medium">N.E.S.W</span>
                          </div>
                          <div className="flex justify-between items-center py-4 border-b border-stone-200 last:border-b-0">
                            <span className="text-stone-600 font-light">Bedrooms</span>
                            <span className="text-stone-900 font-medium">{plan.bedrooms}</span>
                          </div>
                          <div className="flex justify-between items-center py-4 border-b border-stone-200 last:border-b-0">
                            <span className="text-stone-600 font-light">Bathrooms</span>
                            <span className="text-stone-900 font-medium">{plan.bathrooms}</span>
                          </div>
                          <div className="flex justify-between items-center py-4">
                            <span className="text-stone-600 font-light">Powder Rooms</span>
                            <span className="text-stone-900 font-medium">{plan.powderRooms || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-lg font-medium text-stone-900 mb-8 uppercase tracking-wider">
                        Premium Features
                      </h3>
                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        {plan.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border border-stone-200">
                            <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm sm:text-base text-stone-700 font-light leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floor Plan Image & Interior Slideshow - Right Side */}
                  <div className="lg:col-span-7 space-y-8 sm:space-y-12">
                    {/* Floor Plan */}
                    <div className="bg-white rounded-2xl p-4 sm:p-8 border border-stone-200 shadow-lg">
                      <div className="aspect-[4/3] lg:aspect-[3/2] flex items-center justify-center bg-stone-50 rounded-xl">
                        <Image
                          src={plan.image || "/placeholder.svg"}
                          alt={plan.title}
                          width={800}
                          height={600}
                          className="w-full h-full object-contain p-4 sm:p-8"
                          priority={planIndex === 0}
                          loading={planIndex > 0 ? "lazy" : "eager"}
                        />
                      </div>
                    </div>

                    {/* Interior Images Slideshow */}
                    {plan.interiorImages && plan.interiorImages.length > 0 && planIndex === currentPlanIndex && (
                      <div className="bg-white rounded-2xl p-4 sm:p-8 border border-stone-200 shadow-lg">
                        <div className="text-center mb-6 sm:mb-8">
                          <h3 className="text-xl sm:text-2xl font-light text-stone-900 mb-3 sm:mb-4">Interior Showcase</h3>
                          <p className="text-sm sm:text-base text-stone-600 font-light">Experience the thoughtfully designed interior spaces</p>
                        </div>

                        <div className="space-y-6 sm:space-y-8">
                          {/* Slideshow */}
                          <div className="relative">
                            <div className="aspect-[4/3] bg-stone-50 rounded-xl overflow-hidden relative">
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={currentImageIndex}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.5 }}
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
                                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-stone-900 rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 shadow-lg backdrop-blur-sm border border-stone-200"
                                    onClick={prevImage}
                                  >
                                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-stone-900 rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 shadow-lg backdrop-blur-sm border border-stone-200"
                                    onClick={nextImage}
                                  >
                                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                  </Button>
                                </>
                              )}

                              {/* Image Counter */}
                              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-stone-900/80 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm backdrop-blur-sm border border-amber-600/20">
                                {currentImageIndex + 1} of {plan.interiorImages.length}
                              </div>
                            </div>

                            {/* Dots Navigation */}
                            {plan.interiorImages.length > 1 && (
                              <div className="flex justify-center mt-6 space-x-3">
                                {plan.interiorImages.map((_: any, index: number) => (
                                  <button
                                    key={index}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                      index === currentImageIndex ? "bg-amber-600" : "bg-stone-300 hover:bg-stone-400"
                                    }`}
                                    onClick={() => setCurrentImageIndex(index)}
                                  />
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Current Image Info */}
                          <div className="text-center">
                            <h4 className="text-xl font-light text-stone-900 mb-2">
                              {plan.interiorImages[currentImageIndex].name}
                            </h4>
                            <p className="text-stone-600 font-light">
                              Thoughtfully designed spaces that blend comfort with luxury
                            </p>
                          </div>

                          {/* Room List */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {plan.interiorImages.map((room: any, index: number) => (
                              <Button
                                key={room.id}
                                variant={index === currentImageIndex ? "default" : "ghost"}
                                className={`justify-start text-left py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm rounded-xl transition-all duration-300 ${
                                  index === currentImageIndex 
                                    ? "bg-amber-600 text-white shadow-lg" 
                                    : "text-stone-600 hover:bg-stone-100 border border-stone-200"
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
          </div>
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
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
