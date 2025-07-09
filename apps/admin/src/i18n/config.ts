import { createI18n } from 'next-international/server'
import pt from './locales/pt'

// Tipo para garantir que as traduções estejam alinhadas entre os idiomas
export type I18nType = typeof pt

// Configuração do next-international
export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } = createI18n({
  // Lista de idiomas suportados
  locales: ['pt', 'en'],
  
  // Idioma padrão
  defaultLocale: 'pt',
  
  // Função para carregar as traduções sob demanda
  getLocale: async locale => {
    if (locale === 'pt') return pt
    if (locale === 'en') return (await import('./locales/en')).default as I18nType
    return pt // fallback para pt
  },
})
