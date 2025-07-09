import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { getI18n } from '../../../i18n/config';
import { Suspense } from 'react';
import { CustomFieldsContainer } from '../../../components/custom-fields/custom-fields-container';

export default async function CustomFieldsPage() {
  const t = await getI18n();
  
  return (
    <div className="space-y-6 p-6">
      <header className="flex items-center justify-between mb-8">
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
      
      {/* Container integrado com filtros, busca, tabela e paginação usando estado via URL */}
      <Suspense fallback={
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-blue-600 motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-3 text-sm text-gray-500">
            {t('common.loading')}
          </p>
        </div>
      }>
        <CustomFieldsContainer />
      </Suspense>
    </div>
  );
}