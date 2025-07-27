import React from 'react';
import { MessageCircle, Users, ExternalLink, Phone, Calendar } from 'lucide-react';
import SupportButton from './SupportButton';

export default function CommunitySection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Comunidade</h2>
        <p className="text-sm sm:text-base text-gray-600">Conecte-se com outros estudantes e pratique seu inglês</p>
      </div>

      {/* WhatsApp Community */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 sm:p-8 mb-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-center">
          <div>
            <h3 className="text-xl sm:text-3xl font-bold mb-4">Grupo WhatsApp Exclusivo</h3>
            <p className="text-green-100 mb-6 text-sm sm:text-lg">
              Junte-se à nossa comunidade de estudantes e pratique inglês todos os dias
            </p>
            <div className="flex flex-col gap-3 sm:gap-4">
              <a
                href="https://chat.whatsapp.com/exemplo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 sm:px-8 py-3 sm:py-4 bg-white text-green-600 font-bold text-sm sm:text-lg rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Entrar no Grupo WhatsApp</span>
                <span className="sm:hidden">Entrar no Grupo</span>
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                <div>
                  <div className="text-lg sm:text-2xl font-bold">500+</div>
                  <div className="text-green-200 text-xs sm:text-sm">Membros Ativos</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold">24/7</div>
                  <div className="text-green-200 text-xs sm:text-sm">Suporte</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold">Diário</div>
                  <div className="text-green-200 text-xs sm:text-sm">Atividades</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold">100%</div>
                  <div className="text-green-200 text-xs sm:text-sm">Gratuito</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <MessageCircle className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Conversação Diária</h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-4">
            Pratique inglês todos os dias com outros estudantes em conversas guiadas
          </p>
          <button className="text-blue-600 text-xs sm:text-sm font-medium hover:text-blue-700">
            Participar →
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Grupos de Estudo</h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-4">
            Forme grupos de estudo com pessoas do seu nível e objetivos similares
          </p>
          <button className="text-purple-600 text-xs sm:text-sm font-medium hover:text-purple-700">
            Encontrar Grupo →
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Calendar className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Eventos Semanais</h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-4">
            Participe de eventos especiais, webinars e sessões de conversação ao vivo
          </p>
          <button className="text-green-600 text-xs sm:text-sm font-medium hover:text-green-700">
            Ver Agenda →
          </button>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Diretrizes da Comunidade</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">✅ Faça</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li>• Seja respeitoso com todos os membros</li>
              <li>• Pratique inglês regularmente</li>
              <li>• Ajude outros estudantes</li>
              <li>• Compartilhe recursos úteis</li>
              <li>• Participe das atividades propostas</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">❌ Não Faça</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li>• Spam ou mensagens promocionais</li>
              <li>• Linguagem ofensiva ou inadequada</li>
              <li>• Compartilhar conteúdo não relacionado</li>
              <li>• Desrespeitar outros membros</li>
              <li>• Monopolizar as conversações</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="mt-8 bg-yellow-50 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Não consegue acessar a comunidade?</h3>
        <p className="text-gray-600 mb-4">Vamos te ajudar a se conectar com outros estudantes</p>
        <SupportButton position="inline" variant="primary" />
      </div>

      {/* Fixed Support Button */}
      <SupportButton />
    </div>
  );
}