'use server'

import { createClient } from '../clients/server'
import { revalidatePath } from 'next/cache'
import type { TablesInsert, TablesUpdate } from '../types'

export async function createHairAnalysis(analysis: TablesInsert<'hair_analysis'>) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('hair_analysis')
    .insert({
      ...analysis,
      performed_by: user.id,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create hair analysis: ${error.message}`)
  }

  revalidatePath('/dashboard/hair-analysis')
  revalidatePath(`/dashboard/patients/${analysis.patient_id}`)
  return data
}

export async function updateHairAnalysis(
  id: string,
  updates: TablesUpdate<'hair_analysis'>
) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('hair_analysis')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update hair analysis: ${error.message}`)
  }

  revalidatePath('/dashboard/hair-analysis')
  revalidatePath(`/dashboard/hair-analysis/${id}`)
  return data
}

export async function deleteHairAnalysis(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('hair_analysis')
    .delete()
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to delete hair analysis: ${error.message}`)
  }

  revalidatePath('/dashboard/hair-analysis')
  return data
}

export async function createHairPhoto(photo: {
  patient_id: string
  analysis_id?: string
  consultation_id?: string
  photo_url: string
  photo_type: string
  photo_category?: string
  description?: string
  hair_count?: number
  affected_area_percentage?: number
}) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('hair_photos')
    .insert({
      ...photo,
      uploaded_by: user.id,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create hair photo: ${error.message}`)
  }

  revalidatePath('/dashboard/hair-analysis')
  revalidatePath(`/dashboard/patients/${photo.patient_id}`)
  return data
}

export async function deleteHairPhoto(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('hair_photos')
    .delete()
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to delete hair photo: ${error.message}`)
  }

  revalidatePath('/dashboard/hair-analysis')
  return data
}