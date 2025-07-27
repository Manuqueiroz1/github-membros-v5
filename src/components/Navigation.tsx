import React from 'react';
import { Play, Brain, ExternalLink, BookOpen, Users, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  lockedTabs?: string[];
  onLockedTabClick?: (tabId: string) => void;
}

export default function Navigation({ activeTab, onTabChange, lockedTabs = [], onLockedTabClick }: NavigationProps) {
  const tabs = [
    { id: 'onboarding', label: 'Comece por Aqui', icon: Play },
    { id: 'ai-assistant', label: 'Gere seu Plano de Estudos', icon: Brain },
    { id: 'teacher-poli', label: 'Teacher Poli', icon: ExternalLink },
    { id: 'resources', label: 'Bônus', icon: BookOpen },
    { id: 'community', label: 'Comunidade', icon: Users },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-2 sm:space-x-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isLocked = lockedTabs.includes(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (isLocked) {
                    onLockedTabClick?.(tab.id);
                  } else {
                    onTabChange(tab.id);
                  }
                }}
                className={`flex items-center space-x-1 sm:space-x-2 py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors min-w-0 ${
                  isLocked
                    ? 'border-transparent text-gray-400 dark:text-gray-600 cursor-pointer hover:text-gray-600 dark:hover:text-gray-400'
                    :
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}