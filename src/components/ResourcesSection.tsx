import React from 'react';
import { Download, FileText, Headphones, Video, BookOpen, Star, Play, ArrowRight, Clock, Award } from 'lucide-react';
import SupportButton from './SupportButton';
import { bonusResources } from '../data/bonusData';
import BonusDetailPage from './BonusDetailPage';

export default function ResourcesSection() {
  const [selectedBonus, setSelectedBonus] = React.useState<string | null>(null);
  const [currentBonuses, setCurrentBonuses] = React.useState(() => {
    const saved = localStorage.getItem('teacherpoli_bonus_data');
    return saved ? JSON.parse(saved) : bonusResources;
  });

  // Carregar bônus salvos do localStorage e escutar mudanças
  React.useEffect(() => {
    const loadBonuses = () => {
      const savedBonuses = localStorage.getItem('teacherpoli_bonus_data');
      if (savedBonuses) {
        try {
          const parsedBonuses = JSON.parse(savedBonuses);
          setCurrentBonuses(parsedBonuses);
        } catch (error) {
          console.error('Erro ao carregar bônus salvos:', error);
        }
      }
    };

    // Carregar dados iniciais
    loadBonuses();

    // Escutar mudanças do admin
    const handleStorageChange = () => {
      loadBonuses();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('bonusDataUpdated', loadBonuses);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('bonusDataUpdated', loadBonuses);
    };
  }, []);

  if (selectedBonus) {
    const bonus = currentBonuses.find(b => b.id === selectedBonus);
    if (bonus) {
      return (
        <BonusDetailPage 
          bonus={bonus} 
          onBack={() => setSelectedBonus(null)} 
        />
      );
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'ebook':
        return FileText;
      case 'audio':
        return Headphones;
      case 'course':
        return Video;
      case 'guide':
        return BookOpen;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ebook':
        return 'bg-red-100 text-red-600';
      case 'audio':
        return 'bg-green-100 text-green-600';
      case 'course':
        return 'bg-blue-100 text-blue-600';
      case 'guide':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Bônus Exclusivos</h2>
        <p className="text-sm sm:text-base text-gray-600">Materiais extras e conteúdos especiais para turbinar seus estudos</p>
      </div>

      {/* Featured Resource */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 sm:p-8 mb-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm font-medium mb-4">
              <Star className="h-4 w-4 mr-1" />
              Bônus Especial
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              {currentBonuses.find(b => b.id === 'curso-intensivo-30-dias')?.title || 'Curso Intensivo de 30 Dias'}
            </h3>
            <p className="text-purple-100 mb-6 text-sm sm:text-base">
              {currentBonuses.find(b => b.id === 'curso-intensivo-30-dias')?.description || 'Um programa completo para acelerar seu aprendizado de inglês'}
            </p>
            <button 
              onClick={() => setSelectedBonus('curso-intensivo-30-dias')}
              className="inline-flex items-center px-4 sm:px-6 py-3 bg-white text-purple-600 text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Play className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Acessar Curso</span>
              <span className="sm:hidden">Acessar</span>
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
              <div>
                <div className="text-lg sm:text-2xl font-bold">{currentBonuses.find(b => b.id === 'curso-intensivo-30-dias')?.totalLessons || 30} dias</div>
                <div className="text-purple-200 text-xs sm:text-sm">de atividades</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold">{currentBonuses.find(b => b.id === 'curso-intensivo-30-dias')?.totalDuration || '+ de 30h'}</div>
                <div className="text-purple-200 text-xs sm:text-sm">de aulas</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold">300+</div>
                <div className="text-purple-200 text-xs sm:text-sm">exercícios</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold">100%</div>
                <div className="text-purple-200 text-xs sm:text-sm">gratuito</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {currentBonuses.filter(resource => resource.id !== 'curso-intensivo-30-dias').map((resource) => {
          const Icon = getIcon(resource.type);
          return (
            <div key={resource.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Thumbnail */}
              <div className="relative h-48 bg-gray-200">
                <img 
                  src={resource.thumbnail} 
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(resource.type)}`}>
                    {resource.type.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${getTypeColor(resource.type)}`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3">{resource.description}</p>
              
              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-xs">{resource.totalDuration}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span className="text-xs">{resource.totalLessons} aulas</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-xs sm:text-sm">{resource.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-500">{resource.downloads} downloads</span>
                <button 
                  onClick={() => setSelectedBonus(resource.id)}
                  className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Acessar</span>
                  <span className="sm:hidden">Ver</span>
                </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Study Tips */}
      <div className="mt-8 sm:mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Dicas de Estudo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">📚</span>
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Estude Diariamente</h4>
            <p className="text-gray-600 text-xs sm:text-sm">Dedique pelo menos 30 minutos por dia aos estudos</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">🎧</span>
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Pratique a Escuta</h4>
            <p className="text-gray-600 text-xs sm:text-sm">Ouça podcasts e músicas em inglês regularmente</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">💬</span>
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Pratique Conversação</h4>
            <p className="text-gray-600 text-xs sm:text-sm">Converse com outros estudantes na comunidade</p>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="mt-8 bg-green-50 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Problemas com downloads?</h3>
        <p className="text-gray-600 mb-4">Entre em contato para resolver rapidamente</p>
        <SupportButton position="inline" variant="primary" />
      </div>

      {/* Fixed Support Button */}
      <SupportButton />
    </div>
  );
}