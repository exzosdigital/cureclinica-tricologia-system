import { createClient } from '../clients/server'

export async function getDashboardStats() {
  const supabase = createClient()
  
  // Get current date ranges
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  try {
    // Total patients
    const { count: totalPatients } = await supabase
      .from('patients')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)

    // New patients this month
    const { count: newPatientsThisMonth } = await supabase
      .from('patients')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)
      .gte('created_at', startOfMonth.toISOString())

    // Consultations today
    const { count: consultationsToday } = await supabase
      .from('consultations')
      .select('*', { count: 'exact', head: true })
      .gte('scheduled_date', startOfToday.toISOString())
      .lt('scheduled_date', new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000).toISOString())

    // Consultations this week
    const { count: consultationsThisWeek } = await supabase
      .from('consultations')
      .select('*', { count: 'exact', head: true })
      .gte('scheduled_date', startOfWeek.toISOString())

    // Hair analysis this month
    const { count: hairAnalysisThisMonth } = await supabase
      .from('hair_analysis')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfMonth.toISOString())

    // Hair analysis last month
    const { count: hairAnalysisLastMonth } = await supabase
      .from('hair_analysis')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfLastMonth.toISOString())
      .lt('created_at', startOfMonth.toISOString())

    // Return rate calculation (patients with more than one consultation)
    const { data: patientConsultations } = await supabase
      .from('consultations')
      .select('patient_id')
      .not('patient_id', 'is', null)

    const patientConsultationCounts = patientConsultations?.reduce((acc: Record<string, number>, curr) => {
      acc[curr.patient_id] = (acc[curr.patient_id] || 0) + 1
      return acc
    }, {}) || {}

    const returningPatients = Object.values(patientConsultationCounts).filter(count => count > 1).length
    const totalUniquePatients = Object.keys(patientConsultationCounts).length
    const returnRate = totalUniquePatients > 0 ? returningPatients / totalUniquePatients : 0

    // Monthly revenue
    const { data: paymentsThisMonth } = await supabase
      .from('payments')
      .select('amount')
      .eq('status', 'paid')
      .gte('created_at', startOfMonth.toISOString())

    const monthlyRevenue = paymentsThisMonth?.reduce((sum, payment) => sum + payment.amount, 0) || 0

    // Last month revenue
    const { data: paymentsLastMonth } = await supabase
      .from('payments')
      .select('amount')
      .eq('status', 'paid')
      .gte('created_at', startOfLastMonth.toISOString())
      .lt('created_at', startOfMonth.toISOString())

    const lastMonthRevenue = paymentsLastMonth?.reduce((sum, payment) => sum + payment.amount, 0) || 0

    // Active treatments
    const { count: activeTreatments } = await supabase
      .from('treatments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    // Treatment completion rate
    const { count: completedTreatments } = await supabase
      .from('treatments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed')
      .gte('created_at', startOfMonth.toISOString())

    const { count: totalTreatmentsThisMonth } = await supabase
      .from('treatments')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfMonth.toISOString())

    const treatmentCompletionRate = totalTreatmentsThisMonth && totalTreatmentsThisMonth > 0 
      ? Math.round((completedTreatments || 0) / totalTreatmentsThisMonth * 100)
      : 0

    return {
      totalPatients: totalPatients || 0,
      newPatientsThisMonth: newPatientsThisMonth || 0,
      consultationsToday: consultationsToday || 0,
      consultationsThisWeek: consultationsThisWeek || 0,
      hairAnalysisThisMonth: hairAnalysisThisMonth || 0,
      hairAnalysisLastMonth: hairAnalysisLastMonth || 0,
      returnRate,
      monthlyRevenue,
      lastMonthRevenue,
      activeTreatments: activeTreatments || 0,
      treatmentCompletionRate,
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    
    // Return default values on error
    return {
      totalPatients: 0,
      newPatientsThisMonth: 0,
      consultationsToday: 0,
      consultationsThisWeek: 0,
      hairAnalysisThisMonth: 0,
      hairAnalysisLastMonth: 0,
      returnRate: 0,
      monthlyRevenue: 0,
      lastMonthRevenue: 0,
      activeTreatments: 0,
      treatmentCompletionRate: 0,
    }
  }
}
