
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

    // Get or create wallet
    let wallet = await prisma.wallet.findUnique({
      where: { userId: session.user.id }
    })

    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: {
          userId: session.user.id,
          balance: 0
        }
      })
    }

    // Get transactions
    const transactions = await prisma.transaction.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    return NextResponse.json({
      balance: Number(wallet.balance),
      transactions: transactions.map((t: { amount: any }) => ({
        ...t,
        amount: Number(t.amount)
      }))
    })
  } catch (error) {
    console.error('Error fetching wallet data:', error)
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
    const { type, amount, description } = body

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        type,
        amount,
        description,
        status: 'COMPLETED',
        userId: session.user.id
      }
    })

    // Update wallet balance
    const wallet = await prisma.wallet.findUnique({
      where: { userId: session.user.id }
    })

    if (wallet) {
      const newBalance = type === 'CREDIT' || type === 'REFUND' 
        ? Number(wallet.balance) + Number(amount)
        : Number(wallet.balance) - Number(amount)

      await prisma.wallet.update({
        where: { userId: session.user.id },
        data: { balance: newBalance }
      })
    }

    return NextResponse.json({
      ...transaction,
      amount: Number(transaction.amount)
    })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
