"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Share2,
  Menu,
  Plus,
  Minus,
  GitCompare,
  Check,
  Maximize,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

const floorPlans = [
  {
    id: 1,
    title: "3-Bedroom Apartment",
    subtitle: "Ground Floor",
    image: "/images/plan1.png",
    pdfUrl: "/floorplans/floor1.pdf",
    interiorSqft: "245 sq m",
    exteriorSqft: "25 sq m",
    exposure: "N,E,S,W",
    bedrooms: 3,
    bathrooms: 2,
    powderRooms: 1,
    features: ["Guest bedroom with ensuite", "Dining", "Kitchen", "Store room", "Living room", "Veranda at the back"],
  },
  {
    id: 2,
    title: "3-Bedroom with Balconies",
    subtitle: "FLOOR 1",
    image: "/images/plan2.png",
    pdfUrl: "/floorplans/floor2.pdf",
    interiorSqft: "278 sq m",
    exteriorSqft: "32 sq m",
    exposure: "N,E,S,W",
    bedrooms: 3,
    bathrooms: 2,
    powderRooms: 0,
    features: [
      "Master bedroom + ensuite + walk-in closet",
      "2 Bedrooms + ensuite(one of the beds having walk-in closet)",
      "Central dining space",
      "Modern kitchen with WIC",
      "Each bedroom has balcony access",
    ],
  },
  {
    id: 3,
    title: "Premium 3-Bedroom",
    subtitle: "FLOOR 2",
    image: "/images/plan3.png",
    pdfUrl: "/floorplans/floor3.pdf",
    interiorSqft: "128 sq m",
    exteriorSqft: "28 sq m",
    exposure: "N,E,S,W",
    bedrooms: 3,
    bathrooms: 2,
    powderRooms: 0,
    features: [
      "Corner balcony access",
      "Open plan living",
      "Separate dining area",
      "Walk-in closet",
      "Dual bathroom access",
    ],
  },
  {
    id: 4,
    title: "Luxury Single Storey",
    subtitle: "Single Storey",
    image: "/images/plan4.jpg",
    pdfUrl: "/floorplans/floor4.pdf",
    interiorSqft: "204 sq m",
    exteriorSqft: "45 sq m",
    exposure: "N,E,S,W",
    bedrooms: 3,
    bathrooms: 2,
    powderRooms: 1,
    features: [
      "Alfresco at the back",
      "Family room and lounge",
      "Scullery and modern kitchen",
      "Master bedroom with ensuite",
      "Dining",
    ],
  },
]

export default function FloorplansPage() {
  const [currentPlan, setCurrentPlan] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const [isCompareMode, setIsCompareMode] = useState(false)
  const [selectedPlans, setSelectedPlans] = useState<number[]>([])
  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const imageRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const comparisonRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const plan = floorPlans[currentPlan]

  // Add smooth scrolling to the entire page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  // Reset zoom and position when changing plans
  useEffect(() => {
    setIsZoomed(false)
    setZoomLevel(1)
    setDragPosition({ x: 0, y: 0 })
  }, [currentPlan])

  // Handle fullscreen mode
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false)
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [])

  const nextPlan = () => {
    setCurrentPlan((prev) => (prev + 1) % floorPlans.length)
  }

  const prevPlan = () => {
    setCurrentPlan((prev) => (prev - 1 + floorPlans.length) % floorPlans.length)
  }

  const handleDownload = () => {
    alert(`Downloading ${plan.title} floor plan...`)
  }

  const handleZoomIn = () => {
    if (zoomLevel < 3) {
      setZoomLevel((prev) => prev + 0.5)
      setIsZoomed(true)
    }
  }

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel((prev) => prev - 0.5)
      if (zoomLevel <= 1.5) {
        setIsZoomed(false)
        setDragPosition({ x: 0, y: 0 })
      }
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isZoomed) {
      setIsDragging(true)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && isZoomed) {
      setDragPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch handlers for mobile zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isZoomed) {
      const touch = e.touches[0]
      setIsDragging(true)
      // Store initial touch position for dragging
    } else if (e.touches.length === 2) {
      // Handle pinch zoom start
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2),
      )
      // Store initial distance for pinch zoom
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches.length === 1 && isDragging && isZoomed) {
      // Handle single finger drag
      const touch = e.touches[0]
      // Calculate movement and update drag position
    } else if (e.touches.length === 2) {
      // Handle pinch zoom
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2),
      )
      // Calculate zoom based on distance change
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Comparison functions
  const toggleCompareMode = () => {
    setIsCompareMode(!isCompareMode)
    if (!isCompareMode) {
      setSelectedPlans([])
    }
  }

  const togglePlanSelection = (planIndex: number) => {
    if (selectedPlans.includes(planIndex)) {
      setSelectedPlans(selectedPlans.filter((p) => p !== planIndex))
    } else if (selectedPlans.length < 2) {
      setSelectedPlans([...selectedPlans, planIndex])
    }
  }

  const startComparison = () => {
    if (selectedPlans.length === 2) {
      setIsCompareDialogOpen(true)
    }
  }

  const resetComparison = () => {
    setSelectedPlans([])
    setIsCompareMode(false)
    setIsCompareDialogOpen(false)
  }

  const getComparisonData = () => {
    if (selectedPlans.length !== 2) return null

    const plan1 = floorPlans[selectedPlans[0]]
    const plan2 = floorPlans[selectedPlans[1]]

    return { plan1, plan2 }
  }

  const comparisonData = getComparisonData()

  return (
    <div className="min-h-screen bg-[#f8f8f8] overflow-x-hidden" ref={scrollRef}>
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-light tracking-wide text-gray-900">Goodhope RESIDENCES</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Compare Mode Toggle */}
            <Button
              variant={isCompareMode ? ("default" as const) : ("outline" as const)}
              size="sm"
              onClick={toggleCompareMode}
              className="hidden md:flex"
            >
              <GitCompare className="h-4 w-4 mr-2" />
              {isCompareMode ? "Exit Compare" : "Compare Plans"}
            </Button>

            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="py-6 space-y-6">
                    <h2 className="text-2xl font-light">Floor Plans</h2>

                    {/* Mobile Compare Toggle */}
                    <Button
                      variant={isCompareMode ? "default" : "outline"}
                      size="sm"
                      onClick={toggleCompareMode}
                      className="w-full"
                    >
                      <GitCompare className="h-4 w-4 mr-2" />
                      {isCompareMode ? "Exit Compare" : "Compare Plans"}
                    </Button>

                    <div className="space-y-3">
                      {floorPlans.map((planItem, index) => (
                        <div key={planItem.id} className="flex items-center space-x-2">
                          <Button
                            variant={index === currentPlan ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              setCurrentPlan(index)
                            }}
                            className="flex-1 justify-start"
                          >
                            {planItem.subtitle} - {planItem.title}
                          </Button>
                          {isCompareMode && (
                            <Button
                              variant={selectedPlans.includes(index) ? "default" : "outline"}
                              size="sm"
                              onClick={() => togglePlanSelection(index)}
                              disabled={!selectedPlans.includes(index) && selectedPlans.length >= 2}
                              className="w-10 h-8 p-0"
                            >
                              {selectedPlans.includes(index) ? <Check className="h-4 w-4" /> : "+"}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    {isCompareMode && selectedPlans.length === 2 && (
                      <Button onClick={startComparison} className="w-full">
                        Compare Selected Plans
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Compare Mode Banner */}
      {isCompareMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-blue-50 border-b border-blue-200 px-6 py-3"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <p className="text-blue-800 font-medium">Compare Mode: Select up to 2 floor plans to compare</p>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {selectedPlans.length}/2 selected
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              {selectedPlans.length === 2 && <Button onClick={startComparison}>Compare Now</Button>}
              <Button variant="ghost" size="sm" onClick={resetComparison}>
                Reset
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Panel - Details */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPlan}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="space-y-8"
              >
                {/* Plan Title */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-2 tracking-wider">{plan.subtitle}</p>
                    <h2 className="text-4xl font-extralight text-gray-800 mb-8">{plan.title}</h2>
                  </div>
                  {isCompareMode && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        variant={selectedPlans.includes(currentPlan) ? ("default" as const) : ("outline" as const)}
                        size="sm"
                        onClick={() => togglePlanSelection(currentPlan)}
                        disabled={!selectedPlans.includes(currentPlan) && selectedPlans.length >= 2}
                        className="ml-4"
                      >
                        {selectedPlans.includes(currentPlan) ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Selected
                          </>
                        ) : (
                          "Select to Compare"
                        )}
                      </Button>
                    </motion.div>
                  )}
                </div>

                {/* Specifications */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1 tracking-wider">INTERIOR SQ FT / SQ M</p>
                      <p className="text-lg font-light text-gray-900">{plan.interiorSqft}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 tracking-wider">EXTERIOR SQ FT / SQ M</p>
                      <p className="text-lg font-light text-gray-900">{plan.exteriorSqft}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1 tracking-wider">EXPOSURE</p>
                      <p className="text-lg font-light text-gray-900">{plan.exposure}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 tracking-wider">BEDROOM/BATHROOM</p>
                      <p className="text-lg font-light text-gray-900">
                        {plan.bedrooms}/{plan.bathrooms}
                      </p>
                    </div>
                  </div>

                  {plan.powderRooms > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1 tracking-wider">POWDER ROOM</p>
                      <p className="text-lg font-light text-gray-900">{plan.powderRooms}</p>
                    </div>
                  )}
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-sm text-gray-500 mb-4 tracking-wider">FEATURES</h3>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="text-gray-700 flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <span className="text-gray-400 mr-2">•</span>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 pt-6"
                >
                  <Button
                    className="flex-1 bg-gray-300 hover:bg-gray-900 transition-all duration-300"
                    onClick={handleDownload}
                  >
                    Download Floor Plan
                    <Download className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-300 hover:border-gray-900 transition-all duration-300"
                  >
                    Share Plan
                    <Share2 className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Panel - Floor Plan Image */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Card className="overflow-hidden bg-white shadow-md border-0 transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Navigation Arrows */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 p-0 transition-all duration-300 shadow-sm hover:shadow"
                    onClick={prevPlan}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 p-0 transition-all duration-300 shadow-sm hover:shadow"
                    onClick={nextPlan}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>

                  {/* Selection Indicator */}
                  {isCompareMode && selectedPlans.includes(currentPlan) && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-4 left-4 z-10"
                    >
                      <Badge className="bg-green-500 text-white">
                        <Check className="h-3 w-3 mr-1" />
                        Selected
                      </Badge>
                    </motion.div>
                  )}

                  {/* Fullscreen Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full w-8 h-8 p-0 transition-all duration-300 shadow-sm hover:shadow"
                    onClick={toggleFullscreen}
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>

                  {/* Floor Plan Image */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPlan}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <div
                        className={`cursor-pointer bg-white transition-all duration-500 ${
                          isFullscreen ? "fixed inset-0 z-50 bg-white/95 p-8" : "min-h-[500px] sm:min-h-[700px] p-8"
                        }`}
                        style={{ touchAction: "none" }}
                        onClick={() => !isFullscreen && setIsModalOpen(true)}
                      >
                        {isFullscreen && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full w-8 h-8 p-0"
                            onClick={toggleFullscreen}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                        <div
                          className={`relative w-full h-full ${isFullscreen ? "max-w-6xl mx-auto" : ""}`}
                          ref={imageRef}
                          onMouseDown={handleMouseDown}
                          onMouseMove={handleMouseMove}
                          onMouseUp={handleMouseUp}
                          onMouseLeave={handleMouseUp}
                          style={{ cursor: isZoomed ? "grab" : isFullscreen ? "default" : "pointer" }}
                        >
                          {/* Zoom Controls */}
                          {isFullscreen && (
                            <div className="absolute top-4 left-4 z-10 flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-white/80 hover:bg-white rounded-full w-8 h-8 p-0"
                                onClick={handleZoomIn}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-white/80 hover:bg-white rounded-full w-8 h-8 p-0"
                                onClick={handleZoomOut}
                                disabled={!isZoomed}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                          )}

                          <div
                            ref={imageContainerRef}
                            className="relative w-full h-full flex items-center justify-center"
                            style={{
                              cursor: isZoomed ? "grab" : isFullscreen ? "default" : "pointer",
                            }}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                          >
                            <div
                              style={{
                                transform: `scale(${zoomLevel}) translate(${dragPosition.x}px, ${dragPosition.y}px)`,
                                transition: isDragging ? "none" : "transform 0.3s ease",
                              }}
                              className="w-full h-full flex items-center justify-center"
                            >
                              <Image
                                src={plan.image || "/placeholder.svg"}
                                alt={plan.title}
                                width={1200}
                                height={900}
                                className={`max-w-full max-h-full object-contain transition-all duration-500 ${
                                  isFullscreen ? "max-h-[80vh]" : "max-h-[600px]"
                                }`}
                                priority
                                style={{
                                  width: "auto",
                                  height: "auto",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 bg-black">
                          <div
                            className="relative w-full h-full overflow-hidden"
                            ref={imageRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            style={{ cursor: isZoomed ? (isDragging ? "grabbing" : "grab") : "default" }}
                          >
                            {/* Enhanced Controls */}
                            <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-black/80 hover:bg-black/90 text-white border-white/20 rounded-full w-10 h-10 p-0"
                                onClick={() => setIsModalOpen(false)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="absolute top-4 left-4 z-20 flex space-y-2 flex-col">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-black/80 hover:bg-black/90 text-white border-white/20 rounded-full w-10 h-10 p-0"
                                onClick={handleZoomIn}
                                disabled={zoomLevel >= 3}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-black/80 hover:bg-black/90 text-white border-white/20 rounded-full w-10 h-10 p-0"
                                onClick={handleZoomOut}
                                disabled={zoomLevel <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              {isZoomed && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-black/80 hover:bg-black/90 text-white border-white/20 rounded-full w-10 h-10 p-0"
                                  onClick={() => {
                                    setZoomLevel(1)
                                    setIsZoomed(false)
                                    setDragPosition({ x: 0, y: 0 })
                                  }}
                                  title="Reset zoom"
                                >
                                  <Maximize className="h-4 w-4" />
                                </Button>
                              )}
                            </div>

                            {/* Zoom Level Indicator */}
                            {isZoomed && (
                              <div className="absolute bottom-4 left-4 z-20">
                                <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm">
                                  {Math.round(zoomLevel * 100)}%
                                </div>
                              </div>
                            )}

                            {/* Navigation arrows in modal */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/80 hover:bg-black/90 text-white rounded-full w-12 h-12 p-0"
                              onClick={prevPlan}
                            >
                              <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/80 hover:bg-black/90 text-white rounded-full w-12 h-12 p-0"
                              onClick={nextPlan}
                            >
                              <ChevronRight className="h-6 w-6" />
                            </Button>

                            {/* Plan info overlay */}
                            <div className="absolute bottom-4 right-4 z-20">
                              <div className="bg-black/80 text-white px-4 py-2 rounded-lg">
                                <p className="text-xs opacity-75">{plan.subtitle}</p>
                                <p className="text-sm font-medium">{plan.title}</p>
                              </div>
                            </div>

                            <div
                              ref={imageContainerRef}
                              className="relative w-full h-full flex items-center justify-center"
                              style={{
                                cursor: isZoomed ? (isDragging ? "grabbing" : "grab") : "default",
                              }}
                            >
                              <div
                                style={{
                                  transform: `scale(${zoomLevel}) translate(${dragPosition.x}px, ${dragPosition.y}px)`,
                                  transition: isDragging ? "none" : "transform 0.3s ease",
                                }}
                                className="w-full h-full flex items-center justify-center"
                              >
                                <Image
                                  src={plan.image || "/placeholder.svg"}
                                  alt={plan.title}
                                  width={1400}
                                  height={1000}
                                  className="max-w-full max-h-full object-contain"
                                  style={{
                                    width: "auto",
                                    height: "auto",
                                  }}
                                  priority
                                />
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </motion.div>
                  </AnimatePresence>

                  {/* Plan Indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-3">
                      {floorPlans.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 relative ${
                            index === currentPlan ? "bg-gray-900 scale-125" : "bg-gray-300"
                          }`}
                          onClick={() => setCurrentPlan(index)}
                        >
                          {isCompareMode && selectedPlans.includes(index) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <Check className="h-2 w-2 text-white" />
                            </motion.div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plan Navigation - Desktop Only */}
            {!isMobile && (
              <motion.div
                className="mt-6 hidden md:block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {currentPlan + 1} of {floorPlans.length} floor plans
                  </p>
                  <div className="flex space-x-2">
                    {floorPlans.map((planItem, index) => (
                      <div key={planItem.id} className="relative">
                        <Button
                          variant={index === currentPlan ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPlan(index)}
                          className={`min-w-[100px] transition-all duration-300 ${
                            index === currentPlan
                              ? "bg-gray-900 text-white"
                              : "bg-white text-gray-700 hover:border-gray-900"
                          }`}
                        >
                          {planItem.subtitle}
                        </Button>
                        {isCompareMode && (
                          <Button
                            variant={selectedPlans.includes(index) ? "default" : "outline"}
                            size="sm"
                            onClick={() => togglePlanSelection(index)}
                            disabled={!selectedPlans.includes(index) && selectedPlans.length >= 2}
                            className="ml-2 w-8 h-8 p-0"
                          >
                            {selectedPlans.includes(index) ? <Check className="h-4 w-4" /> : "+"}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Mobile Navigation */}
            {isMobile && (
              <div className="mt-6 space-y-4">
                {/* Mobile Plan Info */}
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">
                      {currentPlan + 1} / {floorPlans.length}
                    </span>
                    {isCompareMode && (
                      <Button
                        variant={selectedPlans.includes(currentPlan) ? "default" : "outline"}
                        size="sm"
                        onClick={() => togglePlanSelection(currentPlan)}
                        disabled={!selectedPlans.includes(currentPlan) && selectedPlans.length >= 2}
                        className="text-xs px-2 py-1 h-7"
                      >
                        {selectedPlans.includes(currentPlan) ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Selected
                          </>
                        ) : (
                          "Select"
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <Button variant="ghost" size="sm" onClick={prevPlan} className="text-gray-600 px-2">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>

                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">{plan.subtitle}</p>
                      <p className="text-sm font-medium text-gray-900">{plan.title}</p>
                    </div>

                    <Button variant="ghost" size="sm" onClick={nextPlan} className="text-gray-600 px-2">
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>

                {/* Mobile Specifications Grid */}
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Specifications</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Interior</p>
                      <p className="font-medium">{plan.interiorSqft}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Exterior</p>
                      <p className="font-medium">{plan.exteriorSqft}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Bedrooms</p>
                      <p className="font-medium">{plan.bedrooms}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Bathrooms</p>
                      <p className="font-medium">{plan.bathrooms}</p>
                    </div>
                    {plan.powderRooms > 0 && (
                      <>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Powder Rooms</p>
                          <p className="font-medium">{plan.powderRooms}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Exposure</p>
                          <p className="font-medium">{plan.exposure}</p>
                        </div>
                      </>
                    )}
                    {plan.powderRooms === 0 && (
                      <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                        <p className="text-xs text-gray-500 mb-1">Exposure</p>
                        <p className="font-medium">{plan.exposure}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Features */}
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Features</h3>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="text-gray-400 mr-2 mt-1">•</span>
                        <span className="flex-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile Action Buttons */}
                <div className="space-y-2">
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Floor Plan
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300 hover:border-gray-900">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Plan
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Dialog */}
      <Dialog open={isCompareDialogOpen} onOpenChange={setIsCompareDialogOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0">
          {comparisonData && (
            <div className="h-full flex flex-col" ref={comparisonRef}>
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-light text-gray-900">Floor Plan Comparison</h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsCompareDialogOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Comparison Content */}
              <div className="flex-1 overflow-auto scroll-smooth">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  {/* Plan 1 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 border-r border-gray-200"
                  >
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{comparisonData.plan1.subtitle}</p>
                        <h3 className="text-2xl font-light text-gray-900">{comparisonData.plan1.title}</h3>
                      </div>

                      <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 p-6">
                        <div className="w-full h-80 flex items-center justify-center">
                          <Image
                            src={comparisonData.plan1.image || "/placeholder.svg"}
                            alt={comparisonData.plan1.title}
                            width={800}
                            height={600}
                            className="max-w-full max-h-full object-contain"
                            style={{
                              width: "auto",
                              height: "auto",
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6 text-sm">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-500 mb-1">Interior</p>
                            <p className="font-medium text-lg">{comparisonData.plan1.interiorSqft}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-500 mb-1">Exterior</p>
                            <p className="font-medium text-lg">{comparisonData.plan1.exteriorSqft}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 text-sm">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-500 mb-1">Bedrooms</p>
                            <p className="font-medium text-lg">{comparisonData.plan1.bedrooms}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-500 mb-1">Bathrooms</p>
                            <p className="font-medium text-lg">{comparisonData.plan1.bathrooms}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-2">Features</p>
                          <ul className="space-y-2 text-sm">
                            {comparisonData.plan1.features.map((feature, index) => (
                              <motion.li
                                key={index}
                                className="flex items-start bg-gray-50 p-3 rounded-lg"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <span className="text-gray-400 mr-2">•</span>
                                {feature}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Plan 2 */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6"
                  >
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{comparisonData.plan2.subtitle}</p>
                        <h3 className="text-2xl font-light text-gray-900">{comparisonData.plan2.title}</h3>
                      </div>

                      <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 p-6">
                        <div className="w-full h-80 flex items-center justify-center">
                          <Image
                            src={comparisonData.plan2.image || "/placeholder.svg"}
                            alt={comparisonData.plan2.title}
                            width={800}
                            height={600}
                            className="max-w-full max-h-full object-contain"
                            style={{
                              width: "auto",
                              height: "auto",
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6 text-sm">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-500 mb-1">Interior</p>
                            <p className="font-medium text-lg">{comparisonData.plan2.interiorSqft}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-500 mb-1">Exterior</p>
                            <p className="font-medium text-lg">{comparisonData.plan2.exteriorSqft}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 text-sm">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-500 mb-1">Bedrooms</p>
                            <p className="font-medium text-lg">{comparisonData.plan2.bedrooms}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-500 mb-1">Bathrooms</p>
                            <p className="font-medium text-lg">{comparisonData.plan2.bathrooms}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-2">Features</p>
                          <ul className="space-y-2 text-sm">
                            {comparisonData.plan2.features.map((feature, index) => (
                              <motion.li
                                key={index}
                                className="flex items-start bg-gray-50 p-3 rounded-lg"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <span className="text-gray-400 mr-2">•</span>
                                {feature}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
