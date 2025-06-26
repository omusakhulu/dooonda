
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const stores = await prisma.store.findMany({
      where: { userId: session.user.id },
      include: {
        _count: {
          select: {
            products: true,
            orders: true,
            customers: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(stores)
  } catch (error) {
    console.error('Error fetching stores:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, logo, banner } = body

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    const store = await prisma.store.create({
      data: {
        name,
        slug,
        description,
        logo,
        banner,
        userId: session.user.id
      }
    })

    return NextResponse.json(store)
  } catch (error) {
    console.error('Error creating store:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
