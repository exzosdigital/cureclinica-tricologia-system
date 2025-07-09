"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase, getPatients } from "@/lib/supabase";

export default function SupabaseConfigPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState("Verificando conexão...");
  const [error, setError] = useState("");
  const [patients, setPatients] = useState<any[]>([]);
  const [dbTables, setDbTables] = useState<string[]>([]);
  const [dbInfo, setDbInfo] = useState<any>(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        // Verifica a conexão com o Supabase
        const { data, error } = await supabase.from("patients").select("count").limit(1);
        
        if (error) throw error;
        
        setIsConnected(true);
        setStatus("Conectado ao Supabase com sucesso!");
        
        // Carrega informações sobre as tabelas do banco
        const { data: tableData, error: tableError } = await supabase
          .from('pg_tables')
          .select('tablename')
          .eq('schemaname', 'public');
          
        if (tableError) {
          console.error("Erro ao carregar tabelas:", tableError);
        } else {
          setDbTables(tableData?.map((t) => t.tablename) || []);
        }
        
        // Carrega informações básicas do banco
        try {
          const { data: dbVersion } = await supabase.rpc('get_db_info');
          setDbInfo(dbVersion);
        } catch (err) {
          console.error("Erro ao carregar informações do banco:", err);
        }
        
        // Carrega alguns pacientes para exemplo
        const patientsData = await getPatients(1, 5);
        setPatients(patientsData.data || []);
        
      } catch (err) {
        console.error("Erro ao conectar com o Supabase:", err);
        setIsConnected(false);
        setStatus("Não foi possível conectar ao Supabase. Verifique as configurações.");
        setError(String(err));
      }
    }
    
    checkConnection();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Voltar para o Dashboard
        </Link>
      </nav>
      
      <h1 className="text-3xl font-bold mb-6">Configuração do Supabase</h1>
      
      <div className={`p-4 mb-6 rounded-lg ${
        isConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}>
        <p className="font-medium">{status}</p>
        {error && <p className="text-sm mt-2">{error}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Configurações do Supabase */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Configurações</h2>
          <p className="mb-4">
            URL do Supabase: <code className="bg-gray-100 px-2 py-1 rounded">
              {process.env.NEXT_PUBLIC_SUPABASE_URL || "Não configurado"}
            </code>
          </p>
          
          {dbInfo && (
            <div className="mt-4">
              <h3 className="font-medium text-lg mb-2">Informações do Banco</h3>
              <p>Versão PostgreSQL: {dbInfo.version || "N/A"}</p>
              <p>Servidor: {dbInfo.server || "N/A"}</p>
            </div>
          )}
          
          <p className="text-sm text-gray-600 mt-4">
            Para modificar as configurações, atualize as variáveis de ambiente no arquivo .env
          </p>
        </div>
        
        {/* Tabelas do Supabase */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tabelas do Banco</h2>
          {dbTables.length > 0 ? (
            <ul className="grid grid-cols-2 gap-2">
              {dbTables.map((table) => (
                <li key={table} className="py-1 px-2 bg-gray-50 rounded">
                  {table}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              {isConnected 
                ? "Não foi possível obter a lista de tabelas."
                : "Conecte-se ao Supabase para visualizar as tabelas."}
            </p>
          )}
        </div>
      </div>
      
      {/* Pacientes (exemplo) */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Pacientes (Amostra)</h2>
          <Link href="/patients" className="text-blue-600 hover:text-blue-800 text-sm">
            Ver todos →
          </Link>
        </div>
        
        {patients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {patient.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {patient.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        patient.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {patient.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">
            {isConnected 
              ? "Nenhum paciente encontrado."
              : "Conecte-se ao Supabase para visualizar os pacientes."}
          </p>
        )}
      </div>
      
      <div className="mt-8 text-center">
        <a 
          href={`https://app.supabase.com/project/${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID || ''}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`inline-block px-5 py-3 bg-emerald-600 text-white rounded-lg ${
            !isConnected && "opacity-50 cursor-not-allowed"
          }`}
          onClick={(e) => !isConnected && e.preventDefault()}
        >
          Acessar Dashboard do Supabase
        </a>
        
        <div className="mt-4">
          <Link 
            href="/supabase/migration" 
            className={`inline-block px-5 py-3 bg-gray-700 text-white rounded-lg ${
              !isConnected && "opacity-50 cursor-not-allowed"
            }`}
            onClick={(e) => !isConnected && e.preventDefault()}
          >
            Gerenciar migrações de banco
          </Link>
        </div>
      </div>
    </div>
  );
}
