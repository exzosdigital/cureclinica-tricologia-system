'use client'

import { useI18n } from '@/i18n/client'
import { usePage, useLimit } from '@/hooks/use-custom-fields-params'

interface PaginationProps {
  /**
   * Se fornecido, pega a página atual deste prop em vez dos parâmetros de URL.
   * Útil se quiser controlar a paginação sem usar URL.
   */
  currentPage?: number
  totalPages: number
  totalItems: number
  /**
   * Se fornecido, pega o número de itens por página deste prop em vez dos parâmetros de URL.
   * Útil se quiser controlar o tamanho da página sem usar URL.
   */
  itemsPerPage?: number
  /**
   * Callback opcional que é chamado quando a página muda.
   * Útil para lógica adicional que precisa ser executada quando a página muda.
   */
  onPageChange?: (page: number) => void
}

export function Pagination({
  currentPage: currentPageProp,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage: itemsPerPageProp,
  onPageChange,
}: PaginationProps) {
  const t = useI18n()
  
  // Usar hooks individuais para os parâmetros de URL
  const [page, setPage] = usePage()
  const [limit] = useLimit()
  
  // Usar o valor do prop se fornecido, caso contrário, usar o valor do parâmetro de URL
  const currentPage = currentPageProp ?? page
  const itemsPerPage = itemsPerPageProp ?? limit
  
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)
  
  const handlePageChange = (page: number) => {
    // Verificar se a página é válida antes de fazer a mudança
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      // Atualizar o parâmetro de URL da página com opção de history
      setPage(page, { history: 'push' })
      
      // Chamar o callback opcional se fornecido
      if (onPageChange) {
        onPageChange(page)
      }
    }
  }
  
  return (
    <div className="flex w-full items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            {t('customFields.pagination.showing')} <span className="font-medium">{startItem}</span>{' '}
            {t('customFields.pagination.to')} <span className="font-medium">{endItem}</span>{' '}
            {t('customFields.pagination.of')}{' '}
            <span className="font-medium">{totalItems}</span> {t('customFields.pagination.results')}
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              type="button"
              onClick={() => currentPage > 1 ? handlePageChange(currentPage - 1) : undefined}
              disabled={currentPage <= 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t('customFields.pagination.previous')}
            >
              <span className="sr-only">{t('customFields.pagination.previous')}</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </button>
            
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1
              return (
                <button
                  type="button"
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNumber ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}`}
                  aria-current={currentPage === pageNumber ? 'page' : undefined}
                >
                  {pageNumber}
                </button>
              )
            })}
            
            <button
              type="button"
              onClick={() => currentPage < totalPages ? handlePageChange(currentPage + 1) : undefined}
              disabled={currentPage >= totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t('customFields.pagination.next')}
            >
              <span className="sr-only">{t('customFields.pagination.next')}</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
