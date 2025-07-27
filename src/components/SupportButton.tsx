import React, { useState } from 'react';
import { MessageCircle, X, Mail, Phone } from 'lucide-react';

interface SupportButtonProps {
  position?: 'fixed' | 'inline';
  variant?: 'primary' | 'secondary';
}

export default function SupportButton({ position = 'fixed', variant = 'primary' }: SupportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const supportOptions = [
    {
      title: 'Email',
      description: 'Resposta em até 24h',
      icon: Mail,
      action: () => window.open('mailto:suporte@teacherpoli.com', '_blank'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'WhatsApp',
      description: 'Suporte imediato',
      icon: MessageCircle,
      action: () => window.open('https://wa.me/5511999999999', '_blank'),
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  if (position === 'inline') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            variant === 'primary'
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Suporte
        </button>

        {isOpen && (
         <div className="absolute top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
            <div className="p-4">
             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Como podemos ajudar?</h3>
              <div className="space-y-2">
                {supportOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        option.action();
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center p-3 rounded-lg text-white transition-colors ${option.color}`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium text-white">{option.title}</div>
                        <div className="text-sm opacity-90 text-white">{option.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Fixed Support Button */}
      <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-purple-600 hover:bg-purple-700 text-white p-3 lg:p-4 rounded-full shadow-lg transition-all transform hover:scale-110"
        >
          {isOpen ? (
            <X className="h-5 w-5 lg:h-6 lg:w-6" />
          ) : (
            <MessageCircle className="h-5 w-5 lg:h-6 lg:w-6" />
          )}
        </button>
      </div>

      {/* Support Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 lg:p-8">
         <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md">
            <div className="text-center mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
             <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Precisa de Ajuda?</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Escolha a melhor forma de entrar em contato</p>
            </div>

            <div className="space-y-3 mb-4 sm:mb-6">
              {supportOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      option.action();
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center p-3 sm:p-4 rounded-lg text-white transition-colors ${option.color}`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-semibold text-base sm:text-lg text-white">{option.title}</div>
                      <div className="text-xs sm:text-sm opacity-90 text-white">{option.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2 sm:py-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}