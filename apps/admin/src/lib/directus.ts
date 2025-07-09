import { createDirectus, rest, authentication } from '@directus/sdk';

// Tipos para as coleções do Directus
export interface DirectusUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface DirectusFile {
  id: string;
  storage: string;
  filename_disk: string;
  filename_download: string;
  title: string;
  type: string;
  filesize: number;
  modified_on: string;
  width?: number;
  height?: number;
}

export interface DirectusContent {
  id: string;
  status: 'published' | 'draft' | 'archived';
  sort: number | null;
  user_created: string | DirectusUser;
  date_created: string;
  user_updated: string | DirectusUser | null;
  date_updated: string | null;
  title: string;
  slug: string;
  content: string;
  featured_image?: string | DirectusFile | null;
  category?: string | null;
  tags?: string[] | null;
}

export interface DirectusPatientField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'email' | 'phone' | 'select' | 'checkbox' | 'image';
  required: boolean;
  options?: string[];
  default_value?: string;
  help_text?: string;
  order: number;
}

// Define as coleções do Directus
export interface Schema {
  users: DirectusUser;
  files: DirectusFile;
  content: DirectusContent;
  patient_fields: DirectusPatientField;
  // Adicione outras coleções conforme necessário
}

// Cria o cliente Directus
export const directus = createDirectus<Schema>(process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055')
  .with(authentication())
  .with(rest());

// Função para autenticar com o Directus
export async function authenticateDirectus(email: string, password: string) {
  try {
    const auth = await directus.login(email, password);
    return auth;
  } catch (error) {
    console.error('Erro ao autenticar com Directus:', error);
    throw error;
  }
}

// Função para obter conteúdos
export async function getContents() {
  try {
    const contents = await directus.request(
      directus.items('content').readByQuery({
        sort: ['-date_created'],
        limit: 100,
        filter: {
          status: { _eq: 'published' }
        }
      })
    );
    return contents;
  } catch (error) {
    console.error('Erro ao buscar conteúdos:', error);
    return { data: [] };
  }
}

// Função para obter campos personalizados de pacientes
export async function getPatientFields() {
  try {
    const fields = await directus.request(
      directus.items('patient_fields').readByQuery({
        sort: ['order'],
        limit: 100,
      })
    );
    return fields;
  } catch (error) {
    console.error('Erro ao buscar campos de pacientes:', error);
    return { data: [] };
  }
}
