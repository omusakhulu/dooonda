
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'

interface CreateStoreDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function CreateStoreDialog({ open, onOpenChange, onSuccess }: CreateStoreDialogProps) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    banner: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('Store created successfully!')
        onSuccess()
        onOpenChange(false)
        setFormData({
          name: '',
          description: '',
          logo: '',
          banner: ''
        })
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to create store')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Store</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Store Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter store name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter store description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              placeholder="https://i.pinimg.com/originals/a8/c2/53/a8c253d68f754963b8fa8941cde005c3.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="banner">Banner URL</Label>
            <Input
              id="banner"
              value={formData.banner}
              onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
              placeholder="https://i.pinimg.com/originals/8c/28/30/8c2830f85881caa01d9b736635c3a8cb.jpg"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#00796B] to-[#FFD600] hover:from-[#00695C] hover:to-[#FFC107] text-white"
            >
              {loading ? 'Creating...' : 'Create Store'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
