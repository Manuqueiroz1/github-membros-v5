import React, { useState } from 'react';
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, Award, Star, Download } from 'lucide-react';
import { BonusResource, BonusLesson } from '../types';
import LessonViewer from './LessonViewer';
import SupportButton from './SupportButton';

interface BonusDetailPageProps {
  bonus: BonusResource;
  onBack: () => void;
}

export default function BonusDetailPage({ bonus, onBack }: BonusDetailPageProps) {
  const [selectedLesson, setSelectedLesson] = useState<BonusLesson | null>(null);
  const [lessons, setLessons] = useState<BonusLesson[]>(bonus.lessons);

  const handleLessonComplete = (lessonId: string) => {
    setLessons(prev => 
      prev.map(lesson => 
        lesson.id === lessonId 
          ? { ...lesson, completed: true }
          : lesson
      )
    );
  };

  if (selectedLesson) {
    return (
      <LessonViewer
        lesson={selectedLesson}
        onBack={() => setSelectedLesson(null)}
        onComplete={() => handleLessonComplete(selectedLesson.id)}
      />
    );
  }

  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar aos Bônus
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{bonus.title}</h1>
            <p className="text-gray-600 text-base sm:text-lg mb-6">{bonus.description}</p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <BookOpen className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">{bonus.totalLessons}</div>
                <div className="text-sm text-gray-500">Aulas</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">{bonus.totalDuration}</div>
                <div className="text-sm text-gray-500">Duração</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">{bonus.rating}</div>
                <div className="text-sm text-gray-500">Avaliação</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">{completedLessons}/{bonus.totalLessons}</div>
                <div className="text-sm text-gray-500">Concluídas</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progresso do Curso</span>
                <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Course Thumbnail */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <img 
                src={bonus.thumbnail} 
                alt={bonus.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Recursos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Conteúdo do Curso</h2>
          <p className="text-gray-600 mt-1">Clique em uma aula para começar</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="p-4 sm:p-6 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setSelectedLesson(lesson)}
            >
              <div className="flex items-start space-x-4">
                {/* Lesson Number/Status */}
                <div className="flex-shrink-0">
                  {lesson.completed ? (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600 fill-current" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-purple-600">{index + 1}</span>
                    </div>
                  )}
                </div>

                {/* Lesson Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {lesson.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {lesson.duration}
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {lesson.exercises.length} exercícios
                        </div>
                        {lesson.completed && (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Concluída
                          </div>
                        )}
                      </div>
                    </div>
                    <Play className="h-5 w-5 text-purple-600 flex-shrink-0 ml-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Section */}
      <div className="mt-8 bg-purple-50 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Precisa de ajuda com o curso?</h3>
        <p className="text-gray-600 mb-4">Nossa equipe está aqui para apoiar seu aprendizado</p>
        <SupportButton position="inline" variant="primary" />
      </div>

      {/* Fixed Support Button */}
      <SupportButton />
    </div>
  );
}