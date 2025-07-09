import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { type NextAuthConfig } from "next-auth";
import { supabase } from "@/lib/supabase";

// Definição da configuração do NextAuth
export const authOptions: NextAuthConfig = {
  providers: [
    // Provider de credenciais para login com email/senha
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Autenticação via Supabase
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error || !data.user) {
            console.error("Erro na autenticação:", error);
            return null;
          }

          // Verificar se o usuário tem permissão de administrador
          // Aqui assumimos que existe uma tabela 'admin_users' que armazena os usuários admin permitidos
          const { data: adminData, error: adminError } = await supabase
            .from("admin_users")
            .select("*")
            .eq("user_id", data.user.id)
            .single();

          if (adminError || !adminData) {
            console.error("Usuário não tem permissão de administrador:", adminError);
            return null;
          }

          // Retornar dados do usuário para incluir na sessão
          return {
            id: data.user.id,
            email: data.user.email,
            name: adminData.name || data.user.email,
            role: adminData.role || "admin",
          };
        } catch (error) {
          console.error("Erro no processo de autenticação:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Personalizar JWT com dados adicionais
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    // Personalizar sessão com dados do token
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    // Redirecionar após login bem-sucedido
    async redirect({ url, baseUrl }) {
      // Redirecionar para a página principal após login
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  // Configuração de sessão
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 horas
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Criar handler do NextAuth com as opções configuradas
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
