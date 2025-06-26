
'use client'

import { motion } from 'framer-motion'
import { MoreHorizontal, Package, User, MapPin, Calendar, CreditCard } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'

interface OrderCardProps {
  order: {
    id: string
    customerName: string
    customerEmail: string
    products: Array<{
      name: string
      quantity: number
      price: number
    }>
    total: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    paymentMethod: string
    shippingAddress: string
    createdAt: string
  }
  index?: number
}

export function OrderCard({ order, index = 0 }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white'
      case 'shipped':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
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

  const totalItems = order.products.reduce((sum, product) => sum + product.quantity, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="gradient-card hover:shadow-xl transition-all duration-300 hover:shadow-indigo-100/50">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-slate-800">Order #{order.id.slice(0, 8)}</h3>
                <Badge className={`${getStatusColor(order.status)} border-0 shadow-lg`}>
                  {order.status}
                </Badge>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50">
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

          <Separator className="my-4 bg-indigo-100/50" />

          {/* Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-indigo-500" />
                <span className="text-sm font-medium text-slate-700">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-pink-500" />
                <span className="text-sm text-slate-600">{order.paymentMethod}</span>
              </div>
            </div>
            <div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-indigo-500 mt-0.5" />
                <span className="text-sm text-slate-600">{order.shippingAddress}</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-indigo-500" />
              <span className="text-sm font-medium text-slate-700">
                {totalItems} item{totalItems !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="bg-gradient-to-r from-indigo-50/50 to-pink-50/50 rounded-lg p-3 space-y-1">
              {order.products.slice(0, 2).map((product, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-slate-600">
                    {product.name} x{product.quantity}
                  </span>
                  <span className="text-slate-800 font-medium">
                    KES {(product.price * product.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              {order.products.length > 2 && (
                <p className="text-xs text-slate-500 pt-1">
                  +{order.products.length - 2} more item{order.products.length - 2 !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between pt-2 border-t border-indigo-100/50">
            <span className="text-sm font-medium text-slate-700">Total</span>
            <span className="text-lg font-bold text-gradient">
              KES {order.total.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
