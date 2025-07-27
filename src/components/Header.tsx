import React from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { isAdmin } from '../utils/adminConfig';

interface HeaderProps {
  userName: string;
  userEmail?: string;
  onLogout: () => void;
  onAdminPanel?: () => void;
}

export default function Header({ userName, userEmail, onLogout, onAdminPanel }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 min-h-[64px]">
          <div className="flex items-center">
            <img 
              src="/WhatsApp Image 2025-06-02 at 10.53.02.jpeg" 
              alt="Teacher Poli" 
              className="h-8 sm:h-10 w-auto"
            />
            <div className="ml-2 sm:ml-4">
              <h1 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="hidden sm:inline">Área de Membros - Teacher Poli</span>
                <span className="sm:hidden">Teacher Poli</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{userName}</span>
              {userEmail && isAdmin(userEmail) && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                  Admin
                </span>
              )}
            </div>
            <div className="sm:hidden">
              <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            {userEmail && isAdmin(userEmail) && onAdminPanel && (
              <button
                onClick={onAdminPanel}
                className="flex items-center space-x-1 px-2 sm:px-3 py-2 text-xs sm:text-sm text-red-600 hover:text-red-800 transition-colors"
                title="Painel Admin"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}