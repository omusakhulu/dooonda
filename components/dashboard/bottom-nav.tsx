
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  Store, 
  Wallet,
  MoreHorizontal,
  MessageCircle,
  Users,
  BarChart3,
  HelpCircle,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Stores', href: '/dashboard/stores', icon: Store },
  { name: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
]

const moreItems = [
  { name: 'Bulk SMS', href: '/dashboard/messages', icon: MessageCircle },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Help Center', href: '/dashboard/help', icon: HelpCircle },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function BottomNav() {
  const pathname = usePathname()
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Check if current page is in the "More" section
  const isMoreSectionActive = moreItems.some(item => pathname === item.href)

  // Simple click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false)
      }
    }

    if (isMoreOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isMoreOpen])

  // Close dropdown when navigating
  useEffect(() => {
    setIsMoreOpen(false)
  }, [pathname])

  const toggleMore = () => {
    setIsMoreOpen(!isMoreOpen)
  }

  const handleMoreItemClick = () => {
    setIsMoreOpen(false)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-indigo-100/50 z-50">
      {/* Dropdown Menu */}
      {isMoreOpen && (
        <div className="absolute bottom-16 left-0 right-0 bg-white border-t border-indigo-100/50 shadow-lg z-50">
          <div className="p-2">
            {moreItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleMoreItemClick}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors mb-1 block w-full',
                    'min-h-[48px]', // Proper touch target size
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50'
                  )}
                >
                  <item.icon
                    className={cn(
                      'h-5 w-5 flex-shrink-0',
                      isActive ? 'text-white' : 'text-slate-400'
                    )}
                  />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="grid grid-cols-5 h-16">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center text-xs font-medium transition-colors',
                isActive
                  ? 'text-white bg-gradient-to-t from-indigo-500 to-pink-500'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-gradient-to-t hover:from-indigo-50 hover:to-pink-50'
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 mb-1',
                  isActive ? 'text-white' : 'text-slate-400'
                )}
              />
              <span className="truncate px-1">{item.name}</span>
            </Link>
          )
        })}
        
        {/* More Button */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={toggleMore}
            className={cn(
              'w-full h-full flex flex-col items-center justify-center text-xs font-medium transition-colors',
              isMoreSectionActive || isMoreOpen
                ? 'text-white bg-gradient-to-t from-indigo-500 to-pink-500'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-gradient-to-t hover:from-indigo-50 hover:to-pink-50'
            )}
          >
            <MoreHorizontal
              className={cn(
                'h-5 w-5 mb-1',
                isMoreSectionActive || isMoreOpen ? 'text-white' : 'text-slate-400'
              )}
            />
            <span className="truncate px-1">More</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
