import type { Consultation } from '@cureclinica/supabase/types'
import { Card } from '@cureclinica/ui/card'
import { Badge } from '@cureclinica/ui/badge'
import { 
  Calendar, 
  Clock, 
  User,
  FileText
} from 'lucide-react'
import { formatDateTime, getConsultationStatusLabel, getStatusColor } from '@cureclinica/ui/cn'

interface ConsultationsListProps {
  consultations: Consultation[]
}

export function ConsultationsList({ consultations }: ConsultationsListProps) {
  if (consultations.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-gray-500 text-center">
          Nenhuma consulta registrada ainda.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {consultations.map((consultation) => (
        <Card key={consultation.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <h3 className="font-medium text-gray-900">
                  {formatDateTime(consultation.scheduled_date)}
                </h3>
                <Badge className={getStatusColor(consultation.status)}>
                  {getConsultationStatusLabel(consultation.status)}
                </Badge>
              </div>
              
              {consultation.chief_complaint && (
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Queixa:</strong> {consultation.chief_complaint}
                </p>
              )}
              
              {consultation.diagnosis && (
                <p className="mt-1 text-sm text-gray-600">
                  <strong>Diagnóstico:</strong> {consultation.diagnosis}
                </p>
              )}
              
              {consultation.notes && (
                <p className="mt-1 text-sm text-gray-600">
                  <strong>Observações:</strong> {consultation.notes}
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}