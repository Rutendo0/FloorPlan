"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { X, Download, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

const floorPlans = [
  {
    id: 1,
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
      { id: 1, name: "Master Bedroom", image: "/images/plan1.png" },
      { id: 2, name: "Living Room", image: "/images/plan2.png" },
      { id: 3, name: "Kitchen", image: "/images/plan3.png" },
      { id: 4, name: "Dining Area", image: "/images/plan4.jpg" }
    ]
  },
  {
    id: 2,
    title: "3-Bedroom Elevations",
    subtitle: "Ground Floor",
    image: "/images/plan1.png",
    pdfUrl: "/floorplans/floor1.pdf",
    interiorSqft: "245 sq m",
    exteriorSqft: "25 sq m",
    bedrooms: 3,
    bathrooms: 2,
    powderRooms: 1,
    features: ["Back Elevation", "Side Elevation", "Side Elevation 2"],
    interiorImages: [
      { id: 1, name: "Front View", image: "/images/3Bedroom.png" },
      { id: 2, name: "Side View", image: "/images/plan2.png" }
    ]
  },
  {
    id: 3,
    title: "Double Storey 3-Bedroom",
    subtitle: "Ground Floor",
    image: "/images/Double Storey 3Bedroom.png",
    pdfUrl: "/floorplans/floor1.pdf",
    interiorSqft: "245 sq m",
    exteriorSqft: "25 sq m",
    bedrooms: 3,
    bathrooms: 2,
    powderRooms: 1,
    features: ["Master bedroom with ensuite", "Dining", "Kitchen", "Pantry", "Enough Parking Space"],
    interiorImages: [
      { id: 1, name: "Master Bedroom", image: "/images/plan1.png" },
      { id: 2, name: "Kitchen & Dining", image: "/images/plan2.png" },
      { id: 3, name: "Living Area", image: "/images/plan3.png" },
      { id: 4, name: "Exterior View", image: "/images/plan4.jpg" }
    ]
  },
  {
    id: 4,
    title: "First Floor 3-Bedrooms",
    subtitle: "First Floor",
    image: "/images/First Floor Double Storey.png",
    pdfUrl: "/floorplans/floor1.pdf",
    interiorSqft: "245 sq m",
    exteriorSqft: "25 sq m",
    bedrooms: 3,
    bathrooms: 2,
    powderRooms: 1,
    features: ["Main bedroom with ensuite", "Dining", "Kitchen", "Store room", "Living room"],
    interiorImages: [
      { id: 1, name: "Bedroom 1", image: "/images/plan1.png" },
      { id: 2, name: "Bedroom 2", image: "/images/plan2.png" },
      { id: 3, name: "Central Living", image: "/images/plan3.png" },
      { id: 4, name: "Common Area", image: "/images/plan4.jpg" }
    ]
  },
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
  },
{
    id: 7,
    title: "4-Bedroom Double Storey Semi-Detached Duplex",
    subtitle: "Ground Floor",
    image: "/images/4-bedroom1.png",
    pdfUrl: "/floorplans/floor1.pdf",
    interiorSqft: "340 sq m",
    exteriorSqft: "25 sq m",
    bedrooms: 4,
    bathrooms: 2,
    powderRooms: 1,
    features: ["Guest bedroom with ensuite", "Main lounge", "Kitchen",  "Dining",  "Parking Space"],
    interiorImages: [
      { id: 1, name: "Master Bedroom", image: "/images/plan1.png" },
      { id: 2, name: "Living Room", image: "/images/plan2.png" },
      { id: 3, name: "Kitchen", image: "/images/plan3.png" },
      { id: 4, name: "Dining Area", image: "/images/plan4.jpg" }
    ]
  },
  {
    id: 8,
    title: "4-Bedroom Double Storey Semi-Detached Duplex",
    subtitle: "Ground Floor",
    image: "/images/4-Bedroom.png",
    pdfUrl: "/floorplans/floor1.pdf",
    interiorSqft: "377 sq m",
    exteriorSqft: "25 sq m",
    bedrooms: 4,
    bathrooms: 2,
    powderRooms: 1,
    features: ["Guest bedroom with ensuite", "Main lounge", "Kitchen",  "Dining",  "Parking Space"],
    interiorImages: [
      { id: 1, name: "Master Bedroom", image: "/images/plan1.png" },
      { id: 2, name: "Living Room", image: "/images/plan2.png" },
      { id: 3, name: "Kitchen", image: "/images/plan3.png" },
      { id: 4, name: "Dining Area", image: "/images/plan4.jpg" }
    ]
  },

]

export default function FloorplansPage() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)

  const handlePlanClick = (plan: any) => {
    setSelectedPlan(plan)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedPlan && selectedPlan.interiorImages) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % selectedPlan.interiorImages.length
      )
    }
  }

  const prevImage = () => {
    if (selectedPlan && selectedPlan.interiorImages) {
      setCurrentImageIndex((prev) => 
        (prev - 1 + selectedPlan.interiorImages.length) % selectedPlan.interiorImages.length
      )
    }
  }

  const handleImageClick = (image: any) => {
    setSelectedImage(image)
    setIsImageDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="ashumi-brand text-gray-900">
            <a href="/" className="hover:text-gray-600 transition-colors">
              ASHUMI
            </a>
          </h1>
          <div className="text-xs text-gray-400 uppercase tracking-[0.3em] font-light">Floor Plans</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {!selectedPlan ? (
          // Grid View - Select a floor plan
          <div>
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-wide">Choose Your Floor Plan</h1>
              <p className="text-lg sm:text-xl text-gray-600 px-4 font-light">Select a floor plan to explore room details and interior designs</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {floorPlans.map((plan) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: plan.id * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handlePlanClick(plan)}
                >
                  <div className="aspect-[4/3] bg-gray-50 p-3 sm:p-6">
                    <Image
                      src={plan.image || "/placeholder.svg"}
                      alt={plan.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-contain"
                      priority={plan.id <= 3}
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-2 font-light">FLOOR {plan.id}</div>
                    <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-3 tracking-wide">{plan.title}</h3>
                    <div className="text-sm text-gray-500 mb-6 leading-relaxed">
                      {plan.bedrooms} Bedrooms • {plan.bathrooms} Bathrooms • {plan.interiorSqft}
                    </div>
                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-sm font-light tracking-wide">
                      VIEW DETAILS
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          // Detail View - Selected floor plan
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedPlan(null)}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to all plans
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12 sm:mb-16">
              {/* Details - Left Side */}
              <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-3 font-light">FLOOR {selectedPlan.id}</div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-8 tracking-wide leading-tight">
                    {selectedPlan.title}
                  </h1>

                  {/* Specifications */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-sm text-gray-500 uppercase tracking-wider">Interior Sq Ft / Sq M</span>
                        <span className="text-sm font-medium">{selectedPlan.interiorSqft}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-sm text-gray-500 uppercase tracking-wider">Exterior Sq Ft / Sq M</span>
                        <span className="text-sm font-medium">{selectedPlan.exteriorSqft}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-sm text-gray-500 uppercase tracking-wider">Exposure</span>
                        <span className="text-sm font-medium">N.E.S.W</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-sm text-gray-500 uppercase tracking-wider">Bedroom/Bathroom</span>
                        <span className="text-sm font-medium">{selectedPlan.bedrooms}/{selectedPlan.bathrooms}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-sm text-gray-500 uppercase tracking-wider">Powder Room</span>
                        <span className="text-sm font-medium">{selectedPlan.powderRooms || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-6">Features</h3>
                  <ul className="space-y-3">
                    {selectedPlan.features.map((feature: string, index: number) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start leading-relaxed">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Floor Plan Image - Right Side */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="bg-white border border-gray-200 rounded-lg p-6 lg:p-8 shadow-sm">
                  <div className="aspect-[4/3] lg:aspect-[3/2] flex items-center justify-center">
                    <Image
                      src={selectedPlan.image || "/placeholder.svg"}
                      alt={selectedPlan.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Interior Images Slideshow Section */}
            {selectedPlan.interiorImages && selectedPlan.interiorImages.length > 0 && (
              <div className="border-t border-gray-100 pt-8 sm:pt-12 lg:pt-16">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">A Closer Look</h2>
                  <p className="text-base sm:text-lg text-gray-600 px-4">Explore the interior spaces and design details</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start lg:items-center">
                  {/* Slideshow */}
                  <div className="relative order-1 lg:order-1">
                    <div className="aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full cursor-pointer"
                          onClick={() => handleImageClick(selectedPlan.interiorImages[currentImageIndex])}
                        >
                          <Image
                            src={selectedPlan.interiorImages[currentImageIndex].image || "/placeholder.svg"}
                            alt={selectedPlan.interiorImages[currentImageIndex].name}
                            width={600}
                            height={450}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Arrows */}
                      {selectedPlan.interiorImages.length > 1 && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 shadow-lg"
                            onClick={prevImage}
                          >
                            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 shadow-lg"
                            onClick={nextImage}
                          >
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                          </Button>
                        </>
                      )}

                      {/* Image Counter */}
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/70 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                        {currentImageIndex + 1} / {selectedPlan.interiorImages.length}
                      </div>
                    </div>

                    {/* Dots Navigation */}
                    {selectedPlan.interiorImages.length > 1 && (
                      <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
                        {selectedPlan.interiorImages.map((_: any, index: number) => (
                          <button
                            key={index}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                              index === currentImageIndex ? "bg-gray-900" : "bg-gray-300 hover:bg-gray-400"
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Current Image Info */}
                  <div className="space-y-4 sm:space-y-6 order-2 lg:order-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-2">
                        {selectedPlan.interiorImages[currentImageIndex].name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        Experience the thoughtfully designed interior spaces that blend comfort with modern elegance.
                      </p>
                    </div>

                    {/* Room List */}
                    <div className="space-y-2 sm:space-y-3">
                      {selectedPlan.interiorImages.map((room: any, index: number) => (
                        <Button
                          key={room.id}
                          variant={index === currentImageIndex ? "default" : "outline"}
                          className={`w-full justify-start text-left text-sm sm:text-base py-2 sm:py-3 ${
                            index === currentImageIndex 
                              ? "bg-gray-900 text-white" 
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          {room.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

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
                <div className="bg-black/80 text-white px-4 py-2 rounded">
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