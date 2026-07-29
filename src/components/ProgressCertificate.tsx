import React, { useState } from 'react';
import { Award, Trophy, CheckCircle2, ShieldCheck, Printer, Sparkles, User, Calendar } from 'lucide-react';
import type { UserProgress } from '../types';
import { CURRICULUM_DATA } from '../data/curriculumData';

export const ProgressCertificate: React.FC<{ progress: UserProgress }> = ({ progress }) => {
  const [userName, setUserName] = useState<string>('Moinu Developer');

  const totalLessons = 10;
  const completedLessonsCount = progress.completedLessonIds.length;
  const currentLevelNumber = Math.floor(progress.xp / 300) + 1;

  const isEligibleForCert = completedLessonsCount >= 5 || progress.solvedChallengeIds.length >= 2;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/30 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Total Developer XP</span>
            <span className="text-xl font-extrabold text-white">{progress.xp} XP</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-500/30 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Lessons Completed</span>
            <span className="text-xl font-extrabold text-white">{completedLessonsCount} / {totalLessons}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-500/30 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Level Status</span>
            <span className="text-xl font-extrabold text-white">Level {currentLevelNumber} Developer</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-900/40 to-slate-900 border border-amber-500/30 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Challenges Solved</span>
            <span className="text-xl font-extrabold text-white">{progress.solvedChallengeIds.length} Arenas</span>
          </div>
        </div>

      </div>

      {/* Badges Matrix */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4 backdrop-blur-md">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          SAP ABAP Competency Badges
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CURRICULUM_DATA.map((lvl) => {
            const isUnlocked = lvl.lessons.some(l => progress.completedLessonIds.includes(l.id));

            return (
              <div
                key={lvl.id}
                className={`p-4 rounded-xl border flex flex-col items-center text-center space-y-2 transition-all ${
                  isUnlocked
                    ? 'bg-slate-900 border-blue-500/50 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-950/60 border-slate-800 opacity-50'
                }`}
              >
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg"
                  style={{ backgroundColor: `${lvl.color}20`, color: lvl.color }}
                >
                  🎖️
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{lvl.badge}</h4>
                  <span className="text-[10px] text-slate-400 block">{lvl.title.split(':')[0]}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isUnlocked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>
                  {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Certificate Generator */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-6 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Official SAP ABAP Specialist Certificate
            </h3>
            <p className="text-xs text-slate-400">
              Generate and print your verified SAP S/4HANA & ABAP 7.5+ Developer Certificate.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-none w-36"
                placeholder="Your Name..."
              />
            </div>

            <button
              onClick={handlePrint}
              disabled={!isEligibleForCert}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              <Printer className="w-4 h-4" />
              Print Certificate
            </button>
          </div>
        </div>

        {/* Certificate Rendering Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border-4 border-amber-500/40 relative overflow-hidden shadow-2xl space-y-6 text-center print:border-black print:bg-white print:text-black">
          <div className="absolute top-4 right-4 flex items-center gap-2 opacity-20">
            <Award className="w-32 h-32 text-amber-400" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase print:text-amber-700">
              SAP S/4HANA ACADEMY CERTIFICATION OF ACHIEVEMENT
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight print:text-black">
              SAP ABAP SPECIALIST
            </h2>
            <p className="text-xs text-slate-400 print:text-slate-600">This is to certify that</p>
          </div>

          <div className="py-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-serif border-b-2 border-amber-500 pb-1 px-8 print:text-blue-900">
              {userName || 'Moinu Developer'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed print:text-slate-700">
            has successfully mastered the complete curriculum in SAP NetWeaver Architecture, Modern ABAP (7.4/7.5+), Open SQL DB Optimization, Object-Oriented ABAP, and SAP S/4HANA CDS Views.
          </p>

          <div className="pt-6 flex items-center justify-between text-xs text-slate-400 max-w-lg mx-auto border-t border-slate-800 print:border-slate-300 print:text-slate-600">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Issued: {new Date().toISOString().slice(0, 10)}</span>
            </div>

            <div className="flex items-center gap-1.5 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ID: SAP-ABAP-2026-8890</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
