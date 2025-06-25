'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@cureclinica/ui/cn'
import type { User } from '@cureclinica/supabase/types'
import { 
  Calendar,
  Users,
  FileText,
  Activity,
  Package,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Microscope,
  BarChart3
} from 'lucide-react'
import { Button } from '@cureclinica/ui/button'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Activity },
  { name: 'Agenda', href: '/dashboard/schedule', icon: Calendar },
  { name: 'Pacientes', href: '/dashboard/patients', icon: Users },
  { name: 'Análises Capilares', href: '/dashboard/hair-analysis', icon: Microscope },
  { name: 'Consultas', href: '/dashboard/consultations', icon: FileText },
  { name: 'Tratamentos', href: '/dashboard/treatments', icon: Package },
  { name: 'Financeiro', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Relatórios', href: '/dashboard/reports', icon: BarChart3 },
  { name: 'Configurações', href: '/dashboard/settings', icon: Settings },
]

interface DashboardSidebarProps {
  user: User
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn(
      'bg-white border-r border-gray-200 transition-all duration-300 flex flex-col',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Microscope className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">CureClinica</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors group',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    isCollapsed && 'justify-center px-2'
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className={cn('h-5 w-5 flex-shrink-0', !isCollapsed && 'mr-3')} />
                  {!isCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              {user.avatar_url ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.avatar_url}
                  alt={user.full_name || 'User'}
                />
              ) : (
                <UserCircle className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div className="ml-3 min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.full_name || 'Usuário'}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user.role === 'admin' ? 'Administrador' :
                 user.role === 'doctor' ? 'Médico' :
                 user.role === 'receptionist' ? 'Recepcionista' : 'Staff'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}