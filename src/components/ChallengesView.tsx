import React, { useState } from 'react';
import { Trophy, CheckCircle2, Play, Lightbulb, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CODING_CHALLENGES } from '../data/challengesData';
import type { CodingChallenge, UserProgress } from '../types';
import { executeAbapCode } from '../abapEngine/interpreter';

interface ChallengesViewProps {
  progress: UserProgress;
  onSolveChallenge: (challengeId: string, points: number) => void;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({
  progress,
  onSolveChallenge
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<CodingChallenge>(CODING_CHALLENGES[0]);
  const [code, setCode] = useState<string>(CODING_CHALLENGES[0].initialCode);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[] | null>(null);

  const handleSelectChallenge = (ch: CodingChallenge) => {
    setSelectedChallenge(ch);
    setCode(ch.initialCode);
    setShowHint(false);
    setTestResults(null);
  };

  const handleRunGrading = () => {
    const execRes = executeAbapCode(code);
    const results: { passed: boolean; message: string }[] = [];
    let allPassed = true;

    selectedChallenge.testCases.forEach((tc) => {
      let passed = true;
      if (tc.expectedOutputSubstring) {
        const fullOutputStr = execRes.outputLines.join('\n');
        passed = fullOutputStr.includes(tc.expectedOutputSubstring);
      }

      if (!passed) allPassed = false;

      results.push({
        passed,
        message: tc.description
      });
    });

    setTestResults(results);

    if (allPassed) {
      onSolveChallenge(selectedChallenge.id, selectedChallenge.points);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const isSolved = (chId: string) => progress.solvedChallengeIds.includes(chId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 p-4 sm:p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            Hands-on ABAP Coding Arena
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Solve real-world ABAP challenges, test your code against automated test suites, and earn XP points.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
          <div>
            <span className="text-xs text-slate-400 block font-medium">Challenges Solved</span>
            <span className="text-sm font-extrabold text-amber-400">
              {progress.solvedChallengeIds.length} / {CODING_CHALLENGES.length}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Challenge List Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">Available Arena Challenges</h3>
          
          <div className="space-y-2">
            {CODING_CHALLENGES.map((ch) => {
              const isSelected = ch.id === selectedChallenge.id;
              const solved = isSolved(ch.id);

              let difficultyColor = 'text-blue-400 bg-blue-500/10 border-blue-500/20';
              if (ch.difficulty === 'Intermediate') difficultyColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
              if (ch.difficulty === 'Advanced') difficultyColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
              if (ch.difficulty === 'S/4HANA') difficultyColor = 'text-purple-400 bg-purple-500/10 border-purple-500/20';

              return (
                <button
                  key={ch.id}
                  onClick={() => handleSelectChallenge(ch)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-blue-500/50 shadow-lg shadow-blue-500/10'
                      : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${difficultyColor}`}>
                        {ch.difficulty}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">{ch.category}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white">{ch.title}</h4>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {solved ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <span className="text-xs font-bold text-amber-400">+{ch.points} XP</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Challenge Code Workbench */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-6 backdrop-blur-md">
            
            {/* Challenge Title & Prompt */}
            <div className="border-b border-slate-800 pb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {selectedChallenge.category} • {selectedChallenge.points} XP
                </span>
                {isSolved(selectedChallenge.id) && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Solved
                  </span>
                )}
              </div>

              <h2 className="text-xl font-extrabold text-white">{selectedChallenge.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{selectedChallenge.description}</p>
            </div>

            {/* Code Editor */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl space-y-0">
              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 font-mono">SOLUTION.ABAP</span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    {showHint ? 'Hide Hint' : 'Show Solution Hint'}
                  </button>

                  <button
                    onClick={() => setCode(selectedChallenge.initialCode)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-all"
                    title="Reset Code"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {showHint && (
                <div className="p-3 bg-amber-950/40 border-b border-amber-800/40 text-amber-200 text-xs font-mono">
                  💡 <span className="font-bold">Hint:</span> {selectedChallenge.solutionHint}
                </div>
              )}

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-4 bg-transparent text-emerald-300 focus:outline-none font-mono text-sm leading-6 resize-none"
                spellCheck={false}
              />
            </div>

            {/* Actions & Test Results */}
            <div className="space-y-4">
              <button
                onClick={handleRunGrading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                Submit Code & Run Test Cases
              </button>

              {testResults && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Test Suite Evaluation</h4>
                  <div className="space-y-2">
                    {testResults.map((tr, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg border text-xs flex items-center justify-between font-mono ${
                          tr.passed
                            ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                            : 'bg-red-950/40 border-red-800/60 text-red-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {tr.passed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
                          {tr.message}
                        </span>
                        <span className="font-bold uppercase text-[10px]">{tr.passed ? 'PASSED' : 'FAILED'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
