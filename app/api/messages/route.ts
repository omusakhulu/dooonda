
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

    const messages = await prisma.message.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
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
    const { title, content, recipientType, productId } = body

    // Get recipients based on type
    let recipients: string[] = []
    
    if (recipientType === 'all') {
      // Get all customers from user's stores
      const customers = await prisma.customer.findMany({
        where: {
          store: { userId: session.user.id }
        },
        select: { phone: true }
      })
      recipients = customers.map(({ phone }: { phone: string | null }) => phone).filter(Boolean) as string[]
    } else if (recipientType === 'product' && productId) {
      // Get customers who bought specific product
      const customers = await prisma.customer.findMany({
        where: {
          orders: {
            some: {
              items: {
                some: { productId }
              }
            }
          }
        },
        select: { phone: true }
      })
      recipients = customers.map(({ phone }: { phone: string | null }) => phone).filter(Boolean) as string[]
    }

    const message = await prisma.message.create({
      data: {
        type: 'SMS',
        content: `${title}\n\n${content}`,
        recipients,
        status: 'SENT', // In real app, this would be PENDING until actually sent
        sentAt: new Date(),
        userId: session.user.id
      }
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
