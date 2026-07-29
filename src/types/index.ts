export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title?: string;
  shortDesc?: string;
  levelId: number;
  phaseName: string;
  topicName: string;
  plannedDays: number;
  completedDays: number;
  startDate: string;
  targetDate: string;
  duration: string;
  concepts: string[];
  content: string;
  codeSnippet: string;
  quiz: QuizQuestion[];
  isMiniProject?: boolean;
  isCompleted?: boolean;
}

export interface Level {
  id: number;
  phaseName: string;
  title: string;
  subtitle: string;
  iconName: string;
  badge: string;
  color: string;
  lessons: Lesson[];
}

export interface ChallengeTestCase {
  inputCode?: string;
  expectedOutputSubstring?: string;
  expectedVariables?: Record<string, any>;
  expectedMinLines?: number;
  description: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'S/4HANA';
  category: string;
  description: string;
  initialCode: string;
  solutionHint: string;
  testCases: ChallengeTestCase[];
  points: number;
}

export interface TCodeInfo {
  tcode: string;
  name: string;
  module: 'ABAP Core' | 'Data Dictionary' | 'SD' | 'MM' | 'FI/CO' | 'S/4HANA & RAP' | 'Administration' | 'Performance & Debug';
  description: string;
  usage: string;
  tips: string;
  isFavorite?: boolean;
}

export interface InterviewQuestion {
  id: string;
  tcode?: string;
  category: 'SAP Core & Architecture' | 'BASIS & Transports (TMS)' | 'BI / BW & PIPO' | 'Project Types & FSD' | 'ABAP Core & Data Dictionary' | 'Modern ABAP 7.4+ & S/4HANA';
  question: string;
  shortAnswer: string;
  detailedPoints: string[];
  codeSnippet?: string;
  interviewTip: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced' | 'Senior/Lead';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'ABAP Developer' | 'Functional Consultant' | 'SAP Trainee' | 'BASIS Administrator' | 'S/4HANA Architect';
  avatar: string;
  joinedDate: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  title: string;
  type: 'lesson' | 'challenge' | 'quiz' | 'certificate' | 'login';
  xpEarned?: number;
}

export interface AbapExecutionResult {
  outputLines: string[];
  alvData?: Record<string, any>[];
  alvColumns?: string[];
  variables: Record<string, any>;
  sysVariables: {
    'sy-subrc': number;
    'sy-tabix': number;
    'sy-dbcnt': number;
    'sy-uname': string;
    'sy-datum': string;
    'sy-uzeit': string;
  };
  errors: string[];
  executionTimeMs: number;
}

export interface RefactorSuggestion {
  line: number;
  type: 'modern_abap' | 'performance' | 'deprecated';
  original: string;
  suggested: string;
  explanation: string;
}

export interface UserProgress {
  userProfile: UserProfile;
  completedLessonIds: string[];
  solvedChallengeIds: string[];
  quizScores: Record<string, number>;
  favoriteTCodes: string[];
  activityLog: ActivityLogItem[];
  xp: number;
  streakDays: number;
  lastActiveDate: string;
}
