import { createClient } from '@supabase/supabase-js';

// Tipos para tabelas do Supabase
export interface Patient {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string | null;
  address: string | null;
  profile_image_url: string | null;
  status: 'active' | 'inactive';
  custom_fields: Record<string, any> | null;
}

export interface Treatment {
  id: string;
  created_at: string;
  patient_id: string;
  treatment_date: string;
  treatment_type: string;
  notes: string | null;
  images: string[] | null;
  status: 'scheduled' | 'completed' | 'cancelled';
  custom_data: Record<string, any> | null;
}

export interface Appointment {
  id: string;
  created_at: string;
  patient_id: string;
  scheduled_at: string;
  duration_minutes: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes: string | null;
  appointment_type: string;
}

// Cria o cliente Supabase
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Função para buscar pacientes
export async function getPatients(
  page = 1,
  pageSize = 10,
  search?: string,
  status?: 'active' | 'inactive'
) {
  try {
    let query = supabase
      .from('patients')
      .select('*', { count: 'exact' });
    
    // Filtrar por status se fornecido
    if (status) {
      query = query.eq('status', status);
    }
    
    // Filtrar por termo de busca se fornecido
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
    }
    
    // Paginação
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);
      
    if (error) throw error;
    
    return {
      data,
      count,
      page,
      pageSize,
      totalPages: count ? Math.ceil(count / pageSize) : 0
    };
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    return {
      data: [],
      count: 0,
      page,
      pageSize,
      totalPages: 0
    };
  }
}

// Função para buscar agendamentos
export async function getAppointments(
  page = 1,
  pageSize = 10,
  patientId?: string,
  startDate?: string,
  endDate?: string
) {
  try {
    let query = supabase
      .from('appointments')
      .select('*, patients!inner(name, email)', { count: 'exact' });
    
    // Filtrar por paciente se fornecido
    if (patientId) {
      query = query.eq('patient_id', patientId);
    }
    
    // Filtrar por intervalo de datas se fornecido
    if (startDate) {
      query = query.gte('scheduled_at', startDate);
    }
    if (endDate) {
      query = query.lte('scheduled_at', endDate);
    }
    
    // Paginação
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await query
      .order('scheduled_at', { ascending: true })
      .range(from, to);
      
    if (error) throw error;
    
    return {
      data,
      count,
      page,
      pageSize,
      totalPages: count ? Math.ceil(count / pageSize) : 0
    };
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return {
      data: [],
      count: 0,
      page,
      pageSize,
      totalPages: 0
    };
  }
}

// Função para integrar campos personalizados do Directus com pacientes do Supabase
export async function updatePatientCustomFields(patientId: string, customFields: Record<string, any>) {
  try {
    const { data, error } = await supabase
      .from('patients')
      .update({ custom_fields: customFields })
      .eq('id', patientId)
      .select();
      
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Erro ao atualizar campos personalizados do paciente:', error);
    throw error;
  }
}
