import React from 'react';
import { X, Heart, Sparkles, Target, Users } from 'lucide-react';
import SupportButton from './SupportButton';
import { getPopupContents } from '../data/onboardingData';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export default function WelcomeModal({ isOpen, onClose, userName }: WelcomeModalProps) {
  const [welcomeContent, setWelcomeContent] = React.useState(() => {
    const popupContents = getPopupContents();
    return popupContents.find(p => p.type === 'welcome');
  });

  // Escutar mudanças nos dados dos pop-ups
  React.useEffect(() => {
    const handlePopupUpdate = () => {
      const popupContents = getPopupContents();
      const updatedContent = popupContents.find(p => p.type === 'welcome');
      setWelcomeContent(updatedContent);
    };

    window.addEventListener('popupDataUpdated', handlePopupUpdate);
    window.addEventListener('storage', handlePopupUpdate);

    return () => {
      window.removeEventListener('popupDataUpdated', handlePopupUpdate);
      window.removeEventListener('storage', handlePopupUpdate);
    };
  }, []);

  if (!isOpen) return null;

  if (!welcomeContent) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 sm:p-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-10 w-10 text-white" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            {welcomeContent.title.replace('{userName}', userName)}
          </h2>
          <p className="text-purple-100 text-sm sm:text-base">
            {welcomeContent.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {welcomeContent.subtitle}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              {welcomeContent.description}
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6 mb-8">
            {welcomeContent.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">{index + 1}</span>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                    {feature}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Features Preview */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-8">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              O que você terá acesso após completar o onboarding:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Teacher Poli (IA Personalizada)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Bônus Exclusivos</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Comunidade WhatsApp</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Suporte Personalizado</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
            >
              {welcomeContent.buttonText}
            </button>
            
            {/* Support Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-6 text-center">
              <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                Precisa de ajuda durante o processo?
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Nossa equipe está aqui para te apoiar em cada passo
              </p>
              <SupportButton position="inline" variant="primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}