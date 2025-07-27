import React, { useState } from 'react';
import { ArrowLeft, Play, BookOpen, CheckCircle, X, RotateCcw } from 'lucide-react';
import { BonusLesson, QuizQuestion } from '../types';

interface LessonViewerProps {
  lesson: BonusLesson;
  onBack: () => void;
  onComplete: () => void;
}

export default function LessonViewer({ lesson, onBack, onComplete }: LessonViewerProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'content' | 'exercises'>('video');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
    setQuizCompleted(true);
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
  };

  const getScore = () => {
    let correct = 0;
    lesson.exercises.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: lesson.exercises.length };
  };

  const allQuestionsAnswered = lesson.exercises.every(q => selectedAnswers[q.id] !== undefined);
  const score = getScore();
  const scorePercentage = (score.correct / score.total) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Curso
        </button>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
        <p className="text-gray-600 text-base sm:text-lg">{lesson.description}</p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('video')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'video'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Play className="h-4 w-4 inline mr-2" />
              Vídeo
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BookOpen className="h-4 w-4 inline mr-2" />
              Conteúdo
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'exercises'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <CheckCircle className="h-4 w-4 inline mr-2" />
              Exercícios ({lesson.exercises.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Video Tab */}
        {activeTab === 'video' && (
          <div>
            <div className="aspect-video">
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                className="w-full h-full rounded-t-lg"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{lesson.title}</h3>
              <p className="text-gray-600 mb-4">{lesson.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Duração: {lesson.duration}</span>
                {!lesson.completed && (
                  <button
                    onClick={onComplete}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Marcar como Concluída
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="p-6">
            <div className="prose max-w-none">
              <div 
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: lesson.textContent.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, '<h3 class="text-xl font-bold mt-6 mb-3">').replace(/<h3[^>]*>/g, '<h3 class="text-xl font-bold mt-6 mb-3">') 
                }}
              />
            </div>
          </div>
        )}

        {/* Exercises Tab */}
        {activeTab === 'exercises' && (
          <div className="p-6">
            {!showResults ? (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Exercícios da Aula
                  </h3>
                  <p className="text-gray-600">
                    Responda todas as perguntas e clique em "Corrigir" para ver os resultados.
                  </p>
                </div>

                <div className="space-y-8">
                  {lesson.exercises.map((question, index) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">
                        {index + 1}. {question.question}
                      </h4>
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedAnswers[question.id] === optionIndex
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={optionIndex}
                              checked={selectedAnswers[question.id] === optionIndex}
                              onChange={() => handleAnswerSelect(question.id, optionIndex)}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                              selectedAnswers[question.id] === optionIndex
                                ? 'border-purple-500 bg-purple-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedAnswers[question.id] === optionIndex && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={!allQuestionsAnswered}
                    className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Corrigir Exercícios
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Results */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                    scorePercentage >= 70 ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <span className={`text-2xl font-bold ${
                      scorePercentage >= 70 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {Math.round(scorePercentage)}%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {scorePercentage >= 70 ? 'Parabéns!' : 'Continue Praticando!'}
                  </h3>
                  <p className="text-gray-600">
                    Você acertou {score.correct} de {score.total} questões
                  </p>
                </div>

                {/* Detailed Results */}
                <div className="space-y-6">
                  {lesson.exercises.map((question, index) => {
                    const userAnswer = selectedAnswers[question.id];
                    const isCorrect = userAnswer === question.correctAnswer;
                    
                    return (
                      <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          {index + 1}. {question.question}
                        </h4>
                        
                        <div className="space-y-3 mb-4">
                          {question.options.map((option, optionIndex) => {
                            let className = 'flex items-center p-3 rounded-lg border ';
                            
                            if (optionIndex === question.correctAnswer) {
                              className += 'border-green-500 bg-green-50';
                            } else if (optionIndex === userAnswer && !isCorrect) {
                              className += 'border-red-500 bg-red-50';
                            } else {
                              className += 'border-gray-200';
                            }
                            
                            return (
                              <div key={optionIndex} className={className}>
                                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                                  optionIndex === question.correctAnswer
                                    ? 'border-green-500 bg-green-500'
                                    : optionIndex === userAnswer && !isCorrect
                                    ? 'border-red-500 bg-red-500'
                                    : 'border-gray-300'
                                }`}>
                                  {(optionIndex === question.correctAnswer || (optionIndex === userAnswer && !isCorrect)) && (
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                  )}
                                </div>
                                <span className="text-gray-700">{option}</span>
                                {optionIndex === question.correctAnswer && (
                                  <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                                )}
                                {optionIndex === userAnswer && !isCorrect && (
                                  <X className="h-4 w-4 text-red-500 ml-auto" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                        
                        {question.explanation && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h5 className="font-medium text-blue-900 mb-2">Explicação:</h5>
                            <p className="text-blue-800 text-sm">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 text-center space-x-4">
                  <button
                    onClick={handleRetakeQuiz}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-flex items-center"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Refazer Exercícios
                  </button>
                  {scorePercentage >= 70 && !lesson.completed && (
                    <button
                      onClick={onComplete}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Concluir Aula
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}