import { Suspense } from 'react'
import { ScheduleCalendar } from '@/components/schedule/schedule-calendar'
import { ScheduleStats } from '@/components/schedule/schedule-stats'
import { UpcomingAppointments } from '@/components/dashboard/upcoming-appointments'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@cureclinica/ui/button'
import { Plus, Calendar as CalendarIcon } from 'lucide-react'
import Link from 'next/link'

interface SchedulePageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function SchedulePage({ searchParams }: SchedulePageProps) {
  const selectedDate = searchParams.date as string
  const view = (searchParams.view as string) || 'month'

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <CalendarIcon className="h-6 w-6 mr-2" />
            Agenda
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie consultas e agendamentos da clínica
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/schedule/availability">
              Disponibilidade
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/schedule/new">
              <Plus className="h-4 w-4 mr-2" />
              Nova Consulta
            </Link>
          </Button>
        </div>
      </div>

      {/* Schedule Stats */}
      <Suspense fallback={<div className="h-24" />}>
        <ScheduleStats />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Suspense fallback={<LoadingSpinner />}>
            <ScheduleCalendar
              selectedDate={selectedDate}
              view={view}
            />
          </Suspense>
        </div>

        {/* Upcoming Appointments */}
        <div className="space-y-6">
          <Suspense fallback={<LoadingSpinner />}>
            <UpcomingAppointments />
          </Suspense>
        </div>
      </div>
    </div>
  )
}