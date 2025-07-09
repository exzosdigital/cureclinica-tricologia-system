'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@cureclinica/ui/input'
import { Button } from '@cureclinica/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@cureclinica/ui/select'
import { Search, Filter, X } from 'lucide-react'
import { useState } from 'react'

export function HairAnalysisFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '')

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    params.delete('page') // Reset to first page
    router.push(`/dashboard/hair-analysis?${params.toString()}`)
  }

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page') // Reset to first page
    router.push(`/dashboard/hair-analysis?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearchInput('')
    router.push('/dashboard/hair-analysis')
  }

  const hasActiveFilters = searchParams.toString() !== ''

  return (
    <div className="bg-white p-4 rounded-lg border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por paciente..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchInput)
              }
            }}
            className="pl-10"
          />
        </div>

        {/* Analysis Type Filter */}
        <Select
          value={searchParams.get('type') || 'all'}
          onValueChange={(value) => handleFilterChange('type', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tipo de Análise" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="tricoscopy">Tricoscopia</SelectItem>
            <SelectItem value="microscopy">Microscopia</SelectItem>
            <SelectItem value="pull_test">Pull Test</SelectItem>
            <SelectItem value="densitometry">Densitometria</SelectItem>
            <SelectItem value="phototrichogram">Fototricograma</SelectItem>
          </SelectContent>
        </Select>

        {/* Severity Filter */}
        <Select
          value={searchParams.get('severity') || 'all'}
          onValueChange={(value) => handleFilterChange('severity', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Gravidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as gravidades</SelectItem>
            <SelectItem value="mild">Leve</SelectItem>
            <SelectItem value="moderate">Moderada</SelectItem>
            <SelectItem value="severe">Grave</SelectItem>
            <SelectItem value="very_severe">Muito Grave</SelectItem>
          </SelectContent>
        </Select>

        {/* Ludwig Scale Filter */}
        <Select
          value={searchParams.get('ludwig') || 'all'}
          onValueChange={(value) => handleFilterChange('ludwig', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Escala Ludwig" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as escalas</SelectItem>
            <SelectItem value="1">Ludwig I</SelectItem>
            <SelectItem value="2">Ludwig II</SelectItem>
            <SelectItem value="3">Ludwig III</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="text-xs text-gray-500">
          {hasActiveFilters ? 'Filtros ativos aplicados' : 'Nenhum filtro aplicado'}
        </div>
        <Button
          size="sm"
          onClick={() => handleSearch(searchInput)}
          disabled={!searchInput}
        >
          <Search className="h-3 w-3 mr-1" />
          Buscar
        </Button>
      </div>
    </div>
  )
}