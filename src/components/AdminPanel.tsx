import React, { useState, useEffect } from 'react';
import { X, Settings, Users, BookOpen, Plus, Edit3, Trash2, Save, Upload, FileText, Video, Award } from 'lucide-react';
import { isAdmin, hasPermission } from '../utils/adminConfig';
import { bonusResources } from '../data/bonusData';
import { BonusResource, BonusLesson, QuizQuestion } from '../types';

interface AdminPanelProps {
  isVisible: boolean;
  onToggle: () => void;
  userEmail: string;
}

export default function AdminPanel({ isVisible, onToggle, userEmail }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'bonuses' | 'students'>('overview');
  const [bonuses, setBonuses] = useState<BonusResource[]>([]);
  const [selectedBonus, setSelectedBonus] = useState<BonusResource | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<BonusLesson | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showNewBonusModal, setShowNewBonusModal] = useState(false);
  const [showNewLessonModal, setShowNewLessonModal] = useState(false);

  // Carregar bônus salvos
  useEffect(() => {
    const savedBonuses = localStorage.getItem('teacherpoli_bonus_data');
    if (savedBonuses) {
      setBonuses(JSON.parse(savedBonuses));
    } else {
      setBonuses(bonusResources);
    }
  }, []);

  // Salvar bônus
  const saveBonuses = (updatedBonuses: BonusResource[]) => {
    setBonuses(updatedBonuses);
    localStorage.setItem('teacherpoli_bonus_data', JSON.stringify(updatedBonuses));
    // Disparar evento para atualizar outros componentes
    window.dispatchEvent(new Event('bonusDataUpdated'));
  };

  // Criar novo bônus
  const createNewBonus = (bonusData: Partial<BonusResource>) => {
    const newBonus: BonusResource = {
      id: `bonus_${Date.now()}`,
      title: bonusData.title || 'Novo Bônus',
      description: bonusData.description || 'Descrição do bônus',
      type: bonusData.type || 'course',
      thumbnail: bonusData.thumbnail || 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=800',
      totalLessons: 0,
      totalDuration: '0h',
      rating: 4.5,
      downloads: 0,
      lessons: []
    };

    const updatedBonuses = [...bonuses, newBonus];
    saveBonuses(updatedBonuses);
    setShowNewBonusModal(false);
  };

  // Atualizar bônus
  const updateBonus = (bonusId: string, updates: Partial<BonusResource>) => {
    const updatedBonuses = bonuses.map(bonus =>
      bonus.id === bonusId ? { ...bonus, ...updates } : bonus
    );
    saveBonuses(updatedBonuses);
    if (selectedBonus?.id === bonusId) {
      setSelectedBonus({ ...selectedBonus, ...updates });
    }
  };

  // Deletar bônus
  const deleteBonus = (bonusId: string) => {
    if (confirm('Tem certeza que deseja deletar este bônus?')) {
      const updatedBonuses = bonuses.filter(bonus => bonus.id !== bonusId);
      saveBonuses(updatedBonuses);
      if (selectedBonus?.id === bonusId) {
        setSelectedBonus(null);
      }
    }
  };

  // Criar nova lição
  const createNewLesson = (lessonData: Partial<BonusLesson>) => {
    if (!selectedBonus) return;

    const newLesson: BonusLesson = {
      id: `lesson_${Date.now()}`,
      title: lessonData.title || 'Nova Lição',
      description: lessonData.description || 'Descrição da lição',
      videoUrl: lessonData.videoUrl || 'https://www.youtube.com/embed/mttHTuEK5Xs',
      duration: lessonData.duration || '10:00',
      textContent: lessonData.textContent || 'Conteúdo da lição...',
      exercises: [],
      completed: false
    };

    const updatedLessons = [...selectedBonus.lessons, newLesson];
    const updatedBonus = {
      ...selectedBonus,
      lessons: updatedLessons,
      totalLessons: updatedLessons.length
    };

    updateBonus(selectedBonus.id, updatedBonus);
    setShowNewLessonModal(false);
  };

  // Atualizar lição
  const updateLesson = (lessonId: string, updates: Partial<BonusLesson>) => {
    if (!selectedBonus) return;

    const updatedLessons = selectedBonus.lessons.map(lesson =>
      lesson.id === lessonId ? { ...lesson, ...updates } : lesson
    );

    const updatedBonus = { ...selectedBonus, lessons: updatedLessons };
    updateBonus(selectedBonus.id, updatedBonus);
    
    if (selectedLesson?.id === lessonId) {
      setSelectedLesson({ ...selectedLesson, ...updates });
    }
  };

  // Deletar lição
  const deleteLesson = (lessonId: string) => {
    if (!selectedBonus) return;
    if (confirm('Tem certeza que deseja deletar esta lição?')) {
      const updatedLessons = selectedBonus.lessons.filter(lesson => lesson.id !== lessonId);
      const updatedBonus = {
        ...selectedBonus,
        lessons: updatedLessons,
        totalLessons: updatedLessons.length
      };
      updateBonus(selectedBonus.id, updatedBonus);
      if (selectedLesson?.id === lessonId) {
        setSelectedLesson(null);
      }
    }
  };

  if (!isAdmin(userEmail)) {
    return null;
  }

  return (
    <>
      {/* Admin Toggle Button */}
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={onToggle}
          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all"
          title="Painel Admin"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>

      {/* Admin Panel */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="bg-white dark:bg-gray-800 w-full max-w-6xl mx-auto my-4 rounded-lg shadow-xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-red-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="h-6 w-6" />
                <h2 className="text-xl font-bold">Painel Administrativo</h2>
              </div>
              <button
                onClick={onToggle}
                className="p-2 hover:bg-red-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Visão Geral
                </button>
                <button
                  onClick={() => setActiveTab('bonuses')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'bonuses'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <BookOpen className="h-4 w-4 inline mr-2" />
                  Gerenciar Bônus
                </button>
                <button
                  onClick={() => setActiveTab('students')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'students'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Users className="h-4 w-4 inline mr-2" />
                  Alunos
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Administrativo</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
                      <div className="flex items-center">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total de Bônus</p>
                          <p className="text-2xl font-bold text-blue-900 dark:text-white">{bonuses.length}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg">
                      <div className="flex items-center">
                        <Video className="h-8 w-8 text-green-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-green-600 dark:text-green-400">Total de Lições</p>
                          <p className="text-2xl font-bold text-green-900 dark:text-white">
                            {bonuses.reduce((total, bonus) => total + bonus.lessons.length, 0)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-lg">
                      <div className="flex items-center">
                        <Users className="h-8 w-8 text-purple-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Usuários Ativos</p>
                          <p className="text-2xl font-bold text-purple-900 dark:text-white">--</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'bonuses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Gerenciar Bônus</h3>
                    <button
                      onClick={() => setShowNewBonusModal(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Bônus
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Lista de Bônus */}
                    <div className="lg:col-span-1">
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                          <h4 className="font-semibold text-gray-900 dark:text-white">Lista de Bônus</h4>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                          {bonuses.map((bonus) => (
                            <div
                              key={bonus.id}
                              className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                selectedBonus?.id === bonus.id ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                              }`}
                              onClick={() => setSelectedBonus(bonus)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900 dark:text-white text-sm">{bonus.title}</h5>
                                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{bonus.lessons.length} lições</p>
                                </div>
                                <div className="flex space-x-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedBonus(bonus);
                                      setIsEditing(true);
                                    }}
                                    className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                  >
                                    <Edit3 className="h-3 w-3" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteBonus(bonus.id);
                                    }}
                                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Detalhes do Bônus */}
                    <div className="lg:col-span-2">
                      {selectedBonus ? (
                        <div className="space-y-6">
                          {/* Informações do Bônus */}
                          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Informações do Bônus</h4>
                              <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                              >
                                {isEditing ? 'Cancelar' : 'Editar'}
                              </button>
                            </div>

                            {isEditing ? (
                              <BonusEditForm
                                bonus={selectedBonus}
                                onSave={(updates) => {
                                  updateBonus(selectedBonus.id, updates);
                                  setIsEditing(false);
                                }}
                                onCancel={() => setIsEditing(false)}
                              />
                            ) : (
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Título</label>
                                  <p className="text-gray-900 dark:text-white">{selectedBonus.title}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descrição</label>
                                  <p className="text-gray-900 dark:text-white">{selectedBonus.description}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label>
                                    <p className="text-gray-900 dark:text-white capitalize">{selectedBonus.type}</p>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Avaliação</label>
                                    <p className="text-gray-900 dark:text-white">{selectedBonus.rating}/5</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Lições */}
                          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                              <h4 className="font-semibold text-gray-900 dark:text-white">Lições ({selectedBonus.lessons.length})</h4>
                              <button
                                onClick={() => setShowNewLessonModal(true)}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center"
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Nova Lição
                              </button>
                            </div>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                              {selectedBonus.lessons.map((lesson, index) => (
                                <div key={lesson.id} className="p-4">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h5 className="font-medium text-gray-900 dark:text-white">{lesson.title}</h5>
                                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{lesson.description}</p>
                                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span>Duração: {lesson.duration}</span>
                                        <span>{lesson.exercises.length} exercícios</span>
                                      </div>
                                    </div>
                                    <div className="flex space-x-2">
                                      <button
                                        onClick={() => setSelectedLesson(lesson)}
                                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                        title="Editar lição"
                                      >
                                        <Edit3 className="h-4 w-4" />
                                      </button>
                                      <button
                                        onClick={() => deleteLesson(lesson.id)}
                                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                                        title="Deletar lição"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
                          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500 dark:text-gray-400">Selecione um bônus para ver os detalhes</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'students' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Gerenciar Alunos</h3>
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Funcionalidade de gerenciamento de alunos em desenvolvimento</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modais */}
      <NewBonusModal
        isOpen={showNewBonusModal}
        onClose={() => setShowNewBonusModal(false)}
        onSave={createNewBonus}
      />

      <NewLessonModal
        isOpen={showNewLessonModal}
        onClose={() => setShowNewLessonModal(false)}
        onSave={createNewLesson}
      />

      <LessonEditModal
        lesson={selectedLesson}
        isOpen={!!selectedLesson}
        onClose={() => setSelectedLesson(null)}
        onSave={(updates) => {
          if (selectedLesson) {
            updateLesson(selectedLesson.id, updates);
            setSelectedLesson(null);
          }
        }}
      />
    </>
  );
}

// Componente para editar bônus
function BonusEditForm({ bonus, onSave, onCancel }: {
  bonus: BonusResource;
  onSave: (updates: Partial<BonusResource>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: bonus.title,
    description: bonus.description,
    type: bonus.type,
    thumbnail: bonus.thumbnail,
    rating: bonus.rating
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="course">Curso</option>
            <option value="ebook">E-book</option>
            <option value="guide">Guia</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avaliação</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL da Thumbnail</label>
        <input
          type="url"
          value={formData.thumbnail}
          onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="flex space-x-3">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

// Modal para criar novo bônus
function NewBonusModal({ isOpen, onClose, onSave }: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BonusResource>) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'course' as const,
    thumbnail: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=800'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      title: '',
      description: '',
      type: 'course',
      thumbnail: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=800'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Criar Novo Bônus</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="course">Curso</option>
                <option value="ebook">E-book</option>
                <option value="guide">Guia</option>
              </select>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Criar Bônus
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Modal para criar nova lição
function NewLessonModal({ isOpen, onClose, onSave }: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BonusLesson>) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: 'https://www.youtube.com/embed/mttHTuEK5Xs',
    duration: '10:00',
    textContent: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      title: '',
      description: '',
      videoUrl: 'https://www.youtube.com/embed/mttHTuEK5Xs',
      duration: '10:00',
      textContent: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Criar Nova Lição</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL do Vídeo</label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duração</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="10:00"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Conteúdo da Lição</label>
              <textarea
                value={formData.textContent}
                onChange={(e) => setFormData(prev => ({ ...prev, textContent: e.target.value }))}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Digite o conteúdo da lição em markdown..."
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Criar Lição
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Modal para editar lição
function LessonEditModal({ lesson, isOpen, onClose, onSave }: {
  lesson: BonusLesson | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: Partial<BonusLesson>) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    duration: '',
    textContent: '',
    exercises: [] as QuizQuestion[]
  });

  const [newExercise, setNewExercise] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });

  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title,
        description: lesson.description,
        videoUrl: lesson.videoUrl,
        duration: lesson.duration,
        textContent: lesson.textContent,
        exercises: lesson.exercises
      });
    }
  }, [lesson]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addExercise = () => {
    if (!newExercise.question || newExercise.options.some(opt => !opt)) {
      alert('Preencha a pergunta e todas as opções');
      return;
    }

    const exercise: QuizQuestion = {
      id: `exercise_${Date.now()}`,
      question: newExercise.question,
      options: newExercise.options,
      correctAnswer: newExercise.correctAnswer,
      explanation: newExercise.explanation
    };

    setFormData(prev => ({
      ...prev,
      exercises: [...prev.exercises, exercise]
    }));

    setNewExercise({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    });
  };

  const removeExercise = (exerciseId: string) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== exerciseId)
    }));
  };

  if (!isOpen || !lesson) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Editar Lição</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duração</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL do Vídeo</label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Conteúdo da Lição</label>
              <textarea
                value={formData.textContent}
                onChange={(e) => setFormData(prev => ({ ...prev, textContent: e.target.value }))}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Exercícios existentes */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                Exercícios ({formData.exercises.length})
              </h4>
              
              {formData.exercises.map((exercise, index) => (
                <div key={exercise.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-3">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-900 dark:text-white">Exercício {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeExercise(exercise.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{exercise.question}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {exercise.options.map((option, optIndex) => (
                      <div key={optIndex} className={`p-2 rounded ${
                        optIndex === exercise.correctAnswer 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                          : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}>
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Adicionar novo exercício */}
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">Adicionar Novo Exercício</h5>
                
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      value={newExercise.question}
                      onChange={(e) => setNewExercise(prev => ({ ...prev, question: e.target.value }))}
                      placeholder="Digite a pergunta..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {newExercise.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={newExercise.correctAnswer === index}
                          onChange={() => setNewExercise(prev => ({ ...prev, correctAnswer: index }))}
                          className="text-green-600"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...newExercise.options];
                            newOptions[index] = e.target.value;
                            setNewExercise(prev => ({ ...prev, options: newOptions }));
                          }}
                          placeholder={`Opção ${index + 1}...`}
                          className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      value={newExercise.explanation}
                      onChange={(e) => setNewExercise(prev => ({ ...prev, explanation: e.target.value }))}
                      placeholder="Explicação (opcional)..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={addExercise}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    Adicionar Exercício
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}