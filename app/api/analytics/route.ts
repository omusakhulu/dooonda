
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'monthly'

    // Get user's stores
    const stores = await prisma.store.findMany({
      where: { userId: session.user.id },
      select: { id: true }
    })

    const storeIds = stores.map(s => s.id)

    // Calculate date range based on period
    let startDate: Date
    if (period === 'yearly') {
      startDate = new Date(new Date().getFullYear() - 2, 0, 1) // Last 3 years
    } else {
      startDate = new Date(new Date().getFullYear(), new Date().getMonth() - 11, 1) // Last 12 months
    }

    // Get analytics data
    const analytics = await prisma.analytics.findMany({
      where: {
        storeId: { in: storeIds },
        date: { gte: startDate }
      },
      orderBy: { date: 'asc' }
    })

    // Get summary data
    const orders = await prisma.order.findMany({
      where: {
        storeId: { in: storeIds },
        createdAt: { gte: startDate }
      }
    })

    const customers = await prisma.customer.findMany({
      where: {
        storeId: { in: storeIds },
        createdAt: { gte: startDate }
      }
    })

    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0)
    const totalOrders = orders.length
    const totalCustomers = customers.length
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    const summary = {
      totalRevenue,
      totalOrders,
      totalCustomers,
      avgOrderValue: Math.round(avgOrderValue)
    }

    return NextResponse.json({ analytics, summary })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
