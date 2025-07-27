import React from 'react';
import { X, Brain, Sparkles, Target, Heart } from 'lucide-react';
import { getPopupContents } from '../data/onboardingData';

interface PlanRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToPlan: () => void;
  tabName: string;
}

export default function PlanRequiredModal({ isOpen, onClose, onGoToPlan, tabName }: PlanRequiredModalProps) {
  const [planRequiredContent, setPlanRequiredContent] = React.useState(() => {
    const popupContents = getPopupContents();
    return popupContents.find(p => p.type === 'plan-required');
  });

  // Escutar mudanças nos dados dos pop-ups
  React.useEffect(() => {
    const handlePopupUpdate = () => {
      const popupContents = getPopupContents();
      const updatedContent = popupContents.find(p => p.type === 'plan-required');
      setPlanRequiredContent(updatedContent);
    };

    window.addEventListener('popupDataUpdated', handlePopupUpdate);
    window.addEventListener('storage', handlePopupUpdate);

    return () => {
      window.removeEventListener('popupDataUpdated', handlePopupUpdate);
      window.removeEventListener('storage', handlePopupUpdate);
    };
  }, []);

  if (!isOpen) return null;

  if (!planRequiredContent) return null;

  const getTabDisplayName = (tabId: string) => {
    switch (tabId) {
      case 'teacher-poli': return 'Teacher Poli';
      case 'resources': return 'Bônus Exclusivos';
      case 'community': return 'Comunidade';
      case 'settings': return 'Configurações';
      default: return tabId;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg">
        {/* Header */}
        <div className="relative p-6 sm:p-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="h-10 w-10 text-white" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            {planRequiredContent.title}
          </h2>
          <p className="text-purple-100 text-sm sm:text-base">
            Para acessar <strong>{getTabDisplayName(tabName)}</strong> - {planRequiredContent.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {planRequiredContent.subtitle}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              {planRequiredContent.description}
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-8">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Benefícios do seu plano personalizado:
            </h4>
            <div className="space-y-3">
              {planRequiredContent.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onGoToPlan}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
            >
              {planRequiredContent.buttonText}
            </button>
            
            <button
              onClick={onClose}
              className="w-full text-gray-600 dark:text-gray-400 py-3 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Fechar
            </button>
          </div>

          {/* Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              ⚡ É rápido! Leva apenas alguns minutos para personalizar sua experiência
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}