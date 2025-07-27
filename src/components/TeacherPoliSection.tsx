import React from 'react';
import { ExternalLink, Star, ArrowRight } from 'lucide-react';
import SupportButton from './SupportButton';

export default function TeacherPoliSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Teacher Poli</h2>
        <p className="text-sm sm:text-base text-gray-600">Sua assistente de IA para aprender inglês de forma personalizada</p>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 sm:p-8 mb-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-center">
          <div>
            <h3 className="text-xl sm:text-3xl font-bold mb-4">Converse com a Teacher Poli</h3>
            <p className="text-purple-100 mb-6 text-sm sm:text-lg">Sua assistente de IA que adapta o ensino ao seu ritmo e necessidades</p>
            <div className="flex flex-col gap-3 sm:gap-4">
              <a
                href="https://app.teacherpoli.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 font-bold text-sm sm:text-lg rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                <span className="hidden sm:inline">Entrar na Teacher Poli</span>
                <span className="sm:hidden">Entrar</span>
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
              <button className="inline-flex items-center justify-center px-4 sm:px-6 py-3 border-2 border-white text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-white hover:text-purple-600 transition-colors">
                <span className="hidden sm:inline">Ver Demonstração</span>
                <span className="sm:hidden">Demo</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
              <p className="text-purple-100 italic text-sm sm:text-base">
                "A Teacher Poli revolucionou meu aprendizado. É como ter uma professora particular 24/7!"
              </p>
              <p className="text-purple-200 mt-2 font-medium text-xs sm:text-sm">- João Santos, Estudante</p>
            </div>
          </div>
        </div>
      </div>

      {/* Access Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-8 mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">Acesse a Teacher Poli</h3>
        <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8">Sua assistente de IA está esperando por você</p>
        
        <div className="text-center">
          <a
            href="https://app.teacherpoli.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 sm:px-16 py-4 sm:py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg sm:text-2xl rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-2xl transform hover:scale-105"
          >
            <ExternalLink className="mr-3 sm:mr-4 h-6 w-6 sm:h-8 sm:w-8" />
            <span className="hidden sm:inline">Entrar na Teacher Poli</span>
            <span className="sm:hidden">Entrar</span>
          </a>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Precisa de ajuda para acessar?</p>
          <a
            href="mailto:suporte@teacherpoli.com"
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <span className="mr-2">📧</span>
            Falar com Suporte
          </a>
        </div>
      </div>

      {/* Support Section */}
      <div className="mt-8 bg-purple-50 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Dificuldades para acessar?</h3>
        <p className="text-gray-600 mb-4">Estamos aqui para te ajudar a começar sua jornada</p>
        <SupportButton position="inline" variant="primary" />
      </div>

      {/* Fixed Support Button */}
      <SupportButton />
    </div>
  );
}
