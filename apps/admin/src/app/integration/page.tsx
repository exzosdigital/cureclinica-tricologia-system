"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { directus, getPatientFields } from "@/lib/directus";
import { supabase, getPatients, updatePatientCustomFields } from "@/lib/supabase";

export default function IntegrationPage() {
  const [directusStatus, setDirectusStatus] = useState("Verificando conexão...");
  const [supabaseStatus, setSupabaseStatus] = useState("Verificando conexão...");
  const [isDirectusConnected, setIsDirectusConnected] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [patientFields, setPatientFields] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [fieldValues, setFieldValues] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState("");
  const [syncResult, setSyncResult] = useState<{success: boolean; message: string} | null>(null);

  useEffect(() => {
    async function checkConnections() {
      // Verificar conexão com o Directus
      try {
        await directus.request(directus.server.ping());
        setIsDirectusConnected(true);
        setDirectusStatus("Conectado ao Directus");
        
        // Buscar campos personalizados de pacientes do Directus
        const fieldsData = await getPatientFields();
        setPatientFields(fieldsData.data || []);
      } catch (err) {
        console.error("Erro ao conectar com Directus:", err);
        setIsDirectusConnected(false);
        setDirectusStatus("Falha na conexão com Directus");
      }
      
      // Verificar conexão com o Supabase
      try {
        const { data, error } = await supabase.from("patients").select("count").limit(1);
        if (error) throw error;
        
        setIsSupabaseConnected(true);
        setSupabaseStatus("Conectado ao Supabase");
        
        // Buscar amostra de pacientes
        const patientsData = await getPatients(1, 10);
        setPatients(patientsData.data || []);
      } catch (err) {
        console.error("Erro ao conectar com Supabase:", err);
        setIsSupabaseConnected(false);
        setSupabaseStatus("Falha na conexão com Supabase");
      }
    }
    
    checkConnections();
  }, []);
  
  // Quando o usuário seleciona um paciente, carregamos os campos personalizados dele
  useEffect(() => {
    async function loadPatientCustomFields() {
      if (!selectedPatient) {
        setFieldValues({});
        return;
      }
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('patients')
          .select('custom_fields')
          .eq('id', selectedPatient)
          .single();
          
        if (error) throw error;
        
        // Inicializar os valores dos campos
        const customFields = data?.custom_fields || {};
        
        // Preencher os valores existentes e adicionar campos vazios para os que não existem
        const initialValues: Record<string, any> = {};
        patientFields.forEach(field => {
          initialValues[field.name] = customFields[field.name] || getDefaultValueForType(field.type);
        });
        
        setFieldValues(initialValues);
      } catch (err) {
        console.error("Erro ao carregar campos personalizados:", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPatientCustomFields();
  }, [selectedPatient, patientFields]);

  // Função auxiliar para obter valor padrão com base no tipo do campo
  function getDefaultValueForType(type: string) {
    switch (type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'select':
        return '';
      case 'number':
        return 0;
      case 'date':
        return null;
      case 'checkbox':
        return false;
      case 'image':
        return null;
      default:
        return '';
    }
  }
  
  // Função para atualizar um campo específico
  function handleFieldChange(fieldName: string, value: any) {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }
  
  // Função para sincronizar os campos personalizados do paciente
  async function handleSaveCustomFields() {
    if (!selectedPatient) return;
    
    try {
      setIsLoading(true);
      setSyncStatus("Salvando dados...");
      
      const result = await updatePatientCustomFields(selectedPatient, fieldValues);
      
      setSyncResult({
        success: true,
        message: "Campos personalizados atualizados com sucesso!"
      });
      setTimeout(() => setSyncResult(null), 5000);
    } catch (err) {
      console.error("Erro ao salvar campos personalizados:", err);
      setSyncResult({
        success: false,
        message: `Erro ao salvar: ${String(err)}`
      });
    } finally {
      setIsLoading(false);
      setSyncStatus("");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Voltar para o Dashboard
        </Link>
      </nav>
      
      <h1 className="text-3xl font-bold mb-6">Integração Directus + Supabase</h1>
      
      {/* Status das Conexões */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className={`p-4 rounded-lg ${isDirectusConnected ? "bg-green-100" : "bg-red-100"}`}>
          <p className="font-medium">{directusStatus}</p>
        </div>
        <div className={`p-4 rounded-lg ${isSupabaseConnected ? "bg-green-100" : "bg-red-100"}`}>
          <p className="font-medium">{supabaseStatus}</p>
        </div>
      </div>
      
      {/* Interface de Integração */}
      {isDirectusConnected && isSupabaseConnected ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Gerenciamento de Campos Personalizados</h2>
          
          <div className="mb-6">
            <label htmlFor="patient-select" className="block text-sm font-medium text-gray-700 mb-1">
              Selecionar Paciente
            </label>
            <select
              id="patient-select"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Selecione um paciente</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} ({patient.email})
                </option>
              ))}
            </select>
          </div>
          
          {selectedPatient && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Campos Personalizados</h3>
              
              {patientFields.length === 0 ? (
                <p className="text-gray-500">
                  Nenhum campo personalizado definido no Directus.
                </p>
              ) : (
                <div className="space-y-4">
                  {patientFields.map((field) => (
                    <div key={field.id} className="border p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      
                      {field.type === 'text' || field.type === 'email' || field.type === 'phone' ? (
                        <input
                          type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'text'}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={fieldValues[field.name] || ''}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          disabled={isLoading}
                        />
                      ) : field.type === 'number' ? (
                        <input
                          type="number"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={fieldValues[field.name] || 0}
                          onChange={(e) => handleFieldChange(field.name, parseFloat(e.target.value))}
                          disabled={isLoading}
                        />
                      ) : field.type === 'date' ? (
                        <input
                          type="date"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={fieldValues[field.name] || ''}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          disabled={isLoading}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={fieldValues[field.name] || ''}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          disabled={isLoading}
                        >
                          <option value="">Selecione uma opção</option>
                          {field.options?.map((option: string) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'checkbox' ? (
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={fieldValues[field.name] || false}
                          onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                          disabled={isLoading}
                        />
                      ) : (
                        <p className="text-gray-500">Tipo de campo não suportado: {field.type}</p>
                      )}
                      
                      {field.help_text && (
                        <p className="mt-1 text-sm text-gray-500">{field.help_text}</p>
                      )}
                    </div>
                  ))}
                  
                  <div className="mt-6">
                    <button
                      type="button"
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={handleSaveCustomFields}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Salvando...' : 'Salvar Campos Personalizados'}
                    </button>
                    
                    {syncStatus && (
                      <span className="ml-3 text-sm text-gray-500">{syncStatus}</span>
                    )}
                    
                    {syncResult && (
                      <div className={`mt-3 p-3 rounded-md ${
                        syncResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {syncResult.message}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
          <p>É necessário que ambos os serviços (Directus e Supabase) estejam conectados para utilizar esta funcionalidade.</p>
          <div className="mt-4 flex space-x-4">
            {!isDirectusConnected && (
              <Link href="/directus" className="text-blue-600 hover:text-blue-800">
                Configurar Directus →
              </Link>
            )}
            {!isSupabaseConnected && (
              <Link href="/supabase" className="text-blue-600 hover:text-blue-800">
                Configurar Supabase →
              </Link>
            )}
          </div>
        </div>
      )}
      
      {/* Documentação */}
      <div className="mt-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Sobre a Integração</h2>
        <div className="prose max-w-none">
          <p>
            Esta interface permite gerenciar a integração entre o <strong>Directus CMS</strong> e o <strong>Supabase</strong>
            para a plataforma CureClinica. Ela permite:
          </p>
          <ul>
            <li>Sincronizar campos personalizados definidos no Directus com os dados de pacientes no Supabase</li>
            <li>Gerenciar e personalizar formulários e estruturas de dados conforme necessário</li>
            <li>Garantir consistência entre o painel administrativo e o aplicativo principal</li>
          </ul>
          
          <h3>Como funciona</h3>
          <p>
            Os campos personalizados são definidos e gerenciados no Directus CMS, enquanto os dados dos
            pacientes são armazenados no Supabase. Esta interface permite vincular esses dois sistemas,
            oferecendo uma camada de administração flexível para a plataforma CureClinica.
          </p>
        </div>
      </div>
    </div>
  );
}
