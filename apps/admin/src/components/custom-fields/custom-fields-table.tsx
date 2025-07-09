'use client'

import Link from 'next/link'
import { useI18n } from '@/i18n/client'
import { FileText, Trash2, Pencil } from 'lucide-react'
import { useState } from 'react'

export type EntityType = 'patient' | 'appointment' | 'treatment' | 'hairAnalysis'
export type FieldType = 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'textarea' | 'boolean'

interface CustomField {
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

interface CustomFieldsTableProps {
  fields: CustomField[]
  onDeleteField?: (id: string) => void
  typeMap?: Record<FieldType, string>
  entityMap?: Record<EntityType, string>
}

export function CustomFieldsTable({ fields, onDeleteField, typeMap, entityMap }: CustomFieldsTableProps) {
  const t = useI18n()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  // Map para traduzir tipos de campos
  const getFieldTypeText = (type: FieldType) => {
    // Use o typeMap passado como prop ou use as traduções locais como fallback
    if (typeMap && type in typeMap) {
      return typeMap[type]
    }
    
    switch (type) {
      case 'text': return t('customFields.fieldTypes.text', { count: 1 })
      case 'number': return t('customFields.fieldTypes.number', { count: 1 })
      case 'date': return t('customFields.fieldTypes.date', { count: 1 })
      case 'select': return t('customFields.fieldTypes.select', { count: 1 })
      case 'checkbox': return t('customFields.fieldTypes.checkbox', { count: 1 })
      case 'textarea': return t('customFields.fieldTypes.textarea', { count: 1 })
      default: return type
    }
  }
  
  // Map para traduzir entidades
  const getEntityText = (entity: EntityType) => {
    // Use o entityMap passado como prop ou use as traduções locais como fallback
    if (entityMap && entity in entityMap) {
      return entityMap[entity]
    }
    
    switch (entity) {
      case 'patient': return t('customFields.entities.patient', { count: 1 })
      case 'appointment': return t('customFields.entities.appointment', { count: 1 })
      case 'treatment': return t('customFields.entities.treatment', { count: 1 })
      case 'hairAnalysis': return t('customFields.entities.hairAnalysis', { count: 1 })
      default: return entity
    }
  }
  
  const handleDelete = (id: string) => {
    if (window.confirm(t('customFields.deleteConfirmation', { count: 1 }))) {
      if (onDeleteField) {
        onDeleteField(id)
      }
    }
  }
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('default', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date)
  }
  
  return (
    <div className="mt-8 overflow-hidden rounded-md border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('customFields.name', { count: 1 })}
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('customFields.entity', { count: 1 })}
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('customFields.type', { count: 1 })}
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('customFields.required', { count: 1 })}
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('customFields.lastUpdate', { count: 1 })}
            </th>
            <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('customFields.actions', { count: 1 })}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fields.map((field) => (
            <tr key={field.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{field.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{getEntityText(field.entity)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{getFieldTypeText(field.type)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {field.required ? '✓' : '—'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{formatDate(field.updatedAt)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex justify-center space-x-2">
                  <Link 
                    href={`/custom-fields/${field.id}/edit`}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                    aria-label={t('common.edit', { count: 1 })}
                  >
                    <Pencil size={16} />
                  </Link>
                  <Link 
                    href={`/custom-fields/${field.id}`}
                    className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                    aria-label={t('common.view', { count: 1 })}
                  >
                    <FileText size={16} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(field.id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                    aria-label={t('common.delete', { count: 1 })}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
