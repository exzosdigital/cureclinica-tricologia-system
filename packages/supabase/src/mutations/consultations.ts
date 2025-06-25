'use server'

import { createClient } from '../clients/server'
import { revalidatePath } from 'next/cache'
import type { TablesInsert, TablesUpdate } from '../types'

export async function createConsultation(consultation: TablesInsert<'consultations'>) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('consultations')
    .insert(consultation)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create consultation: ${error.message}`)
  }

  revalidatePath('/dashboard/schedule')
  revalidatePath('/dashboard/consultations')
  return data
}

export async function updateConsultation(
  id: string,
  updates: TablesUpdate<'consultations'>
) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('consultations')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update consultation: ${error.message}`)
  }

  revalidatePath('/dashboard/schedule')
  revalidatePath('/dashboard/consultations')
  revalidatePath(`/dashboard/consultations/${id}`)
  return data
}

export async function updateConsultationStatus(
  id: string,
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('consultations')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update consultation status: ${error.message}`)
  }

  revalidatePath('/dashboard/schedule')
  revalidatePath('/dashboard/consultations')
  return data
}

export async function cancelConsultation(id: string, reason?: string) {
  const supabase = createClient()

  const updates: TablesUpdate<'consultations'> = {
    status: 'cancelled',
  }

  if (reason) {
    updates.notes = reason
  }

  const { data, error } = await supabase
    .from('consultations')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to cancel consultation: ${error.message}`)
  }

  revalidatePath('/dashboard/schedule')
  revalidatePath('/dashboard/consultations')
  return data
}

export async function rescheduleConsultation(
  id: string,
  newDateTime: string
) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('consultations')
    .update({
      scheduled_at: newDateTime,
      status: 'scheduled',
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to reschedule consultation: ${error.message}`)
  }

  revalidatePath('/dashboard/schedule')
  revalidatePath('/dashboard/consultations')
  return data
}