import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">CureClinica Admin</h1>
          <p className="text-gray-600 mt-2">
            Painel administrativo para gerenciamento da plataforma CureClinica
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminCard
            title="Gerenciamento de Pacientes"
            description="Configure e personalize os formulários, campos e fluxos de pacientes"
            href="/patients"
          />
          <AdminCard
            title="Gerenciamento de Conteúdo"
            description="Gerencie conteúdos dinâmicos como artigos, FAQs e páginas"
            href="/content"
          />
          <AdminCard
            title="Configurações do Supabase"
            description="Configure e gerencie a integração com o Supabase"
            href="/supabase"
          />
          <AdminCard
            title="Configurações do Directus"
            description="Configure e gerencie a integração com o Directus CMS"
            href="/directus"
          />
        </div>

        <footer className="mt-10 text-center text-gray-500 text-sm">
          <p>© 2025 CureClinica - Painel Administrativo v0.1.0</p>
        </footer>
      </div>
    </div>
  );
}

function AdminCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}
