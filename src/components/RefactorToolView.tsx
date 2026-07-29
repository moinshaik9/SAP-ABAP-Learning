import React, { useState } from 'react';
import { Wand2, ArrowRight, AlertTriangle, Sparkles, Copy, Check } from 'lucide-react';
import { refactorAbapCode } from '../abapEngine/refactoringTool';
import type { RefactorResult } from '../abapEngine/refactoringTool';

const SAMPLE_LEGACY_CODE = `* Legacy Pre-7.4 ABAP Code Sample

DATA: lt_flights TYPE TABLE OF sflight,
      ls_flight  TYPE sflight,
      lv_msg     TYPE string,
      ls_target  TYPE sflight.

* 1. Legacy Read Table
READ TABLE lt_flights INTO ls_flight WITH KEY carrid = 'LH'.

* 2. Legacy String Concatenate
CONCATENATE 'Flight Carrier:' ls_flight-carrid INTO lv_msg.

* 3. Legacy Move Corresponding
MOVE-CORRESPONDING ls_flight TO ls_target.

* 4. Legacy Select without inline declaration
SELECT * FROM sflight INTO TABLE lt_flights.
`;

export const RefactorToolView: React.FC = () => {
  const [inputCode, setInputCode] = useState<string>(SAMPLE_LEGACY_CODE);
  const [result, setResult] = useState<RefactorResult | null>(refactorAbapCode(SAMPLE_LEGACY_CODE));
  const [copied, setCopied] = useState<boolean>(false);

  const handleRefactor = () => {
    const res = refactorAbapCode(inputCode);
    setResult(res);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.modernizedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-purple-400" />
            Modern ABAP 7.4+ Refactoring Transpiler
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Convert legacy Pre-7.4 ABAP constructs into clean, modern expressions and detect performance anti-patterns.
          </p>
        </div>

        <button
          onClick={handleRefactor}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4" />
          Transpile & Lint Code
        </button>
      </div>

      {/* Main Grid: Code Editors Diff View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Legacy Code */}
        <div className="flex flex-col bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-red-400 font-mono">LEGACY PRE-7.4 ABAP</span>
            <span className="text-[11px] text-slate-500">Input Source</span>
          </div>
          <textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="w-full h-80 p-4 bg-transparent text-slate-300 focus:outline-none font-mono text-sm leading-6 resize-none"
            spellCheck={false}
          />
        </div>

        {/* Output Modernized Code */}
        <div className="flex flex-col bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 font-mono">MODERN ABAP 7.4+ OUTPUT</span>
            
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-cyan-400 hover:text-white transition-all font-semibold"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          <textarea
            value={result?.modernizedCode || ''}
            readOnly
            className="w-full h-80 p-4 bg-transparent text-emerald-300 focus:outline-none font-mono text-sm leading-6 resize-none"
          />
        </div>

      </div>

      {/* Refactoring Suggestions & Linter Warnings */}
      {result && (
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Transpiler & Linter Audit Report
            </h3>
            
            <div className="flex items-center gap-3 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                {result.stats.modernizations} Refactorings
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                {result.stats.warnings} Performance Alerts
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {result.suggestions.map((sug, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border space-y-2 ${
                  sug.type === 'performance'
                    ? 'bg-amber-950/30 border-amber-800/60'
                    : 'bg-purple-950/30 border-purple-800/60'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-2 font-bold text-cyan-300">
                    Line {sug.line}: {sug.type === 'performance' ? <AlertTriangle className="w-4 h-4 text-amber-400" /> : <Wand2 className="w-4 h-4 text-purple-400" />}
                    {sug.type.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-xs pt-1">
                  <div className="p-2 rounded bg-slate-950/80 text-red-300 line-through">
                    {sug.original}
                  </div>
                  <div className="p-2 rounded bg-slate-950/80 text-emerald-300 font-bold flex items-center gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    {sug.suggested}
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic pt-1">{sug.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
