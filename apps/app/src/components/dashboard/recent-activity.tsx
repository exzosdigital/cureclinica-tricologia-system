import { Card } from '@cureclinica/ui/card'
import { Badge } from '@cureclinica/ui/badge'
import { 
  Activity,
  Users,
  Calendar,
  FileText,
  TrendingUp,
  Clock
} from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'patient' | 'consultation' | 'analysis' | 'payment'
  title: string
  description: string
  time: string
  icon: any
  color: string
}

export async function RecentActivity() {
  // Mock data - in a real app, this would come from a query
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'patient',
      title: 'Novo paciente cadastrado',
      description: 'Maria Silva foi cadastrada no sistema',
      time: 'Há 2 horas',
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: '2',
      type: 'consultation',
      title: 'Consulta realizada',
      description: 'Consulta com João Santos concluída',
      time: 'Há 3 horas',
      icon: Calendar,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: '3',
      type: 'analysis',
      title: 'Análise capilar',
      description: 'Nova análise para Ana Costa',
      time: 'Há 5 horas',
      icon: FileText,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: '4',
      type: 'payment',
      title: 'Pagamento recebido',
      description: 'R$ 350,00 - Consulta + Tratamento',
      time: 'Há 6 horas',
      icon: TrendingUp,
      color: 'text-green-600 bg-green-100'
    }
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Atividade Recente
        </h3>
        <Activity className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500">
                  {activity.description}
                </p>
                <div className="mt-1 flex items-center text-xs text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.time}
                </div>
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