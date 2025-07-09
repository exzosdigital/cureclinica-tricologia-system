"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Bell, User, ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/client";
import LanguageSwitcher from "@/components/language-switcher/language-switcher";

export function Header() {
  const { data: session } = useSession();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const t = useI18n();

  return (
    <header className="bg-white border-b px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {/* Espaço para breadcrumbs ou título da página */}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Seletor de idioma */}
          <LanguageSwitcher />
          
          {/* Notificações */}
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Perfil do usuário */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User size={18} className="text-blue-700" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">{session?.user?.name || "Admin"}</div>
                <div className="text-xs text-gray-500">{session?.user?.email || ""}</div>
              </div>
              <ChevronDown size={16} className="text-gray-600 hidden md:block" />
            </button>
            
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    /* Implementar ação para ver perfil */
                    setIsProfileMenuOpen(false);
                  }}
                >
                  {t("auth.profile", "Meu Perfil")}
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    /* Implementar ação para preferências */
                    setIsProfileMenuOpen(false);
                  }}
                >
                  {t("common.preferences", "Preferências")}
                </button>
                <hr className="my-1" />
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    /* Implementar ação para sair */
                    setIsProfileMenuOpen(false);
                  }}
                >
                  {t("auth.logout", "Sair")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
