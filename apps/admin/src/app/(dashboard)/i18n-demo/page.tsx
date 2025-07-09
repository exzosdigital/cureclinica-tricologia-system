import { getI18n } from '@/i18n/config';

export default async function I18nDemoPage() {
  const t = await getI18n();
  
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">{t('common.welcome')}</h1>
        <p className="text-gray-600 mb-8">
          Esta página demonstra a funcionalidade de internacionalização do painel administrativo.
          <br />
          This page demonstrates the internationalization functionality of the admin panel.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Common Translations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(t.common).map((key) => (
            <div key={key} className="bg-white p-4 rounded-md border shadow-sm">
              <p className="text-xs text-gray-500 mb-1">common.{key}</p>
              <p className="font-medium">{t.common[key]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Auth Translations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(t.auth).map((key) => (
            <div key={key} className="bg-white p-4 rounded-md border shadow-sm">
              <p className="text-xs text-gray-500 mb-1">auth.{key}</p>
              <p className="font-medium">{t.auth[key]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Dashboard Translations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(t.dashboard).map((key) => (
            <div key={key} className="bg-white p-4 rounded-md border shadow-sm">
              <p className="text-xs text-gray-500 mb-1">dashboard.{key}</p>
              <p className="font-medium">{t.dashboard[key]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Custom Fields Translations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-md border shadow-sm">
            <p className="text-xs text-gray-500 mb-1">customFields.title</p>
            <p className="font-medium">{t.customFields.title}</p>
          </div>
          <div className="bg-white p-4 rounded-md border shadow-sm">
            <p className="text-xs text-gray-500 mb-1">customFields.description</p>
            <p className="font-medium">{t.customFields.description}</p>
          </div>
          <div className="bg-white p-4 rounded-md border shadow-sm">
            <p className="text-xs text-gray-500 mb-1">customFields.new</p>
            <p className="font-medium">{t.customFields.new}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Field Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(t.customFields.fieldTypes).map((key) => (
            <div key={key} className="bg-white p-4 rounded-md border shadow-sm">
              <p className="text-xs text-gray-500 mb-1">customFields.fieldTypes.{key}</p>
              <p className="font-medium">{t.customFields.fieldTypes[key]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Entity Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(t.customFields.entities).map((key) => (
            <div key={key} className="bg-white p-4 rounded-md border shadow-sm">
              <p className="text-xs text-gray-500 mb-1">customFields.entities.{key}</p>
              <p className="font-medium">{t.customFields.entities[key]}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mt-8">
        <h3 className="text-md font-medium text-blue-800">Instruções de uso</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-blue-700">
          <li>Use o seletor de idioma no cabeçalho para alternar entre os idiomas disponíveis</li>
          <li>Observe como as traduções mudam dinamicamente</li>
          <li>Note que o URL também é atualizado com o prefixo de idioma (/pt/ ou /en/)</li>
        </ul>
      </div>
    </div>
  );
}
