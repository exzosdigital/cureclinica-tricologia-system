import { useI18n } from '@/i18n/client'
import { EntityType } from '../types'

interface EntityFiltersProps {
  activeFilter: string
  onFilterChange?: (entity: EntityType | 'all') => void
}

export function EntityFilters({ activeFilter = 'all', onFilterChange }: EntityFiltersProps) {
  const t = useI18n()
  
  const handleFilterChange = (entity: EntityType | 'all') => {
    if (onFilterChange) {
      onFilterChange(entity)
    }
  }
  
  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium ${
          activeFilter === 'all' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => handleFilterChange('all')}
      >
        {t('customFields.filters.all', { count: 1 })}
      </button>
      
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium ${
          activeFilter === 'patient' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => handleFilterChange('patient')}
      >
        {t('customFields.entities.patient', { count: 1 })}
      </button>
      
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium ${
          activeFilter === 'appointment' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => handleFilterChange('appointment')}
      >
        {t('customFields.entities.appointment', { count: 1 })}
      </button>
      
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium ${
          activeFilter === 'treatment' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => handleFilterChange('treatment')}
      >
        {t('customFields.entities.treatment', { count: 1 })}
      </button>
      
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium ${
          activeFilter === 'hairAnalysis' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => handleFilterChange('hairAnalysis')}
      >
        {t('customFields.entities.hairAnalysis', { count: 1 })}
      </button>
    </div>
  )
}
