'use client'

import { useI18n } from '../../i18n/client'
import { CustomField, EntityType, FieldType } from './types'
import { EntityFilters } from './filters/entity-filters'
import { SearchInput } from './search/search-input'
import { CustomFieldsTable } from './table/custom-fields-table'
import { Pagination } from './pagination/pagination'
import { useCustomFieldsState } from './hooks/use-custom-fields-state'

// Mock de dados para demonstração
const mockFields: CustomField[] = Array.from({ length: 30 }).map((_, index) => ({
  id: `field-${index + 1}`,
  name: `Campo ${index + 1}`,
  type: ['text', 'number', 'select', 'date', 'boolean'][Math.floor(Math.random() * 5)] as FieldType,
  entity: ['patient', 'appointment', 'treatment', 'hairAnalysis'][Math.floor(Math.random() * 4)] as EntityType,
  required: Math.random() > 0.5,
  createdAt: new Date(Date.now() - Math.random() * 10000000000),
  updatedAt: new Date(Date.now() - Math.random() * 5000000000),
  // Campos opcionais para demonstração
  ...(Math.random() > 0.7 ? { options: ['Opção 1', 'Opção 2', 'Opção 3'] } : {}),
  ...(Math.random() > 0.7 ? { defaultValue: 'Valor padrão' } : {}),
}))

export function CustomFieldsContainer() {
  const t = useI18n()
  
  // Usar o hook para gerenciar estado via URL
  const {
    page,
    entity: entityFilter,
    search: searchTerm,
    handlePageChange,
    handleEntityChange,
    handleSearchChange
  } = useCustomFieldsState()
  
  // Filtragem dos campos
  const filteredFields = mockFields.filter(field => {
    if (entityFilter !== 'all' && field.entity !== entityFilter) {
      return false
    }
    
    if (searchTerm && !field.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    
    return true
  })
  
  // Paginação
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredFields.length / itemsPerPage)
  const paginatedFields = filteredFields.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )
  
  // Maps para tradução
  const typeMap: Record<FieldType, string> = {
    text: t('customFields.fieldTypes.text', { count: 1 }),
    number: t('customFields.fieldTypes.number', { count: 1 }),
    date: t('customFields.fieldTypes.date', { count: 1 }),
    select: t('customFields.fieldTypes.select', { count: 1 }),
    checkbox: t('customFields.fieldTypes.checkbox', { count: 1 }),
    textarea: t('customFields.fieldTypes.textarea', { count: 1 }),
    boolean: t('customFields.fieldTypes.boolean', { count: 1 }),
  }
  
  const entityMap: Record<EntityType, string> = {
    patient: t('customFields.entities.patient', { count: 1 }),
    appointment: t('customFields.entities.appointment', { count: 1 }),
    treatment: t('customFields.entities.treatment', { count: 1 }),
    hairAnalysis: t('customFields.entities.hairAnalysis', { count: 1 }),
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-full sm:w-1/3">
          <SearchInput 
            value={searchTerm} 
            onSearch={handleSearchChange} 
            placeholder={t('customFields.search.placeholder', { count: 1 })} 
          />
        </div>
        <EntityFilters 
          activeFilter={entityFilter} 
          onFilterChange={handleEntityChange} 
        />
      </div>
      
      {filteredFields.length > 0 ? (
        <>
          <CustomFieldsTable 
            fields={paginatedFields} 
            typeMap={typeMap}
            entityMap={entityMap}
            onDeleteField={(id) => console.log('Delete field', id)}
          />
          
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center py-10 border rounded-md">
          <p className="text-lg font-medium text-gray-500">
            {t('customFields.noFieldsFound', { count: 1 })}
          </p>
        </div>
      )}
    </div>
  )
}
