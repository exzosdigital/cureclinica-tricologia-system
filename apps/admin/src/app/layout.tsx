import "@cureclinica/ui/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/auth-provider";
import { I18nProviderClient } from "@/i18n/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CureClinica Admin - Painel Administrativo",
  description: "Painel administrativo para gerenciamento da plataforma CureClinica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <I18nProviderClient>
            <div className="flex min-h-screen flex-col">
              {children}
            </div>
          </I18nProviderClient>
        </AuthProvider>
      </body>
    </html>
  );
}
