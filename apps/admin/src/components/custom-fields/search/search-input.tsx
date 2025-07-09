import { useI18n } from '@/i18n/client'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SearchInputProps {
  value: string
  onSearch: (value: string) => void
  placeholder?: string
}

export function SearchInput({ value, onSearch, placeholder }: SearchInputProps) {
  const t = useI18n()
  const [searchTerm, setSearchTerm] = useState(value || '')
  
  // Sincroniza estado interno com prop externa
  useEffect(() => {
    setSearchTerm(value || '')
  }, [value])
  
  // Debounce de busca (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== value) {
        onSearch(searchTerm)
      }
    }, 300)
    
    return () => clearTimeout(timer)
  }, [searchTerm, onSearch, value])
  
  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <Search size={16} className="text-gray-400" />
      </div>
      
      <input
        type="search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2"
        placeholder={placeholder || t('customFields.search.placeholder', { count: 1 })}
      />
    </div>
  )
}
