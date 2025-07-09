import { useI18n } from '@/i18n/client'
import { FileText, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { CustomField, EntityType, FieldType } from '../types'

interface CustomFieldsTableProps {
  fields: CustomField[]
  typeMap?: Record<FieldType, string>
  entityMap?: Record<EntityType, string>
  onDeleteField?: (id: string) => void
}

export function CustomFieldsTable({ 
  fields, 
  typeMap, 
  entityMap, 
  onDeleteField 
}: CustomFieldsTableProps) {
  const t = useI18n()
  const [currentSortColumn, setCurrentSortColumn] = useState('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  
  // Map para traduzir tipos de campos
  const getFieldTypeText = (type: FieldType) => {
    // Use o typeMap passado como prop ou use as traduções locais como fallback
    if (typeMap && type in typeMap) {
      return typeMap[type]
    }
    
    // Fallback para tradução padrão
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
    
    // Fallback para tradução padrão
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
  
  const handleSort = (column: string) => {
    setCurrentSortColumn(column)
    setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc')
  }
  
  if (fields.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md">
        <p className="text-lg font-medium text-gray-500">
          {t('customFields.noFields', { count: 1 })}
        </p>
      </div>
    )
  }
  
  return (
    <div className="overflow-x-auto rounded-lg border">
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
          {fields.map(field => (
            <tr key={field.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{field.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{getEntityText(field.entity)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{getFieldTypeText(field.type)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">
                  {field.required ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {t('common.yes', { count: 1 })}
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {t('common.no', { count: 1 })}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {new Date(field.updatedAt).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                <div className="flex items-center justify-end space-x-3">
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
