
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Wallet, TrendingUp, TrendingDown, Download, Plus, Eye, EyeOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

interface Transaction {
  id: string
  type: 'CREDIT' | 'DEBIT' | 'WITHDRAWAL' | 'REFUND'
  amount: number
  description: string
  status: string
  createdAt: string
  reference?: string
}

interface WalletData {
  balance: number
  transactions: Transaction[]
}

export default function WalletPage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [walletData, setWalletData] = useState<WalletData>({
    balance: 0,
    transactions: []
  })
  const [showBalance, setShowBalance] = useState(true)

  useEffect(() => {
    fetchWalletData()
  }, [])

  const fetchWalletData = async () => {
    try {
      const response = await fetch('/api/wallet')
      if (response.ok) {
        const data = await response.json()
        setWalletData(data)
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Mock data for demonstration
  useEffect(() => {
    setWalletData({
      balance: 46250.75,
      transactions: [
        {
          id: '1',
          type: 'CREDIT',
          amount: 1250.00,
          description: 'Order commission - #ORD001',
          status: 'COMPLETED',
          createdAt: '2024-06-20T10:30:00Z',
          reference: 'TXN001'
        },
        {
          id: '2',
          type: 'WITHDRAWAL',
          amount: 5000.00,
          description: 'Bank withdrawal',
          status: 'COMPLETED',
          createdAt: '2024-06-19T14:15:00Z',
          reference: 'WTH001'
        },
        {
          id: '3',
          type: 'CREDIT',
          amount: 850.50,
          description: 'Order commission - #ORD002',
          status: 'COMPLETED',
          createdAt: '2024-06-18T16:45:00Z',
          reference: 'TXN002'
        },
        {
          id: '4',
          type: 'DEBIT',
          amount: 200.00,
          description: 'Service fee',
          status: 'COMPLETED',
          createdAt: '2024-06-17T09:20:00Z',
          reference: 'FEE001'
        },
        {
          id: '5',
          type: 'CREDIT',
          amount: 2100.00,
          description: 'Order commission - #ORD003',
          status: 'COMPLETED',
          createdAt: '2024-06-16T11:30:00Z',
          reference: 'TXN003'
        }
      ]
    })
    setLoading(false)
  }, [])

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'CREDIT': return TrendingUp
      case 'WITHDRAWAL': return Download
      case 'DEBIT': return TrendingDown
      case 'REFUND': return Plus
      default: return Wallet
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'CREDIT': return 'text-green-600'
      case 'WITHDRAWAL': return 'text-indigo-600'
      case 'DEBIT': return 'text-red-600'
      case 'REFUND': return 'text-pink-500'
      default: return 'text-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'FAILED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Wallet</h1>
          <p className="text-gray-600 mt-1">Manage your earnings and withdrawals</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white shadow-lg">
          <Download className="h-4 w-4 mr-2" />
          Withdraw Money
        </Button>
      </div>

      {/* Wallet Balance Card */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-indigo-600 to-pink-500 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Wallet className="h-6 w-6" />
                <span className="text-lg font-medium">Available Balance</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-4xl font-bold">
                  {showBalance ? `KES ${walletData.balance.toLocaleString('en-KE', { minimumFractionDigits: 2 })}` : 'KES ****'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-white hover:bg-white/20"
                >
                  {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/80 mt-2">
                +12.5% increase from last month
              </p>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Wallet className="h-10 w-10" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Withdraw Money',
            description: 'Transfer funds to your bank account',
            icon: Download,
            color: 'from-indigo-500 to-indigo-600',
            action: 'withdraw'
          },
          {
            title: 'Transaction History',
            description: 'View all your transactions',
            icon: TrendingUp,
            color: 'from-pink-500 to-pink-600',
            action: 'history'
          },
          {
            title: 'Earnings Report',
            description: 'Download your earnings report',
            icon: Download,
            color: 'from-purple-500 to-purple-600',
            action: 'report'
          }
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-gradient-to-r hover:from-indigo-200 hover:to-pink-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Transaction History */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <span>Recent Transactions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {walletData.transactions.length === 0 ? (
            <div className="text-center py-8">
              <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions yet</h3>
              <p className="text-gray-600">Your transaction history will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {walletData.transactions.map((transaction, index) => {
                const TransactionIcon = getTransactionIcon(transaction.type)
                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-lg hover:from-indigo-100 hover:to-pink-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${getTransactionColor(transaction.type)}`}>
                          <TransactionIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{transaction.description}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{format(new Date(transaction.createdAt), 'MMM dd, yyyy • h:mm a')}</span>
                            {transaction.reference && (
                              <>
                                <span>•</span>
                                <span>{transaction.reference}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${getTransactionColor(transaction.type)}`}>
                          {transaction.type === 'CREDIT' || transaction.type === 'REFUND' ? '+' : '-'}
                          KES {transaction.amount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                        </div>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
