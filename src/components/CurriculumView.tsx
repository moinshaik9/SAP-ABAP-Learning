import React, { useState } from 'react';
import { 
  Building2, 
  Code, 
  Table as TableIcon, 
  Zap, 
  Database, 
  Box, 
  Layers, 
  Briefcase, 
  BookOpen,
  CheckCircle2, 
  Play, 
  HelpCircle, 
  ArrowRight,
  Sparkles,
  Award,
  Calendar,
  Clock,
  CheckSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRICULUM_DATA } from '../data/curriculumData';
import type { Lesson, UserProgress } from '../types';

const ICON_MAP: Record<string, any> = {
  Building2,
  Code,
  Table: TableIcon,
  Zap,
  Database,
  Box,
  Layers,
  Briefcase
};

interface CurriculumViewProps {
  progress: UserProgress;
  onCompleteLesson: (lessonId: string, score: number) => void;
  onOpenStudioWithCode: (code: string) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  progress,
  onCompleteLesson,
  onOpenStudioWithCode
}) => {
  const [selectedLevelId, setSelectedLevelId] = useState<number>(1);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(CURRICULUM_DATA[0].lessons[0]);
  
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const activeLevel = CURRICULUM_DATA.find(lvl => lvl.id === selectedLevelId) || CURRICULUM_DATA[0];

  // Calculate 45-Day Schedule Stats
  const allLessons = CURRICULUM_DATA.flatMap(l => l.lessons);
  const totalTopics = allLessons.length;
  const completedTopics = allLessons.filter(l => progress.completedLessonIds.includes(l.id)).length;
  const totalPlannedDays = 45;
  const coveragePercent = Math.round((completedTopics / totalTopics) * 100);

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    let score = 0;
    selectedLesson.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        score += 50;
      }
    });

    setQuizSubmitted(true);
    onCompleteLesson(selectedLesson.id, score);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const isLessonCompleted = (lessonId: string) => progress.completedLessonIds.includes(lessonId);

  // Upgraded Line-by-Line Content Parser (Guarantees Title on Line 1 & Explanation on Line 2+)
  const renderStructuredContent = (content: string) => {
    // Split by headers (###) or double newlines or bullet dashes (- **)
    const sections = content.split(/(?=###|\n- \*\*|\n• )/g);

    return sections.map((sec, sIdx) => {
      const trimmed = sec.trim();
      if (!trimmed) return null;

      // Section Header ###
      if (trimmed.startsWith('###')) {
        const headerText = trimmed.replace(/^###\s*/, '');
        return (
          <div key={sIdx} className="pt-4 border-b border-slate-800 pb-2 mb-4">
            <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              {headerText}
            </h3>
          </div>
        );
      }

      // Bullet Item with Title on Line 1 & Explanation on Line 2
      const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ');
      const cleanText = isBullet ? trimmed.replace(/^[-•*]\s*/, '') : trimmed;

      const boldMatch = cleanText.match(/^(\*\*.*?\*\*)\s*[:\-]?\s*([\s\S]*)$/);

      if (boldMatch) {
        const titleText = boldMatch[1].replace(/\*\*/g, '').trim();
        const descText = boldMatch[2].trim();

        const descLines = descText.split('\n').filter(l => l.trim());

        return (
          <div key={sIdx} className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800/90 border-l-4 border-l-cyan-400 space-y-2.5 shadow-lg my-3">
            {/* Line 1: Title */}
            <div className="text-xs sm:text-sm font-extrabold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
              <span>{titleText}</span>
            </div>

            {/* Line 2+: Explanation (Each sentence on a clean new line) */}
            <div className="pl-4 border-l-2 border-slate-800 space-y-1.5 pt-0.5">
              {descLines.map((dLine, dIdx) => (
                <p key={dIdx} className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {dLine.replace(/^[:\-]\s*/, '')}
                </p>
              ))}
            </div>
          </div>
        );
      }

      // Standard Block
      return (
        <div key={sIdx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium my-2">
          {trimmed}
        </div>
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Official 45-Day SAP ABAP Schedule Roadmap Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-6 sm:p-8 border border-blue-500/20 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Official 45-Day SAP ABAP Schedule Roadmap (29/07/2026 → 12/09/2026)
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              SAP ABAP 45-Day Mastery Roadmap
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
              45 Planned Days covering 8 Phases & 39 Topics. Structured line-by-line explanations with Title on Line 1 and detailed explanations on Line 2+.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Coverage Progress</span>
              <span className="text-lg font-extrabold text-cyan-300">{coveragePercent}% ({completedTopics}/{totalTopics})</span>
            </div>
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Planned</span>
              <span className="text-lg font-extrabold text-amber-400">{totalPlannedDays} Days Total</span>
            </div>
          </div>
        </div>

        {/* Schedule % Coverage Progress Bar */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-400" />
              Schedule Duration: 29/07/2026 to 12/09/2026 (45 Days)
            </span>
            <span className="text-cyan-400">{completedTopics} of {totalTopics} Topics Completed</span>
          </div>
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${coveragePercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Phase Cards Selection Grid */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Select Roadmap Phase</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CURRICULUM_DATA.map((lvl) => {
            const IconComp = ICON_MAP[lvl.iconName] || BookOpen;
            const isSelected = lvl.id === selectedLevelId;
            const completedCount = lvl.lessons.filter(l => isLessonCompleted(l.id)).length;

            return (
              <button
                key={lvl.id}
                onClick={() => {
                  setSelectedLevelId(lvl.id);
                  setSelectedLesson(lvl.lessons[0]);
                  setQuizAnswers({});
                  setQuizSubmitted(false);
                }}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all ${
                  isSelected
                    ? 'bg-gradient-to-b from-blue-900/60 to-slate-900 border-blue-500 shadow-lg shadow-blue-500/20 scale-105'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div 
                    className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
                    style={{ backgroundColor: `${lvl.color}20`, color: lvl.color }}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-400">P{lvl.id}</span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{lvl.badge}</h4>
                  <span className="text-[10px] text-slate-400 block font-medium mt-0.5">{completedCount}/{lvl.lessons.length} Topics</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Topics List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                {activeLevel.phaseName}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {activeLevel.lessons.length} Topics
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-medium">{activeLevel.subtitle}</p>

            <div className="space-y-2 pt-1">
              {activeLevel.lessons.map((lesson) => {
                const isCurrent = lesson.id === selectedLesson.id;
                const isDone = isLessonCompleted(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonSelect(lesson)}
                    className={`w-full p-3 rounded-xl text-left border transition-all space-y-1.5 ${
                      isCurrent
                        ? 'bg-blue-600/20 border-blue-500/60 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className={`line-clamp-1 ${isCurrent ? 'text-cyan-300' : 'text-slate-200'}`}>
                        {lesson.topicName}
                      </span>
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      ) : (
                        <span className="text-[10px] text-amber-400 font-mono shrink-0 ml-2">{lesson.plannedDays}d</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                      <span>Target: {lesson.targetDate}</span>
                      {lesson.isMiniProject && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-extrabold">
                          🛠️ Mini Project
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Active Topic Content & Code Studio */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 backdrop-blur-md shadow-xl">
            
            {/* Active Topic Header */}
            <div className="border-b border-slate-800 pb-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                    {selectedLesson.phaseName}
                  </span>
                  {selectedLesson.isMiniProject && (
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      🛠️ Hands-on Project
                    </span>
                  )}
                  {isLessonCompleted(selectedLesson.id) && (
                    <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1">
                      <CheckSquare className="w-4 h-4" /> Topic Completed (100%)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 text-amber-400 border border-slate-800 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Planned: {selectedLesson.plannedDays} Day ({selectedLesson.targetDate})
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-400 border border-slate-800">
                    ⏱️ {selectedLesson.duration}
                  </span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {selectedLesson.topicName}
              </h2>

              {/* Concepts Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedLesson.concepts.map((c, idx) => (
                  <span key={idx} className="text-[11px] px-3 py-1 rounded-xl bg-slate-950 text-cyan-300 border border-slate-800 font-mono font-bold">
                    #{c}
                  </span>
                ))}
              </div>
            </div>

            {/* Topic Body Content (Line 1 = Title, Line 2 = Explanation) */}
            <div className="space-y-4 font-sans">
              {renderStructuredContent(selectedLesson.content)}
            </div>

            {/* Runnable Code Snippet Box */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
              <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Runnable ABAP Code Snippet
                </span>

                <button
                  onClick={() => onOpenStudioWithCode(selectedLesson.codeSnippet)}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Run in ABAP Studio
                </button>
              </div>

              <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-6 bg-slate-950">
                <code>{selectedLesson.codeSnippet}</code>
              </pre>
            </div>

            {/* Knowledge Check Quiz Section */}
            <div className="pt-6 border-t border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  Topic Knowledge Check Quiz (+100 XP)
                </h3>
              </div>

              <div className="space-y-4">
                {selectedLesson.quiz.map((q, qIdx) => (
                  <div key={q.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <p className="text-xs sm:text-sm font-extrabold text-white">
                      {qIdx + 1}. {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = quizAnswers[q.id] === oIdx;
                        const isCorrect = q.correctAnswer === oIdx;
                        
                        let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80';
                        if (quizSubmitted) {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-extrabold';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'bg-red-950/80 border-red-500 text-red-300 font-bold';
                          }
                        } else if (isSelected) {
                          btnStyle = 'bg-blue-900/60 border-blue-500 text-cyan-300 font-extrabold shadow-md';
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleOptionSelect(q.id, oIdx)}
                            className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-cyan-200 text-xs font-medium space-y-1">
                        💡 <span className="font-bold text-white">Explanation:</span> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}

                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < selectedLesson.quiz.length}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    Complete Topic & Claim Schedule % Coverage
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 text-center text-emerald-300 font-extrabold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2">
                    <Award className="w-5 h-5 text-emerald-400" />
                    Topic Mastered! Completed Days updated in your 45-Day Schedule Roadmap.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
