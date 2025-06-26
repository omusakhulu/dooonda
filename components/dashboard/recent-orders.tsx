
'use client'

import { motion } from 'framer-motion'
import { MoreHorizontal, Package, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Order {
  id: string
  customerName: string
  products: string[]
  total: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'delivered'
  date: string
}

interface RecentOrdersProps {
  orders: Order[]
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white'
      case 'completed':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white'
      case 'processing':
        return 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white'
      case 'pending':
        return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
      case 'cancelled':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white'
      default:
        return 'bg-gradient-to-r from-slate-500 to-slate-600 text-white'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return CheckCircle
      case 'completed':
        return CheckCircle
      case 'processing':
        return Package
      case 'pending':
        return Clock
      case 'cancelled':
        return XCircle
      default:
        return Package
    }
  }

  return (
    <Card className="gradient-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-slate-800">Recent Orders</CardTitle>
        <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.slice(0, 5).map((order, index) => {
            const StatusIcon = getStatusIcon(order.status)
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg border border-indigo-100/50 hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-pink-50/30 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-100 to-pink-100 flex items-center justify-center">
                    <StatusIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{order.customerName}</p>
                    <p className="text-sm text-slate-500">
                      {order.products.join(', ')}
                    </p>
                    <p className="text-xs text-slate-400">{order.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="font-semibold text-slate-800">
                      KES {order.total.toLocaleString()}
                    </p>
                    <Badge className={`text-xs ${getStatusColor(order.status)} border-0`}>
                      {order.status}
                    </Badge>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-indigo-100">
                      <DropdownMenuItem className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                        Update Status
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-slate-600 hover:text-pink-600 hover:bg-pink-50">
                        Contact Customer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
