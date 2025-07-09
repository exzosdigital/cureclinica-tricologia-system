"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { 
  Users, 
  Calendar, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Activity,
  BarChart
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalPatients: 0,
    appointmentsToday: 0,
    pendingTreatments: 0,
    systemAlerts: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true);
        
        // Busca total de pacientes
        const { count: patientsCount } = await supabase
          .from('patients')
          .select('*', { count: 'exact', head: true });
          
        // Busca agendamentos para hoje
        const today = new Date().toISOString().split('T')[0];
        const { count: appointmentsCount } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .gte('scheduled_at', `${today}T00:00:00`)
          .lte('scheduled_at', `${today}T23:59:59`);
          
        // Busca tratamentos pendentes
        const { count: treatmentsCount } = await supabase
          .from('treatments')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'scheduled');
          
        // Em um sistema real, buscaria alertas do sistema
        // Aqui usamos um valor de exemplo
        const systemAlertsCount = 2;
        
        setStats({
          totalPatients: patientsCount || 0,
          appointmentsToday: appointmentsCount || 0,
          pendingTreatments: treatmentsCount || 0,
          systemAlerts: systemAlertsCount
        });
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        // Configurar valores padrão em caso de erro
        setStats({
          totalPatients: 0,
          appointmentsToday: 0,
          pendingTreatments: 0,
          systemAlerts: 0
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchDashboardData();
  }, []);

  // Cards de estatísticas para o dashboard
  const statCards = [
    {
      title: "Total de Pacientes",
      value: stats.totalPatients,
      icon: <Users size={24} className="text-blue-600" />,
      color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      title: "Consultas Hoje",
      value: stats.appointmentsToday,
      icon: <Calendar size={24} className="text-green-600" />,
      color: "bg-green-50 text-green-700 border-green-200"
    },
    {
      title: "Tratamentos Pendentes",
      value: stats.pendingTreatments,
      icon: <Clock size={24} className="text-amber-600" />,
      color: "bg-amber-50 text-amber-700 border-amber-200"
    },
    {
      title: "Alertas do Sistema",
      value: stats.systemAlerts,
      icon: <AlertTriangle size={24} className="text-red-600" />,
      color: "bg-red-50 text-red-700 border-red-200"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cabeçalho da página */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Painel Administrativo</h1>
          <p className="text-gray-500">
            Bem-vindo, {session?.user?.name || "Administrador"}! Confira as estatísticas do sistema.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Gerar Relatório
          </button>
        </div>
      </div>

      {/* Cards com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div 
            key={index} 
            className={`border rounded-lg shadow-sm p-6 ${card.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{card.title}</p>
                <p className="text-2xl font-bold mt-1">
                  {isLoading ? "..." : card.value}
                </p>
              </div>
              <div className="p-3 rounded-full bg-white">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Seção de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de atividade recente */}
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Atividade Recente</h2>
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <Activity size={16} />
              <span>Últimos 30 dias</span>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 border rounded">
            {/* Aqui seria integrado um componente de gráfico */}
            <div className="flex flex-col items-center text-gray-400">
              <BarChart size={48} />
              <p className="mt-2">Gráfico de atividade seria exibido aqui</p>
            </div>
          </div>
        </div>

        {/* Gráfico de desempenho */}
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Desempenho do Sistema</h2>
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <TrendingUp size={16} />
              <span>Tempo real</span>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 border rounded">
            {/* Aqui seria integrado um componente de gráfico */}
            <div className="flex flex-col items-center text-gray-400">
              <BarChart size={48} />
              <p className="mt-2">Gráfico de desempenho seria exibido aqui</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de monitoramento */}
      <div className="bg-white border rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Status dos Serviços</h2>
        <div className="space-y-2">
          {[
            { name: "Banco de Dados", status: "online" },
            { name: "API Backend", status: "online" },
            { name: "Serviço de Armazenamento", status: "online" },
            { name: "Serviço de Autenticação", status: "online" }
          ].map((service, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="font-medium">{service.name}</div>
              <div className="flex items-center gap-2">
                <span className={`inline-block w-2 h-2 rounded-full ${
                  service.status === "online" ? "bg-green-500" : "bg-red-500"
                }`}></span>
                <span className={
                  service.status === "online" ? "text-green-600" : "text-red-600"
                }>
                  {service.status === "online" ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
