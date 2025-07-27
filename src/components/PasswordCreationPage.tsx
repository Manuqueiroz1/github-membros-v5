import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, X, ArrowRight } from 'lucide-react';
import { saveUserCredentials } from '../utils/hotmartApi';

interface PasswordCreationPageProps {
  email: string;
  onPasswordCreated: () => void;
  onBack: () => void;
}

export default function PasswordCreationPage({ email, onPasswordCreated, onBack }: PasswordCreationPageProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Validações da senha
  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    match: password === confirmPassword && password.length > 0
  };

  const isValidPassword = Object.values(validations).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPassword) return;

    setIsLoading(true);
    setError('');

    try {
      // Salvar credenciais do usuário
      const success = await saveUserCredentials({
        email,
        password,
        name: email.split('@')[0], // Nome temporário baseado no email
        createdAt: new Date()
      });

      if (success) {
        // Atualizar dados do usuário no localStorage
        const userData = JSON.parse(localStorage.getItem(`user_${email}`) || '{}');
        userData.hasPassword = true;
        userData.passwordCreatedAt = new Date().toISOString();
        localStorage.setItem(`user_${email}`, JSON.stringify(userData));

        onPasswordCreated();
      } else {
        setError('Erro ao criar senha. Tente novamente.');
      }
    } catch (error) {
      setError('Erro ao criar senha. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const ValidationItem = ({ isValid, text }: { isValid: boolean; text: string }) => (
    <div className={`flex items-center space-x-2 ${isValid ? 'text-green-600' : 'text-gray-400'}`}>
      {isValid ? (
        <CheckCircle className="h-4 w-4" />
      ) : (
        <X className="h-4 w-4" />
      )}
      <span className="text-sm">{text}</span>
    </div>
  );

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
        </div>

        {/* Password Creation Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo! Crie sua senha</h2>
            <p className="text-gray-600 text-sm">
              Como é seu primeiro acesso, defina uma senha segura para sua conta
            </p>
            <p className="text-purple-600 font-semibold text-sm">{email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Nova senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Digite sua nova senha"
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

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Confirme sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Requisitos da senha:</h4>
              <div className="space-y-2">
                <ValidationItem isValid={validations.length} text="Pelo menos 8 caracteres" />
                <ValidationItem isValid={validations.uppercase} text="Uma letra maiúscula" />
                <ValidationItem isValid={validations.lowercase} text="Uma letra minúscula" />
                <ValidationItem isValid={validations.number} text="Um número" />
                <ValidationItem isValid={validations.match} text="Senhas coincidem" />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isValidPassword}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Criando senha...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span>Criar senha</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </div>
              )}
            </button>
          </form>

          {/* Back Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={onBack}
              className="w-full text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>

        {/* Security Note */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            🔒 Suas informações são protegidas com criptografia de ponta
          </p>
        </div>
      </div>
    </div>
  );
}