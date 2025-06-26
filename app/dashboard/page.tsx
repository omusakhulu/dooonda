
import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { RecentOrders } from '@/components/dashboard/recent-orders'
import { MonthlyOverview } from '@/components/dashboard/monthly-overview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, Calendar } from 'lucide-react'

async function getDashboardData() {
  const [totalStores, totalOrders, totalProducts, totalCustomers, recentOrders] = await Promise.all([
    prisma.store.count(),
    prisma.order.count(),
    prisma.product.count(),
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        items: {
          include: {
            product: true
          }
        }
      }
    })
  ])

  const totalSales = await prisma.order.aggregate({
    _sum: {
      total: true
    },
    where: {
      status: 'DELIVERED'
    }
  })

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  const monthlyData = await prisma.order.aggregate({
    _sum: { total: true },
    _count: true,
    where: {
      createdAt: {
        gte: new Date(currentYear, currentMonth, 1),
        lt: new Date(currentYear, currentMonth + 1, 1)
      }
    }
  })

  const previousMonthData = await prisma.order.aggregate({
    _sum: { total: true },
    _count: true,
    where: {
      createdAt: {
        gte: new Date(currentYear, currentMonth - 1, 1),
        lt: new Date(currentYear, currentMonth, 1)
      }
    }
  })

  const monthlyCustomers = await prisma.user.count({
    where: {
      role: 'USER',
      createdAt: {
        gte: new Date(currentYear, currentMonth, 1),
        lt: new Date(currentYear, currentMonth + 1, 1)
      }
    }
  })

  const previousMonthCustomers = await prisma.user.count({
    where: {
      role: 'USER',
      createdAt: {
        gte: new Date(currentYear, currentMonth - 1, 1),
        lt: new Date(currentYear, currentMonth, 1)
      }
    }
  })

  const formattedOrders = recentOrders.map((order: any) => ({
    id: order.id,
    customerName: order.user?.name || 'Unknown',
    products: order.items?.map((item: any) => item.product.name) || [],
    total: Number(order.total),
    status: order.status.toLowerCase() === 'delivered' ? 'delivered' : order.status.toLowerCase() as 'pending' | 'processing' | 'completed' | 'cancelled' | 'delivered',
    date: order.createdAt.toLocaleDateString()
  }))

  return {
    stats: {
      totalStores,
      totalOrders,
      totalSales: Number(totalSales._sum.total || 0),
      totalProducts,
      totalCustomers
    },
    recentOrders: formattedOrders,
    monthlyOverview: {
      currentMonth: {
        sales: Number(monthlyData._sum.total || 0),
        orders: monthlyData._count || 0,
        customers: monthlyCustomers,
        revenue: Number(monthlyData._sum.total || 0)
      },
      previousMonth: {
        sales: Number(previousMonthData._sum.total || 0),
        orders: previousMonthData._count || 0,
        customers: previousMonthCustomers,
        revenue: Number(previousMonthData._sum.total || 0)
      },
      monthName: new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
    }
  }
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="gradient-card">
            <CardContent className="p-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="gradient-card">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
        <Card className="gradient-card">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-white to-indigo-50/50 rounded-lg p-6 border border-indigo-100/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Welcome back, {session.user?.name || 'User'}!
            </h1>
            <p className="text-slate-600">Here's what's happening with your business today.</p>
          </div>
        </div>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  )
}

async function DashboardContent() {
  const data = await getDashboardData()

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCards stats={data.stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Monthly Overview */}
        <div className="lg:col-span-2">
          <MonthlyOverview data={data.monthlyOverview} />
        </div>

        {/* Right Column - Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders orders={data.recentOrders} />
    </div>
  )
}
