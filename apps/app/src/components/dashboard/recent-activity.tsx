import { Card } from '@cureclinica/ui/card'
import { Badge } from '@cureclinica/ui/badge'
import { 
  Activity, 
  Clock, 
  User,
  FileText,
  Calendar
} from 'lucide-react'

// Placeholder for recent activity - in production, this would fetch real data
const recentActivities = [
  {
    id: '1',
    type: 'consultation',
    description: 'Consulta realizada',
    user: 'Dr. Silva',
    time: '10 minutos atrás',
    icon: Calendar,
    color: 'text-blue-600',
  },
  {
    id: '2',
    type: 'patient',
    description: 'Novo paciente cadastrado',
    user: 'Recepção',
    time: '30 minutos atrás',
    icon: User,
    color: 'text-green-600',
  },
  {
    id: '3',
    type: 'analysis',
    description: 'Análise capilar criada',
    user: 'Dr. Silva',
    time: '1 hora atrás',
    icon: FileText,
    color: 'text-purple-600',
  },
  {
    id: '4',
    type: 'treatment',
    description: 'Tratamento iniciado',
    user: 'Dr. Silva',
    time: '2 horas atrás',
    icon: Activity,
    color: 'text-orange-600',
  },
]

export async function RecentActivity() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Atividade Recente
        </h3>
        <Activity className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {recentActivities.map((activity) => {
          const Icon = activity.icon
          return (
            <div 
              key={activity.id}
              className="flex items-start space-x-3"
            >
              <div className={`p-2 rounded-lg bg-gray-50 ${activity.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500">
                  {activity.user}
                </p>
              </div>
              
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                {activity.time}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
          Ver toda atividade →
        </button>
      </div>
    </Card>
  )
}