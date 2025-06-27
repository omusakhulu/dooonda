import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import type { Session } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { subYears, subMonths } from 'date-fns'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  let session: Session | null = null
  try {
    session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'monthly'

    // Fetch stores first to avoid using it before declaration
    const stores = await prisma.store.findMany({
      where: { userId: session.user.id },
      select: { id: true }
    })

    const storeIds = stores.map(s => s.id)

    // Determine the date range based on the requested period
    const startDate = period === 'yearly' ? subYears(new Date(), 2) : subMonths(new Date(), 11)

    // Fetch analytics, orders and customers in parallel
    const [analytics, orders, customers] = await Promise.all([
      prisma.analytics.findMany({
        where: {
          storeId: { in: storeIds },
          date: { gte: startDate }
        },
        orderBy: { date: 'asc' }
      }),
      prisma.order.findMany({
        where: {
          storeId: { in: storeIds },
          createdAt: { gte: startDate }
        },
        select: { total: true }
      }),
      prisma.customer.findMany({
        where: {
          storeId: { in: storeIds },
          createdAt: { gte: startDate }
        },
        select: { id: true }
      })
    ])

    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0)
    const totalOrders = orders.length
    const totalCustomers = customers.length

    return NextResponse.json({
      analytics,
      summary: {
        totalRevenue,
        totalOrders,
        totalCustomers,
        avgOrderValue: totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0
      }
    })
  } catch (error) {
    console.error('Error in /api/analytics:', {
      error: error instanceof Error ? error.message : error,
      userId: session?.user.id
    })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}