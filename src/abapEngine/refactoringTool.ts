import type { RefactorSuggestion } from '../types';

export interface RefactorResult {
  modernizedCode: string;
  suggestions: RefactorSuggestion[];
  stats: {
    modernizations: number;
    warnings: number;
    linesSaved: number;
  };
}

export function refactorAbapCode(originalCode: string): RefactorResult {
  const lines = originalCode.split('\n');
  const suggestions: RefactorSuggestion[] = [];
  const transformedLines: string[] = [];

  let modernizationsCount = 0;
  let warningsCount = 0;
  let origLineCount = lines.length;

  for (let idx = 0; idx < lines.length; idx++) {
    let line = lines[idx];
    const trimmed = line.trim();
    const lineNum = idx + 1;

    if (/READ\s+TABLE\s+([A-Za-z0-9_-]+)\s+INTO\s+([A-Za-z0-9_-]+)\s+WITH\s+KEY\s+(.*?)\./i.test(trimmed)) {
      const match = trimmed.match(/READ\s+TABLE\s+([A-Za-z0-9_-]+)\s+INTO\s+([A-Za-z0-9_-]+)\s+WITH\s+KEY\s+(.*?)\./i);
      if (match) {
        const tab = match[1];
        const target = match[2];
        const keyCond = match[3];
        const modern = `${target} = ${tab}[ ${keyCond} ].`;
        transformedLines.push(line.replace(trimmed, modern));

        suggestions.push({
          line: lineNum,
          type: 'modern_abap',
          original: trimmed,
          suggested: modern,
          explanation: 'Replaced legacy READ TABLE statement with Modern ABAP 7.4 Table Expression [ ... ].'
        });
        modernizationsCount++;
        continue;
      }
    }

    if (/CONCATENATE\s+(.*?)\s+INTO\s+([A-Za-z0-9_-]+)\./i.test(trimmed)) {
      const match = trimmed.match(/CONCATENATE\s+(.*?)\s+INTO\s+([A-Za-z0-9_-]+)\./i);
      if (match) {
        const sources = match[1].split(/\s+/).map(s => `{ ${s} }`).join('');
        const target = match[2];
        const modern = `${target} = |${sources}|.`;
        transformedLines.push(line.replace(trimmed, modern));

        suggestions.push({
          line: lineNum,
          type: 'modern_abap',
          original: trimmed,
          suggested: modern,
          explanation: 'Replaced CONCATENATE with Modern ABAP String Template |...|.'
        });
        modernizationsCount++;
        continue;
      }
    }

    if (/MOVE-CORRESPONDING\s+([A-Za-z0-9_-]+)\s+TO\s+([A-Za-z0-9_-]+)\./i.test(trimmed)) {
      const match = trimmed.match(/MOVE-CORRESPONDING\s+([A-Za-z0-9_-]+)\s+TO\s+([A-Za-z0-9_-]+)\./i);
      if (match) {
        const src = match[1];
        const dst = match[2];
        const modern = `${dst} = CORRESPONDING #( ${src} ).`;
        transformedLines.push(line.replace(trimmed, modern));

        suggestions.push({
          line: lineNum,
          type: 'modern_abap',
          original: trimmed,
          suggested: modern,
          explanation: 'Replaced MOVE-CORRESPONDING with Modern ABAP 7.4 CORRESPONDING #( ) operator.'
        });
        modernizationsCount++;
        continue;
      }
    }

    if (/INTO\s+TABLE\s+([A-Za-z0-9_-]+)\./i.test(trimmed) && !trimmed.includes('@DATA')) {
      const match = trimmed.match(/INTO\s+TABLE\s+([A-Za-z0-9_-]+)\./i);
      if (match) {
        const tabName = match[1];
        const modern = trimmed.replace(`INTO TABLE ${tabName}`, `INTO TABLE @DATA(${tabName})`);
        transformedLines.push(line.replace(trimmed, modern));

        suggestions.push({
          line: lineNum,
          type: 'modern_abap',
          original: trimmed,
          suggested: modern,
          explanation: 'Used Modern ABAP 7.4 Host variable escaping @ and Inline Declaration @DATA(...).'
        });
        modernizationsCount++;
        continue;
      }
    }

    if (/SELECT\s+\*\s+FROM\s+([A-Za-z0-9_]+)\s+INTO/i.test(trimmed) && !trimmed.includes('WHERE')) {
      suggestions.push({
        line: lineNum,
        type: 'performance',
        original: trimmed,
        suggested: trimmed + ' WHERE ...',
        explanation: 'Performance Warning: Full table scan detected! Avoid SELECT * without a WHERE clause in S/4HANA.'
      });
      warningsCount++;
    }

    if (/LOOP\s+AT/i.test(lines[Math.max(0, idx - 2)] || '') && /^SELECT/i.test(trimmed)) {
      suggestions.push({
        line: lineNum,
        type: 'performance',
        original: trimmed,
        suggested: 'FOR ALL ENTRIES IN ... or JOIN query',
        explanation: 'Critical Performance Bug: Database SELECT inside a LOOP AT (N+1 Query). Use FOR ALL ENTRIES or a JOIN query instead!'
      });
      warningsCount++;
    }

    transformedLines.push(line);
  }

  const newLinesCount = transformedLines.length;

  return {
    modernizedCode: transformedLines.join('\n'),
    suggestions,
    stats: {
      modernizations: modernizationsCount,
      warnings: warningsCount,
      linesSaved: Math.max(0, origLineCount - newLinesCount)
    }
  };
}
