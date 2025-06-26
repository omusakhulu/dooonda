
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface OnboardingSlideProps {
  slide: {
    id: number
    title: string
    description: string
    image: string
    icon: string
    color: string
  }
}

export function OnboardingSlide({ slide }: OnboardingSlideProps) {
  return (
    <motion.div 
      className="text-center space-y-6"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative mx-auto w-80 h-64 rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Icon Overlay */}
        <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r ${slide.color} flex items-center justify-center shadow-lg`}>
          <span className="text-2xl">{slide.icon}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-slate-800">
          {slide.title}
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto">
          {slide.description}
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-pink-50 border border-indigo-100/50">
          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">✓</span>
          </div>
          <p className="text-xs font-medium text-slate-700">Easy Setup</p>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-r from-pink-50 to-indigo-50 border border-pink-100/50">
          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">✓</span>
          </div>
          <p className="text-xs font-medium text-slate-700">Secure</p>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-pink-50 border border-indigo-100/50">
          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r from-indigo-400 to-pink-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">✓</span>
          </div>
          <p className="text-xs font-medium text-slate-700">Support</p>
        </div>
      </div>
    </motion.div>
  )
}
