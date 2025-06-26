
'use client'

import { motion } from 'framer-motion'
import { TrendingUp, ShoppingCart, Eye, Users, Store } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StatsCardsProps {
  stats: {
    totalStores: number
    totalOrders: number
    totalSales: number
    totalProducts: number
    totalCustomers: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'from-indigo-500 to-indigo-600',
      change: '+12%'
    },
    {
      title: 'Total Sales',
      value: `KES ${stats.totalSales.toLocaleString()}`,
      icon: TrendingUp,
      color: 'from-pink-500 to-pink-600',
      change: '+8%'
    },
    {
      title: 'Store Views',
      value: '12.5K',
      icon: Eye,
      color: 'from-indigo-400 to-pink-500',
      change: '+15%'
    },
    {
      title: 'Customers',
      value: stats.totalCustomers,
      icon: Users,
      color: 'from-pink-400 to-indigo-500',
      change: '+5%'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="gradient-card border-0 hover:shadow-xl transition-all duration-300 hover:shadow-indigo-100/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-2">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {card.value}
                  </p>
                  <p className="text-sm text-indigo-600 font-medium mt-2">
                    {card.change} from last month
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
