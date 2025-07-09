"use client"

import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const threeBedroomDuplexPlans = [
  {
    id: 1,
    title: "The Harmony Duplex - 3 Bedroom",
    description: "Modern 3-bedroom duplex with shared wall design, featuring open living spaces and private outdoor areas.",
    image: "/images/3Bedroom.png",
    interiorImages: [
      { src: "/images/plan1.png", title: "Living Area", description: "Open-plan living with modern finishes" },
      { src: "/images/plan2.png", title: "Kitchen", description: "Contemporary kitchen design" }
    ]
  },
  {
    id: 2,
    title: "The Unity Duplex - 3 Bedroom",
    description: "Sophisticated duplex design with three bedrooms, seamless flow between living areas, and private courtyards.",
    image: "/images/Double Storey 3Bedroom.png",
    interiorImages: [
      { src: "/images/plan4.jpg", title: "Master Suite", description: "Spacious master bedroom with ensuite" },
      { src: "/images/plan1.png", title: "Family Room", description: "Comfortable family living space" }
    ]
  }
]

export default function ThreeBedroomDuplexPage() {
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollToPlan = (index: number) => {
    setCurrentPlanIndex(index)
    setCurrentImageIndex(0)
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
      if (newIndex !== currentPlanIndex && newIndex >= 0 && newIndex < threeBedroomDuplexPlans.length) {
        setCurrentPlanIndex(newIndex)
        setCurrentImageIndex(0)
      }
    }
  }

  const nextImage = () => {
    const currentPlan = threeBedroomDuplexPlans[currentPlanIndex]
    if (currentPlan && currentPlan.interiorImages) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % currentPlan.interiorImages.length
      )
    }
  }

  const prevImage = () => {
    const currentPlan = threeBedroomDuplexPlans[currentPlanIndex]
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

  const currentPlan = threeBedroomDuplexPlans[currentPlanIndex]

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Fixed Info Panel */}
      <div className="w-2/5 bg-stone-50 p-8 flex flex-col justify-center relative">
        <div className="absolute top-6 left-6">
          <Link href="/floorplans/single-storey" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5 text-stone-600" />
            <span className="text-stone-600 font-medium">Back to Single Storey</span>
          </Link>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-light text-stone-900 mb-4 tracking-wide">
              3-Bedroom Duplex Plans
            </h1>
            <div className="text-lg text-stone-600 mb-6">
              Plan {currentPlan?.id} of {threeBedroomDuplexPlans.length}
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

          {/* Interior Images */}
          {currentPlan?.interiorImages && currentPlan.interiorImages.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-stone-800 mb-4">Interior Design</h3>
              <div className="relative">
                <div className="aspect-[4/3] bg-white rounded-2xl p-4 shadow-lg">
                  <Image
                    src={currentPlan.interiorImages[currentImageIndex]?.src || "/placeholder.svg"}
                    alt={currentPlan.interiorImages[currentImageIndex]?.title || "Interior"}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover rounded-xl cursor-pointer"
                    onClick={() => handleImageClick(currentPlan.interiorImages[currentImageIndex])}
                  />
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={prevImage}
                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
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
                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    <ChevronRight className="h-4 w-4 text-stone-600" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4 pt-6">
            <button
              onClick={() => scrollToPlan(Math.max(0, currentPlanIndex - 1))}
              disabled={currentPlanIndex === 0}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              <ChevronUp className="h-5 w-5 text-stone-600" />
            </button>
            <span className="text-stone-600">Scroll to navigate plans</span>
            <button
              onClick={() => scrollToPlan(Math.min(threeBedroomDuplexPlans.length - 1, currentPlanIndex + 1))}
              disabled={currentPlanIndex === threeBedroomDuplexPlans.length - 1}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              <ChevronDown className="h-5 w-5 text-stone-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Scrollable Floor Plans */}
      <div className="w-3/5 relative">
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-4">
          {threeBedroomDuplexPlans.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPlanIndex 
                  ? "bg-blue-600 shadow-lg shadow-blue-600/50" 
                  : "bg-blue-400/30 hover:bg-blue-400/50"
              }`}
              onClick={() => scrollToPlan(index)}
            />
          ))}
        </div>

        <div 
          ref={scrollContainerRef}
          className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
          onScroll={handleScroll}
          style={{ scrollBehavior: 'smooth' }}
        >
          {threeBedroomDuplexPlans.map((plan, planIndex) => (
            <div key={plan.id} className="h-screen snap-start snap-always flex items-center justify-center p-8">
              <div className="max-w-4xl w-full">
                <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-light text-stone-900 mb-2">Floor Plan {plan.id}</h2>
                    <p className="text-stone-600">{plan.title}</p>
                  </div>
                  <div className="aspect-[4/3] flex items-center justify-center bg-stone-50 rounded-2xl">
                    <Image
                      src={plan.image || "/placeholder.svg"}
                      alt={plan.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-contain p-8"
                      priority={planIndex === 0}
                      loading={planIndex > 0 ? "lazy" : "eager"}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="max-w-4xl w-full">
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative aspect-[4/3]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium text-stone-800">{selectedImage.title}</h3>
                <p className="text-stone-600">{selectedImage.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}