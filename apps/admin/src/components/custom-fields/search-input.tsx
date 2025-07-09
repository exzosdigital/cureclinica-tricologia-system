'use client'

import { useState, useEffect } from 'react'
import { useI18n } from '@/i18n/client'
import { useSearchFilter } from '@/hooks/use-custom-fields-params'
import { Search } from 'lucide-react'

export function SearchInput() {
  const t = useI18n()
  const [search, setSearch] = useSearchFilter()
  
  // Estado local para controlar o input antes de atualizar o URL
  // Isso evita muitas atualizações de URL durante a digitação
  const [inputValue, setInputValue] = useState(search)
  
  // Atualizar o estado local quando o parâmetro de URL mudar
  useEffect(() => {
    setInputValue(search)
  }, [search])
  
  // Manipular mudanças no input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  
  // Atualizar o parâmetro de URL após um delay para evitar muitas atualizações
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue !== search) {
        setSearch(inputValue, { history: 'push' })
      }
    }, 500) // Delay de 500ms
    
    return () => clearTimeout(timeoutId)
  }, [inputValue, search, setSearch])
  
  // Manipular o submit do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(inputValue, { history: 'push' })
  }
  
  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={t('customFields.search.placeholder')}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </form>
  )
}
