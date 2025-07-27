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
          <div className="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Como podemos ajudar?</h3>
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
                        <div className="font-medium">{option.title}</div>
                        <div className="text-sm opacity-90">{option.description}</div>
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
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Support Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Precisa de Ajuda?</h2>
              <p className="text-gray-600">Escolha a melhor forma de entrar em contato</p>
            </div>

            <div className="space-y-3 mb-6">
              {supportOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      option.action();
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center p-4 rounded-lg text-white transition-colors ${option.color}`}
                  >
                    <Icon className="h-6 w-6 mr-4" />
                    <div className="text-left">
                      <div className="font-semibold text-lg">{option.title}</div>
                      <div className="text-sm opacity-90">{option.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}