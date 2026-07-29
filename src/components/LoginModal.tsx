import React, { useState } from 'react';
import { User, Mail, Briefcase, Check, X, Shield, Sparkles } from 'lucide-react';
import type { UserProfile } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

const ROLES_LIST: UserProfile['role'][] = [
  'ABAP Developer',
  'Functional Consultant',
  'SAP Trainee',
  'BASIS Administrator',
  'S/4HANA Architect'
];

const AVATARS = ['⚡', '👨‍💻', '👩‍💻', '🚀', '🧠', '🛡️', '💼'];

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile
}) => {
  const [name, setName] = useState<string>(currentProfile.name);
  const [email, setEmail] = useState<string>(currentProfile.email);
  const [role, setRole] = useState<UserProfile['role']>(currentProfile.role);
  const [avatar, setAvatar] = useState<string>(currentProfile.avatar || '⚡');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...currentProfile,
      name: name.trim() || 'SAP Developer',
      email: email.trim() || 'developer@sap.com',
      role,
      avatar
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 sm:p-8 space-y-6 shadow-2xl shadow-blue-500/10 relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Developer Profile & Progress Tracking
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">SAP Learner Identity</h2>
          <p className="text-xs text-slate-400 font-medium">
            Sign in or customize your SAP learning credentials to track lesson completions and interview badges.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Avatar Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Choose Avatar
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {AVATARS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setAvatar(emoji)}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg transition-all ${
                    avatar === emoji
                      ? 'bg-blue-600 border-2 border-cyan-400 scale-110 shadow-lg'
                      : 'bg-slate-950 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name (e.g. Moinu Developer)"
                className="w-full bg-slate-950 text-white pl-10 pr-4 py-2.5 rounded-2xl border border-slate-800 focus:outline-none focus:border-blue-500 text-xs font-medium"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@sap.com"
                className="w-full bg-slate-950 text-white pl-10 pr-4 py-2.5 rounded-2xl border border-slate-800 focus:outline-none focus:border-blue-500 text-xs font-medium"
              />
            </div>
          </div>

          {/* SAP Career Target Role */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Target SAP Role
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserProfile['role'])}
                className="w-full bg-slate-950 text-white pl-10 pr-4 py-2.5 rounded-2xl border border-slate-800 focus:outline-none focus:border-blue-500 text-xs font-medium"
              >
                {ROLES_LIST.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 pt-3"
          >
            <Check className="w-4 h-4" />
            Save Profile & Activate Session
          </button>
        </form>

        <div className="pt-2 text-center border-t border-slate-800">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            Progress is automatically synced to browser LocalStorage.
          </p>
        </div>

      </div>
    </div>
  );
};
