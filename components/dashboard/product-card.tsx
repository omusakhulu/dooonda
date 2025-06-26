
'use client'

import { motion } from 'framer-motion'
import { MoreHorizontal, Edit, Trash, Eye, Package } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    image?: string
    category: string
    stock: number
    status: 'active' | 'inactive' | 'out_of_stock'
  }
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white'
      case 'inactive':
        return 'bg-gradient-to-r from-slate-500 to-slate-600 text-white'
      case 'out_of_stock':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white'
      default:
        return 'bg-gradient-to-r from-slate-500 to-slate-600 text-white'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="gradient-card group hover:shadow-xl transition-all duration-300 hover:shadow-indigo-100/50 overflow-hidden">
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative h-48 bg-gradient-to-br from-indigo-50 to-pink-50">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-pink-100">
                <Package className="h-16 w-16 text-indigo-400" />
              </div>
            )}
            
            {/* Status Badge */}
            <Badge className={`absolute top-3 left-3 ${getStatusColor(product.status)} border-0 shadow-lg`}>
              {product.status.replace('_', ' ')}
            </Badge>

            {/* Action Menu */}
            <div className="absolute top-3 right-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 hover:text-indigo-600 shadow-lg"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-indigo-100">
                  <DropdownMenuItem className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Product
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-600 hover:text-red-600 hover:bg-red-50">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="mb-2">
              <Badge variant="outline" className="text-xs text-indigo-600 border-indigo-200 bg-indigo-50">
                {product.category}
              </Badge>
            </div>
            
            <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-indigo-700 transition-colors">
              {product.name}
            </h3>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-gradient">
                  KES {product.price.toLocaleString()}
                </p>
                <p className="text-sm text-slate-500">
                  Stock: {product.stock}
                </p>
              </div>
              
              <Button 
                size="sm" 
                variant="gradient"
                className="shadow-lg hover:shadow-xl hover:shadow-indigo-200/50"
              >
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
