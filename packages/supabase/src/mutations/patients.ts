'use server'

import { createClient } from '../clients/server'
import { revalidatePath } from 'next/cache'
import type { TablesInsert, TablesUpdate } from '../types'

export async function createPatient(patient: TablesInsert<'patients'>) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('patients')
    .insert({
      ...patient,
      created_by: user.id,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create patient: ${error.message}`)
  }

  revalidatePath('/dashboard/patients')
  return data
}

export async function updatePatient(
  id: string,
  updates: TablesUpdate<'patients'>
) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('patients')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update patient: ${error.message}`)
  }

  revalidatePath('/dashboard/patients')
  revalidatePath(`/dashboard/patients/${id}`)
  return data
}

export async function deletePatient(id: string) {
  const supabase = createClient()

  // Soft delete by setting is_active to false
  const { data, error } = await supabase
    .from('patients')
    .update({ is_active: false })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to delete patient: ${error.message}`)
  }

  revalidatePath('/dashboard/patients')
  return data
}

export async function restorePatient(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('patients')
    .update({ is_active: true })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to restore patient: ${error.message}`)
  }

  revalidatePath('/dashboard/patients')
  return data
}