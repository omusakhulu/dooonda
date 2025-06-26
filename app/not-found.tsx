
'use client'

import { motion } from 'framer-motion'
import { Home, Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <Card className="gradient-card max-w-lg mx-auto shadow-2xl">
          <CardContent className="p-12">
            {/* 404 Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center"
            >
              <Search className="h-12 w-12 text-white" />
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                Hustle Not Found
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Looks like this page took a different business route. 
                Let's get you back to growing your empire!
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-4"
            >
              <Link href="/">
                <Button 
                  className="w-full gradient-button py-3 text-lg shadow-xl hover:shadow-2xl"
                  size="lg"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
              
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                  size="lg"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
            </motion.div>

            {/* Help Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-sm text-slate-500 mt-6"
            >
              Need help? Contact our support team and we'll get you back on track.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
