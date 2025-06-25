import { createClient } from '../clients/server'

export async function getUpcomingAppointments({
  doctorId,
  days = 7,
  limit = 10,
}: {
  doctorId?: string
  days?: number
  limit?: number
} = {}) {
  const now = new Date()
  const futureDate = new Date(now)
  futureDate.setDate(futureDate.getDate() + days)

  const supabase = createClient()
  
  let query = supabase
    .from('consultations')
    .select(`
      *,
      patient:patient_id (
        first_name,
        last_name,
        phone
      )
    `)
    .gte('scheduled_date', now.toISOString())
    .lte('scheduled_date', futureDate.toISOString())
    .in('status', ['scheduled', 'confirmed'])
    .order('scheduled_date', { ascending: true })
    .limit(limit)

  if (doctorId) {
    query = query.eq('doctor_id', doctorId)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch upcoming appointments: ${error.message}`)
  }

  return data || []
}