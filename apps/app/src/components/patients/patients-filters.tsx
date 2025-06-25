'use client'

import { useQueryState } from 'nuqs'
import { Input } from '@cureclinica/ui/input'
import { Select } from '@cureclinica/ui/select'
import { Button } from '@cureclinica/ui/button'
import { Card } from '@cureclinica/ui/card'
import { 
  Search, 
  Filter,
  X,
  RefreshCw
} from 'lucide-react'
import { useState } from 'react'

export function PatientsFilters() {
  const [search, setSearch] = useQueryState('search', { defaultValue: '' })
  const [status, setStatus] = useQueryState('status', { defaultValue: '' })
  const [gender, setGender] = useQueryState('gender', { defaultValue: '' })
  const [page, setPage] = useQueryState('page', { defaultValue: '1' })
  
  const [showFilters, setShowFilters] = useState(false)
  const [tempSearch, setTempSearch] = useState(search)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(tempSearch)
    setPage('1')
  }

  const clearFilters = () => {
    setSearch('')
    setStatus('')
    setGender('')
    setPage('1')
    setTempSearch('')
  }

  const hasActiveFilters = search || status || gender

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar por nome, email ou telefone..."
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button type="submit" variant="outline">
            <Search className="h-4 w-4" />
          </Button>
          
          <Button 
            type="button"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-blue-50 text-blue-600' : ''}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          
          {hasActiveFilters && (
            <Button 
              type="button"
              variant="outline"
              onClick={clearFilters}
            >
              <X className="h-4 w-4 mr-2" />
              Limpar
            </Button>
          )}
        </form>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value === 'all' ? '' : value)
                  setPage('1')
                }}
              >
                <option value="all">Todos</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gênero
              </label>
              <Select
                value={gender}
                onValueChange={(value) => {
                  setGender(value === 'all' ? '' : value)
                  setPage('1')
                }}
              >
                <option value="all">Todos</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="w-full"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
            </div>
          </div>
        )}
        
        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
            <span className="text-sm text-gray-600">Filtros ativos:</span>
            {search && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                Busca: "{search}"
                <button 
                  onClick={() => {
                    setSearch('')
                    setTempSearch('')
                    setPage('1')
                  }}
                  className="ml-1 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
            {status && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                Status: {status === 'active' ? 'Ativo' : 'Inativo'}
                <button 
                  onClick={() => {
                    setStatus('')
                    setPage('1')
                  }}
                  className="ml-1 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            )}
            {gender && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                Gênero: {gender === 'male' ? 'Masculino' : gender === 'female' ? 'Feminino' : 'Outro'}
                <button 
                  onClick={() => {
                    setGender('')
                    setPage('1')
                  }}
                  className="ml-1 hover:text-purple-600"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
