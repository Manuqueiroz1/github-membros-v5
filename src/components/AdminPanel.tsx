import React, { useState } from 'react';
import { X, Settings, Users, BookOpen, Video, Plus, Edit3, Trash2, Save, Eye, EyeOff } from 'lucide-react';
import { isAdmin, hasPermission } from '../utils/adminConfig';
import { addStudent, getStudents, removeStudent, updateStudentStatus, searchStudents, getStudentStats, ManualStudent } from '../utils/studentManager';
import { getOnboardingVideos, saveOnboardingVideos, getPopupContents, savePopupContents, OnboardingVideo, PopupContent } from '../data/onboardingData';
import { bonusResources } from '../data/bonusData';
import { BonusResource, BonusLesson, QuizQuestion } from '../types';

interface AdminPanelProps {
  isVisible: boolean;
  onToggle: () => void;
  userEmail: string;
}

export default function AdminPanel({ isVisible, onToggle, userEmail }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState<ManualStudent[]>([]);
  const [studentStats, setStudentStats] = useState({ total: 0, active: 0, inactive: 0, addedThisMonth: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', notes: '' });
  
  // Onboarding states
  const [onboardingVideos, setOnboardingVideos] = useState<OnboardingVideo[]>([]);
  const [popupContents, setPopupContents] = useState<PopupContent[]>([]);
  const [editingVideo, setEditingVideo] = useState<OnboardingVideo | null>(null);
  const [editingPopup, setEditingPopup] = useState<PopupContent | null>(null);

  // Bonus management states
  const [bonuses, setBonuses] = useState<BonusResource[]>(() => {
    const saved = localStorage.getItem('teacherpoli_bonus_data');
    return saved ? JSON.parse(saved) : bonusResources;
  });
  const [editingBonus, setEditingBonus] = useState<BonusResource | null>(null);
  const [editingLesson, setEditingLesson] = useState<{ bonus: BonusResource; lesson: BonusLesson } | null>(null);
  const [showNewBonus, setShowNewBonus] = useState(false);
  const [showNewLesson, setShowNewLesson] = useState<string | null>(null);

  // Load data on mount
  React.useEffect(() => {
    if (isVisible && isAdmin(userEmail)) {
      loadStudents();
      loadOnboardingData();
    }
  }, [isVisible, userEmail]);

  const loadStudents = async () => {
    try {
      const [studentsData, stats] = await Promise.all([
        getStudents(),
        getStudentStats()
      ]);
      setStudents(studentsData);
      setStudentStats(stats);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
    }
  };

  const loadOnboardingData = () => {
    setOnboardingVideos(getOnboardingVideos());
    setPopupContents(getPopupContents());
  };

  const handleAddStudent = async () => {
    if (!newStudent.name || !newStudent.email) return;
    
    setIsLoading(true);
    try {
      await addStudent({
        ...newStudent,
        added_by: userEmail
      });
      
      setNewStudent({ name: '', email: '', notes: '' });
      setShowAddStudent(false);
      await loadStudents();
    } catch (error) {
      alert('Erro ao adicionar aluno: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveStudent = async (studentId: string) => {
    if (!confirm('Tem certeza que deseja remover este aluno?')) return;
    
    try {
      await removeStudent(studentId);
      await loadStudents();
    } catch (error) {
      alert('Erro ao remover aluno: ' + (error as Error).message);
    }
  };

  const handleToggleStudentStatus = async (studentId: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await updateStudentStatus(studentId, newStatus);
      await loadStudents();
    } catch (error) {
      alert('Erro ao atualizar status: ' + (error as Error).message);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      await loadStudents();
      return;
    }
    
    try {
      const results = await searchStudents(searchQuery);
      setStudents(results);
    } catch (error) {
      console.error('Erro na busca:', error);
    }
  };

  const saveOnboardingData = () => {
    saveOnboardingVideos(onboardingVideos);
    savePopupContents(popupContents);
    window.dispatchEvent(new Event('onboardingDataUpdated'));
    window.dispatchEvent(new Event('popupDataUpdated'));
  };

  const saveBonusData = () => {
    localStorage.setItem('teacherpoli_bonus_data', JSON.stringify(bonuses));
    window.dispatchEvent(new Event('bonusDataUpdated'));
  };

  const handleSaveBonus = (updatedBonus: BonusResource) => {
    setBonuses(prev => prev.map(b => b.id === updatedBonus.id ? updatedBonus : b));
    setEditingBonus(null);
    saveBonusData();
  };

  const handleDeleteBonus = (bonusId: string) => {
    if (!confirm('Tem certeza que deseja deletar este bônus?')) return;
    setBonuses(prev => prev.filter(b => b.id !== bonusId));
    saveBonusData();
  };

  const handleCreateBonus = (newBonus: Omit<BonusResource, 'id'>) => {
    const bonus: BonusResource = {
      ...newBonus,
      id: `bonus_${Date.now()}`
    };
    setBonuses(prev => [...prev, bonus]);
    setShowNewBonus(false);
    saveBonusData();
  };

  const handleSaveLesson = (bonusId: string, updatedLesson: BonusLesson) => {
    setBonuses(prev => prev.map(b => 
      b.id === bonusId 
        ? { ...b, lessons: b.lessons.map(l => l.id === updatedLesson.id ? updatedLesson : l) }
        : b
    ));
    setEditingLesson(null);
    saveBonusData();
  };

  const handleDeleteLesson = (bonusId: string, lessonId: string) => {
    if (!confirm('Tem certeza que deseja deletar esta lição?')) return;
    setBonuses(prev => prev.map(b => 
      b.id === bonusId 
        ? { ...b, lessons: b.lessons.filter(l => l.id !== lessonId) }
        : b
    ));
    saveBonusData();
  };

  const handleCreateLesson = (bonusId: string, newLesson: Omit<BonusLesson, 'id'>) => {
    const lesson: BonusLesson = {
      ...newLesson,
      id: `lesson_${Date.now()}`
    };
    setBonuses(prev => prev.map(b => 
      b.id === bonusId 
        ? { ...b, lessons: [...b.lessons, lesson], totalLessons: b.totalLessons + 1 }
        : b
    ));
    setShowNewLesson(null);
    saveBonusData();
  };

  if (!isVisible || !isAdmin(userEmail)) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Settings className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Painel Administrativo</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Gerencie conteúdo e usuários</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'students', label: 'Alunos Manuais', icon: Users },
              { id: 'onboarding', label: 'Onboarding', icon: Video },
              { id: 'bonuses', label: 'Gerenciar Bônus', icon: BookOpen }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600 dark:text-red-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{studentStats.total}</div>
                  <div className="text-sm text-blue-800 dark:text-blue-300">Total de Alunos</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{studentStats.active}</div>
                  <div className="text-sm text-green-800 dark:text-green-300">Ativos</div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">{studentStats.inactive}</div>
                  <div className="text-sm text-red-800 dark:text-red-300">Inativos</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{studentStats.addedThisMonth}</div>
                  <div className="text-sm text-purple-800 dark:text-purple-300">Este Mês</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Buscar por nome ou email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Buscar
                  </button>
                </div>
                <button
                  onClick={() => setShowAddStudent(true)}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Aluno
                </button>
              </div>

              {/* Students List */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Aluno
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Adicionado em
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {students.map((student) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{student.email}</div>
                              {student.notes && (
                                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{student.notes}</div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              student.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                              {student.status === 'active' ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(student.added_at).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleToggleStudentStatus(student.id, student.status)}
                              className={`px-3 py-1 rounded text-xs font-medium ${
                                student.status === 'active'
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
                                  : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
                              }`}
                            >
                              {student.status === 'active' ? 'Desativar' : 'Ativar'}
                            </button>
                            <button
                              onClick={() => handleRemoveStudent(student.id)}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                            >
                              Remover
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Onboarding Tab */}
          {activeTab === 'onboarding' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gerenciar Conteúdo de Onboarding</h3>
              
              {/* Videos */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Vídeos de Boas-vindas</h4>
                <div className="space-y-3">
                  {onboardingVideos.map((video) => (
                    <div key={video.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">{video.title}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{video.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Duração: {video.duration}</p>
                      </div>
                      <button
                        onClick={() => setEditingVideo(video)}
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Editar
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pop-ups */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Pop-ups do Sistema</h4>
                <div className="space-y-3">
                  {popupContents.map((popup) => (
                    <div key={popup.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">{popup.title}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{popup.subtitle}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Tipo: {popup.type}</p>
                      </div>
                      <button
                        onClick={() => setEditingPopup(popup)}
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Editar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bonuses Tab */}
          {activeTab === 'bonuses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gerenciar Bônus</h3>
                <button
                  onClick={() => setShowNewBonus(true)}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Bônus
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {bonuses.map((bonus) => (
                  <div key={bonus.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{bonus.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{bonus.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <span>{bonus.totalLessons} lições</span>
                          <span>{bonus.totalDuration}</span>
                          <span>⭐ {bonus.rating}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingBonus(bonus)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBonus(bonus.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white">Lições ({bonus.lessons.length})</h5>
                        <button
                          onClick={() => setShowNewLesson(bonus.id)}
                          className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          + Nova Lição
                        </button>
                      </div>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {bonus.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{lesson.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{lesson.duration} • {lesson.exercises.length} exercícios</p>
                            </div>
                            <div className="flex space-x-1">
                              <button
                                onClick={() => setEditingLesson({ bonus, lesson })}
                                className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                              >
                                <Edit3 className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteLesson(bonus.id, lesson.id)}
                                className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        {/* Add Student Modal */}
        {showAddStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Adicionar Novo Aluno</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <textarea
                  placeholder="Observações (opcional)"
                  value={newStudent.notes}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  rows={3}
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddStudent(false)}
                  className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddStudent}
                  disabled={isLoading || !newStudent.name || !newStudent.email}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Adicionando...' : 'Adicionar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Video Modal */}
        {editingVideo && (
          <EditVideoModal
            video={editingVideo}
            onSave={(updatedVideo) => {
              setOnboardingVideos(prev => prev.map(v => v.id === updatedVideo.id ? updatedVideo : v));
              setEditingVideo(null);
              saveOnboardingData();
            }}
            onClose={() => setEditingVideo(null)}
          />
        )}

        {/* Edit Popup Modal */}
        {editingPopup && (
          <EditPopupModal
            popup={editingPopup}
            onSave={(updatedPopup) => {
              setPopupContents(prev => prev.map(p => p.id === updatedPopup.id ? updatedPopup : p));
              setEditingPopup(null);
              saveOnboardingData();
            }}
            onClose={() => setEditingPopup(null)}
          />
        )}

        {/* New Bonus Modal */}
        {showNewBonus && (
          <NewBonusModal
            onSave={handleCreateBonus}
            onClose={() => setShowNewBonus(false)}
          />
        )}

        {/* Edit Bonus Modal */}
        {editingBonus && (
          <EditBonusModal
            bonus={editingBonus}
            onSave={handleSaveBonus}
            onClose={() => setEditingBonus(null)}
          />
        )}

        {/* New Lesson Modal */}
        {showNewLesson && (
          <NewLessonModal
            bonusId={showNewLesson}
            onSave={(lesson) => handleCreateLesson(showNewLesson, lesson)}
            onClose={() => setShowNewLesson(null)}
          />
        )}

        {/* Edit Lesson Modal */}
        {editingLesson && (
          <EditLessonModal
            lesson={editingLesson.lesson}
            onSave={(lesson) => handleSaveLesson(editingLesson.bonus.id, lesson)}
            onClose={() => setEditingLesson(null)}
          />
        )}
      </div>
    </div>
  );
}

// Helper Components
function EditVideoModal({ video, onSave, onClose }: { video: OnboardingVideo; onSave: (video: OnboardingVideo) => void; onClose: () => void }) {
  const [formData, setFormData] = useState(video);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Editar Vídeo</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <textarea
            placeholder="Descrição"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            rows={3}
          />
          <input
            type="text"
            placeholder="Duração (ex: 2:30)"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <input
            type="url"
            placeholder="URL do vídeo (YouTube embed)"
            value={formData.embedUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, embedUrl: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(formData)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

function EditPopupModal({ popup, onSave, onClose }: { popup: PopupContent; onSave: (popup: PopupContent) => void; onClose: () => void }) {
  const [formData, setFormData] = useState(popup);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Editar Pop-up</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Subtítulo"
            value={formData.subtitle}
            onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <textarea
            placeholder="Descrição"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            rows={4}
          />
          <input
            type="text"
            placeholder="Texto do botão"
            value={formData.buttonText}
            onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Features (uma por linha)
            </label>
            <textarea
              value={formData.features.join('\n')}
              onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value.split('\n').filter(f => f.trim()) }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              rows={6}
            />
          </div>
        </div>
        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(formData)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

function NewBonusModal({ onSave, onClose }: { onSave: (bonus: Omit<BonusResource, 'id'>) => void; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'course' as 'course' | 'ebook' | 'guide',
    thumbnail: '',
    totalLessons: 0,
    totalDuration: '',
    rating: 4.5,
    downloads: 0,
    lessons: []
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Criar Novo Bônus</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título do bônus"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <textarea
            placeholder="Descrição"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            rows={3}
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="course">Curso</option>
            <option value="ebook">E-book</option>
            <option value="guide">Guia</option>
          </select>
          <input
            type="url"
            placeholder="URL da thumbnail"
            value={formData.thumbnail}
            onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Duração total (ex: 4h 30min)"
            value={formData.totalDuration}
            onChange={(e) => setFormData(prev => ({ ...prev, totalDuration: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <input
            type="number"
            placeholder="Avaliação (1-5)"
            min="1"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={!formData.title || !formData.description}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            Criar Bônus
          </button>
        </div>
      </div>
    </div>
  );
}

function EditBonusModal({ bonus, onSave, onClose }: { bonus: BonusResource; onSave: (bonus: BonusResource) => void; onClose: () => void }) {
  const [formData, setFormData] = useState(bonus);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Editar Bônus</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título do bônus"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <textarea
            placeholder="Descrição"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            rows={3}
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="course">Curso</option>
            <option value="ebook">E-book</option>
            <option value="guide">Guia</option>
          </select>
          <input
            type="url"
            placeholder="URL da thumbnail"
            value={formData.thumbnail}
            onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Duração total (ex: 4h 30min)"
            value={formData.totalDuration}
            onChange={(e) => setFormData(prev => ({ ...prev, totalDuration: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <input
            type="number"
            placeholder="Avaliação (1-5)"
            min="1"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(formData)}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}

function NewLessonModal({ bonusId, onSave, onClose }: { bonusId: string; onSave: (lesson: Omit<BonusLesson, 'id'>) => void; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    duration: '',
    textContent: '',
    exercises: [] as QuizQuestion[],
    completed: false
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Criar Nova Lição</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título da lição"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <textarea
            placeholder="Descrição"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            rows={2}
          />
          <input
            type="url"
            placeholder="URL do vídeo (YouTube embed)"
            value={formData.videoUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Duração (ex: 25:30)"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <textarea
            placeholder="Conteúdo da lição (texto/markdown)"
            value={formData.textContent}
            onChange={(e) => setFormData(prev => ({ ...prev, textContent: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            rows={6}
          />
        </div>
        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={!formData.title || !formData.description}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            Criar Lição
          </button>
        </div>
      </div>
    </div>
  );
}

function EditLessonModal({ lesson, onSave, onClose }: { lesson: BonusLesson; onSave: (lesson: BonusLesson) => void; onClose: () => void }) {
  const [formData, setFormData] = useState(lesson);
  const [newExercise, setNewExercise] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });

  const addExercise = () => {
    if (!newExercise.question || newExercise.options.some(opt => !opt.trim())) return;
    
    const exercise: QuizQuestion = {
      id: `exercise_${Date.now()}`,
      ...newExercise
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Editar Lição</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lesson Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Informações da Lição</h4>
            <input
              type="text"
              placeholder="Título da lição"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <textarea
              placeholder="Descrição"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              rows={2}
            />
            <input
              type="url"
              placeholder="URL do vídeo"
              value={formData.videoUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Duração"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <textarea
              placeholder="Conteúdo da lição"
              value={formData.textContent}
              onChange={(e) => setFormData(prev => ({ ...prev, textContent: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              rows={8}
            />
          </div>

          {/* Exercises */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Exercícios ({formData.exercises.length})</h4>
            
            {/* Existing Exercises */}
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {formData.exercises.map((exercise, index) => (
                <div key={exercise.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {index + 1}. {exercise.question}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Resposta: {exercise.options[exercise.correctAnswer]}
                      </p>
                    </div>
                    <button
                      onClick={() => removeExercise(exercise.id)}
                      className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Exercise */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Adicionar Exercício</h5>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Pergunta"
                  value={newExercise.question}
                  onChange={(e) => setNewExercise(prev => ({ ...prev, question: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
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
                      placeholder={`Opção ${index + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newExercise.options];
                        newOptions[index] = e.target.value;
                        setNewExercise(prev => ({ ...prev, options: newOptions }));
                      }}
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Explicação (opcional)"
                  value={newExercise.explanation}
                  onChange={(e) => setNewExercise(prev => ({ ...prev, explanation: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={addExercise}
                  disabled={!newExercise.question || newExercise.options.some(opt => !opt.trim())}
                  className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                >
                  Adicionar Exercício
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(formData)}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}