import { Suspense } from 'react'
import { DashboardOverview } from '@/components/dashboard/overview'
import { DashboardStats } from '@/components/dashboard/stats'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { UpcomingAppointments } from '@/components/dashboard/upcoming-appointments'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Visão geral da sua clínica de tricologia
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <p className="text-sm text-gray-500">
            Última atualização: {new Date().toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <Suspense fallback={<LoadingSpinner />}>
        <DashboardStats />
      </Suspense>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview Charts */}
        <div className="lg:col-span-2">
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardOverview />
          </Suspense>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <Suspense fallback={<LoadingSpinner />}>
            <UpcomingAppointments />
          </Suspense>

          {/* Recent Activity */}
          <Suspense fallback={<LoadingSpinner />}>
            <RecentActivity />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
