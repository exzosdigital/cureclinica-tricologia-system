'use client'

import { useCurrentLocale, useChangeLocale } from '@/i18n/client'
import { useRouter } from 'next/navigation'
import { Globe, Check } from 'lucide-react'

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
]

export default function LanguageSwitcher() {
  const currentLocale = useCurrentLocale()
  const changeLocale = useChangeLocale()
  const router = useRouter()

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1 p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Alterar idioma"
      >
        <Globe size={18} className="text-gray-600" />
        <span className="text-sm text-gray-600">{currentLocale.toUpperCase()}</span>
      </button>
      
      <div className="absolute right-0 mt-1 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <div className="py-1">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${
                currentLocale === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => {
                // Calcular a nova URL com base no idioma selecionado
                const currentPath = window.location.pathname
                
                // Se já tiver /pt/ ou /en/ (ou outro idioma), substituir
                const newPath = currentPath.replace(/^\/([a-z]{2})\//, `/${language.code}/`)
                
                // Se não tiver o prefixo do idioma, adicionar
                const finalPath = newPath === currentPath ? `/${language.code}${currentPath}` : newPath
                
                // Usar o router para navegar
                router.push(finalPath)
              }}
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
