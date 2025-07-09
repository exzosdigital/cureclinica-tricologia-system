/**
 * Server Actions para operações de campos personalizados usando react-safe-action
 */
import { revalidatePath } from 'next/cache';
import { 
  createSafeAction, 
  ActionResult, 
  type ActionResponse 
} from '@/actions';

import { 
  createCustomFieldSchema, 
  updateCustomFieldSchema, 
  deleteCustomFieldSchema,
  filterCustomFieldsSchema,
  type CreateCustomFieldInput,
  type UpdateCustomFieldInput,
  type DeleteCustomFieldInput,
  type FilterCustomFieldsInput
} from './schema';

// Modelo de dados para o campo personalizado
export interface CustomField {
  id: string;
  name: string;
  entity: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  options?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Mock data para simulação - seria substituído pela integração com o banco de dados
const mockCustomFields: CustomField[] = [
  {
    id: '1',
    name: 'Tipo de cabelo',
    entity: 'patient',
    type: 'select',
    required: true,
    options: ['Liso', 'Ondulado', 'Cacheado', 'Crespo'],
    defaultValue: '',
    createdAt: new Date('2025-05-15'),
    updatedAt: new Date('2025-06-20')
  },
  {
    id: '2',
    name: 'Histórico familiar de alopecia',
    entity: 'patient',
    type: 'checkbox',
    required: false,
    defaultValue: 'false',
    createdAt: new Date('2025-05-16'),
    updatedAt: new Date('2025-05-16')
  },
  {
    id: '3',
    name: 'Observações de tratamento',
    entity: 'treatment',
    type: 'textarea',
    required: false,
    createdAt: new Date('2025-05-18'),
    updatedAt: new Date('2025-06-10')
  },
  {
    id: '4',
    name: 'Nível de perda capilar (1-10)',
    entity: 'hairAnalysis',
    type: 'number',
    required: true,
    defaultValue: '5',
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2025-06-01')
  }
];

/**
 * Action para criar um novo campo personalizado
 */
export const createCustomField = createSafeAction(
  createCustomFieldSchema,
  async (data): Promise<ActionResponse<CustomField>> => {
    try {
      // Aqui seria feita a inserção no banco de dados
      // Por enquanto, simulamos a criação
      const newField: CustomField = {
        ...data,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Invalidar cache do Next.js para a rota relacionada
      revalidatePath('/custom-fields');
      
      return ActionResult.success(newField);
    } catch (error: any) {
      return ActionResult.error(
        error.message || "Erro ao criar campo personalizado",
        "CREATE_CUSTOM_FIELD_ERROR"
      );
    }
  }
);

/**
 * Action para atualizar um campo personalizado existente
 */
export const updateCustomField = createSafeAction(
  updateCustomFieldSchema,
  async (data): Promise<ActionResponse<CustomField>> => {
    try {
      // Aqui seria feita a atualização no banco de dados
      // Por enquanto, simulamos a atualização
      const { id } = data;
      const existingField = mockCustomFields.find(field => field.id === id);
      
      if (!existingField) {
        return ActionResult.error(
          "Campo personalizado não encontrado",
          "NOT_FOUND",
          "id"
        );
      }
      
      const updatedField: CustomField = {
        ...data,
        createdAt: existingField.createdAt,
        updatedAt: new Date()
      };
      
      // Invalidar cache do Next.js para a rota relacionada
      revalidatePath('/custom-fields');
      revalidatePath(`/custom-fields/${id}`);
      
      return ActionResult.success(updatedField);
    } catch (error: any) {
      return ActionResult.error(
        error.message || "Erro ao atualizar campo personalizado",
        "UPDATE_CUSTOM_FIELD_ERROR"
      );
    }
  }
);

/**
 * Action para excluir um campo personalizado
 */
export const deleteCustomField = createSafeAction(
  deleteCustomFieldSchema,
  async (data): Promise<ActionResponse<{ id: string }>> => {
    try {
      // Aqui seria feita a exclusão no banco de dados
      // Por enquanto, simulamos a exclusão
      const { id } = data;
      const existingField = mockCustomFields.find(field => field.id === id);
      
      if (!existingField) {
        return ActionResult.error(
          "Campo personalizado não encontrado",
          "NOT_FOUND",
          "id"
        );
      }
      
      // Invalidar cache do Next.js para a rota relacionada
      revalidatePath('/custom-fields');
      
      return ActionResult.success({ id });
    } catch (error: any) {
      return ActionResult.error(
        error.message || "Erro ao excluir campo personalizado",
        "DELETE_CUSTOM_FIELD_ERROR"
      );
    }
  }
);

/**
 * Action para listar e filtrar campos personalizados
 */
export const getCustomFields = createSafeAction(
  filterCustomFieldsSchema,
  async (filters): Promise<ActionResponse<{
    fields: CustomField[];
    total: number;
    page: number;
    totalPages: number;
  }>> => {
    try {
      // Aqui seria feita a consulta ao banco de dados com os filtros aplicados
      // Por enquanto, simulamos a filtragem
      let filteredFields = [...mockCustomFields];
      
      // Aplicar filtro por entidade
      if (filters.entity !== 'all') {
        filteredFields = filteredFields.filter(field => field.entity === filters.entity);
      }
      
      // Aplicar filtro de busca se fornecido
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredFields = filteredFields.filter(field => 
          field.name.toLowerCase().includes(searchLower)
        );
      }
      
      // Calcular paginação
      const total = filteredFields.length;
      const totalPages = Math.ceil(total / filters.limit);
      const startIndex = (filters.page - 1) * filters.limit;
      const endIndex = startIndex + filters.limit;
      const paginatedFields = filteredFields.slice(startIndex, endIndex);
      
      return ActionResult.success({
        fields: paginatedFields,
        total,
        page: filters.page,
        totalPages
      });
    } catch (error: any) {
      return ActionResult.error(
        error.message || "Erro ao listar campos personalizados",
        "GET_CUSTOM_FIELDS_ERROR"
      );
    }
  }
);
