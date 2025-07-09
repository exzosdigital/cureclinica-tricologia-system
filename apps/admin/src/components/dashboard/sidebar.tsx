"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  Users, 
  Calendar, 
  Settings, 
  BarChart2, 
  Database, 
  FileText, 
  Image, 
  LogOut, 
  Menu,
  X
} from "lucide-react";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        isActive 
          ? "bg-blue-100 text-blue-700" 
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <div className="w-5 h-5">{icon}</div>
      <span>{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      href: "/",
      icon: <BarChart2 size={20} />,
      label: "Dashboard",
    },
    {
      href: "/patients",
      icon: <Users size={20} />,
      label: "Pacientes",
    },
    {
      href: "/appointments",
      icon: <Calendar size={20} />,
      label: "Agendamentos",
    },
    {
      href: "/documents",
      icon: <FileText size={20} />,
      label: "Documentos",
    },
    {
      href: "/media",
      icon: <Image size={20} />,
      label: "Mídia",
    },
    {
      href: "/database",
      icon: <Database size={20} />,
      label: "Banco de Dados",
    },
    {
      href: "/settings",
      icon: <Settings size={20} />,
      label: "Configurações",
    },
  ];

  return (
    <div
      className={`flex flex-col bg-white border-r h-screen transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="text-lg font-bold">CureClinica Admin</div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-100"
          aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => (
            <div key={item.href}>
              {isCollapsed ? (
                <Link
                  href={item.href}
                  className={`flex justify-center items-center p-2 rounded-md transition-colors ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="w-5 h-5">{item.icon}</div>
                </Link>
              ) : (
                <NavItem
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  isActive={pathname === item.href}
                />
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div
        className={`p-4 border-t ${
          isCollapsed ? "flex justify-center" : ""
        }`}
      >
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className={`flex items-center text-red-600 hover:text-red-800 transition-colors ${
            isCollapsed ? "justify-center" : "gap-3"
          }`}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Sair</span>}
        </button>
      </div>
    </div>
  );
}
