import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
          <ShieldAlert size={28} className="text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h1>
        
        <p className="text-gray-600 mb-6">
          Você não tem permissão para acessar o painel administrativo.
          Entre em contato com um administrador para solicitar acesso.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/login" 
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={18} />
            Voltar para o login
          </Link>
          
          <a 
            href="mailto:admin@cureclinica.com" 
            className="inline-block text-blue-600 hover:text-blue-800 hover:underline"
          >
            Solicitar acesso administrativo
          </a>
        </div>
      </div>
      
      <p className="mt-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CureClinica - Todos os direitos reservados
      </p>
    </div>
  );
}
