import { getDashboardStats } from '@cureclinica/supabase/queries'
import { Card } from '@cureclinica/ui/card'
import { 
  Users, 
  Calendar, 
  Activity, 
  TrendingUp,
  UserCheck,
  DollarSign
} from 'lucide-react'

export async function DashboardStats() {
  const stats = await getDashboardStats()

  const statCards = [
    {
      title: 'Total de Pacientes',
      value: stats.totalPatients.toString(),
      change: `+${stats.newPatientsThisMonth}`,
      changeLabel: 'novos este mês',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trending: 'up' as const,
    },
    {
      title: 'Consultas Hoje',
      value: stats.consultationsToday.toString(),
      change: `${stats.consultationsThisWeek}`,
      changeLabel: 'esta semana',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trending: 'up' as const,
    },
    {
      title: 'Análises Capilares',
      value: stats.hairAnalysisThisMonth.toString(),
      change: `+${Math.round((stats.hairAnalysisThisMonth / stats.hairAnalysisLastMonth - 1) * 100)}%`,
      changeLabel: 'vs mês anterior',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trending: stats.hairAnalysisThisMonth > stats.hairAnalysisLastMonth ? 'up' : 'down' as const,
    },
    {
      title: 'Taxa de Retorno',
      value: `${Math.round(stats.returnRate * 100)}%`,
      change: '+5%',
      changeLabel: 'este trimestre',
      icon: UserCheck,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      trending: 'up' as const,
    },
    {
      title: 'Receita Mensal',
      value: stats.monthlyRevenue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
      }),
      change: `+${Math.round(((stats.monthlyRevenue / stats.lastMonthRevenue) - 1) * 100)}%`,
      changeLabel: 'vs mês anterior',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trending: stats.monthlyRevenue > stats.lastMonthRevenue ? 'up' : 'down' as const,
    },
    {
      title: 'Tratamentos Ativos',
      value: stats.activeTreatments.toString(),
      change: `${stats.treatmentCompletionRate}%`,
      changeLabel: 'taxa de conclusão',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trending: 'up' as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center">
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <div className="ml-2 flex items-baseline text-sm">
                    <p className={`font-medium ${
                      stat.trending === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </p>
                    <p className="text-gray-500 ml-1">{stat.changeLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
