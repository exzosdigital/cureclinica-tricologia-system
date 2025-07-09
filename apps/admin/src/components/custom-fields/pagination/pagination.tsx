import { useI18n } from '../../../i18n/client'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const t = useI18n()
  
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page)
    }
  }
  
  // Gerar array de páginas para exibição
  const getPageNumbers = (): number[] => {
    // Para menos de 7 páginas, mostrar todas
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    
    // Para o início (página 1-3)
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, -1, totalPages]
    }
    
    // Para o final (últimas 3 páginas)
    if (currentPage >= totalPages - 2) {
      return [1, -1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }
    
    // Para o meio
    return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages]
  }
  
  const pageNumbers = getPageNumbers()
  
  if (totalPages <= 1) return null
  
  return (
    <div className="flex justify-center mt-6">
      <nav aria-label={t('pagination.label', { count: 1 })}>
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label={t('pagination.previous', { count: 1 })}
            >
              <ChevronLeft size={16} />
            </button>
          </li>
          
          {pageNumbers.map((page, index) => (
            <li key={`page-${index}`}>
              {page === -1 ? (
                <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => handlePageChange(page)}
                  aria-current={currentPage === page ? 'page' : undefined}
                  className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 ${
                    currentPage === page
                      ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                      : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  {page}
                </button>
              )}
            </li>
          ))}
          
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label={t('pagination.next', { count: 1 })}
            >
              <ChevronRight size={16} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
