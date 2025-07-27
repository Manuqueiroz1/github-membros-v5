import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { verifyHotmartPurchase, validateUserLogin } from '../utils/hotmartApi';

interface LoginPageProps {
  onLogin: (email: string, password?: string) => void;
  onNeedPassword: (email: string) => void;
}

export default function LoginPage({ onLogin, onNeedPassword }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'email' | 'password'>('email');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    try {
      // Verificar se o email tem compra na Hotmart
      const hasValidPurchase = await verifyHotmartPurchase(email);
      
      if (!hasValidPurchase) {
        setError('Email não encontrado em nossas compras. Verifique se você usou o mesmo email da compra na Hotmart.');
        setIsLoading(false);
        return;
      }

      // Verificar se o usuário já tem conta criada
      const userExists = localStorage.getItem(`user_${email}`);
      
      if (!userExists) {
        // Primeiro acesso - ir direto para criação de senha
        onNeedPassword(email);
      } else {
        const userData = JSON.parse(userExists);
        if (!userData.hasPassword) {
          // Usuário verificado mas sem senha
          onNeedPassword(email);
        } else {
          // Usuário completo - ir para login com senha
          setStep('password');
        }
      }
    } catch (error) {
      setError('Erro ao verificar email. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setIsLoading(true);
    setError('');

    try {
      const isValid = await validateUserLogin(email, password);
      
      if (isValid) {
        onLogin(email, password);
      } else {
        setError('Senha incorreta. Tente novamente.');
      }
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/WhatsApp Image 2025-06-02 at 10.53.02.jpeg" 
            alt="Teacher Poli" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Área de Membros</h1>
          <p className="text-gray-600">Teacher Poli</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 'email' ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Bem-vindo de volta!</h2>
                <p className="text-gray-600 text-sm">Digite seu email para continuar</p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Verificando...
                    </div>
                  ) : (
                    'Continuar'
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Digite sua senha</h2>
                <p className="text-gray-600 text-sm">{email}</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Digite sua senha"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading || !password}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Entrando...
                      </div>
                    ) : (
                      'Entrar'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleBackToEmail}
                    className="w-full text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Voltar
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Help */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Problemas para acessar?{' '}
              <a href="mailto:suporte@teacherpoli.com" className="text-purple-600 hover:text-purple-700 font-medium">
                Entre em contato
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 Teacher Poli. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}