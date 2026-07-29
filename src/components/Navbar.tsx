import React, { useState } from 'react';
import { 
  BookOpen, 
  Code2, 
  Wand2, 
  Search, 
  Trophy, 
  Award, 
  Flame, 
  Zap,
  HelpCircle,
  Menu,
  X,
  LayoutDashboard
} from 'lucide-react';
import type { UserProgress } from '../types';

interface NavbarProps {
  activeTab: 'curriculum' | 'studio' | 'refactor' | 'tcodes' | 'challenges' | 'certificate' | 'interview' | 'dashboard';
  setActiveTab: (tab: 'curriculum' | 'studio' | 'refactor' | 'tcodes' | 'challenges' | 'certificate' | 'interview' | 'dashboard') => void;
  progress: UserProgress;
  onOpenLoginModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, progress, onOpenLoginModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const levelNumber = Math.floor(progress.xp / 300) + 1;
  const { userProfile } = progress;

  const navItems = [
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen, color: 'text-blue-400' },
    { id: 'interview', label: 'Interview Q&A', icon: HelpCircle, color: 'text-cyan-400' },
    { id: 'studio', label: 'ABAP Studio', icon: Code2, color: 'text-emerald-400' },
    { id: 'challenges', label: 'Challenges', icon: Trophy, color: 'text-amber-400' },
    { id: 'refactor', label: '7.4+ Refactor', icon: Wand2, color: 'text-purple-400' },
    { id: 'tcodes', label: 'T-Codes', icon: Search, color: 'text-pink-400' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-indigo-400' },
    { id: 'certificate', label: 'Certificate', icon: Award, color: 'text-yellow-400' },
  ] as const;

  const handleTabClick = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-container border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleTabClick('curriculum')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">SAP ABAP</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                S/4HANA
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Mastery & Interview Hub</p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.color}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Identity & XP Counter */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>{progress.streakDays} Day Streak</span>
          </div>

          <button
            onClick={onOpenLoginModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-white transition-all"
            title="User Profile"
          >
            <span className="text-base">{userProfile.avatar || '⚡'}</span>
            <span className="hidden sm:inline text-cyan-300 font-extrabold">{userProfile.name.split(' ')[0]}</span>
            <span className="px-1.5 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-extrabold">
              Lvl {levelNumber}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
