
'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface MonthlyOverviewProps {
  data: {
    currentMonth: {
      sales: number
      orders: number
      customers: number
      revenue: number
    }
    previousMonth: {
      sales: number
      orders: number
      customers: number
      revenue: number
    }
    monthName: string
  }
}

export function MonthlyOverview({ data }: MonthlyOverviewProps) {
  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  const metrics = [
    {
      title: 'Monthly Revenue',
      current: data.currentMonth.revenue,
      previous: data.previousMonth.revenue,
      icon: DollarSign,
      format: (value: number) => `KES ${value.toLocaleString()}`,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Total Orders',
      current: data.currentMonth.orders,
      previous: data.previousMonth.orders,
      icon: TrendingUp,
      format: (value: number) => value.toLocaleString(),
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'New Customers',
      current: data.currentMonth.customers,
      previous: data.previousMonth.customers,
      icon: Calendar,
      format: (value: number) => value.toLocaleString(),
      color: 'from-indigo-400 to-pink-500'
    },
    {
      title: 'Average Sale',
      current: data.currentMonth.sales,
      previous: data.previousMonth.sales,
      icon: TrendingUp,
      format: (value: number) => `KES ${value.toLocaleString()}`,
      color: 'from-pink-400 to-indigo-500'
    }
  ]

  return (
    <Card className="gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Calendar className="h-5 w-5 text-indigo-600" />
          {data.monthName} Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric, index) => {
            const percentageChange = calculatePercentageChange(metric.current, metric.previous)
            const isPositive = percentageChange >= 0
            
            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-gradient-to-r from-white to-indigo-50/30 border border-indigo-100/50 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-800 mb-2">
                      {metric.format(metric.current)}
                    </p>
                    <div className="flex items-center gap-2">
                      {isPositive ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <Badge 
                        className={`text-xs border-0 ${
                          isPositive 
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                            : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                        }`}
                      >
                        {isPositive ? '+' : ''}{percentageChange.toFixed(1)}%
                      </Badge>
                      <span className="text-xs text-slate-500">vs last month</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center shadow-lg`}>
                    <metric.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
