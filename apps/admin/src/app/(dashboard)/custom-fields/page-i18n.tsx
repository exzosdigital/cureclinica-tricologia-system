import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { getI18n } from '@/i18n/config';
import { EntityFilters } from '@/components/custom-fields/entity-filters';
import { CustomFieldsTable } from '@/components/custom-fields/custom-fields-table';

type EntityType = 'patient' | 'appointment' | 'treatment' | 'hairAnalysis';
type FieldType = 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'textarea';

interface CustomField {
  id: string;
  name: string;
  entity: EntityType;
  type: FieldType;
  required: boolean;
  options?: string[];
  defaultValue?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data - seria substituído por dados reais do banco
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

export default async function CustomFieldsPage() {
  // Na implementação real, buscaríamos os dados do banco de dados
  const customFields = mockCustomFields;
  const t = await getI18n();
  
  // Esta função seria um Server Action para excluir um campo
  async function handleDelete(id: string) {
    // Lógica de exclusão aqui
    console.log(`Deletando campo ${id}`);
  }

  return (
    <div className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('customFields.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t('customFields.description')}
          </p>
        </div>
        
        <Link 
          href="/custom-fields/new" 
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={16} />
          {t('customFields.new')}
        </Link>
      </header>
      
      {/* Filtros/Tabs de entidade - Componente client-side com i18n */}
      <EntityFilters />
      
      {/* Tabela de campos personalizados - Componente client-side com i18n */}
      <CustomFieldsTable 
        fields={customFields} 
        onDeleteField={handleDelete} 
      />
      
      {/* Paginação - será implementada com nuqs posteriormente */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              {t('customFields.pagination.showing')} <span className="font-medium">1</span> {t('customFields.pagination.to')} <span className="font-medium">4</span> {t('customFields.pagination.of')}{' '}
              <span className="font-medium">4</span> {t('customFields.pagination.results')}
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                disabled
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">{t('customFields.pagination.previous')}</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                1
              </button>
              <button
                disabled
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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
      
      {/* Indicação de futuras implementações */}
      <div className="rounded-md bg-blue-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">{t('customFields.futureImprovements.title')}</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc space-y-1 pl-5">
                <li>{t('customFields.futureImprovements.i18n')}</li>
                <li>{t('customFields.futureImprovements.validation')}</li>
                <li>{t('customFields.futureImprovements.serverActions')}</li>
                <li>{t('customFields.futureImprovements.dependencies')}</li>
                <li>{t('customFields.futureImprovements.preview')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
