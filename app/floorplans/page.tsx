
"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { X, Download, Share2, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
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
    features: ["Guest bedroom with ensuite", "Main lounge", "Kitchen", "Dining", "Parking Space"],
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
    features: ["Guest bedroom with ensuite", "Main lounge", "Kitchen", "Dining", "Parking Space"],
    interiorImages: [
      { id: 1, name: "Master Bedroom", image: "/images/plan1.png" },
      { id: 2, name: "Living Room", image: "/images/plan2.png" },
      { id: 3, name: "Kitchen", image: "/images/plan3.png" },
      { id: 4, name: "Dining Area", image: "/images/plan4.jpg" }
    ]
  }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
      {/* Elegant Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-stone-200/50 px-6 py-8 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-light text-stone-900 tracking-[0.2em]">
              <a href="/" className="hover:text-amber-600 transition-all duration-300">
                ASHUMI ESTATES
              </a>
            </h1>
            <p className="text-xs text-stone-500 tracking-[0.3em] uppercase mt-1 font-light">
              Luxury Redefined
            </p>
          </motion.div>
          <div className="text-sm text-stone-600 uppercase tracking-[0.25em] font-light">
            Floor Plans Collection
          </div>
        </div>
      </header>

      {!selectedPlan ? (
        <>
          {/* Hero Section */}
          <section className="relative py-24 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-stone-100/20"></div>
            <div className="max-w-7xl mx-auto px-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h1 className="text-5xl lg:text-7xl font-extralight text-stone-900 mb-8 tracking-tight leading-tight">
                  Architectural
                  <span className="block text-amber-600 italic font-light">Excellence</span>
                </h1>
                <p className="text-xl lg:text-2xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
                  Discover our curated collection of luxury floor plans, where every detail reflects
                  our commitment to sophisticated living and timeless design.
                </p>
                <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <div className="flex items-center gap-3 text-stone-600">
                    <div className="w-12 h-px bg-amber-600"></div>
                    <span className="text-sm uppercase tracking-wider font-light">Premium Designs</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-600">
                    <div className="w-12 h-px bg-amber-600"></div>
                    <span className="text-sm uppercase tracking-wider font-light">Luxury Living</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Floor Plans Collection */}
          <section className="max-w-7xl mx-auto px-6 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl lg:text-5xl font-light text-stone-900 mb-6 tracking-wide">
                Our Collection
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
                Each plan represents our dedication to creating spaces that inspire and elevate daily life
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
              {floorPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => handlePlanClick(plan)}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] bg-stone-50 overflow-hidden">
                      <Image
                        src={plan.image || "/placeholder.svg"}
                        alt={plan.title}
                        width={500}
                        height={375}
                        className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                        priority={index < 6}
                      />
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-xs font-medium text-stone-700 uppercase tracking-wider">
                            Plan {plan.id}
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="mb-4">
                        <h3 className="text-2xl font-light text-stone-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                          {plan.title}
                        </h3>
                        <p className="text-stone-500 text-sm uppercase tracking-wider font-light">
                          {plan.subtitle}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                        <div>
                          <div className="text-2xl font-light text-stone-900">{plan.bedrooms}</div>
                          <div className="text-xs text-stone-500 uppercase tracking-wider">Bedrooms</div>
                        </div>
                        <div>
                          <div className="text-2xl font-light text-stone-900">{plan.bathrooms}</div>
                          <div className="text-xs text-stone-500 uppercase tracking-wider">Bathrooms</div>
                        </div>
                        <div>
                          <div className="text-2xl font-light text-stone-900">{plan.interiorSqft.split(' ')[0]}</div>
                          <div className="text-xs text-stone-500 uppercase tracking-wider">Sq M</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-light text-stone-900">{plan.interiorSqft}</span>
                        <div className="flex items-center text-amber-600 group-hover:translate-x-2 transition-transform duration-300">
                          <span className="text-sm uppercase tracking-wider font-medium mr-2">Explore</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      ) : (
        // Detail View - Selected floor plan
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedPlan(null)}
              className="text-stone-600 hover:text-stone-900 hover:bg-stone-100 flex items-center gap-2 px-0"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Collection
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="border-stone-300 hover:border-amber-600 hover:text-amber-600">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm" className="border-stone-300 hover:border-amber-600 hover:text-amber-600">
                <Share2 className="h-4 w-4 mr-2" />
                Share Plan
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
            {/* Details - Left Side */}
            <div className="lg:col-span-5 space-y-12 order-2 lg:order-1">
              <div>
                <div className="text-sm text-amber-600 uppercase tracking-wider mb-4 font-medium">
                  {selectedPlan.subtitle} • Plan {selectedPlan.id}
                </div>
                <h1 className="text-4xl lg:text-5xl font-light text-stone-900 mb-8 tracking-tight leading-tight">
                  {selectedPlan.title}
                </h1>

                {/* Specifications */}
                <div className="bg-stone-50 rounded-2xl p-8">
                  <h3 className="text-lg font-medium text-stone-900 mb-6 uppercase tracking-wider">
                    Specifications
                  </h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center py-4 border-b border-stone-200 last:border-b-0">
                      <span className="text-stone-600 font-light">Interior Space</span>
                      <span className="text-stone-900 font-medium">{selectedPlan.interiorSqft}</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-stone-200 last:border-b-0">
                      <span className="text-stone-600 font-light">Exterior Space</span>
                      <span className="text-stone-900 font-medium">{selectedPlan.exteriorSqft}</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-stone-200 last:border-b-0">
                      <span className="text-stone-600 font-light">Exposure</span>
                      <span className="text-stone-900 font-medium">N.E.S.W</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-stone-200 last:border-b-0">
                      <span className="text-stone-600 font-light">Bedrooms</span>
                      <span className="text-stone-900 font-medium">{selectedPlan.bedrooms}</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-stone-200 last:border-b-0">
                      <span className="text-stone-600 font-light">Bathrooms</span>
                      <span className="text-stone-900 font-medium">{selectedPlan.bathrooms}</span>
                    </div>
                    <div className="flex justify-between items-center py-4">
                      <span className="text-stone-600 font-light">Powder Rooms</span>
                      <span className="text-stone-900 font-medium">{selectedPlan.powderRooms || 0}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-medium text-stone-900 mb-8 uppercase tracking-wider">
                  Premium Features
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {selectedPlan.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-stone-200">
                      <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-stone-700 font-light leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floor Plan Image - Right Side */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-stone-200">
                <div className="aspect-[4/3] lg:aspect-[3/2] flex items-center justify-center bg-stone-50 rounded-xl">
                  <Image
                    src={selectedPlan.image || "/placeholder.svg"}
                    alt={selectedPlan.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-contain p-8"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interior Images Slideshow Section */}
          {selectedPlan.interiorImages && selectedPlan.interiorImages.length > 0 && (
            <section className="border-t border-stone-200 pt-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-light text-stone-900 mb-6">Interior Showcase</h2>
                <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
                  Step inside and experience the thoughtful design that defines luxury living
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Slideshow */}
                <div className="relative order-1 lg:order-1">
                  <div className="aspect-[4/3] bg-stone-100 rounded-2xl overflow-hidden relative shadow-xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
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
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-stone-900 rounded-full w-12 h-12 p-0 shadow-lg backdrop-blur-sm"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-stone-900 rounded-full w-12 h-12 p-0 shadow-lg backdrop-blur-sm"
                          onClick={nextImage}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                      {currentImageIndex + 1} of {selectedPlan.interiorImages.length}
                    </div>
                  </div>

                  {/* Dots Navigation */}
                  {selectedPlan.interiorImages.length > 1 && (
                    <div className="flex justify-center mt-8 space-x-3">
                      {selectedPlan.interiorImages.map((_: any, index: number) => (
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
                <div className="space-y-8 order-2 lg:order-2">
                  <div>
                    <h3 className="text-3xl font-light text-stone-900 mb-4">
                      {selectedPlan.interiorImages[currentImageIndex].name}
                    </h3>
                    <p className="text-lg text-stone-600 leading-relaxed">
                      Experience the seamless blend of functionality and elegance in every carefully designed space, 
                      where luxury meets livability in perfect harmony.
                    </p>
                  </div>

                  {/* Room List */}
                  <div className="space-y-3">
                    {selectedPlan.interiorImages.map((room: any, index: number) => (
                      <Button
                        key={room.id}
                        variant={index === currentImageIndex ? "default" : "ghost"}
                        className={`w-full justify-start text-left py-4 px-6 text-base rounded-xl transition-all duration-300 ${
                          index === currentImageIndex 
                            ? "bg-amber-600 text-white shadow-lg" 
                            : "text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        {room.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      )}

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
