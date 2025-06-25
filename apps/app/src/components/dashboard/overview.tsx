import { Card } from '@cureclinica/ui/card'
import { Tabs } from '@cureclinica/ui/tabs'
import { 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Activity
} from 'lucide-react'

export async function DashboardOverview() {
  // Mock data for charts - in a real implementation, this would come from queries
  const monthlyConsultations = [
    { month: 'Jan', consultations: 65, revenue: 15400 },
    { month: 'Fev', consultations: 78, revenue: 18200 },
    { month: 'Mar', consultations: 52, revenue: 12300 },
    { month: 'Abr', consultations: 89, revenue: 21100 },
    { month: 'Mai', consultations: 95, revenue: 23800 },
    { month: 'Jun', consultations: 107, revenue: 26500 },
  ]

  const treatmentTypes = [
    { type: 'Alopecia Androgenética', count: 45, percentage: 38 },
    { type: 'Alopecia Areata', count: 28, percentage: 23 },
    { type: 'Dermatite Seborreica', count: 22, percentage: 18 },
    { type: 'Tricotilomania', count: 15, percentage: 13 },
    { type: 'Outros', count: 10, percentage: 8 },
  ]

  return (
    <div className="space-y-6">
      {/* Consultations Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Consultas e Receita Mensal
            </h3>
            <p className="text-sm text-gray-500">
              Últimos 6 meses
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="space-y-4">
          {monthlyConsultations.map((month, index) => (
            <div key={month.month} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 text-sm font-medium text-gray-600">
                  {month.month}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-48">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(month.consultations / 120) * 100}%` }}
                  />
                </div>
                <div className="text-sm font-medium text-gray-900 w-12">
                  {month.consultations}
                </div>
              </div>
              <div className="text-sm text-gray-600 w-20 text-right">
                {month.revenue.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Treatment Types Distribution */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Distribuição de Tratamentos
            </h3>
            <p className="text-sm text-gray-500">
              Tipos mais comuns de alopecia
            </p>
          </div>
          <Activity className="h-5 w-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          {treatmentTypes.map((treatment, index) => (
            <div key={treatment.type} className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex items-center space-x-2">
                  <div 
                    className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-yellow-500' :
                      index === 3 ? 'bg-purple-500' :
                      'bg-gray-400'
                    }`}
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {treatment.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-600">
                  {treatment.count} casos
                </div>
                <div className="text-sm font-medium text-gray-900 w-10 text-right">
                  {treatment.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <Calendar className="h-4 w-4 mr-2" />
            Nova Consulta
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <Activity className="h-4 w-4 mr-2" />
            Análise Capilar
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <TrendingUp className="h-4 w-4 mr-2" />
            Relatório
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </button>
        </div>
      </Card>
    </div>
  )
}
