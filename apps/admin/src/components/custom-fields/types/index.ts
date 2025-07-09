export type FieldType = 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'textarea' | 'boolean'

export type EntityType = 'patient' | 'appointment' | 'treatment' | 'hairAnalysis'

export interface CustomField {
  id: string
  name: string
  entity: EntityType
  type: FieldType
  required: boolean
  options?: string[]
  defaultValue?: string
  createdAt: Date
  updatedAt: Date
}
