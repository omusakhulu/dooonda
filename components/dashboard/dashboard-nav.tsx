
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  Users,
  MessageCircle,
  BarChart3,
  Wallet,
  HelpCircle,
  Settings,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Stores', href: '/dashboard/stores', icon: Store },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Bulk SMS', href: '/dashboard/messages', icon: MessageCircle },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
  { name: 'Help Center', href: '/dashboard/help', icon: HelpCircle },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface DashboardNavProps {
  isOpen?: boolean
  onClose?: () => void
}

export function DashboardNav({ isOpen, onClose }: DashboardNavProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:bg-gradient-to-b md:from-white md:to-indigo-50/50 md:border-r md:border-indigo-100/50">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto scrollbar-gradient">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-2xl font-bold text-gradient">
              dooonda
            </h1>
          </div>
          
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                      isActive
                        ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-200/50'
                        : 'text-slate-600 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'mr-3 h-5 w-5 transition-colors',
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'
                      )}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 flex z-40">
            <div className="fixed inset-0 bg-slate-900/50" onClick={onClose} />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative flex-1 flex flex-col max-w-xs w-full bg-gradient-to-b from-white to-indigo-50/50"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-300 hover:text-white hover:bg-slate-700"
                  onClick={onClose}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto scrollbar-gradient">
                <div className="flex-shrink-0 flex items-center px-4">
                  <h1 className="text-2xl font-bold text-gradient">
                    dooonda
                  </h1>
                </div>
                
                <nav className="mt-8 px-2 space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                          isActive
                            ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-200/50'
                            : 'text-slate-600 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50'
                        )}
                      >
                        <item.icon
                          className={cn(
                            'mr-3 h-5 w-5 transition-colors',
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'
                          )}
                        />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  )
}
