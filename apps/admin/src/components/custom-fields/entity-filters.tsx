'use client'

import { useI18n } from '@/i18n/client'
import { useEntityFilter, usePage, useSearchFilter } from '@/hooks/use-custom-fields-params'

type EntityType = 'patient' | 'appointment' | 'treatment' | 'hairAnalysis' | 'all'

interface EntityFiltersProps {
  onFilterChange?: (entity: EntityType) => void
}

export function EntityFilters({ onFilterChange }: EntityFiltersProps) {
  const t = useI18n()
  
  // Usar parâmetros de URL individuais para gerenciar o estado dos filtros
  const [entity, setEntity] = useEntityFilter();
  const [, setPage] = usePage(); // Resetamos a página ao mudar a entidade
  const activeFilter = entity as EntityType; // Cast para o tipo EntityType
  
  const handleFilterChange = (entity: EntityType) => {
    // Atualizar a entidade nos parâmetros de URL
    setEntity(entity as string, { history: 'push' });
    // Resetar para página 1 quando mudar o filtro
    setPage(1, { history: 'push' });
    
    // Chamar o callback se fornecido
    if (onFilterChange) {
      onFilterChange(entity)
    }
  }
  
  return (
    <div className="border-b">
      <nav className="flex space-x-4" aria-label="Tabs">
        <button
          type="button"
          onClick={() => handleFilterChange('all' as EntityType)}
          className={`px-3 py-2 text-sm font-medium rounded-md ${activeFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {t('customFields.filters.all')}
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange('patient' as EntityType)}
          className={`px-3 py-2 text-sm font-medium rounded-md ${activeFilter === 'patient' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {t('customFields.filters.patient')}
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange('appointment' as EntityType)}
          className={`px-3 py-2 text-sm font-medium rounded-md ${activeFilter === 'appointment' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {t('customFields.filters.appointment')}
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange('treatment' as EntityType)}
          className={`px-3 py-2 text-sm font-medium rounded-md ${activeFilter === 'treatment' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {t('customFields.filters.treatment')}
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange('hairAnalysis' as EntityType)}
          className={`px-3 py-2 text-sm font-medium rounded-md ${activeFilter === 'hairAnalysis' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {t('customFields.filters.hairAnalysis')}
        </button>
      </nav>
    </div>
  )
}
