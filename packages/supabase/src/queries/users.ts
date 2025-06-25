import { createClient } from '../clients/server'
import type { User } from '../types'

export async function getUsers({
  role,
  isActive = true,
  limit = 50,
  offset = 0,
}: {
  role?: string
  isActive?: boolean
  limit?: number
  offset?: number
} = {}) {
  const supabase = createClient()
  
  let query = supabase
    .from('users')
    .select('*')
    .eq('is_active', isActive)
    .order('created_at', { ascending: false })

  if (role) {
    query = query.eq('role', role)
  }

  const { data, error } = await query
    .range(offset, offset + limit - 1)
    .limit(limit)

  if (error) {
    throw new Error(`Failed to fetch users: ${error.message}`)
  }

  return data || []
}

export async function getUserById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch user: ${error.message}`)
  }

  return data
}

export async function getDoctors() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('users')
    .select('id, full_name, email, phone')
    .eq('role', 'doctor')
    .eq('is_active', true)
    .order('full_name', { ascending: true })

  if (error) {
    throw new Error(`Failed to fetch doctors: ${error.message}`)
  }

  return data || []
}

export async function getCurrentUser() {
  const supabase = createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return null
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch current user: ${error.message}`)
  }

  return data
}

export async function getUserStats() {
  const supabase = createClient()

  // Get total users count
  const { count: totalUsers } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  // Get doctors count
  const { count: doctorsCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'doctor')
    .eq('is_active', true)

  // Get staff count
  const { count: staffCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .in('role', ['receptionist', 'staff'])
    .eq('is_active', true)

  return {
    totalUsers: totalUsers || 0,
    doctorsCount: doctorsCount || 0,
    staffCount: staffCount || 0,
  }
}