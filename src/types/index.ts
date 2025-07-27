export interface User {
  name: string;
  email: string;
  isVerified: boolean;
  hasPassword: boolean;
  hasGeneratedPlan: boolean;
  firstAccess: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'pt' | 'es' | 'en';
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'quiz';
  content?: string;
  videoUrl?: string;
  pdfUrl?: string;
  questions?: QuizQuestion[];
  size?: string;
  rating?: number;
  downloads?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface BonusLesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  textContent: string;
  exercises: QuizQuestion[];
  completed: boolean;
}

export interface BonusResource {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'ebook' | 'guide';
  thumbnail: string;
  totalLessons: number;
  totalDuration: string;
  lessons: BonusLesson[];
  rating: number;
  downloads: number;
}

export interface AdminUser {
  email: string;
  permissions: AdminPermission[];
}

export type AdminPermission = 
  | 'edit_content' 
  | 'add_lessons' 
  | 'manage_users' 
  | 'edit_bonuses' 
  | 'manage_settings';

export interface EditableContent {
  id: string;
  type: 'lesson' | 'bonus' | 'exercise';
  content: any;
}