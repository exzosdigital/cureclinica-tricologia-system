import { createClient } from '../clients/server'

export async function getSession() {
  const supabase = createClient()
  
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    throw new Error(`Failed to get session: ${error.message}`)
  }

  return session
}

export async function getUser() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    throw new Error(`Failed to get user: ${error.message}`)
  }

  return user
}

export async function getUserProfile() {
  const supabase = createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return null
  }

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError) {
    throw new Error(`Failed to get user profile: ${profileError.message}`)
  }

  return {
    ...user,
    profile
  }
}