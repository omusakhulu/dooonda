
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { OnboardingSlider } from '@/components/onboarding/onboarding-slider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link href="/">
              <Button 
                variant="ghost" 
                className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/auth/signin">
                <Button 
                  variant="ghost" 
                  className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button 
                  variant="gradient" 
                  className="shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Onboarding Slider */}
      <div className="pt-20 h-screen">
        <OnboardingSlider />
      </div>
    </div>
  )
}
