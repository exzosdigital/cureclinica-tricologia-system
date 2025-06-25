import { createClient } from '../clients/server'
import type { Patient, TablesInsert } from '../types'

export async function getPatients({
  search,
  limit = 50,
  offset = 0,
}: {
  search?: string
  limit?: number
  offset?: number
} = {}) {
  const supabase = createClient()
  
  let query = supabase
    .from('patients')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (search) {
    query = query.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
    )
  }

  const { data, error, count } = await query
    .range(offset, offset + limit - 1)
    .limit(limit)

  if (error) {
    throw new Error(`Failed to fetch patients: ${error.message}`)
  }

  return {
    data: data || [],
    count: count || 0,
  }
}

export async function getPatientById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch patient: ${error.message}`)
  }

  return data
}

export async function getPatientWithConsultations(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('patients')
    .select(`
      *,
      consultations (
        id,
        scheduled_at,
        status,
        reason,
        diagnosis,
        doctor:doctor_id (
          full_name,
          role
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch patient with consultations: ${error.message}`)
  }

  return data
}

export async function getPatientHairAnalyses(patientId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('hair_analysis')
    .select(`
      *,
      performed_by_user:performed_by (
        full_name,
        role
      ),
      consultation:consultation_id (
        scheduled_at,
        reason
      )
    `)
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch hair analyses: ${error.message}`)
  }

  return data || []
}

export async function searchPatients(query: string, limit = 10) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('patients')
    .select('id, first_name, last_name, phone, email')
    .eq('is_active', true)
    .or(
      `first_name.ilike.%${query}%,last_name.ilike.%${query}%,phone.ilike.%${query}%`
    )
    .limit(limit)

  if (error) {
    throw new Error(`Failed to search patients: ${error.message}`)
  }

  return data || []
}