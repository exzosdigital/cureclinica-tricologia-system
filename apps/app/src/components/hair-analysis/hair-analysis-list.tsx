import type { HairAnalysis } from '@cureclinica/supabase/types'
import { Card } from '@cureclinica/ui/card'
import { Badge } from '@cureclinica/ui/badge'
import { Button } from '@cureclinica/ui/button'
import { 
  Microscope, 
  Calendar, 
  User,
  FileText,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react'
import { formatDate } from '@cureclinica/ui/cn'
import { getHairAnalyses } from '@cureclinica/supabase/queries'
import Link from 'next/link'

interface HairAnalysisListProps {
  search?: string
  page?: number
  patientId?: string
  analysisType?: string
}

export async function HairAnalysisList({ 
  search, 
  page = 1, 
  patientId,
  analysisType 
}: HairAnalysisListProps) {
  const limit = 20
  const offset = (page - 1) * limit

  const { data: analyses, count } = await getHairAnalyses({
    search,
    limit,
    offset,
    patientId,
    analysisType
  })
  if (analyses.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-gray-500 text-center">
          Nenhuma análise capilar registrada ainda.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {analyses.map((analysis) => (
        <Card key={analysis.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <Microscope className="h-5 w-5 text-gray-400" />
                <h3 className="font-medium text-gray-900">
                  Análise de {formatDate(analysis.analysis_date)}
                </h3>
                {analysis.analysis_type && (
                  <Badge variant="outline">
                    {analysis.analysis_type}
                  </Badge>
                )}
              </div>
              
              {analysis.diagnosis && (
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Diagnóstico:</strong> {analysis.diagnosis}
                </p>
              )}
              
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {analysis.hair_density_per_cm2 && (
                  <div>
                    <span className="text-gray-500">Densidade:</span>
                    <span className="ml-1 font-medium">{analysis.hair_density_per_cm2}/cm²</span>
                  </div>
                )}
                
                {analysis.hair_thickness_micrometers && (
                  <div>
                    <span className="text-gray-500">Espessura:</span>
                    <span className="ml-1 font-medium">{analysis.hair_thickness_micrometers}μm</span>
                  </div>
                )}
                
                {analysis.pull_test_positive !== null && (
                  <div>
                    <span className="text-gray-500">Pull Test:</span>
                    <Badge 
                      variant={analysis.pull_test_positive ? 'destructive' : 'success'}
                      className="ml-1"
                    >
                      {analysis.pull_test_positive ? 'Positivo' : 'Negativo'}
                    </Badge>
                  </div>
                )}
                
                {analysis.severity && (
                  <div>
                    <span className="text-gray-500">Severidade:</span>
                    <span className="ml-1 font-medium">{analysis.severity}</span>
                  </div>
                )}
              </div>
              
              {analysis.notes && (
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Observações:</strong> {analysis.notes}
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}