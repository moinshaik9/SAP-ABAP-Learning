import React, { useState } from 'react';
import { Search, Star, ExternalLink, HelpCircle } from 'lucide-react';
import { TCODES_DICTIONARY } from '../data/tcodesData';
import type { TCodeInfo, UserProgress } from '../types';

interface TcodeDictionaryViewProps {
  progress: UserProgress;
  onToggleFavoriteTCode: (tcode: string) => void;
}

const MODULES_LIST = [
  'All',
  'ABAP Core',
  'Data Dictionary',
  'Performance & Debug',
  'S/4HANA & RAP',
  'SD',
  'MM',
  'FI/CO',
  'Administration'
];

export const TcodeDictionaryView: React.FC<TcodeDictionaryViewProps> = ({
  progress,
  onToggleFavoriteTCode
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedModule, setSelectedModule] = useState<string>('All');
  const [activeTCode, setActiveTCode] = useState<TCodeInfo | null>(TCODES_DICTIONARY[0]);

  const filteredTCodes = TCODES_DICTIONARY.filter(t => {
    const matchesModule = selectedModule === 'All' || t.module === selectedModule;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      t.tcode.toLowerCase().includes(q) ||
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.module.toLowerCase().includes(q);
    return matchesModule && matchesSearch;
  });

  const isFavorite = (tcode: string) => progress.favoriteTCodes.includes(tcode);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Search className="w-6 h-6 text-cyan-400" />
            SAP T-Code Reference Dictionary
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Searchable knowledge base covering 100+ critical SAP Developer Transaction Codes and Shortcuts.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search T-Code (e.g. SE11, ST05)..."
            className="w-full bg-slate-950 text-white pl-10 pr-4 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500 text-xs font-medium"
          />
        </div>
      </div>

      {/* Module Category Filter Badges */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {MODULES_LIST.map((mod) => {
          const isSelected = selectedModule === mod;
          return (
            <button
              key={mod}
              onClick={() => setSelectedModule(mod)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {mod}
            </button>
          );
        })}
      </div>

      {/* Main Grid: TCode Cards + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List of Cards */}
        <div className="lg:col-span-5 space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {filteredTCodes.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No matching SAP T-Codes found for "{searchQuery}".
            </div>
          ) : (
            filteredTCodes.map((tc) => {
              const isSelected = activeTCode?.tcode === tc.tcode;
              const fav = isFavorite(tc.tcode);

              return (
                <div
                  key={tc.tcode}
                  onClick={() => setActiveTCode(tc)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/10'
                      : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-cyan-300 font-mono font-extrabold text-sm border border-blue-500/30">
                        {tc.tcode}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        {tc.module}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavoriteTCode(tc.tcode);
                      }}
                      className="p-1 hover:text-amber-400 transition-colors"
                    >
                      <Star className={`w-4 h-4 ${fav ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                    </button>
                  </div>

                  <h4 className="text-xs font-bold text-white mt-2">{tc.name}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{tc.description}</p>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detailed Inspector Panel */}
        <div className="lg:col-span-7">
          {activeTCode ? (
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-6 backdrop-blur-md sticky top-24">
              
              <div className="border-b border-slate-800 pb-4 flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-mono font-extrabold text-cyan-400">
                      /n{activeTCode.tcode}
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                      {activeTCode.module}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white pt-1">{activeTCode.name}</h2>
                </div>

                <button
                  onClick={() => onToggleFavoriteTCode(activeTCode.tcode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    isFavorite(activeTCode.tcode)
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Star className={`w-4 h-4 ${isFavorite(activeTCode.tcode) ? 'fill-amber-400 text-amber-400' : ''}`} />
                  {isFavorite(activeTCode.tcode) ? 'Favorited' : 'Bookmark'}
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Functional Description</h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    {activeTCode.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                    Real-World Usage Context
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    {activeTCode.usage}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                    Pro Developer Tip & Keyboard Shortcuts
                  </h4>
                  <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-300 text-xs font-mono">
                    💡 {activeTCode.tips}
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 text-xs">
              Select a T-Code from the list to view usage details.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
