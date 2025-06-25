'use client'

import { Bell, Search, LogOut } from 'lucide-react'
import { Input } from '@cureclinica/ui/input'
import { Button } from '@cureclinica/ui/button'
import type { User } from '@cureclinica/supabase/types'
import { signOut } from '@cureclinica/supabase/mutations'
import { formatDateTime } from '@cureclinica/ui/cn'

interface DashboardHeaderProps {
  user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  async function handleSignOut() {
    await signOut()
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar pacientes, consultas..."
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          
          {/* Date/Time */}
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">
              {new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-xs text-gray-500">
              {new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          {/* Sign out */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            title="Sair"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}