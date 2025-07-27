import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { User } from './types';
import WelcomeModal from './components/WelcomeModal';
import AdminPanel from './components/AdminPanel';
import { isAdmin } from './utils/adminConfig';

// Components
import Header from './components/Header';
import Navigation from './components/Navigation';
import OnboardingSection from './components/OnboardingSection';
import AIAssistantSection from './components/AIAssistantSection';
import TeacherPoliSection from './components/TeacherPoliSection';
import ResourcesSection from './components/ResourcesSection';
import CommunitySection from './components/CommunitySection';
import SettingsSection from './components/SettingsSection';
import PlanRequiredModal from './components/PlanRequiredModal';

// Auth Components
import LoginPage from './components/LoginPage';
import EmailVerificationPage from './components/EmailVerificationPage';
import PasswordCreationPage from './components/PasswordCreationPage';

type AuthStep = 'login' | 'verification' | 'password' | 'authenticated';

export default function App() {
  const [user, setUser] = useLocalStorage<User | null>('teacherpoli_user', null);
  const [activeTab, setActiveTab] = useState('onboarding');
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [currentEmail, setCurrentEmail] = useState('');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showPlanRequiredModal, setShowPlanRequiredModal] = useState(false);
  const [blockedTabName, setBlockedTabName] = useState('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Show welcome modal for first-time users
  React.useEffect(() => {
    if (user && user.firstAccess && !user.hasGeneratedPlan && authStep === 'authenticated') {
      // Show welcome modal after a short delay to ensure smooth transition
      setTimeout(() => {
        setShowWelcomeModal(true);
      }, 500);
    }
  }, [user, authStep]);

  const handleLogin = async (email: string, password?: string) => {
    // Simular login bem-sucedido
    const userData: User = {
      name: email.split('@')[0],
      email,
      isVerified: true,
      hasPassword: true,
      hasGeneratedPlan: false,
      firstAccess: !localStorage.getItem(`user_completed_${email}`) // Only first access if never completed before
    };
    
    setUser(userData);
    setAuthStep('authenticated');
  };


  const handleNeedPassword = (email: string) => {
    setCurrentEmail(email);
    setAuthStep('password');
  };


  const handlePasswordCreated = () => {
    // Criar usuário após senha criada
    const userData: User = {
      name: currentEmail.split('@')[0],
      email: currentEmail,
      isVerified: true,
      hasPassword: true,
      hasGeneratedPlan: false,
      firstAccess: true
    };
    
    setUser(userData);
    setAuthStep('authenticated');
  };

  const handleBackToLogin = () => {
    setAuthStep('login');
    setCurrentEmail('');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('onboarding');
    setAuthStep('login');
    setCurrentEmail('');
  };

  const handlePlanGenerated = () => {
    if (user) {
      // Mark as completed in localStorage
      localStorage.setItem(`user_completed_${user.email}`, 'true');
      
      setUser({
        ...user,
        hasGeneratedPlan: true,
        firstAccess: false
      });
    }
  };

  const handleWelcomeModalClose = () => {
    setShowWelcomeModal(false);
  };

  const handleLockedTabClick = (tabId: string) => {
    setBlockedTabName(tabId);
    setShowPlanRequiredModal(true);
  };

  const handleGoToPlan = () => {
    setShowPlanRequiredModal(false);
    setActiveTab('ai-assistant');
  };

  // Determine locked tabs based on user progress
  const getLockedTabs = () => {
    if (!user) return [];
    
    // Only lock tabs on first access AND if user hasn't generated a plan yet
    if (user.firstAccess && !user.hasGeneratedPlan) {
      return ['teacher-poli', 'resources', 'community']; // settings is now always unlocked
    }
    
    return [];
  };

  if (!user || authStep !== 'authenticated') {
    switch (authStep) {
      case 'password':
        return (
          <PasswordCreationPage
            email={currentEmail}
            onPasswordCreated={handlePasswordCreated}
            onBack={handleBackToLogin}
          />
        );
      default:
        return (
          <LoginPage
            onLogin={handleLogin}
            onNeedPassword={handleNeedPassword}
          />
        );
    }
  }

  // Main application
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header 
          userName={user.name} 
          userEmail={user.email}
          onLogout={handleLogout}
          onAdminPanel={() => setShowAdminPanel(true)}
        />
        <Navigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          lockedTabs={getLockedTabs()}
          onLockedTabClick={handleLockedTabClick}
        />
        
        <main className="pb-8">
          {activeTab === 'onboarding' && <OnboardingSection />}
          {activeTab === 'ai-assistant' && (
            <AIAssistantSection onPlanGenerated={handlePlanGenerated} />
          )}
          {activeTab === 'teacher-poli' && <TeacherPoliSection />}
          {activeTab === 'resources' && <ResourcesSection />}
          {activeTab === 'community' && <CommunitySection />}
          {activeTab === 'settings' && <SettingsSection />}
        </main>
      </div>

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={handleWelcomeModalClose}
        userName={user.name}
      />

      {/* Plan Required Modal */}
      <PlanRequiredModal
        isOpen={showPlanRequiredModal}
        onClose={() => setShowPlanRequiredModal(false)}
        onGoToPlan={handleGoToPlan}
        tabName={blockedTabName}
      />

      {/* Admin Panel - Only for administrators */}
      {user && isAdmin(user.email) && (
        <AdminPanel
          isVisible={showAdminPanel}
          onToggle={() => setShowAdminPanel(!showAdminPanel)}
          userEmail={user.email}
        />
      )}
    </>
  );
}