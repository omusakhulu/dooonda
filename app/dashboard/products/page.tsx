
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Plus, Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ProductCard } from '@/components/dashboard/product-card'
import { CreateProductDialog } from '@/components/dashboard/create-product-dialog'

interface Product {
  id: string
  name: string
  price: number
  image?: string
  category: string
  stock: number
  status: 'active' | 'inactive' | 'out_of_stock'
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      // Map the data to include stock and status fields
      const mappedProducts = data.map((product: any) => ({
        ...product,
        stock: product.inventory || 0,
        status: product.status?.toLowerCase() || 'active',
        category: product.category?.name || 'Uncategorized'
      }))
      setProducts(mappedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categoryNames = Array.from(new Set(products.map(p => p.category)))

  const getStatusStats = () => {
    const stats = {
      total: products.length,
      active: products.filter(p => p.status === 'active').length,
      inactive: products.filter(p => p.status === 'inactive').length,
      outOfStock: products.filter(p => p.status === 'out_of_stock' || p.stock === 0).length,
    }
    return stats
  }

  const stats = getStatusStats()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gradient">Products</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="gradient-card">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-32 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Products</h1>
          <p className="text-slate-600">Manage your product inventory</p>
        </div>
        <Button 
          variant="gradient" 
          className="shadow-lg hover:shadow-xl"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="gradient-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
            <div className="text-sm text-slate-600">Total Products</div>
          </CardContent>
        </Card>
        <Card className="gradient-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-slate-600">Active</div>
          </CardContent>
        </Card>
        <Card className="gradient-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-slate-600">{stats.inactive}</div>
            <div className="text-sm text-slate-600">Inactive</div>
          </CardContent>
        </Card>
        <Card className="gradient-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
            <div className="text-sm text-slate-600">Out of Stock</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="gradient-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search products by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-indigo-100">
                <SelectItem value="all">All Categories</SelectItem>
                {categoryNames.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-indigo-100">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Card className="gradient-card">
          <CardContent className="p-12 text-center">
            <Package className="h-16 w-16 mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Products Found</h3>
            <p className="text-slate-600 mb-6">
              {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'No products match your current filters.' 
                : 'Start by adding your first product to the inventory.'}
            </p>
            <Button 
              variant="gradient" 
              className="shadow-lg"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Product
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>
      )}

      {/* Create Product Dialog */}
      <CreateProductDialog 
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={fetchProducts}
        categories={categories}
      />
    </div>
  )
}
