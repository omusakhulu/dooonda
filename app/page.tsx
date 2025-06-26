
'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, TrendingUp, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  const features = [
    {
      icon: TrendingUp,
      title: 'Boost Sales',
      description: 'Increase your revenue with our powerful e-commerce tools',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Users,
      title: 'Connect Customers',
      description: 'Build lasting relationships with bulk SMS and support tools',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Set up your store in minutes and start selling immediately',
      color: 'from-indigo-400 to-pink-500'
    }
  ]

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-indigo-300 to-pink-300 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gradient">
              dooonda
            </h1>
            <div className="flex items-center gap-4">
              <Link href="/auth/signin">
                <Button variant="ghost" className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="gradient" className="shadow-lg hover:shadow-xl">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-gradient-to-r from-indigo-100 to-pink-100 text-indigo-700 border-indigo-200">
              <Sparkles className="w-4 h-4 mr-2" />
              Trusted by 10,000+ Kenyan businesses
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
              Build Your Dream
              <span className="text-gradient block">Business Today</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              The complete e-commerce platform for Kenyan entrepreneurs. Create your online store, 
              manage inventory, connect with customers, and grow your business with powerful tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/auth/signup">
                <Button 
                  size="lg" 
                  className="gradient-button px-8 py-4 text-lg shadow-xl hover:shadow-2xl hover:shadow-indigo-200/50"
                >
                  Start Your Store
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/onboarding">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 text-lg border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                >
                  View Demo
                </Button>
              </Link>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative mx-auto max-w-4xl"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-100 to-pink-100">
                <Image
                  src="https://i.pinimg.com/originals/c3/08/27/c30827b32d64bfd6bb9bcf988ba8d756.png"
                  alt="dooonda Dashboard"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From product management to customer engagement, we've got you covered
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
              >
                <Card className="gradient-card h-full hover:shadow-xl transition-all duration-300 hover:shadow-indigo-100/50">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center"
          >
            <Card className="gradient-card max-w-4xl mx-auto shadow-2xl">
              <CardContent className="p-12">
                <h2 className="text-4xl font-bold text-slate-800 mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                  Join thousands of successful entrepreneurs who are already using dooonda 
                  to grow their businesses across Kenya.
                </p>
                <Link href="/auth/signup">
                  <Button 
                    size="lg" 
                    className="gradient-button px-8 py-4 text-lg shadow-xl hover:shadow-2xl hover:shadow-indigo-200/50"
                  >
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 text-center">
          <p className="text-slate-500">
            © 2025 dooonda. Empowering Kenyan entrepreneurs.
          </p>
        </footer>
      </div>
    </div>
  )
}
