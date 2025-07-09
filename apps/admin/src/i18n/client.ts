import { createI18nClient } from 'next-international/client'
import type { I18nType } from './config'

export const { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale, useCurrentLocale } = createI18nClient<I18nType>({
  // Lista de idiomas suportados
  locales: ['pt', 'en'],
  
  // Função para carregar as traduções sob demanda
  loadLocale: async locale => {
    if (locale === 'pt') return (await import('./locales/pt')).default
    if (locale === 'en') return (await import('./locales/en')).default
    return (await import('./locales/pt')).default // fallback para pt
  },
})
