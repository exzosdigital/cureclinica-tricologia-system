/**
 * Hooks para gerenciamento de parâmetros de URL (filtros, paginação)
 * para a página de campos personalizados usando nuqs
 * 
 * Documentação: https://nuqs.47ng.com/
 */
import { 
  useQueryState, 
  parseAsString, 
  parseAsInteger 
} from 'nuqs';
import { z } from 'zod';

// Tipo de entidade para filtro (inclui 'all' como opção)
const entityFilterSchema = z.enum(['all', 'patient', 'appointment', 'treatment', 'hairAnalysis']);
type EntityFilter = z.infer<typeof entityFilterSchema>;

// Hooks individuais para cada parâmetro - Esta é a abordagem recomendada para nuqs v2.4.3

/**
 * Hook para o parâmetro de filtro de entidade na URL
 */
export function useEntityFilter() {
  // Configurar o hook com validação básica embutida
  return useQueryState('entity', parseAsString.withDefault('all'));
}

/**
 * Hook para o termo de pesquisa na URL
 */
export function useSearchFilter() {
  return useQueryState('search', parseAsString.withDefault(''));
}

/**
 * Hook para o número da página na URL
 */
export function usePage() {
  return useQueryState('page', parseAsInteger.withDefault(1));
}

/**
 * Hook para o tamanho da página (itens por página) na URL
 */
export function useLimit() {
  return useQueryState('limit', parseAsInteger.withDefault(10));
}
