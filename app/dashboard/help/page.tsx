
'use client'

import { useState } from 'react'
import { Mail, MessageCircle, Phone, HelpCircle, Search, Book, Video, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const supportOptions = [
    {
      title: 'Email us',
      description: 'Get support via email within 24 hours',
      icon: Mail,
      action: 'mailto:support@dooonda.com',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'WhatsApp chat',
      description: 'Chat with us instantly on WhatsApp',
      icon: MessageCircle,
      action: 'https://wa.me/254700000000',
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Phone Support',
      description: 'Call us during business hours',
      icon: Phone,
      action: 'tel:+254700000000',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: Book,
      questions: [
        'How do I create my first store?',
        'How to add products to my store?',
        'Setting up payment methods',
        'Customizing my store appearance'
      ]
    },
    {
      title: 'Orders & Payments',
      icon: FileText,
      questions: [
        'How do I track my orders?',
        'Payment processing times',
        'Refund and return policies',
        'Managing customer payments'
      ]
    },
    {
      title: 'Marketing Tools',
      icon: Video,
      questions: [
        'How to use Bulk SMS feature?',
        'Setting up affiliate marketing',
        'Creating discount coupons',
        'Social media integration'
      ]
    }
  ]

  const handleContactAction = (action: string) => {
    if (action.startsWith('mailto:') || action.startsWith('tel:')) {
      window.location.href = action
    } else if (action.startsWith('https://')) {
      window.open(action, '_blank')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Help Center</h1>
        <p className="text-gray-600 mt-2">How can we help you today?</p>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-md border-gradient-to-r from-indigo-100 to-pink-100">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for help articles, guides, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-lg py-3 focus:border-indigo-600 focus:ring-indigo-600"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Support Options */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-4">Contact Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-gradient-to-r hover:from-indigo-200 hover:to-pink-200"
                    onClick={() => handleContactAction(option.action)}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center mx-auto mb-4`}>
                    <option.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <Button 
                    className="bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleContactAction(option.action)
                    }}
                  >
                    Contact Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-4">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faqCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-lg flex items-center justify-center">
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <span>{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.questions.map((question, qIndex) => (
                      <button
                        key={qIndex}
                        className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 hover:border-indigo-300 transition-colors text-sm"
                      >
                        <div className="flex items-center space-x-2">
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                          <span>{question}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-indigo-600 to-pink-500 text-white">
        <CardContent className="p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Need immediate help?</h3>
            <p className="text-white/90 mb-6 text-lg">
              Our support team is available Monday to Friday, 9 AM to 6 PM EAT
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                className="bg-white text-indigo-600 border-white hover:bg-gray-100"
                onClick={() => handleContactAction('https://wa.me/254700000000')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat on WhatsApp
              </Button>
              <Button 
                variant="outline" 
                className="bg-white text-indigo-600 border-white hover:bg-gray-100"
                onClick={() => handleContactAction('mailto:support@dooonda.com')}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
