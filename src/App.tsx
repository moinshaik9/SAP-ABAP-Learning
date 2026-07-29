import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CurriculumView } from './components/CurriculumView';
import { AbapStudio } from './components/AbapStudio';
import { ChallengesView } from './components/ChallengesView';
import { RefactorToolView } from './components/RefactorToolView';
import { TcodeDictionaryView } from './components/TcodeDictionaryView';
import { ProgressCertificate } from './components/ProgressCertificate';
import { InterviewPrepView } from './components/InterviewPrepView';
import { UserDashboardView } from './components/UserDashboardView';
import { LoginModal } from './components/LoginModal';
import type { UserProgress, UserProfile, ActivityLogItem } from './types';

const INITIAL_PROFILE: UserProfile = {
  id: 'usr_001',
  name: 'Moinu Developer',
  email: 'moinu@sap-consultant.com',
  role: 'ABAP Developer',
  avatar: '⚡',
  joinedDate: new Date().toISOString().slice(0, 10)
};

const INITIAL_PROGRESS: UserProgress = {
  userProfile: INITIAL_PROFILE,
  completedLessonIds: [],
  solvedChallengeIds: [],
  quizScores: {},
  favoriteTCodes: ['SE11', 'ST05', 'SE38', 'ST22'],
  activityLog: [
    {
      id: 'act_001',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: 'Created SAP Developer Profile & Account',
      type: 'login'
    }
  ],
  xp: 150,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().slice(0, 10)
};

export function App() {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'studio' | 'refactor' | 'tcodes' | 'challenges' | 'certificate' | 'interview' | 'dashboard'>('curriculum');
  const [studioCodeOverride, setStudioCodeOverride] = useState<string | undefined>(undefined);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('sap_abap_user_progress_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PROGRESS;
      }
    }
    return INITIAL_PROGRESS;
  });

  useEffect(() => {
    localStorage.setItem('sap_abap_user_progress_v2', JSON.stringify(progress));
  }, [progress]);

  const addActivityLog = (title: string, type: ActivityLogItem['type'], xpEarned?: number) => {
    const newLogItem: ActivityLogItem = {
      id: `act_${Date.now()}`,
      timestamp: `${new Date().toISOString().slice(0, 10)} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      title,
      type,
      xpEarned
    };

    return [newLogItem, ...(progress.activityLog || [])].slice(0, 20);
  };

  const handleCompleteLesson = (lessonId: string, score: number) => {
    setProgress((prev) => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      const updatedLog = addActivityLog(`Mastered Curriculum Lesson #${lessonId}`, 'lesson', 100 + score);
      return {
        ...prev,
        completedLessonIds: [...prev.completedLessonIds, lessonId],
        activityLog: updatedLog,
        xp: prev.xp + 100 + score
      };
    });
  };

  const handleSolveChallenge = (chId: string, points: number) => {
    setProgress((prev) => {
      if (prev.solvedChallengeIds.includes(chId)) return prev;
      const updatedLog = addActivityLog(`Passed ABAP Arena Challenge #${chId}`, 'challenge', points);
      return {
        ...prev,
        solvedChallengeIds: [...prev.solvedChallengeIds, chId],
        activityLog: updatedLog,
        xp: prev.xp + points
      };
    });
  };

  const handleToggleFavoriteTCode = (tcode: string) => {
    setProgress((prev) => {
      const exists = prev.favoriteTCodes.includes(tcode);
      return {
        ...prev,
        favoriteTCodes: exists
          ? prev.favoriteTCodes.filter((t) => t !== tcode)
          : [...prev.favoriteTCodes, tcode]
      };
    });
  };

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setProgress((prev) => ({
      ...prev,
      userProfile: updatedProfile,
      activityLog: addActivityLog(`Updated Profile details (${updatedProfile.role})`, 'login')
    }));
  };

  const handleOpenStudioWithCode = (code: string) => {
    setStudioCodeOverride(code);
    setActiveTab('studio');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progress={progress}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Login & Profile Drawer Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentProfile={progress.userProfile}
        onSaveProfile={handleSaveProfile}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'curriculum' && (
          <CurriculumView
            progress={progress}
            onCompleteLesson={handleCompleteLesson}
            onOpenStudioWithCode={handleOpenStudioWithCode}
          />
        )}

        {activeTab === 'interview' && (
          <InterviewPrepView />
        )}

        {activeTab === 'dashboard' && (
          <UserDashboardView
            progress={progress}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
          />
        )}

        {activeTab === 'studio' && (
          <AbapStudio initialCode={studioCodeOverride} />
        )}

        {activeTab === 'challenges' && (
          <ChallengesView
            progress={progress}
            onSolveChallenge={handleSolveChallenge}
          />
        )}

        {activeTab === 'refactor' && (
          <RefactorToolView />
        )}

        {activeTab === 'tcodes' && (
          <TcodeDictionaryView
            progress={progress}
            onToggleFavoriteTCode={handleToggleFavoriteTCode}
          />
        )}

        {activeTab === 'certificate' && (
          <ProgressCertificate progress={progress} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>SAP S/4HANA & ABAP 7.5+ Interactive Mastery Hub • Built for Technical & Functional Consultants</p>
      </footer>
    </div>
  );
}

export default App;
