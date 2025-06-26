
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { TrendingUp, DollarSign, ShoppingCart, Users, Calendar, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion } from 'framer-motion'


interface AnalyticsData {
  period: string
  sales: number
  orders: number
  customers: number
  revenue: number
}

export default function AnalyticsPage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('monthly')
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([])
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    avgOrderValue: 0
  })

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics?period=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setAnalyticsData(data.analytics)
        setSummary(data.summary)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  // Mock data for demonstration
  useEffect(() => {
    if (timeRange === 'monthly') {
      setAnalyticsData([
        { period: 'Jan', sales: 12000, orders: 45, customers: 32, revenue: 15000 },
        { period: 'Feb', sales: 15000, orders: 52, customers: 41, revenue: 18000 },
        { period: 'Mar', sales: 18000, orders: 63, customers: 48, revenue: 22000 },
        { period: 'Apr', sales: 22000, orders: 71, customers: 55, revenue: 26000 },
        { period: 'May', sales: 25000, orders: 82, customers: 62, revenue: 30000 },
        { period: 'Jun', sales: 28000, orders: 95, customers: 68, revenue: 34000 }
      ])
      setSummary({
        totalRevenue: 145000,
        totalOrders: 408,
        totalCustomers: 306,
        avgOrderValue: 355
      })
    } else {
      setAnalyticsData([
        { period: '2022', sales: 180000, orders: 650, customers: 420, revenue: 220000 },
        { period: '2023', sales: 245000, orders: 890, customers: 580, revenue: 295000 },
        { period: '2024', sales: 320000, orders: 1200, customers: 750, revenue: 385000 }
      ])
      setSummary({
        totalRevenue: 900000,
        totalOrders: 2740,
        totalCustomers: 1750,
        avgOrderValue: 328
      })
    }
    setLoading(false)
  }, [timeRange])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00796B]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#222831]">Analytics & Insights</h1>
          <p className="text-gray-600 mt-1">Track your business performance and growth</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly View</SelectItem>
              <SelectItem value="yearly">Yearly View</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Revenue',
            value: `KES ${summary.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: 'from-green-500 to-green-600',
            change: '+12.5%'
          },
          {
            title: 'Total Orders',
            value: summary.totalOrders.toLocaleString(),
            icon: ShoppingCart,
            color: 'from-blue-500 to-blue-600',
            change: '+8.2%'
          },
          {
            title: 'Total Customers',
            value: summary.totalCustomers.toLocaleString(),
            icon: Users,
            color: 'from-purple-500 to-purple-600',
            change: '+15.3%'
          },
          {
            title: 'Avg. Order Value',
            value: `KES ${summary.avgOrderValue.toLocaleString()}`,
            icon: TrendingUp,
            color: 'from-orange-500 to-orange-600',
            change: '+4.1%'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-[#222831]">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600 font-medium mt-2">
                      {stat.change} from last period
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-[#00796B]" />
              <span>Revenue Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Revenue chart will be displayed here</p>
                <p className="text-2xl font-bold text-[#00796B] mt-2">
                  KES {analyticsData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-[#FF6F61]" />
              <span>Orders & Customers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Orders & Customers chart will be displayed here</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-xl font-bold text-[#60B5FF]">
                      {analyticsData.reduce((sum, item) => sum + item.orders, 0)}
                    </p>
                    <p className="text-sm text-gray-500">Total Orders</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[#FF9149]">
                      {analyticsData.reduce((sum, item) => sum + item.customers, 0)}
                    </p>
                    <p className="text-sm text-gray-500">Total Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-lg text-green-800">Revenue Growth</h3>
              <p className="text-sm text-green-600 mt-1">
                Your revenue has increased by 25% compared to the previous period
              </p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-lg text-blue-800">Customer Retention</h3>
              <p className="text-sm text-blue-600 mt-1">
                68% of your customers are returning customers
              </p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <ShoppingCart className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-lg text-orange-800">Best Selling Period</h3>
              <p className="text-sm text-orange-600 mt-1">
                Most orders come in during afternoon hours (2-6 PM)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
