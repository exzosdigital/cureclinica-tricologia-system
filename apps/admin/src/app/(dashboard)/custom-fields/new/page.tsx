import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

// Definição de tipos
type EntityType = 'patient' | 'appointment' | 'treatment' | 'hairAnalysis';
type FieldType = 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'textarea';

// Maps para exibição de textos legíveis
const entityOptions = [
  { value: 'patient', label: 'Paciente' },
  { value: 'appointment', label: 'Consulta' },
  { value: 'treatment', label: 'Tratamento' },
  { value: 'hairAnalysis', label: 'Análise Capilar' }
];

const fieldTypeOptions = [
  { value: 'text', label: 'Texto' },
  { value: 'number', label: 'Número' },
  { value: 'date', label: 'Data' },
  { value: 'select', label: 'Seleção' },
  { value: 'checkbox', label: 'Caixa de seleção' },
  { value: 'textarea', label: 'Área de texto' }
];

// Componente de cliente usando "use client"
'use client';

export default function CustomFieldNewPage() {
  const [fieldType, setFieldType] = useState<FieldType>('text');
  const [hasOptions, setHasOptions] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState('');

  // Função para adicionar uma nova opção ao campo select
  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  // Função para remover uma opção
  const handleRemoveOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  // Atualizar o tipo de campo e configurar opções conforme necessário
  const handleFieldTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as FieldType;
    setFieldType(newType);
    setHasOptions(newType === 'select');
  };

  // Função para lidar com o envio do formulário
  // No futuro, isso será substituído por um Server Action com validação do Zod
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const fieldData = {
      name: formData.get('fieldName') as string,
      entity: formData.get('entity') as EntityType,
      type: fieldType,
      required: Boolean(formData.get('required')),
      options: fieldType === 'select' ? options : undefined,
      defaultValue: formData.get('defaultValue') as string || undefined
    };
    
    // Em uma implementação futura, aqui chamaríamos um Server Action
    console.log('Dados do campo:', fieldData);
    
    // Redirecionamento para a lista após criação bem-sucedida
    // Em uma implementação real, isso só aconteceria após o salvamento
    window.location.href = '/custom-fields';
  };

  return (
    <div className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Novo Campo Personalizado</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Crie um novo campo personalizado para sua aplicação.
          </p>
        </div>
        
        <Link 
          href="/custom-fields" 
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>
      </header>
      
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-5">
        {/* Nome do campo */}
        <div>
          <label htmlFor="fieldName" className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Campo*
          </label>
          <input
            type="text"
            name="fieldName"
            id="fieldName"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: Tipo de cabelo"
          />
        </div>

        {/* Entidade relacionada */}
        <div>
          <label htmlFor="entity" className="block text-sm font-medium text-gray-700 mb-1">
            Entidade*
          </label>
          <select
            name="entity"
            id="entity"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {entityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">
            Selecione a entidade à qual este campo será associado.
          </p>
        </div>

        {/* Tipo de campo */}
        <div>
          <label htmlFor="fieldType" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Campo*
          </label>
          <select
            name="fieldType"
            id="fieldType"
            required
            value={fieldType}
            onChange={handleFieldTypeChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {fieldTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Opções para campos de seleção */}
        {hasOptions && (
          <div className="space-y-3 border-t pt-4">
            <label className="block text-sm font-medium text-gray-700">
              Opções de Seleção*
            </label>
            
            <div className="flex">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Adicionar opção"
              />
              <button
                type="button"
                onClick={handleAddOption}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
              >
                Adicionar
              </button>
            </div>
            
            {options.length === 0 ? (
              <p className="text-sm text-amber-700">
                É necessário adicionar pelo menos uma opção para campos de seleção.
              </p>
            ) : (
              <ul className="border rounded-md divide-y">
                {options.map((option, index) => (
                  <li key={index} className="flex items-center justify-between py-2 px-3">
                    <span>{option}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Valor padrão */}
        <div>
          <label htmlFor="defaultValue" className="block text-sm font-medium text-gray-700 mb-1">
            Valor Padrão
          </label>
          <input
            type={fieldType === 'number' ? 'number' : 'text'}
            name="defaultValue"
            id="defaultValue"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Valor padrão (opcional)"
          />
        </div>

        {/* Campo obrigatório */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="required"
              name="required"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="required" className="font-medium text-gray-700">
              Campo obrigatório
            </label>
            <p className="text-gray-500">
              Se selecionado, este campo deverá ser preenchido obrigatoriamente.
            </p>
          </div>
        </div>

        {/* Nota sobre implementações futuras */}
        <div className="rounded-md bg-blue-50 p-4 mt-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Melhorias futuras (em desenvolvimento)</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc space-y-1 pl-5">
                  <li>Validação de formulários com Zod</li>
                  <li>Server Actions com react-safe-action</li>
                  <li>Suporte à internacionalização</li>
                  <li>Prévia de visualização do campo</li>
                  <li>Regras de validação e dependências entre campos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex justify-end pt-5 space-x-3 border-t mt-6">
          <Link 
            href="/custom-fields" 
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save size={16} />
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
