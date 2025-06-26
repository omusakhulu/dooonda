
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'

interface CreateProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  categories: Array<{ id: string; name: string }>
}

export function CreateProductDialog({ open, onOpenChange, onSuccess, categories }: CreateProductDialogProps) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    comparePrice: '',
    images: [''],
    categoryId: '',
    storeId: '',
    inventory: '0'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
          inventory: parseInt(formData.inventory),
          images: formData.images.filter(img => img.trim() !== '')
        })
      })

      if (response.ok) {
        toast.success('Product created successfully!')
        onSuccess()
        onOpenChange(false)
        setFormData({
          name: '',
          description: '',
          price: '',
          comparePrice: '',
          images: [''],
          categoryId: '',
          storeId: '',
          inventory: '0'
        })
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to create product')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto gradient-card">
        <DialogHeader>
          <DialogTitle className="text-gradient">Add New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-slate-700">Category</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
              >
                <SelectTrigger className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border-indigo-100">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description"
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-slate-700">Price (KES) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comparePrice" className="text-slate-700">Compare Price (KES)</Label>
              <Input
                id="comparePrice"
                type="number"
                step="0.01"
                value={formData.comparePrice}
                onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value })}
                placeholder="0.00"
                className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inventory" className="text-slate-700">Inventory</Label>
              <Input
                id="inventory"
                type="number"
                value={formData.inventory}
                onChange={(e) => setFormData({ ...formData, inventory: e.target.value })}
                placeholder="0"
                className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-slate-700">Product Image URL</Label>
            <Input
              id="image"
              value={formData.images[0]}
              onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
              placeholder="https://i.ytimg.com/vi/nYjYs3Z6YwQ/maxresdefault.jpg"
              className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="border-indigo-200 text-slate-600 hover:bg-indigo-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              variant="gradient"
              className="shadow-lg hover:shadow-xl"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
