import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest, NextResponse } from 'next/server'

const I18nMiddleware = createI18nMiddleware({
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
  urlMappingStrategy: 'rewrite',
})

export function middleware(request: NextRequest) {
  // Aqui podemos aplicar regras personalizadas antes ou depois do middleware de internacionalização
  return I18nMiddleware(request)
}

export const config = {
  // Especifica quais rotas devem ser manipuladas pelo middleware
  // Exclui rotas de API, arquivos estáticos, etc.
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
