import React, { useState } from 'react';
import { Play, CheckCircle, Clock } from 'lucide-react';
import SupportButton from './SupportButton';
import { OnboardingVideo, getOnboardingVideos, saveOnboardingVideos } from '../data/onboardingData';

export default function OnboardingSection() {
  const [videos, setVideos] = useState<OnboardingVideo[]>(getOnboardingVideos());
  const [selectedVideo, setSelectedVideo] = useState<OnboardingVideo | null>(videos[0]);
  const [showPlayer, setShowPlayer] = useState(true);

  // Atualizar videos quando dados mudarem e escutar mudanças do admin
  React.useEffect(() => {
    const loadVideos = () => {
      const updatedVideos = getOnboardingVideos();
      setVideos(updatedVideos);
      if (!selectedVideo && updatedVideos.length > 0) {
        setSelectedVideo(updatedVideos[0]);
      }
    };

    // Carregar dados iniciais
    loadVideos();

    // Escutar mudanças do admin
    const handleDataUpdate = () => {
      loadVideos();
    };

    window.addEventListener('onboardingDataUpdated', handleDataUpdate);
    window.addEventListener('storage', handleDataUpdate);

    return () => {
      window.removeEventListener('onboardingDataUpdated', handleDataUpdate);
      window.removeEventListener('storage', handleDataUpdate);
    };
  }, [selectedVideo]);

  const handleVideoSelect = (video: OnboardingVideo) => {
    setSelectedVideo(video);
    setShowPlayer(true);
  };

  const markAsCompleted = (videoId: string) => {
    setVideos(prevVideos => 
      prevVideos.map(video => 
        video.id === videoId 
          ? { ...video, completed: true }
          : video
      )
    );
    
    // Salvar no localStorage
    const updatedVideos = videos.map(video => 
      video.id === videoId 
        ? { ...video, completed: true }
        : video
    );
    saveOnboardingVideos(updatedVideos);
    
    // Update selected video if it's the one being marked as completed
    if (selectedVideo?.id === videoId) {
      setSelectedVideo(prev => prev ? { ...prev, completed: true } : null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Comece por Aqui</h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Dê os primeiros passos na sua jornada de aprendizado com a Teacher Poli</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Video List */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lista de Vídeos</h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    'hover:bg-gray-50 dark:hover:bg-gray-700'
                  } ${
                    selectedVideo?.id === video.id ? 'bg-purple-50 dark:bg-purple-900/30 border-r-4 border-purple-500' : ''
                  }`}
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {video.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500 fill-current" />
                      ) : (
                        <Play className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                        {video.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {video.duration}
                        </div>
                        {video.completed && (
                          <span className="text-xs text-green-600 font-medium">Concluída</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            {selectedVideo && showPlayer ? (
              <div>
                <div className="aspect-video rounded-t-lg overflow-hidden">
                  <iframe
                    src={selectedVideo.embedUrl}
                    title={selectedVideo.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 pr-4">
                        {selectedVideo.title}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        {selectedVideo.description}
                      </p>
                    </div>
                    {!selectedVideo.completed && (
                      <button
                        onClick={() => markAsCompleted(selectedVideo.id)}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium whitespace-nowrap flex items-center flex-shrink-0"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="hidden xs:inline">Marcar como Concluído</span>
                        <span className="xs:hidden">Concluído</span>
                      </button>
                    )}
                    {selectedVideo.completed && (
                      <div className="flex items-center text-green-600 dark:text-green-400 font-medium text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 fill-current" />
                        <span>Concluída</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video flex items-center justify-center bg-gray-100 rounded-t-lg">
                <div className="text-center">
                  <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Selecione um vídeo para começar</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="mt-6 sm:mt-8 bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 sm:p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Precisa de ajuda?</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Nossa equipe está aqui para te apoiar em cada passo</p>
        <SupportButton position="inline" variant="primary" />
      </div>

      {/* Fixed Support Button */}
      <SupportButton />
    </div>
  );
}