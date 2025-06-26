
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OnboardingSlide } from './onboarding-slide'

const slides = [
  {
    id: 1,
    title: 'Sell Anything, Anywhere',
    description: 'Create your online store in minutes and start selling to customers across Kenya.',
    image: 'https://www.shutterstock.com/shutterstock/photos/1489163804/display_1500/stock-photo-african-american-businesswoman-using-laptop-in-modern-office-copy-space-1489163804.jpg',
    icon: '🛍️',
    color: 'from-indigo-500 to-pink-500'
  },
  {
    id: 2,
    title: 'Manage Your Inventory',
    description: 'Keep track of your products, stock levels, and orders all in one place.',
    image: 'https://i.pinimg.com/originals/87/b5/01/87b5015a63ea1ca7b2d58183cfbb0f5b.jpg',
    icon: '📦',
    color: 'from-pink-500 to-indigo-500'
  },
  {
    id: 3,
    title: 'Connect with Customers',
    description: 'Send bulk SMS, manage orders, and build lasting relationships with your customers.',
    image: 'https://www.providesupport.com/blog/wp-content/uploads/2017/09/4-Key-Personality-Traits-for-A-Perfect-Customer-Service-Representative.png',
    icon: '💬',
    color: 'from-indigo-400 to-pink-600'
  },
  {
    id: 4,
    title: 'Track Your Success',
    description: 'Monitor sales, analyze performance, and grow your business with detailed analytics.',
    image: 'https://i.ytimg.com/vi/-aGhlzmhb1w/maxresdefault.jpg',
    icon: '📊',
    color: 'from-pink-400 to-indigo-600'
  }
]

export function OnboardingSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative h-full bg-gradient-to-br from-indigo-50 via-white to-pink-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-indigo-300 to-pink-300 rounded-full blur-2xl"></div>
      </div>

      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold text-gradient mb-2">
            dooonda
          </h1>
          <p className="text-slate-600">Welcome to your business journey</p>
        </div>

        {/* Slides Container */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <OnboardingSlide slide={slides[currentSlide]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-8">
          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mb-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-indigo-500 to-pink-500 shadow-lg'
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={prevSlide}
              className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="text-sm text-slate-500">
              {currentSlide + 1} of {slides.length}
            </div>

            <Button
              variant="ghost"
              onClick={nextSlide}
              className="text-slate-600 hover:text-pink-600 hover:bg-pink-50"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 bg-gradient-to-r from-white to-indigo-50/50 border-t border-indigo-100/50">
          <Button 
            className="w-full gradient-button text-lg py-6 shadow-xl hover:shadow-2xl hover:shadow-indigo-200/50"
            size="lg"
          >
            Start Your Business Journey
          </Button>
          <p className="text-center text-sm text-slate-500 mt-3">
            Join thousands of successful merchants in Kenya
          </p>
        </div>
      </div>
    </div>
  )
}
