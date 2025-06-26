
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
    const storeId = searchParams.get('storeId')
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const order = searchParams.get('order') || 'desc'

    const where: any = {}
    
    if (storeId) {
      where.storeId = storeId
    } else {
      // Get user's stores
      const userStores: { id: string }[] = await prisma.store.findMany({
        where: { userId: session.user.id },
        select: { id: true }
      })
      where.storeId = { in: userStores.map(s => s.id) }
    }

    if (search) {
      where.name = { contains: search, mode: 'insensitive' }
    }

    if (category && category !== 'all') {
      where.categoryId = category
    }

    if (status && status !== 'all') {
      where.status = status
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        store: true,
        _count: {
          select: { orderItems: true }
        }
      },
      orderBy: { [sortBy]: order }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
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
    const { name, description, price, comparePrice, images, categoryId, storeId, inventory } = body

    // Verify store ownership
    const store = await prisma.store.findFirst({
      where: { id: storeId, userId: session.user.id }
    })

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        comparePrice,
        images,
        categoryId,
        storeId,
        inventory: inventory || 0
      },
      include: {
        category: true,
        store: true
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
