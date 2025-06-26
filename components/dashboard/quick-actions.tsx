
'use client'

import { motion } from 'framer-motion'
import { Plus, Upload, MessageSquare, TrendingUp, Settings, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function QuickActions() {
  const actions = [
    {
      title: 'Add Product',
      description: 'Add new products to your inventory',
      icon: Plus,
      color: 'from-indigo-500 to-indigo-600',
      href: '/dashboard/products'
    },
    {
      title: 'Bulk Upload',
      description: 'Upload multiple products at once',
      icon: Upload,
      color: 'from-pink-500 to-pink-600',
      href: '/dashboard/products'
    },
    {
      title: 'Send SMS',
      description: 'Send bulk SMS to customers',
      icon: MessageSquare,
      color: 'from-indigo-400 to-pink-500',
      href: '/dashboard/messages'
    },
    {
      title: 'View Analytics',
      description: 'Check your sales performance',
      icon: TrendingUp,
      color: 'from-pink-400 to-indigo-500',
      href: '/dashboard/analytics'
    },
    {
      title: 'Manage Store',
      description: 'Update store settings',
      icon: Settings,
      color: 'from-indigo-500 to-pink-500',
      href: '/dashboard/settings'
    },
    {
      title: 'Customer Support',
      description: 'Contact customer support',
      icon: Users,
      color: 'from-pink-500 to-indigo-500',
      href: '/dashboard/help'
    }
  ]

  return (
    <Card className="gradient-card">
      <CardHeader>
        <CardTitle className="text-slate-800">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                className="h-auto p-4 w-full text-left justify-start hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-pink-50/50 transition-all duration-300 hover:shadow-md"
                asChild
              >
                <a href={action.href}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {action.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
