import React, { useState } from 'react';
import { Play, RotateCcw, Sparkles, Terminal, Table as TableIcon, Cpu, AlertCircle, Clock } from 'lucide-react';
import { executeAbapCode } from '../abapEngine/interpreter';
import type { AbapExecutionResult } from '../types';

const SAMPLE_TEMPLATES: Record<string, { label: string; code: string }> = {
  modern_abap: {
    label: 'Modern ABAP 7.4 (VALUE, Table Expr, REDUCE)',
    code: `* Modern ABAP 7.4+ Syntax Demonstration

* 1. VALUE #() Constructor
DATA(lt_flights) = VALUE #(
  ( carrid = 'LH' connid = '0400' price = '899.00' currency = 'EUR' )
  ( carrid = 'AA' connid = '0017' price = '650.00' currency = 'USD' )
  ( carrid = 'SQ' connid = '0321' price = '1450.00' currency = 'USD' )
).

WRITE: / '--- INLINE CONSTRUCTED INTERNAL TABLE ---'.
LOOP AT lt_flights INTO DATA(ls_flight).
  WRITE: / |Flight: { ls_flight-carrid }-{ ls_flight-connid } | Price: { ls_flight-price } { ls_flight-currency }|.
ENDLOOP.

ULINE.

* 2. Direct Table Expression [ ... ]
DATA(ls_lh) = lt_flights[ carrid = 'LH' ].
WRITE: / |Direct Lookup [ carrid = "LH" ] -> Price: { ls_lh-price } { ls_lh-currency }|.
`
  },
  open_sql: {
    label: 'Open SQL Query & Database Escaping (@)',
    code: `* Open SQL Database Query Simulation
DATA: lv_carrid TYPE string VALUE 'LH'.

WRITE: / |Executing Open SQL Query on SFLIGHT table for Carrier: { lv_carrid }...|.

SELECT * FROM sflight
  INTO TABLE @DATA(lt_lh_flights)
  WHERE carrid = @lv_carrid.

IF sy-subrc = 0.
  WRITE: / |Query Executed Successfully [sy-subrc = 0]. Found { sy-dbcnt } rows.|.
  ULINE.
  LOOP AT lt_lh_flights INTO DATA(ls_row).
    WRITE: / |Flight: { ls_row-carrid }-{ ls_row-connid } | Date: { ls_row-fldate } | Price: { ls_row-price } { ls_row-currency }|.
  ENDLOOP.
ENDIF.
`
  },
  oo_abap: {
    label: 'Object-Oriented ABAP (Class & Method)',
    code: `* Object-Oriented ABAP Class Definition & Call

CLASS lcl_order_processor DEFINITION.
  PUBLIC SECTION.
    METHODS:
      constructor IMPORTING iv_agent TYPE string,
      create_order IMPORTING iv_customer TYPE string iv_amount TYPE p,
      print_summary.
  PRIVATE SECTION.
    DATA: mv_agent TYPE string,
          mv_total_amount TYPE p DECIMALS 2,
          mv_order_count  TYPE i.
ENDCLASS.

CLASS lcl_order_processor IMPLEMENTATION.
  METHOD constructor.
    mv_agent = iv_agent.
  ENDMETHOD.

  METHOD create_order.
    mv_order_count = mv_order_count + 1.
    mv_total_amount = mv_total_amount + iv_amount.
    WRITE: / |[ORDER CONFIRMED] Customer { iv_customer } charged { iv_amount } EUR by Agent { mv_agent }.|.
  ENDMETHOD.

  METHOD print_summary.
    ULINE.
    WRITE: / |--- TOTAL AGENT SUMMARY: { mv_agent } ---|,
           / |Orders Processed: { mv_order_count }|,
           / |Total Sales Volume: { mv_total_amount } EUR|.
  ENDMETHOD.
ENDCLASS.

DATA(lo_proc) = NEW lcl_order_processor( 'Moinu_SAP_Specialist' ).
lo_proc->create_order( iv_customer = 'ACME Corp' iv_amount = 12500 ).
lo_proc->create_order( iv_customer = 'TechVentures' iv_amount = 45000 ).
lo_proc->print_summary( ).
`
  },
  alv_grid: {
    label: 'ALV Grid Report (cl_salv_table)',
    code: `* Object-Oriented ALV Grid Report Simulation

DATA(lt_flights) = VALUE #(
  ( carrid = 'LH' connid = '0400' price = 899.00 currency = 'EUR' planetype = 'A350-900' )
  ( carrid = 'AA' connid = '0017' price = 650.00 currency = 'USD' planetype = 'B777-300' )
  ( carrid = 'SQ' connid = '0321' price = 1450.00 currency = 'USD' planetype = 'A380-800' )
).

WRITE: / 'Initializing cl_salv_table ALV Grid Display...'.

cl_salv_table=>factory(
  IMPORTING r_salv_table = DATA(lo_alv)
  CHANGING  t_table      = lt_flights
).

lo_alv->display( ).
`
  }
};

export const AbapStudio: React.FC<{ initialCode?: string }> = ({ initialCode }) => {
  const [code, setCode] = useState<string>(initialCode || SAMPLE_TEMPLATES.modern_abap.code);
  const [activeView, setActiveView] = useState<'console' | 'alv' | 'inspector'>('console');
  const [result, setResult] = useState<AbapExecutionResult | null>(null);

  const handleRun = () => {
    const res = executeAbapCode(code);
    setResult(res);
    if (res.alvData && res.alvData.length > 0) {
      setActiveView('alv');
    }
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    if (SAMPLE_TEMPLATES[key]) {
      setCode(SAMPLE_TEMPLATES[key].code);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Studio Header Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            ABAP Interactive Code Studio
          </h1>
          <p className="text-xs text-slate-400">
            Execute Modern ABAP 7.4+, Open SQL, Internal Tables, OO ABAP & ALV Grid in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Template Picker */}
          <select
            onChange={handleTemplateChange}
            className="bg-slate-950 text-slate-200 text-xs rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="">-- Load ABAP Template --</option>
            {Object.entries(SAMPLE_TEMPLATES).map(([key, item]) => (
              <option key={key} value={key}>{item.label}</option>
            ))}
          </select>

          <button
            onClick={() => setCode('')}
            className="p-2 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-xl transition-all hover:bg-slate-800"
            title="Clear Editor"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleRun}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            EXECUTE (F8)
          </button>
        </div>
      </div>

      {/* Main Workspace Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Code Editor Pane */}
        <div className="flex flex-col bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ZREPORT_STUDIO.ABAP
            </div>
            <span className="text-[11px] text-slate-500 font-mono">SE38 / SE80 ABAP Workbench</span>
          </div>

          <div className="relative flex-1 min-h-[420px] font-mono text-sm leading-6">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="* Enter your ABAP code here..."
              className="w-full h-full p-4 bg-transparent text-emerald-300 focus:outline-none resize-none font-mono text-sm leading-6 selection:bg-blue-600 selection:text-white"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Output Console Pane */}
        <div className="flex flex-col bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl min-h-[420px]">
          
          {/* Output Mode Tabs */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('console')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'console'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                Write Output List
              </button>

              <button
                onClick={() => setActiveView('alv')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'alv'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                ALV Grid Display {result?.alvData ? `(${result.alvData.length})` : ''}
              </button>

              <button
                onClick={() => setActiveView('inspector')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'inspector'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                System Variables (sy-)
              </button>
            </div>

            {result && (
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>{result.executionTimeMs} ms</span>
              </div>
            )}
          </div>

          {/* Output Content Area */}
          <div className="p-4 flex-1 overflow-y-auto font-mono text-xs text-slate-200 bg-slate-950">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 py-16 space-y-3">
                <Play className="w-10 h-10 text-slate-700 animate-bounce" />
                <p>Press <span className="text-blue-400 font-bold">EXECUTE (F8)</span> to run ABAP script</p>
              </div>
            ) : (
              <div>
                {/* Error Banner if any */}
                {result.errors.length > 0 && (
                  <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      ABAP Runtime Exception:
                    </div>
                    {result.errors.map((err, idx) => (
                      <p key={idx} className="text-[11px] text-red-200 pl-6">{err}</p>
                    ))}
                  </div>
                )}

                {/* 1. WRITE Console Output */}
                {activeView === 'console' && (
                  <div className="space-y-1">
                    {result.outputLines.length === 0 ? (
                      <p className="text-slate-500 italic">No WRITE output generated.</p>
                    ) : (
                      result.outputLines.map((line, idx) => (
                        <div key={idx} className="whitespace-pre text-slate-200 hover:bg-slate-900/50 px-1 py-0.5 rounded">
                          {line}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* 2. ALV Grid View */}
                {activeView === 'alv' && (
                  <div>
                    {!result.alvData || result.alvData.length === 0 ? (
                      <p className="text-slate-500 italic py-8 text-center">
                        No ALV table bound. Call cl_salv_table=&gt;factory( ... )-&gt;display( ) or execute Open SQL query to populate ALV Grid.
                      </p>
                    ) : (
                      <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/40">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-900 border-b border-slate-800 text-cyan-400 font-bold">
                              {result.alvColumns?.map((col) => (
                                <th key={col} className="p-2.5 uppercase tracking-wider">{col}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {result.alvData.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-blue-900/20 transition-colors">
                                {result.alvColumns?.map((col) => (
                                  <td key={col} className="p-2.5 text-slate-300 font-mono">
                                    {String(row[col] ?? '')}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. System Variables Inspector */}
                {activeView === 'inspector' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">sy-subrc (Return Code)</span>
                        <span className={`text-base font-extrabold ${result.sysVariables['sy-subrc'] === 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {result.sysVariables['sy-subrc']} {result.sysVariables['sy-subrc'] === 0 ? '[OK SUCCESS]' : '[FAILED]'}
                        </span>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">sy-dbcnt (DB Rows Found)</span>
                        <span className="text-base font-extrabold text-cyan-400">
                          {result.sysVariables['sy-dbcnt']} Records
                        </span>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">sy-tabix (Loop Index)</span>
                        <span className="text-base font-extrabold text-purple-400">
                          {result.sysVariables['sy-tabix']}
                        </span>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">sy-uname (User)</span>
                        <span className="text-base font-extrabold text-amber-400">
                          {result.sysVariables['sy-uname']}
                        </span>
                      </div>
                    </div>

                    {/* Active Memory Variables */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">ABAP Memory Variable Inspector</h4>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 font-mono">
                        {Object.entries(result.variables).length === 0 ? (
                          <p className="text-slate-500 italic">No variables declared in memory.</p>
                        ) : (
                          Object.entries(result.variables).map(([k, v]) => (
                            <div key={k} className="flex items-center justify-between text-xs border-b border-slate-800/60 pb-1">
                              <span className="text-indigo-400 font-bold">{k}</span>
                              <span className="text-emerald-300 truncate max-w-xs">{JSON.stringify(v)}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
