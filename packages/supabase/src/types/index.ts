// Database types for CureClinica system - Generated from Supabase
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
      consultations: {
        Row: {
          chief_complaint: string | null
          consultation_fee: number | null
          created_at: string | null
          diagnosis: string | null
          doctor_id: string
          duration_minutes: number | null
          examination_findings: string | null
          id: string
          next_appointment_recommendation: string | null
          notes: string | null
          patient_id: string
          scheduled_date: string
          status: string
          symptoms: string | null
          treatment_plan: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          chief_complaint?: string | null
          consultation_fee?: number | null
          created_at?: string | null
          diagnosis?: string | null
          doctor_id: string
          duration_minutes?: number | null
          examination_findings?: string | null
          id?: string
          next_appointment_recommendation?: string | null
          notes?: string | null
          patient_id: string
          scheduled_date: string
          status?: string
          symptoms?: string | null
          treatment_plan?: string | null
          type?: string
          updated_at?: string | null
        }
        Update: {
          chief_complaint?: string | null
          consultation_fee?: number | null
          created_at?: string | null
          diagnosis?: string | null
          doctor_id?: string
          duration_minutes?: number | null
          examination_findings?: string | null
          id?: string
          next_appointment_recommendation?: string | null
          notes?: string | null
          patient_id?: string
          scheduled_date?: string
          status?: string
          symptoms?: string | null
          treatment_plan?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultations_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      hair_analysis: {
        Row: {
          analysis_date: string
          analysis_type: string
          consultation_id: string | null
          created_at: string | null
          diagnosis: string | null
          follicular_findings: string | null
          hair_density_per_cm2: number | null
          hair_shaft_abnormalities: string | null
          hair_thickness_micrometers: number | null
          id: string
          inflammation_level: string | null
          ludwig_scale: number | null
          norwood_scale: number | null
          notes: string | null
          patient_id: string
          performed_by: string
          perifollicular_changes: string | null
          prognosis: string | null
          pull_test_hair_count: number | null
          pull_test_positive: boolean | null
          recommendations: string | null
          salt_score: number | null
          scalp_condition_assessment: string | null
          sebum_production: string | null
          severity: string | null
          terminal_to_vellus_ratio: number | null
          updated_at: string | null
        }
        Insert: {
          analysis_date?: string
          analysis_type: string
          consultation_id?: string | null
          created_at?: string | null
          diagnosis?: string | null
          follicular_findings?: string | null
          hair_density_per_cm2?: number | null
          hair_shaft_abnormalities?: string | null
          hair_thickness_micrometers?: number | null
          id?: string
          inflammation_level?: string | null
          ludwig_scale?: number | null
          norwood_scale?: number | null
          notes?: string | null
          patient_id: string
          performed_by: string
          perifollicular_changes?: string | null
          prognosis?: string | null
          pull_test_hair_count?: number | null
          pull_test_positive?: boolean | null
          recommendations?: string | null
          salt_score?: number | null
          scalp_condition_assessment?: string | null
          sebum_production?: string | null
          severity?: string | null
          terminal_to_vellus_ratio?: number | null
          updated_at?: string | null
        }
        Update: {
          analysis_date?: string
          analysis_type?: string
          consultation_id?: string | null
          created_at?: string | null
          diagnosis?: string | null
          follicular_findings?: string | null
          hair_density_per_cm2?: number | null
          hair_shaft_abnormalities?: string | null
          hair_thickness_micrometers?: number | null
          id?: string
          inflammation_level?: string | null
          ludwig_scale?: number | null
          norwood_scale?: number | null
          notes?: string | null
          patient_id?: string
          performed_by?: string
          perifollicular_changes?: string | null
          prognosis?: string | null
          pull_test_hair_count?: number | null
          pull_test_positive?: boolean | null
          recommendations?: string | null
          salt_score?: number | null
          scalp_condition_assessment?: string | null
          sebum_production?: string | null
          severity?: string | null
          terminal_to_vellus_ratio?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hair_analysis_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hair_analysis_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hair_analysis_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      hair_photos: {
        Row: {
          annotations: Json | null
          camera_settings: Json | null
          comparison_baseline: boolean | null
          consultation_id: string | null
          created_at: string | null
          description: string | null
          hair_analysis_id: string | null
          id: string
          is_public: boolean | null
          lighting_conditions: string | null
          measurements: Json | null
          patient_id: string
          photo_type: string
          photo_url: string
          tags: string[] | null
          taken_by: string | null
          taken_date: string
          updated_at: string | null
          view_angle: string | null
        }
        Insert: {
          annotations?: Json | null
          camera_settings?: Json | null
          comparison_baseline?: boolean | null
          consultation_id?: string | null
          created_at?: string | null
          description?: string | null
          hair_analysis_id?: string | null
          id?: string
          is_public?: boolean | null
          lighting_conditions?: string | null
          measurements?: Json | null
          patient_id: string
          photo_type: string
          photo_url: string
          tags?: string[] | null
          taken_by?: string | null
          taken_date?: string
          updated_at?: string | null
          view_angle?: string | null
        }
        Update: {
          annotations?: Json | null
          camera_settings?: Json | null
          comparison_baseline?: boolean | null
          consultation_id?: string | null
          created_at?: string | null
          description?: string | null
          hair_analysis_id?: string | null
          id?: string
          is_public?: boolean | null
          lighting_conditions?: string | null
          measurements?: Json | null
          patient_id?: string
          photo_type?: string
          photo_url?: string
          tags?: string[] | null
          taken_by?: string | null
          taken_date?: string
          updated_at?: string | null
          view_angle?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hair_photos_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hair_photos_hair_analysis_id_fkey"
            columns: ["hair_analysis_id"]
            isOneToOne: false
            referencedRelation: "hair_analysis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hair_photos_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hair_photos_taken_by_fkey"
            columns: ["taken_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          allergies: string | null
          city: string | null
          created_at: string | null
          created_by: string | null
          current_medications: string | null
          date_of_birth: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          family_history_hair_loss: boolean | null
          first_name: string
          gender: string | null
          hair_loss_duration: string | null
          hair_loss_pattern: string | null
          hair_type: string | null
          id: string
          is_active: boolean | null
          last_name: string
          medical_history: string | null
          phone: string | null
          preferred_contact_method: string | null
          previous_treatments: string | null
          scalp_condition: string | null
          state: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          allergies?: string | null
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          current_medications?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          family_history_hair_loss?: boolean | null
          first_name: string
          gender?: string | null
          hair_loss_duration?: string | null
          hair_loss_pattern?: string | null
          hair_type?: string | null
          id?: string
          is_active?: boolean | null
          last_name: string
          medical_history?: string | null
          phone?: string | null
          preferred_contact_method?: string | null
          previous_treatments?: string | null
          scalp_condition?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          allergies?: string | null
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          current_medications?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          family_history_hair_loss?: boolean | null
          first_name?: string
          gender?: string | null
          hair_loss_duration?: string | null
          hair_loss_pattern?: string | null
          hair_type?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string
          medical_history?: string | null
          phone?: string | null
          preferred_contact_method?: string | null
          previous_treatments?: string | null
          scalp_condition?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          consultation_id: string | null
          created_at: string | null
          created_by: string | null
          currency: string | null
          description: string | null
          due_date: string | null
          id: string
          notes: string | null
          patient_id: string
          payment_date: string
          payment_method: string
          payment_type: string
          status: string
          transaction_id: string | null
          treatment_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          consultation_id?: string | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          payment_date?: string
          payment_method: string
          payment_type: string
          status?: string
          transaction_id?: string | null
          treatment_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          consultation_id?: string | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          payment_date?: string
          payment_method?: string
          payment_type?: string
          status?: string
          transaction_id?: string | null
          treatment_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_treatment_id_fkey"
            columns: ["treatment_id"]
            isOneToOne: false
            referencedRelation: "treatments"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          consultation_id: string | null
          created_at: string | null
          dispensed_by: string | null
          dispensed_date: string | null
          dosage: string | null
          duration_days: number | null
          frequency: string | null
          id: string
          instructions: string | null
          patient_id: string
          prescribed_by: string
          product_id: string
          quantity: number
          status: string
          treatment_id: string | null
          updated_at: string | null
        }
        Insert: {
          consultation_id?: string | null
          created_at?: string | null
          dispensed_by?: string | null
          dispensed_date?: string | null
          dosage?: string | null
          duration_days?: number | null
          frequency?: string | null
          id?: string
          instructions?: string | null
          patient_id: string
          prescribed_by: string
          product_id: string
          quantity: number
          status?: string
          treatment_id?: string | null
          updated_at?: string | null
        }
        Update: {
          consultation_id?: string | null
          created_at?: string | null
          dispensed_by?: string | null
          dispensed_date?: string | null
          dosage?: string | null
          duration_days?: number | null
          frequency?: string | null
          id?: string
          instructions?: string | null
          patient_id?: string
          prescribed_by?: string
          product_id?: string
          quantity?: number
          status?: string
          treatment_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_dispensed_by_fkey"
            columns: ["dispensed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_prescribed_by_fkey"
            columns: ["prescribed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_treatment_id_fkey"
            columns: ["treatment_id"]
            isOneToOne: false
            referencedRelation: "treatments"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand: string | null
          category: string
          contraindications: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          id: string
          ingredients: string | null
          is_active: boolean | null
          minimum_stock: number | null
          name: string
          price: number | null
          requires_prescription: boolean | null
          stock_quantity: number | null
          updated_at: string | null
          usage_instructions: string | null
        }
        Insert: {
          brand?: string | null
          category: string
          contraindications?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          ingredients?: string | null
          is_active?: boolean | null
          minimum_stock?: number | null
          name: string
          price?: number | null
          requires_prescription?: boolean | null
          stock_quantity?: number | null
          updated_at?: string | null
          usage_instructions?: string | null
        }
        Update: {
          brand?: string | null
          category?: string
          contraindications?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          ingredients?: string | null
          is_active?: boolean | null
          minimum_stock?: number | null
          name?: string
          price?: number | null
          requires_prescription?: boolean | null
          stock_quantity?: number | null
          updated_at?: string | null
          usage_instructions?: string | null
        }
        Relationships: []
      }
      treatment_sessions: {
        Row: {
          created_at: string | null
          duration_minutes: number | null
          id: string
          improvement_level: string | null
          next_session_date: string | null
          next_session_notes: string | null
          patient_id: string
          patient_response: string | null
          performed_by: string
          photos_taken: boolean | null
          session_date: string
          session_notes: string | null
          session_number: number
          side_effects_observed: string | null
          treatment_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          improvement_level?: string | null
          next_session_date?: string | null
          next_session_notes?: string | null
          patient_id: string
          patient_response?: string | null
          performed_by: string
          photos_taken?: boolean | null
          session_date: string
          session_notes?: string | null
          session_number: number
          side_effects_observed?: string | null
          treatment_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          improvement_level?: string | null
          next_session_date?: string | null
          next_session_notes?: string | null
          patient_id?: string
          patient_response?: string | null
          performed_by?: string
          photos_taken?: boolean | null
          session_date?: string
          session_notes?: string | null
          session_number?: number
          side_effects_observed?: string | null
          treatment_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "treatment_sessions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treatment_sessions_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treatment_sessions_treatment_id_fkey"
            columns: ["treatment_id"]
            isOneToOne: false
            referencedRelation: "treatments"
            referencedColumns: ["id"]
          },
        ]
      }
      treatments: {
        Row: {
          consultation_id: string | null
          contraindications: string | null
          cost_per_session: number | null
          created_at: string | null
          dosage: string | null
          duration_days: number | null
          end_date: string | null
          expected_results: string | null
          frequency: string | null
          id: string
          instructions: string | null
          notes: string | null
          patient_compliance: string | null
          patient_id: string
          prescribed_by: string
          side_effects_warnings: string | null
          start_date: string
          status: string
          total_cost: number | null
          total_sessions: number | null
          treatment_name: string
          treatment_type: string
          updated_at: string | null
        }
        Insert: {
          consultation_id?: string | null
          contraindications?: string | null
          cost_per_session?: number | null
          created_at?: string | null
          dosage?: string | null
          duration_days?: number | null
          end_date?: string | null
          expected_results?: string | null
          frequency?: string | null
          id?: string
          instructions?: string | null
          notes?: string | null
          patient_compliance?: string | null
          patient_id: string
          prescribed_by: string
          side_effects_warnings?: string | null
          start_date: string
          status?: string
          total_cost?: number | null
          total_sessions?: number | null
          treatment_name: string
          treatment_type: string
          updated_at?: string | null
        }
        Update: {
          consultation_id?: string | null
          contraindications?: string | null
          cost_per_session?: number | null
          created_at?: string | null
          dosage?: string | null
          duration_days?: number | null
          end_date?: string | null
          expected_results?: string | null
          frequency?: string | null
          id?: string
          instructions?: string | null
          notes?: string | null
          patient_compliance?: string | null
          patient_id?: string
          prescribed_by?: string
          side_effects_warnings?: string | null
          start_date?: string
          status?: string
          total_cost?: number | null
          total_sessions?: number | null
          treatment_name?: string
          treatment_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "treatments_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treatments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treatments_prescribed_by_fkey"
            columns: ["prescribed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          phone: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          is_active?: boolean | null
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

// Helper types for the application
export type User = Tables<'users'>
export type Patient = Tables<'patients'>
export type Consultation = Tables<'consultations'>
export type HairAnalysis = Tables<'hair_analysis'>
export type HairPhoto = Tables<'hair_photos'>
export type Treatment = Tables<'treatments'>
export type TreatmentSession = Tables<'treatment_sessions'>
export type Product = Tables<'products'>
export type Prescription = Tables<'prescriptions'>
export type Payment = Tables<'payments'>

export const Constants = {
  public: {
    Enums: {},
  },
} as const
