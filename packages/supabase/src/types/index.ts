// Database types for CureClinica system
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'admin' | 'doctor' | 'receptionist' | 'staff'
          phone: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'doctor' | 'receptionist' | 'staff'
          phone?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'doctor' | 'receptionist' | 'staff'
          phone?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string
          date_of_birth: string | null
          gender: 'male' | 'female' | 'other' | null
          cpf: string | null
          rg: string | null
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          medical_history: string | null
          allergies: string | null
          medications: string | null
          notes: string | null
          is_active: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email?: string | null
          phone: string
          date_of_birth?: string | null
          gender?: 'male' | 'female' | 'other' | null
          cpf?: string | null
          rg?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          medical_history?: string | null
          allergies?: string | null
          medications?: string | null
          notes?: string | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string
          date_of_birth?: string | null
          gender?: 'male' | 'female' | 'other' | null
          cpf?: string | null
          rg?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          medical_history?: string | null
          allergies?: string | null
          medications?: string | null
          notes?: string | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      consultations: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string
          scheduled_at: string
          duration: number
          status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
          reason: string | null
          chief_complaint: string | null
          symptoms: string | null
          examination_findings: string | null
          diagnosis: string | null
          treatment_plan: string | null
          recommendations: string | null
          follow_up_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id: string
          scheduled_at: string
          duration?: number
          status?: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
          reason?: string | null
          chief_complaint?: string | null
          symptoms?: string | null
          examination_findings?: string | null
          diagnosis?: string | null
          treatment_plan?: string | null
          recommendations?: string | null
          follow_up_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string
          scheduled_at?: string
          duration?: number
          status?: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
          reason?: string | null
          chief_complaint?: string | null
          symptoms?: string | null
          examination_findings?: string | null
          diagnosis?: string | null
          treatment_plan?: string | null
          recommendations?: string | null
          follow_up_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      hair_analysis: {
        Row: {
          id: string
          patient_id: string
          consultation_id: string | null
          performed_by: string
          hair_type: 'straight' | 'wavy' | 'curly' | 'coily' | null
          hair_thickness: 'fine' | 'medium' | 'thick' | null
          hair_density: 'low' | 'medium' | 'high' | null
          scalp_condition: 'normal' | 'dry' | 'oily' | 'sensitive' | 'irritated' | null
          hair_loss: boolean
          hair_loss_pattern: string | null
          hair_loss_severity: number | null
          scalp_sensitivity: number | null
          oiliness_level: number | null
          dryness_level: number | null
          dandruff_present: boolean
          seborrheic_dermatitis: boolean
          psoriasis: boolean
          folliculitis: boolean
          previous_treatments: string | null
          current_products: string | null
          chemical_treatments: string | null
          heat_styling_frequency: string | null
          ludwig_scale: number | null
          norwood_scale: number | null
          salt_score: number | null
          microscopy_findings: string | null
          trichoscopy_findings: string | null
          pull_test_result: string | null
          clinical_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          consultation_id?: string | null
          performed_by: string
          hair_type?: 'straight' | 'wavy' | 'curly' | 'coily' | null
          hair_thickness?: 'fine' | 'medium' | 'thick' | null
          hair_density?: 'low' | 'medium' | 'high' | null
          scalp_condition?: 'normal' | 'dry' | 'oily' | 'sensitive' | 'irritated' | null
          hair_loss?: boolean
          hair_loss_pattern?: string | null
          hair_loss_severity?: number | null
          scalp_sensitivity?: number | null
          oiliness_level?: number | null
          dryness_level?: number | null
          dandruff_present?: boolean
          seborrheic_dermatitis?: boolean
          psoriasis?: boolean
          folliculitis?: boolean
          previous_treatments?: string | null
          current_products?: string | null
          chemical_treatments?: string | null
          heat_styling_frequency?: string | null
          ludwig_scale?: number | null
          norwood_scale?: number | null
          salt_score?: number | null
          microscopy_findings?: string | null
          trichoscopy_findings?: string | null
          pull_test_result?: string | null
          clinical_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          consultation_id?: string | null
          performed_by?: string
          hair_type?: 'straight' | 'wavy' | 'curly' | 'coily' | null
          hair_thickness?: 'fine' | 'medium' | 'thick' | null
          hair_density?: 'low' | 'medium' | 'high' | null
          scalp_condition?: 'normal' | 'dry' | 'oily' | 'sensitive' | 'irritated' | null
          hair_loss?: boolean
          hair_loss_pattern?: string | null
          hair_loss_severity?: number | null
          scalp_sensitivity?: number | null
          oiliness_level?: number | null
          dryness_level?: number | null
          dandruff_present?: boolean
          seborrheic_dermatitis?: boolean
          psoriasis?: boolean
          folliculitis?: boolean
          previous_treatments?: string | null
          current_products?: string | null
          chemical_treatments?: string | null
          heat_styling_frequency?: string | null
          ludwig_scale?: number | null
          norwood_scale?: number | null
          salt_score?: number | null
          microscopy_findings?: string | null
          trichoscopy_findings?: string | null
          pull_test_result?: string | null
          clinical_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'admin' | 'doctor' | 'receptionist' | 'staff'
      gender_type: 'male' | 'female' | 'other'
      hair_type: 'straight' | 'wavy' | 'curly' | 'coily'
      hair_thickness: 'fine' | 'medium' | 'thick'
      hair_density: 'low' | 'medium' | 'high'
      scalp_condition: 'normal' | 'dry' | 'oily' | 'sensitive' | 'irritated'
      consultation_status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
      treatment_status: 'active' | 'completed' | 'suspended' | 'cancelled'
      payment_status: 'pending' | 'paid' | 'overdue' | 'cancelled'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Utility types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Specific types for our application
export type User = Tables<'users'>
export type Patient = Tables<'patients'>
export type Consultation = Tables<'consultations'>
export type HairAnalysis = Tables<'hair_analysis'>

export type UserRole = Enums<'user_role'>
export type GenderType = Enums<'gender_type'>
export type HairType = Enums<'hair_type'>
export type HairThickness = Enums<'hair_thickness'>
export type HairDensity = Enums<'hair_density'>
export type ScalpCondition = Enums<'scalp_condition'>
export type ConsultationStatus = Enums<'consultation_status'>
export type TreatmentStatus = Enums<'treatment_status'>
export type PaymentStatus = Enums<'payment_status'>