
"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, Share2, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

const singleStoreyPlans = [
  {
    id: 5,
    title: "Luxury Single Storey",
    subtitle: "Single Storey",
    image: "/images/plan4.jpg",
    pdfUrl: "/floorplans/floor4.pdf",
    interiorSqft: "204 sq m",
    exteriorSqft: "45 sq m",
    bedrooms: 3,
    bathrooms: 2,
    powderRooms: 1,
    features: ["Alfresco at the back", "Family room and lounge", "Scullery and modern kitchen", "Master bedroom with ensuite", "Dining"],
    interiorImages: [
      { id: 1, name: "Family Room", image: "/images/plan1.png" },
      { id: 2, name: "Master Suite", image: "/images/plan2.png" },
      { id: 3, name: "Alfresco", image: "/images/Double Storey 3Bedroom.png" },
      { id: 4, name: "Kitchen", image: "/images/plan3.png" }
    ]
  },
  {
    id: 6,
    title: "4-Bedroom Single Storey",
    subtitle: "Single Storey",
    image: "/images/4-bed.png",
    pdfUrl: "/floorplans/floor4.pdf",
    interiorSqft: "204 sq m",
    exteriorSqft: "45 sq m",
    bedrooms: 4,
    bathrooms: 2,
    powderRooms: 1,
    features: ["Alfresco at the back", "Family room and lounge", "Scullery and modern kitchen", "Guest bedroom with ensuite", "Car Parking Space", "Dining & Living Room"],
    interiorImages: [
      { id: 1, name: "Master Bedroom", image: "/images/plan1.png" },
      { id: 2, name: "Family Living", image: "/images/plan2.png" },
      { id: 3, name: "Kitchen Area", image: "/images/plan4.jpg" },
      { id: 4, name: "Dining Room", image: "/images/plan3.png" }
    ]
  }
]

export default function SingleStoreyFloorplansPage() {
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
    const currentPlan = singleStoreyPlans[currentPlanIndex]
    if (currentPlan && currentPlan.interiorImages) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % currentPlan.interiorImages.length
      )
    }
  }

  const prevImage = () => {
    const currentPlan = singleStoreyPlans[currentPlanIndex]
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
      if (newIndex !== currentPlanIndex && newIndex >= 0 && newIndex < singleStoreyPlans.length) {
        setCurrentPlanIndex(newIndex)
        setCurrentImageIndex(0)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900">
      {/* Header */}
      <header className="bg-stone-900/90 backdrop-blur-lg border-b border-amber-600/20 px-4 sm:px-6 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <ArrowLeft className="h-5 w-5 text-amber-400" />
            <div>
              <h1 className="text-lg sm:text-xl font-light text-amber-100 tracking-wide">
                ASHUMI ESTATES
              </h1>
              <p className="text-xs text-amber-400/70 font-light tracking-wider uppercase">
                Single Storey Floor Plans
              </p>
            </div>
          </Link>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="border-amber-600/30 text-amber-400 hover:bg-amber-600/10 font-light">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="border-amber-600/30 text-amber-400 hover:bg-amber-600/10 font-light">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Dots - Fixed Position */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-4">
        {singleStoreyPlans.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
        {singleStoreyPlans.map((plan, planIndex) => (
          <section key={plan.id} className="min-h-screen snap-start flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                {/* Plan Details - Left Side */}
                <div className="lg:col-span-5 space-y-8">
                  <div>
                    <div className="text-sm text-amber-400 uppercase tracking-wider mb-4 font-medium">
                      {plan.subtitle} • Plan {plan.id}
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-light text-amber-100 mb-8 tracking-tight leading-tight">
                      {plan.title}
                    </h1>

                    {/* Specifications */}
                    <div className="bg-stone-800/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-600/10">
                      <h3 className="text-lg font-medium text-amber-100 mb-6 uppercase tracking-wider">
                        Specifications
                      </h3>
                      <div className="space-y-6">
                        <div className="flex justify-between items-center py-4 border-b border-amber-600/20 last:border-b-0">
                          <span className="text-amber-200/80 font-light">Interior Space</span>
                          <span className="text-amber-100 font-medium">{plan.interiorSqft}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-amber-600/20 last:border-b-0">
                          <span className="text-amber-200/80 font-light">Exterior Space</span>
                          <span className="text-amber-100 font-medium">{plan.exteriorSqft}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-amber-600/20 last:border-b-0">
                          <span className="text-amber-200/80 font-light">Exposure</span>
                          <span className="text-amber-100 font-medium">N.E.S.W</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-amber-600/20 last:border-b-0">
                          <span className="text-amber-200/80 font-light">Bedrooms</span>
                          <span className="text-amber-100 font-medium">{plan.bedrooms}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-amber-600/20 last:border-b-0">
                          <span className="text-amber-200/80 font-light">Bathrooms</span>
                          <span className="text-amber-100 font-medium">{plan.bathrooms}</span>
                        </div>
                        <div className="flex justify-between items-center py-4">
                          <span className="text-amber-200/80 font-light">Powder Rooms</span>
                          <span className="text-amber-100 font-medium">{plan.powderRooms || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-medium text-amber-100 mb-8 uppercase tracking-wider">
                      Premium Features
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {plan.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-stone-800/30 rounded-xl border border-amber-600/10">
                          <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-amber-200/90 font-light leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floor Plan Image & Interior Slideshow - Right Side */}
                <div className="lg:col-span-7 space-y-12">
                  {/* Floor Plan */}
                  <div className="bg-stone-800/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-600/10">
                    <div className="aspect-[4/3] lg:aspect-[3/2] flex items-center justify-center bg-stone-900/50 rounded-xl">
                      <Image
                        src={plan.image || "/placeholder.svg"}
                        alt={plan.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-contain p-8"
                        priority={planIndex <= 1}
                      />
                    </div>
                  </div>

                  {/* Interior Images Slideshow */}
                  {plan.interiorImages && plan.interiorImages.length > 0 && planIndex === currentPlanIndex && (
                    <div className="bg-stone-800/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-600/10">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-light text-amber-100 mb-4">Interior Showcase</h3>
                        <p className="text-amber-200/70 font-light">Experience the thoughtfully designed interior spaces</p>
                      </div>

                      <div className="space-y-8">
                        {/* Slideshow */}
                        <div className="relative">
                          <div className="aspect-[4/3] bg-stone-900/50 rounded-xl overflow-hidden relative">
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
                                />
                              </motion.div>
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            {plan.interiorImages.length > 1 && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-stone-900/90 hover:bg-stone-800 text-amber-400 rounded-full w-12 h-12 p-0 shadow-lg backdrop-blur-sm border border-amber-600/20"
                                  onClick={prevImage}
                                >
                                  <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-stone-900/90 hover:bg-stone-800 text-amber-400 rounded-full w-12 h-12 p-0 shadow-lg backdrop-blur-sm border border-amber-600/20"
                                  onClick={nextImage}
                                >
                                  <ChevronRight className="h-5 w-5" />
                                </Button>
                              </>
                            )}

                            {/* Image Counter */}
                            <div className="absolute bottom-4 left-4 bg-stone-900/80 text-amber-400 px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-amber-600/20">
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
                                    index === currentImageIndex ? "bg-amber-600" : "bg-amber-400/30 hover:bg-amber-400/50"
                                  }`}
                                  onClick={() => setCurrentImageIndex(index)}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Current Image Info */}
                        <div className="text-center">
                          <h4 className="text-xl font-light text-amber-100 mb-2">
                            {plan.interiorImages[currentImageIndex].name}
                          </h4>
                          <p className="text-amber-200/70 font-light">
                            Thoughtfully designed spaces that blend comfort with luxury
                          </p>
                        </div>

                        {/* Room List */}
                        <div className="grid grid-cols-2 gap-3">
                          {plan.interiorImages.map((room: any, index: number) => (
                            <Button
                              key={room.id}
                              variant={index === currentImageIndex ? "default" : "ghost"}
                              className={`justify-start text-left py-3 px-4 text-sm rounded-xl transition-all duration-300 ${
                                index === currentImageIndex 
                                  ? "bg-amber-600 text-white shadow-lg" 
                                  : "text-amber-200/80 hover:bg-stone-700/50 hover:text-amber-100 border border-amber-600/10"
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
