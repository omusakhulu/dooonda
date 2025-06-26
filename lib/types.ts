
export interface User {
  id: string
  email: string
  name?: string | null
  image?: string | null
  phone?: string | null
  role: 'USER' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}

export interface Store {
  id: string
  name: string
  slug: string
  description?: string | null
  logo?: string | null
  banner?: string | null
  status: 'ACTIVE' | 'PAUSED' | 'SUSPENDED'
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  slug: string
  description?: string | null
  price: number
  comparePrice?: number | null
  images: string[]
  status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK'
  inventory: number
  categoryId?: string | null
  storeId: string
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  orderNumber: string
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED'
  total: number
  subtotal: number
  tax?: number | null
  shipping?: number | null
  discount?: number | null
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  paymentMethod?: string | null
  notes?: string | null
  userId?: string | null
  customerId?: string | null
  storeId: string
  couponId?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Analytics {
  id: string
  date: Date
  views: number
  orders: number
  sales: number
  customers: number
  storeId: string
  createdAt: Date
  updatedAt: Date
}

export interface DashboardStats {
  totalOrders: number
  totalSales: number
  totalViews: number
  totalCustomers: number
  monthlyOrders: number[]
  monthlySales: number[]
}
