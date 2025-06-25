import { getUpcomingAppointments } from '@cureclinica/supabase/queries'
import { Card } from '@cureclinica/ui/card'
import { Badge } from '@cureclinica/ui/badge'
import { Avatar } from '@cureclinica/ui/avatar'
import { 
  Calendar, 
  Clock, 
  MapPin,
  Phone
} from 'lucide-react'

export async function UpcomingAppointments() {
  const appointments = await getUpcomingAppointments()

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Próximas Consultas
        </h3>
        <Calendar className="h-5 w-5 text-gray-400" />
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-6">
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">
            Nenhuma consulta agendada para hoje
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div 
              key={appointment.id}
              className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <Avatar className="h-10 w-10">
                <div className="bg-blue-100 text-blue-600 w-full h-full flex items-center justify-center text-sm font-medium">
                  {appointment.patient.first_name.charAt(0)}
                  {appointment.patient.last_name.charAt(0)}
                </div>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {appointment.patient.first_name} {appointment.patient.last_name}
                  </p>
                  <Badge 
                    variant={
                      appointment.status === 'scheduled' ? 'default' :
                      appointment.status === 'confirmed' ? 'success' :
                      appointment.status === 'cancelled' ? 'destructive' :
                      'secondary'
                    }
                    className="ml-2"
                  >
                    {appointment.status === 'scheduled' && 'Agendada'}
                    {appointment.status === 'confirmed' && 'Confirmada'}
                    {appointment.status === 'cancelled' && 'Cancelada'}
                    {appointment.status === 'completed' && 'Concluída'}
                  </Badge>
                </div>
                
                <div className="mt-1 flex items-center text-xs text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(appointment.scheduled_date).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    {appointment.patient.phone || 'Sem telefone'}
                  </div>
                </div>

                {appointment.notes && (
                  <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                    {appointment.notes}
                  </p>
                )}

                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  Tipo: {appointment.type === 'consultation' ? 'Consulta' : 'Retorno'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
          Ver todas as consultas →
        </button>
      </div>
    </Card>
  )
}