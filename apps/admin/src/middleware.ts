import { NextResponse, NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import { createI18nMiddleware } from "next-international/middleware";

// Configuração do middleware de internacionalização
const I18nMiddleware = createI18nMiddleware({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  urlMappingStrategy: "rewrite",
});

// Função middleware principal que combina internacionalização e autenticação
function mainMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Se o caminho for para recursos estáticos, API, ou não precisa de internacionalização
  if (
    pathname.includes("/_next") ||
    pathname.includes("/api/") ||
    pathname.includes("/static/") ||
    pathname.match(/\.\w+$/) // arquivos com extensões como .jpg, .png, etc.
  ) {
    return NextResponse.next();
  }
  
  // Aplicar middleware de internacionalização
  return I18nMiddleware(request);
}

// Middleware de autenticação que protege as rotas do painel admin
const authMiddleware = withAuth(
  // Função para personalizar o comportamento após verificar a autenticação
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;
    
    // Verificar se o usuário está autenticado e tem a role necessária
    if (!token) {
      // Se não estiver autenticado e não estiver na página de login, redireciona para login
      if (!pathname.includes("/login")) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      // Se já estiver na página de login, permite continuar
      return NextResponse.next();
    }
    
    // Se o usuário estiver autenticado e acessar a página de login, redireciona para o dashboard
    if (pathname.includes("/login")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    // Verificar se o usuário tem a role necessária para acessar o painel admin
    const userRole = token.role as string;
    if (userRole !== "admin" && userRole !== "super_admin") {
      // Se o usuário não tiver a role adequada, redirecionar para página de acesso negado
      return NextResponse.redirect(new URL("/acesso-negado", req.url));
    }
    
    // Permitir acesso às rotas protegidas
    return NextResponse.next();
  },
  {
    // Opções do middleware
    callbacks: {
      // Defina quando o middleware deve ser executado
      authorized: ({ token }) => {
        // Se houver um token, o usuário está autenticado
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Middleware combinado: primeiro aplica internacionalização, depois autenticação
export function middleware(request: NextRequest) {
  // Primeiro aplicamos o middleware de i18n para reescrever a URL
  const i18nResponse = mainMiddleware(request);
  
  // Se o i18n gerou um redirecionamento ou resposta personalizada, retornamos
  if (i18nResponse.status !== 200) {
    return i18nResponse;
  }
  
  // Em seguida, aplicamos o middleware de autenticação
  return authMiddleware(request);
}

// Configurar quais rotas devem ser processadas pelo middleware
export const config = {
  // Processar todas as rotas exceto as explicitamente ignoradas
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"]
};
