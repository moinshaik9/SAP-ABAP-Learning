import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, Search, BookOpen, Zap } from 'lucide-react';
import { INTERVIEW_QUESTIONS } from '../data/interviewData';

const CATEGORIES = [
  'All',
  'SAP Core & Architecture',
  'BASIS & Transports (TMS)',
  'BI / BW & PIPO',
  'Project Types & FSD',
  'ABAP Core & Data Dictionary',
  'Modern ABAP 7.4+ & S/4HANA'
];

export const InterviewPrepView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(INTERVIEW_QUESTIONS[0].id);

  const filteredQuestions = INTERVIEW_QUESTIONS.filter((q) => {
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      q.question.toLowerCase().includes(query) ||
      q.shortAnswer.toLowerCase().includes(query) ||
      q.detailedPoints.some((p) => p.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 backdrop-blur-md shadow-2xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20 text-xs font-extrabold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            Interview Preparation Arena
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            SAP ABAP & Technical Interview Workbench
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium">
            Point-wise executive answers for SAP Architecture, BASIS, BI/BW, PIPO, TMS TRs, Project Types (Greenfield/Brownfield), FSD/UAT, and Modern ABAP.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search interview topics (e.g. BASIS, TRs, FSD)..."
            className="w-full bg-slate-950 text-white pl-10 pr-4 py-2.5 rounded-2xl border border-slate-800 focus:outline-none focus:border-blue-500 text-xs font-medium"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs bg-slate-900/40 rounded-3xl border border-slate-800">
            No matching interview questions found for "{searchQuery}".
          </div>
        ) : (
          filteredQuestions.map((iq, idx) => {
            const isExpanded = expandedId === iq.id;

            let difficultyColor = 'text-blue-400 bg-blue-500/10 border-blue-500/20';
            if (iq.difficulty === 'Intermediate') difficultyColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            if (iq.difficulty === 'Advanced') difficultyColor = 'text-purple-400 bg-purple-500/10 border-purple-500/20';
            if (iq.difficulty === 'Senior/Lead') difficultyColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';

            return (
              <div
                key={iq.id}
                className={`rounded-3xl border transition-all overflow-hidden ${
                  isExpanded
                    ? 'bg-slate-900 border-blue-500/60 shadow-2xl shadow-blue-500/10'
                    : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/40'
                }`}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : iq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold px-3 py-0.5 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                        {iq.category}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${difficultyColor}`}>
                        {iq.difficulty}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2.5">
                      <span className="text-cyan-400 font-mono">Q{idx + 1}.</span> {iq.question}
                    </h3>

                    <p className="text-xs text-slate-300 font-medium line-clamp-1">
                      {iq.shortAnswer}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-slate-950 text-slate-400 shrink-0 border border-slate-800">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-cyan-400" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Expanded Detailed Point-Wise View */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-4 bg-slate-950/50">
                    
                    {/* Executive 10-Second Quick Answer Box */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/80 to-slate-900 border border-blue-500/30 text-cyan-200 text-xs sm:text-sm font-semibold space-y-1 shadow-md">
                      <div className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                        ⚡ 10-Second Executive Summary Answer:
                      </div>
                      <p className="text-slate-200 leading-relaxed pl-4 font-medium">{iq.shortAnswer}</p>
                    </div>

                    {/* Detailed Point-Wise Breakdown (Titles on New Lines) */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                        Point-Wise Core Answer Breakdown
                      </h4>

                      <div className="space-y-3 p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                        {iq.detailedPoints.map((point, pIdx) => {
                          const boldMatch = point.match(/^([•\-\*]?\s*\d*\.?\s*\*\*.*?\*\*)\s*[:\-]?\s*(.*)$/);

                          if (boldMatch) {
                            const titleText = boldMatch[1].replace(/[\*•\-]/g, '').trim();
                            const descText = boldMatch[2].trim();

                            return (
                              <div key={pIdx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                                <div className="text-xs sm:text-sm font-extrabold text-cyan-300 flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                                  <span>{titleText}</span>
                                </div>
                                {descText && (
                                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium pl-4 border-l-2 border-blue-500/40 pt-0.5">
                                    {descText.replace(/^[:\-]\s*/, '')}
                                  </p>
                                )}
                              </div>
                            );
                          }

                          return (
                            <div key={pIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/60 flex items-start gap-2.5 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                              <span>{point.replace(/^•\s*/, '')}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Code Snippet if applicable */}
                    {iq.codeSnippet && (
                      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs text-emerald-300 p-4">
                        <code>{iq.codeSnippet}</code>
                      </div>
                    )}

                    {/* Pro Interviewer Tip */}
                    <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs space-y-1 shadow-md">
                      <div className="flex items-center gap-2 font-bold text-amber-400">
                        <Lightbulb className="w-4 h-4" />
                        Pro Interviewer Strategy Tip:
                      </div>
                      <p className="text-slate-200 italic pl-6 font-medium">{iq.interviewTip}</p>
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
