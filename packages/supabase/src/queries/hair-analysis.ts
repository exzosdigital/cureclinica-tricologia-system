import { createClient } from '../clients/server'
import type { HairAnalysis } from '../types'

export async function getHairAnalyses({
  patientId,
  performedBy,
  limit = 50,
  offset = 0,
}: {
  patientId?: string
  performedBy?: string
  limit?: number
  offset?: number
} = {}) {
  const supabase = createClient()
  
  let query = supabase
    .from('hair_analysis')
    .select(`
      *,
      patient:patient_id (
        first_name,
        last_name,
        phone
      ),
      performed_by_user:performed_by (
        full_name,
        role
      ),
      consultation:consultation_id (
        scheduled_at,
        reason
      )
    `)
    .order('created_at', { ascending: false })

  if (patientId) {
    query = query.eq('patient_id', patientId)
  }

  if (performedBy) {
    query = query.eq('performed_by', performedBy)
  }

  const { data, error } = await query
    .range(offset, offset + limit - 1)
    .limit(limit)

  if (error) {
    throw new Error(`Failed to fetch hair analyses: ${error.message}`)
  }

  return data || []
}

export async function getHairAnalysisById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('hair_analysis')
    .select(`
      *,
      patient:patient_id (
        *
      ),
      performed_by_user:performed_by (
        full_name,
        role
      ),
      consultation:consultation_id (
        *
      ),
      hair_photos (
        *
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch hair analysis: ${error.message}`)
  }

  return data
}

export async function getPatientHairAnalysisHistory(patientId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('hair_analysis')
    .select(`
      *,
      performed_by_user:performed_by (
        full_name
      ),
      hair_photos!inner (
        id,
        photo_url,
        photo_type,
        taken_at
      )
    `)
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch hair analysis history: ${error.message}`)
  }

  return data || []
}

export async function getHairAnalysisStats() {
  const supabase = createClient()

  // Get total analyses count
  const { count: totalAnalyses } = await supabase
    .from('hair_analysis')
    .select('*', { count: 'exact', head: true })

  // Get analyses this month
  const thisMonth = new Date()
  thisMonth.setDate(1)
  thisMonth.setHours(0, 0, 0, 0)
  
  const { count: thisMonthAnalyses } = await supabase
    .from('hair_analysis')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', thisMonth.toISOString())

  // Get hair loss cases
  const { count: hairLossCases } = await supabase
    .from('hair_analysis')
    .select('*', { count: 'exact', head: true })
    .eq('hair_loss', true)

  return {
    totalAnalyses: totalAnalyses || 0,
    thisMonthAnalyses: thisMonthAnalyses || 0,
    hairLossCases: hairLossCases || 0,
  }
}