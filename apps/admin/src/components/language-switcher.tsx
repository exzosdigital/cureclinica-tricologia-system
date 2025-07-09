'use client'

import { useRouter } from 'next/navigation'
import { useCurrentLocale } from '@/i18n/client'
import { useState } from 'react'
import { Check, ChevronDown, Languages } from 'lucide-react'

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  {
    code: 'pt',
    name: 'Português',
    flag: '🇧🇷',
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
  },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const currentLocale = useCurrentLocale()
  const [open, setOpen] = useState(false)
  
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]
  
  const toggleDropdown = () => {
    setOpen(!open)
  }
  
  const switchLanguage = (locale: string) => {
    // Calcular a nova URL com base no idioma selecionado
    const currentPath = window.location.pathname
    
    // Se já tiver /pt/ ou /en/ (ou outro idioma), substituir
    const newPath = currentPath.replace(/^\/(pt|en)\//, `/${locale}/`)
    
    // Se não tiver o prefixo do idioma, adicionar
    const finalPath = newPath === currentPath ? `/${locale}${currentPath}` : newPath
    
    router.push(finalPath)
    setOpen(false)
  }
  
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="hidden sm:inline">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <span className="sm:hidden">
          <Languages size={18} />
        </span>
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      
      {open && (
        <div className="absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                  currentLocale === language.code ? 'text-blue-600' : 'text-gray-700'
                }`}
                role="menuitem"
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
                {currentLocale === language.code && (
                  <Check size={16} className="ml-auto text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
