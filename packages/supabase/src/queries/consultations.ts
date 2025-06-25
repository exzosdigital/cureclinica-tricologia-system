import { createClient } from '../clients/server'
import type { Consultation } from '../types'

export async function getConsultations({
  doctorId,
  patientId,
  status,
  date,
  limit = 50,
  offset = 0,
}: {
  doctorId?: string
  patientId?: string
  status?: string
  date?: string
  limit?: number
  offset?: number
} = {}) {
  const supabase = createClient()
  
  let query = supabase
    .from('consultations')
    .select(`
      *,
      patient:patient_id (
        id,
        first_name,
        last_name,
        phone,
        email
      ),
      doctor:doctor_id (
        id,
        full_name,
        role
      )
    `)
    .order('scheduled_date', { ascending: false })

  if (doctorId) {
    query = query.eq('doctor_id', doctorId)
  }

  if (patientId) {
    query = query.eq('patient_id', patientId)
  }

  if (status) {
    query = query.eq('status', status)
  }

  if (date) {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)
    
    query = query
      .gte('scheduled_date', startOfDay.toISOString())
      .lte('scheduled_date', endOfDay.toISOString())
  }

  const { data, error } = await query
    .range(offset, offset + limit - 1)
    .limit(limit)

  if (error) {
    throw new Error(`Failed to fetch consultations: ${error.message}`)
  }

  return data || []
}

export async function getConsultationById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('consultations')
    .select(`
      *,
      patient:patient_id (
        *
      ),
      doctor:doctor_id (
        id,
        full_name,
        role,
        phone
      ),
      hair_analysis (
        *
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch consultation: ${error.message}`)
  }

  return data
}

export async function getTodayConsultations(doctorId?: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

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
    .gte('scheduled_date', today.toISOString())
    .lt('scheduled_date', tomorrow.toISOString())
    .order('scheduled_date', { ascending: true })

  if (doctorId) {
    query = query.eq('doctor_id', doctorId)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch today's consultations: ${error.message}`)
  }

  return data || []
}

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
    throw new Error(`Failed to fetch upcoming consultations: ${error.message}`)
  }

  return data || []
}