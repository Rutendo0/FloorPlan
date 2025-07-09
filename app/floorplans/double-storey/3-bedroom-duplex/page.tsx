"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

const fourBedroomPlans = [
  {
    id: 1,
    title: "Ground Floor 3 Bedroom",
    description: "A spacious 3-bedroom home featuring an open-plan living area, modern kitchen, and large bedrooms with built-in wardrobes.",
    interiorSqft: "204 sq m",
    exteriorSqft: "45 sq m",
    bedrooms: 3,
    bathrooms: 2,
    features: [
      "Spacious open-plan living area",
      "Modern kitchen with island bench",
      "Veranda and swimming pool",
      "Master bedroom with ensuite",
      "Family bathroom with separate toilet",
      "Lounge and dining area",
      "Double garange"
    ],
    image: "/images/3Bedroom.png",
    interiorImages: [
      { src: "/images/image1.jpg", title: "Living Room", description: "Open-plan living area with modern finishes" },
      { src: "/images/image2.jpg", title: "Kitchen", description: "Contemporary kitchen with island bench" },
      { src: "/images/image3.jpg", title: "Master Bedroom", description: "Spacious master suite with walk-in robe" }
    ]
  },
  {
    id: 2,
    title: "Ground Floor 3 Bedroom",
    description: "Elegant 3-bedroom design with flowing spaces, premium finishes, and seamless indoor-outdoor connection.",
    interiorSqft: "204 sq m",
    exteriorSqft: "45 sq m",
    bedrooms: 3,
    bathrooms: 2,
    powderRooms: 1,
    features: [
      "Formal lounge and dining area",
      "Open-plan family and meals area",
      "Chef's kitchen with premium appliances",
      "Master retreat with private balcony",
      "Dining area",
      "Covered alfresco entertainment area",
      "Double garange"
    ],
    image: "/images/3-bed.png",
    interiorImages: [
      { src: "/images/image1.jpg", title: "Dining Area", description: "Elegant dining space with garden views" },
      { src: "/images/image3.jpg", title: "Family Room", description: "Comfortable family living area" },
      { src: "/images/image2.jpg", title: "Bedroom", description: "Well-appointed secondary bedroom" }
    ]
  },
  {
    id: 3,
    title: "Luxury 3 Bedroom",
    description: "Premium 4-bedroom design with high-end finishes, smart home features, and luxurious living spaces.",
    interiorSqft: "180 sq m",
    exteriorSqft: "50 sq m",
    bedrooms: 3,
    bathrooms: 2,
    powderRooms: 1,
    features: [
      "Open-plan living with 3m ceilings",
      "Gourmet kitchen with pantry",
      "Master suite with  luxury ensuite",
      "Guest bedroom with ensuit",
      "Media room/home theater",
      "Outdoor kitchen and entertainment area",
      "Space parking area",
      "Smart home automation system"
    ],
    image: "/images/3-bed2.png",
    interiorImages: [
      { src: "/images/image1.jpg", title: "Dining Area", description: "Elegant dining space with garden views" },
      { src: "/images/image3.jpg", title: "Family Room", description: "Comfortable family living area" },
      { src: "/images/image2.jpg", title: "Bedroom", description: "Well-appointed secondary bedroom" }
    ]
  }
]

export default function FourBedroomFloorplansPage() {
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollToPlan = (index: number) => {
    setCurrentPlanIndex(index)
    setCurrentImageIndex(0)
    setShowFeatures(false)
    if (scrollContainerRef.current) {
      const targetScrollTop = index * scrollContainerRef.current.clientHeight
      scrollContainerRef.current.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      })
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop
      const containerHeight = scrollContainerRef.current.clientHeight
      const newIndex = Math.round(scrollTop / containerHeight)
      if (newIndex !== currentPlanIndex && newIndex >= 0 && newIndex < fourBedroomPlans.length) {
        setCurrentPlanIndex(newIndex)
        setCurrentImageIndex(0)
        setShowFeatures(false)
      }
    }
  }

  const nextImage = () => {
    const currentPlan = fourBedroomPlans[currentPlanIndex]
    if (currentPlan && currentPlan.interiorImages) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % currentPlan.interiorImages.length
      )
    }
  }

  const prevImage = () => {
    const currentPlan = fourBedroomPlans[currentPlanIndex]
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

  const toggleFeatures = () => {
    setShowFeatures(!showFeatures)
  }

  const currentPlan = fourBedroomPlans[currentPlanIndex]

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side - Fixed Info Panel */}
      <div className="lg:w-2/5 bg-stone-50 p-6 lg:p-8 flex flex-col relative">
        {/* Header */}
        <div className="mb-8">
          <Link href="/floorplans/double-storey" className="flex items-center space-x-2 group">
            <ArrowLeft className="h-5 w-5 text-stone-600 group-hover:text-stone-900 transition-colors" />
            <span className="text-stone-600 font-medium group-hover:text-stone-900 transition-colors">
              Back to Double Storey
            </span>
          </Link>
        </div>

        {/* Plan Info */}
        <div className="space-y-6 flex-1 overflow-y-auto">
          <div>
            <h1 className="text-3xl font-light text-stone-900 mb-2 tracking-wide">
              3-Bedroom Duplex Plans
            </h1>
            <div className="text-lg text-stone-600 mb-6">
              Plan {currentPlan?.id} of {fourBedroomPlans.length}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-light text-stone-800">
              {currentPlan?.title}
            </h2>
            <p className="text-stone-600 leading-relaxed">
              {currentPlan?.description}
            </p>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-sm text-stone-500">Interior Area</div>
              <div className="font-medium">{currentPlan?.interiorSqft}</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-sm text-stone-500">Exterior Area</div>
              <div className="font-medium">{currentPlan?.exteriorSqft}</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-sm text-stone-500">Bedrooms</div>
              <div className="font-medium">{currentPlan?.bedrooms}</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-sm text-stone-500">Bathrooms</div>
              <div className="font-medium">{currentPlan?.bathrooms}</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-sm text-stone-500">Powder Rooms</div>
              <div className="font-medium">{currentPlan?.powderRooms}</div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-6">
            <button 
              onClick={toggleFeatures}
              className="flex items-center justify-between w-full p-3 bg-white rounded-lg shadow-sm hover:bg-stone-100 transition-colors"
            >
              <span className="font-medium">Key Features</span>
              {showFeatures ? (
                <ChevronUp className="h-5 w-5 text-stone-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-stone-500" />
              )}
            </button>
            
            {showFeatures && (
              <ul className="mt-3 space-y-2 pl-5 list-disc text-stone-600">
                {currentPlan?.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Interior Images */}
          {currentPlan?.interiorImages && currentPlan.interiorImages.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-stone-800 mb-4">Interior Design</h3>
              <div className="relative">
                <div className="aspect-[4/3] bg-white rounded-2xl p-4 shadow-lg overflow-hidden">
                  <Image
                    src={currentPlan.interiorImages[currentImageIndex]?.src || "/placeholder.svg"}
                    alt={currentPlan.interiorImages[currentImageIndex]?.title || "Interior"}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleImageClick(currentPlan.interiorImages[currentImageIndex])}
                  />
                </div>

                {/* Image Navigation */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={prevImage}
                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow hover:bg-stone-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4 text-stone-600" />
                  </button>

                  <div className="text-center">
                    <p className="font-medium text-stone-800">
                      {currentPlan.interiorImages[currentImageIndex]?.title}
                    </p>
                    <p className="text-sm text-stone-600">
                      {currentImageIndex + 1} of {currentPlan.interiorImages.length}
                    </p>
                  </div>

                  <button
                    onClick={nextImage}
                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow hover:bg-stone-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4 text-stone-600" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Plan Navigation */}
          <div className="flex items-center justify-between pt-8 pb-4">
            <button
              onClick={() => scrollToPlan(Math.max(0, currentPlanIndex - 1))}
              disabled={currentPlanIndex === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronUp className="h-5 w-5 text-stone-600" />
              <span>Previous Plan</span>
            </button>
            <button
              onClick={() => scrollToPlan(Math.min(fourBedroomPlans.length - 1, currentPlanIndex + 1))}
              disabled={currentPlanIndex === fourBedroomPlans.length - 1}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next Plan</span>
              <ChevronDown className="h-5 w-5 text-stone-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Scrollable Floor Plans */}
      <div className="lg:w-3/5 relative">
        {/* Navigation Dots */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-4">
          {fourBedroomPlans.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPlanIndex 
                  ? "bg-amber-600 shadow-lg shadow-amber-600/30" 
                  : "bg-amber-400/30 hover:bg-amber-400/50"
              }`}
              onClick={() => scrollToPlan(index)}
              aria-label={`Go to plan ${index + 1}`}
            />
          ))}
        </div>

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
          onScroll={handleScroll}
          style={{ scrollBehavior: 'smooth' }}
        >
          {fourBedroomPlans.map((plan, planIndex) => (
            <div key={plan.id} className="h-screen snap-start snap-always flex items-center justify-center p-4 lg:p-8">
              <div className="max-w-4xl w-full">
                <div className="bg-white rounded-3xl p-6 lg:p-8 border border-stone-200 shadow-xl">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-light text-stone-900 mb-2">Floor Plan {plan.id}</h2>
                    <p className="text-stone-600">{plan.title}</p>
                  </div>
                  <div className="aspect-[4/3] flex items-center justify-center bg-stone-50 rounded-2xl overflow-hidden">
                    <Image
                      src={plan.image || "/placeholder.svg"}
                      alt={plan.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-contain p-4 lg:p-8 hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                      priority={planIndex === 0}
                      loading={planIndex > 0 ? "lazy" : "eager"}
                      onClick={() => handleImageClick({ src: plan.image, title: plan.title })}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative aspect-[4/3]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain bg-stone-100"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-stone-800">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-stone-600 mt-2">{selectedImage.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}