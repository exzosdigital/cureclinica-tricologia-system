/**
 * Esquemas de validação Zod para as operações com campos personalizados
 */
import { z } from 'zod';

// Tipos de entidades disponíveis
export const entitySchema = z.enum([
  'patient',
  'appointment',
  'treatment',
  'hairAnalysis',
]);

// Tipos de campo disponíveis
export const fieldTypeSchema = z.enum([
  'text',
  'number',
  'date',
  'select',
  'checkbox',
  'textarea',
]);

// Schema para criação de um novo campo personalizado
export const createCustomFieldSchema = z.object({
  name: z.string()
    .min(2, { message: 'O nome deve ter pelo menos 2 caracteres' })
    .max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),
  
  entity: entitySchema,
  
  type: fieldTypeSchema,
  
  required: z.boolean().default(false),
  
  defaultValue: z.string().optional(),
  
  // Opções são obrigatórias apenas para campos do tipo 'select'
  options: z.array(z.string()).optional()
    .refine(
      (options, ctx) => {
        const type = (ctx.parent as any).type;
        // Se o tipo for 'select', options é obrigatório e deve ter pelo menos uma opção
        if (type === 'select') {
          return options && options.length > 0;
        }
        // Para outros tipos, options é opcional
        return true;
      },
      {
        message: "Campos do tipo 'select' precisam ter pelo menos uma opção",
        path: ['options']
      }
    ),
});

// Schema para atualização de um campo personalizado existente
export const updateCustomFieldSchema = createCustomFieldSchema.extend({
  id: z.string(),
});

// Schema para exclusão de um campo personalizado
export const deleteCustomFieldSchema = z.object({
  id: z.string(),
});

// Schema para filtragem de campos personalizados
export const filterCustomFieldsSchema = z.object({
  entity: z.enum(['all', 'patient', 'appointment', 'treatment', 'hairAnalysis']).default('all'),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
});

// Tipos exportados com base nos schemas
export type EntityType = z.infer<typeof entitySchema>;
export type FieldType = z.infer<typeof fieldTypeSchema>;
export type CreateCustomFieldInput = z.infer<typeof createCustomFieldSchema>;
export type UpdateCustomFieldInput = z.infer<typeof updateCustomFieldSchema>;
export type DeleteCustomFieldInput = z.infer<typeof deleteCustomFieldSchema>;
export type FilterCustomFieldsInput = z.infer<typeof filterCustomFieldsSchema>;
