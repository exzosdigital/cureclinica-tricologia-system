import { Suspense } from 'react'
import { HairAnalysisList } from '@/components/hair-analysis/hair-analysis-list'
import { HairAnalysisFilters } from '@/components/hair-analysis/hair-analysis-filters'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@cureclinica/ui/button'
import { Plus, Microscope } from 'lucide-react'
import Link from 'next/link'

interface HairAnalysisPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function HairAnalysisPage({ searchParams }: HairAnalysisPageProps) {
  const search = searchParams.search as string
  const page = Number(searchParams.page) || 1
  const patientId = searchParams.patient as string
  const analysisType = searchParams.type as string

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Microscope className="h-6 w-6 mr-2" />
            Análises Capilares
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie todas as análises tricológicas da clínica
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button asChild>
            <Link href="/dashboard/hair-analysis/new">
              <Plus className="h-4 w-4 mr-2" />
              Nova Análise
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Suspense fallback={<div className="h-16" />}>
        <HairAnalysisFilters />
      </Suspense>

      {/* Analysis List */}
      <Suspense fallback={<LoadingSpinner />}>
        <HairAnalysisList
          search={search}
          page={page}
          patientId={patientId}
          analysisType={analysisType}
        />
      </Suspense>
    </div>
  )
}