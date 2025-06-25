import { Suspense } from 'react'
import { PatientsList } from '@/components/patients/patients-list'
import { PatientsFilters } from '@/components/patients/patients-filters'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@cureclinica/ui/button'
import { Plus, Users } from 'lucide-react'
import Link from 'next/link'

interface PatientsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PatientsPage({ searchParams: searchParamsPromise }: PatientsPageProps) {
  const searchParams = await searchParamsPromise
  
  const search = searchParams.search as string
  const page = Number(searchParams.page) || 1
  const status = searchParams.status as string
  const gender = searchParams.gender as string

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="h-6 w-6 mr-2" />
            Pacientes
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie todos os pacientes da clínica
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button asChild>
            <Link href="/dashboard/patients/new">
              <Plus className="h-4 w-4 mr-2" />
              Novo Paciente
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Suspense fallback={<div className="h-16" />}>
        <PatientsFilters />
      </Suspense>

      {/* Patients List */}
      <Suspense fallback={<LoadingSpinner />}>
        <PatientsList
          search={search}
          page={page}
          status={status}
          gender={gender}
        />
      </Suspense>
    </div>
  )
}
