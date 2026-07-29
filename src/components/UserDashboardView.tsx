import React from 'react';
import { User, Trophy, Award, Flame, History, BookOpen, CheckCircle2, Clock, Activity, Zap } from 'lucide-react';
import type { UserProgress } from '../types';
import { CURRICULUM_DATA } from '../data/curriculumData';

interface UserDashboardViewProps {
  progress: UserProgress;
  onOpenLoginModal: () => void;
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  progress,
  onOpenLoginModal
}) => {
  const { userProfile, activityLog } = progress;
  const levelNumber = Math.floor(progress.xp / 300) + 1;
  const totalLessons = 10;
  const completedLessons = progress.completedLessonIds.length;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border-2 border-cyan-400 flex items-center justify-center text-3xl shadow-xl shadow-cyan-500/20">
            {userProfile.avatar || '⚡'}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">{userProfile.name}</h1>
              <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                {userProfile.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2 font-medium">
              <span>{userProfile.email}</span>
              <span>•</span>
              <span>Member since {userProfile.joinedDate}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLoginModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
          >
            <User className="w-4 h-4 text-cyan-400" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Developer XP</span>
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{progress.xp} XP</div>
          <p className="text-[11px] text-amber-400 font-medium">Level {levelNumber} SAP Developer</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Streak</span>
            <Flame className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{progress.streakDays} Days</div>
          <p className="text-[11px] text-emerald-400 font-medium">Keep studying daily!</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Lessons Mastered</span>
            <BookOpen className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{completedLessons} / {totalLessons}</div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Challenges Solved</span>
            <Award className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{progress.solvedChallengeIds.length} Arenas</div>
          <p className="text-[11px] text-purple-300 font-medium">Automated test cases passed</p>
        </div>

      </div>

      {/* Main Content Grid: Module Competency vs Activity History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Module Competency Breakdown */}
        <div className="lg:col-span-7 bg-slate-900/80 rounded-3xl border border-slate-800 p-6 space-y-5 backdrop-blur-md">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Module-by-Module Competency Matrix
          </h3>

          <div className="space-y-4">
            {CURRICULUM_DATA.map((lvl) => {
              const isCompleted = lvl.lessons.every(l => progress.completedLessonIds.includes(l.id));
              const doneCount = lvl.lessons.filter(l => progress.completedLessonIds.includes(l.id)).length;
              const percent = Math.round((doneCount / lvl.lessons.length) * 100);

              return (
                <div key={lvl.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lvl.color }}></span>
                      Level {lvl.id}: {lvl.badge}
                    </span>
                    <span className={isCompleted ? 'text-emerald-400' : 'text-slate-400'}>
                      {percent}% ({doneCount}/{lvl.lessons.length})
                    </span>
                  </div>

                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${percent}%`, backgroundColor: lvl.color }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Log Feed */}
        <div className="lg:col-span-5 bg-slate-900/80 rounded-3xl border border-slate-800 p-6 space-y-5 backdrop-blur-md">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-purple-400" />
            Recent Activity Log
          </h3>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {!activityLog || activityLog.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No recent activity recorded yet. Start studying curriculum modules!
              </div>
            ) : (
              activityLog.map((log) => (
                <div key={log.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-cyan-400 mt-0.5">
                    {log.type === 'lesson' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {log.type === 'challenge' && <Trophy className="w-4 h-4 text-amber-400" />}
                    {log.type === 'login' && <Zap className="w-4 h-4 text-cyan-400" />}
                    {log.type === 'certificate' && <Award className="w-4 h-4 text-purple-400" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{log.title}</h4>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {log.timestamp}
                    </p>
                  </div>

                  {log.xpEarned && (
                    <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      +{log.xpEarned} XP
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
