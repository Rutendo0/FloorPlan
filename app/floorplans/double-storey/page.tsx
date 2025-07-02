
"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, Share2, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

const doubleStoreyPlans = [
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
  }
]

export default function DoubleStoreyFloorplansPage() {
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
          <Link href="/" className="flex items-center space-x-4">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
            <div>
              <h1 className="text-lg sm:text-xl font-light text-gray-900 tracking-wide">
                ASHUMI ESTATES
              </h1>
              <p className="text-xs text-gray-500 font-light tracking-wider uppercase">
                Double Storey Floor Plans
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        {!selectedPlan ? (
          <div>
            <div className="text-center mb-12 lg:mb-16">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-wide">
                Double Storey Floor Plans
              </h1>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                Multi-level designs maximizing space and privacy with sophisticated layouts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doubleStoreyPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => handlePlanClick(plan)}
                >
                  <div className="aspect-[4/3] bg-gray-50 p-6">
                    <Image
                      src={plan.image || "/placeholder.svg"}
                      alt={plan.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      priority={index <= 2}
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-light">{plan.subtitle}</div>
                    <h3 className="text-xl font-light text-gray-900 mb-3 tracking-wide">{plan.title}</h3>
                    <div className="text-sm text-gray-600 mb-4 font-light">
                      {plan.bedrooms} Bedrooms • {plan.bathrooms} Bathrooms • {plan.interiorSqft}
                    </div>
                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-light tracking-wide">
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          // Same detail view structure as other pages
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedPlan(null)}
                className="text-gray-600 hover:text-gray-900 font-light"
              >
                ← Back to double storey plans
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="font-light">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="font-light">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Floor Plan Image */}
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="aspect-[4/3] flex items-center justify-center">
                  <Image
                    src={selectedPlan.image || "/placeholder.svg"}
                    alt={selectedPlan.title}
                    width={600}
                    height={450}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-8">
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-2 font-light">{selectedPlan.subtitle}</div>
                  <h1 className="text-3xl font-light text-gray-900 mb-6 tracking-wide">{selectedPlan.title}</h1>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <div className="text-sm text-gray-500 mb-1 font-light">Interior</div>
                      <div className="text-lg font-light">{selectedPlan.interiorSqft}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1 font-light">Exterior</div>
                      <div className="text-lg font-light">{selectedPlan.exteriorSqft}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1 font-light">Bedrooms</div>
                      <div className="text-lg font-light">{selectedPlan.bedrooms}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1 font-light">Bathrooms</div>
                      <div className="text-lg font-light">{selectedPlan.bathrooms}</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-light text-gray-900 mb-4 tracking-wide">Features</h3>
                  <ul className="space-y-3">
                    {selectedPlan.features.map((feature: string, index: number) => (
                      <li key={index} className="text-gray-600 flex items-start font-light">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Interior Images Slideshow Section */}
            {selectedPlan.interiorImages && selectedPlan.interiorImages.length > 0 && (
              <div className="border-t border-gray-100 pt-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-wide">Interior Spaces</h2>
                  <p className="text-lg text-gray-600 font-light">Explore the thoughtfully designed interior details</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Slideshow */}
                  <div className="relative">
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
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full w-10 h-10 p-0 shadow-lg"
                            onClick={prevImage}
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full w-10 h-10 p-0 shadow-lg"
                            onClick={nextImage}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </>
                      )}

                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-light">
                        {currentImageIndex + 1} / {selectedPlan.interiorImages.length}
                      </div>
                    </div>

                    {/* Dots Navigation */}
                    {selectedPlan.interiorImages.length > 1 && (
                      <div className="flex justify-center mt-6 space-x-2">
                        {selectedPlan.interiorImages.map((_: any, index: number) => (
                          <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentImageIndex ? "bg-gray-900" : "bg-gray-300 hover:bg-gray-400"
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Current Image Info */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-light text-gray-900 mb-3 tracking-wide">
                        {selectedPlan.interiorImages[currentImageIndex].name}
                      </h3>
                      <p className="text-gray-600 font-light leading-relaxed">
                        Experience the thoughtfully designed interior spaces that blend comfort with modern elegance.
                      </p>
                    </div>

                    {/* Room List */}
                    <div className="space-y-3">
                      {selectedPlan.interiorImages.map((room: any, index: number) => (
                        <Button
                          key={room.id}
                          variant={index === currentImageIndex ? "default" : "outline"}
                          className={`w-full justify-start text-left py-3 font-light tracking-wide ${
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
                  <p className="text-sm font-light">{selectedImage.name}</p>
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
