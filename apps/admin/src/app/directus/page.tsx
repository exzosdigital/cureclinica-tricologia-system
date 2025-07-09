"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { directus, getContents, getPatientFields } from "@/lib/directus";

export default function DirectusConfigPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [collections, setCollections] = useState<any[]>([]);
  const [status, setStatus] = useState("Verificando conexão...");
  const [contents, setContents] = useState<any[]>([]);
  const [patientFields, setPatientFields] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkConnection() {
      try {
        // Tenta obter o servidor info para verificar a conexão
        const serverInfo = await directus.request(directus.server.ping());
        setIsConnected(true);
        setStatus("Conectado ao Directus com sucesso!");
        
        // Carrega as coleções
        try {
          // Em um ambiente real, você precisaria estar autenticado para isso
          const collectionsData = await directus.request(
            directus.collections.readByQuery()
          );
          setCollections(collectionsData.data || []);
        } catch (err) {
          console.error("Erro ao carregar coleções:", err);
          // Ainda está conectado, mas não conseguiu carregar coleções
        }
        
        // Carrega conteúdos
        const contentsData = await getContents();
        setContents(contentsData.data || []);
        
        // Carrega campos de pacientes
        const fieldsData = await getPatientFields();
        setPatientFields(fieldsData.data || []);
        
      } catch (err) {
        console.error("Erro ao conectar com o Directus:", err);
        setIsConnected(false);
        setStatus("Não foi possível conectar ao Directus. Verifique as configurações.");
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
      
      <h1 className="text-3xl font-bold mb-6">Configuração do Directus</h1>
      
      <div className={`p-4 mb-6 rounded-lg ${
        isConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}>
        <p className="font-medium">{status}</p>
        {error && <p className="text-sm mt-2">{error}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Configurações do Directus */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Configurações</h2>
          <p className="mb-4">
            URL do Directus: <code className="bg-gray-100 px-2 py-1 rounded">
              {process.env.NEXT_PUBLIC_DIRECTUS_URL || "Não configurado"}
            </code>
          </p>
          
          <p className="text-sm text-gray-600 mt-4">
            Para modificar as configurações, atualize as variáveis de ambiente no arquivo .env
          </p>
        </div>
        
        {/* Coleções do Directus */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Coleções</h2>
          {collections.length > 0 ? (
            <ul className="divide-y">
              {collections.map((collection) => (
                <li key={collection.collection} className="py-2">
                  <span className="font-medium">{collection.name}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    ({collection.collection})
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              {isConnected 
                ? "Nenhuma coleção encontrada ou você precisa estar autenticado para ver as coleções."
                : "Conecte-se ao Directus para visualizar as coleções."}
            </p>
          )}
        </div>
      </div>
      
      {/* Conteúdos */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Conteúdos</h2>
        {contents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Criação
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contents.map((content) => (
                  <tr key={content.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {content.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {content.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        content.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {content.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(content.date_created).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">
            {isConnected 
              ? "Nenhum conteúdo encontrado."
              : "Conecte-se ao Directus para visualizar os conteúdos."}
          </p>
        )}
      </div>
      
      {/* Campos de pacientes */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Campos Personalizados de Pacientes</h2>
        {patientFields.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Label
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Obrigatório
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ordem
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patientFields.map((field) => (
                  <tr key={field.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {field.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {field.label}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {field.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {field.required ? "Sim" : "Não"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {field.order}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">
            {isConnected 
              ? "Nenhum campo personalizado encontrado."
              : "Conecte-se ao Directus para visualizar os campos personalizados."}
          </p>
        )}
      </div>
      
      <div className="mt-8 text-center">
        <a 
          href={process.env.NEXT_PUBLIC_DIRECTUS_URL || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`inline-block px-5 py-3 bg-blue-600 text-white rounded-lg ${
            !isConnected && "opacity-50 cursor-not-allowed"
          }`}
          onClick={(e) => !isConnected && e.preventDefault()}
        >
          Acessar Painel do Directus
        </a>
      </div>
    </div>
  );
}
