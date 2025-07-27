import React from 'react';
import { Play, Brain, ExternalLink, BookOpen, Users, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  lockedTabs?: string[];
  onLockedTabClick?: (tabId: string) => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuClose?: () => void;
}

export default function Navigation({ 
  activeTab, 
  onTabChange, 
  lockedTabs = [], 
  onLockedTabClick,
  isMobileMenuOpen = false,
  onMobileMenuClose
}: NavigationProps) {
  const tabs = [
    { id: 'onboarding', label: 'Comece por Aqui', icon: Play },
    { id: 'ai-assistant', label: 'Gere seu Plano de Estudos', icon: Brain },
    { id: 'teacher-poli', label: 'Teacher Poli', icon: ExternalLink },
    { id: 'resources', label: 'Bônus', icon: BookOpen },
    { id: 'community', label: 'Comunidade', icon: Users },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const handleTabClick = (tabId: string) => {
    if (lockedTabs.includes(tabId)) {
      onLockedTabClick?.(tabId);
    } else {
      onTabChange(tabId);
    }
    onMobileMenuClose?.();
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-white dark:bg-gray-800 shadow-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isLocked = lockedTabs.includes(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors min-w-0 ${
                    isLocked
                      ? 'border-transparent text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300'
                      :
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onMobileMenuClose}>
          <div 
            className="fixed top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isLocked = lockedTabs.includes(tab.id);
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full flex items-center space-x-3 px-6 py-4 text-left font-medium transition-colors ${
                      isLocked
                        ? 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        :
                      activeTab === tab.id
                        ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-r-4 border-purple-500'
                        : 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{tab.label}</span>
                    {isLocked && (
                      <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">🔒</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40">
        <div className="grid grid-cols-6 h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isLocked = lockedTabs.includes(tab.id);
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors relative ${
                  isLocked
                    ? 'text-gray-400 dark:text-gray-500'
                    : isActive
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100'
                }`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="text-xs font-medium truncate max-w-full px-1">
                  {tab.label.split(' ')[0]}
                </span>
                {isLocked && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-gray-400 rounded-full"></div>
                )}
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-purple-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}