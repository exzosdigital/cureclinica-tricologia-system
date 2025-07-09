import { useQueryState } from 'nuqs'
import { useCallback } from 'react'
import { EntityType } from '../types'

export function useCustomFieldsState() {
  const [page, setPage] = useQueryState('page', {
    defaultValue: '1',
    parse: (value) => value,
  })
  
  const [entity, setEntity] = useQueryState('entity', {
    defaultValue: 'all',
    parse: (value) => value,
  })
  
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    parse: (value) => value,
  })
  
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage.toString())
  }, [setPage])
  
  const handleEntityChange = useCallback((newEntity: EntityType | 'all') => {
    setEntity(newEntity)
    setPage('1') // Reset para primeira página ao mudar filtro
  }, [setEntity, setPage])
  
  const handleSearchChange = useCallback((newSearch: string) => {
    setSearch(newSearch)
    setPage('1') // Reset para primeira página ao buscar
  }, [setSearch, setPage])
  
  return {
    page: parseInt(page, 10),
    entity,
    search,
    handlePageChange,
    handleEntityChange,
    handleSearchChange,
  }
}
