import React from 'react';
import { User, LogOut, Settings, Menu, X } from 'lucide-react';
import { isAdmin } from '../utils/adminConfig';

interface HeaderProps {
  userName: string;
  userEmail?: string;
  onLogout: () => void;
  onAdminPanel?: () => void;
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function Header({ userName, userEmail, onLogout, onAdminPanel, onMenuToggle, isMobileMenuOpen }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 min-h-[64px]">
          <div className="flex items-center flex-1">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            
            <img 
              src="/WhatsApp Image 2025-06-02 at 10.53.02.jpeg" 
              alt="Teacher Poli" 
              className="h-8 sm:h-10 w-auto flex-shrink-0"
            />
            <div className="ml-2 sm:ml-4 min-w-0 flex-1">
              <h1 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight truncate">
                <span className="hidden sm:inline">Área de Membros - Teacher Poli</span>
                <span className="sm:hidden">Teacher Poli</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {/* User Info - Hidden on very small screens */}
            <div className="hidden md:flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-24 truncate">{userName}</span>
              {userEmail && isAdmin(userEmail) && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                  Admin
                </span>
              )}
            </div>
            
            {/* Mobile User Icon */}
            <div className="md:hidden">
              <User className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            
            {/* Admin Panel Button */}
            {userEmail && isAdmin(userEmail) && onAdminPanel && (
              <button
                onClick={onAdminPanel}
                className="flex items-center space-x-1 px-2 py-2 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                title="Painel Admin"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden lg:inline">Admin</span>
              </button>
            )}
            
            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 px-2 py-2 text-xs text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden lg:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}