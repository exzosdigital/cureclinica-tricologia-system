'use server'

import { createClient, createServiceClient } from '../clients/server'
import { revalidatePath } from 'next/cache'
import type { TablesInsert, TablesUpdate } from '../types'

export async function updateUserProfile(
  id: string,
  updates: TablesUpdate<'users'>
) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user || user.id !== id) {
    throw new Error('Unauthorized to update this profile')
  }

  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update user profile: ${error.message}`)
  }

  revalidatePath('/dashboard/profile')
  return data
}

export async function updateUserRole(
  userId: string,
  role: 'admin' | 'doctor' | 'receptionist' | 'staff'
) {
  const supabase = createClient()
  
  // Check if current user is admin
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data: currentUser } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!currentUser || currentUser.role !== 'admin') {
    throw new Error('Only admins can update user roles')
  }

  const { data, error } = await supabase
    .from('users')
    .update({ role })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update user role: ${error.message}`)
  }

  revalidatePath('/dashboard/users')
  return data
}

export async function deactivateUser(userId: string) {
  const supabase = createClient()
  
  // Check if current user is admin
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data: currentUser } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!currentUser || currentUser.role !== 'admin') {
    throw new Error('Only admins can deactivate users')
  }

  const { data, error } = await supabase
    .from('users')
    .update({ is_active: false })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to deactivate user: ${error.message}`)
  }

  revalidatePath('/dashboard/users')
  return data
}

export async function activateUser(userId: string) {
  const supabase = createClient()
  
  // Check if current user is admin
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data: currentUser } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!currentUser || currentUser.role !== 'admin') {
    throw new Error('Only admins can activate users')
  }

  const { data, error } = await supabase
    .from('users')
    .update({ is_active: true })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to activate user: ${error.message}`)
  }

  revalidatePath('/dashboard/users')
  return data
}