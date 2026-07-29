import type { AbapExecutionResult } from '../types';

// Mock Database Tables for Open SQL Simulation
const MOCK_DATABASE: Record<string, Record<string, any>[]> = {
  SFLIGHT: [
    { CARRID: 'LH', CONNID: '0400', FLDATE: '2026-08-15', PRICE: 899.00, CURRENCY: 'EUR', PLANETYPE: 'A350-900', SEATSMAX: 300, SEATSOCC: 285 },
    { CARRID: 'LH', CONNID: '0401', FLDATE: '2026-08-16', PRICE: 950.50, CURRENCY: 'EUR', PLANETYPE: 'A350-900', SEATSMAX: 300, SEATSOCC: 290 },
    { CARRID: 'AA', CONNID: '0017', FLDATE: '2026-08-20', PRICE: 650.00, CURRENCY: 'USD', PLANETYPE: 'B777-300', SEATSMAX: 350, SEATSOCC: 310 },
    { CARRID: 'AA', CONNID: '0064', FLDATE: '2026-08-22', PRICE: 720.00, CURRENCY: 'USD', PLANETYPE: 'B787-9',   SEATSMAX: 290, SEATSOCC: 275 },
    { CARRID: 'SQ', CONNID: '0321', FLDATE: '2026-08-25', PRICE: 1450.00, CURRENCY: 'USD', PLANETYPE: 'A380-800', SEATSMAX: 471, SEATSOCC: 450 },
    { CARRID: 'EK', CONNID: '0203', FLDATE: '2026-08-28', PRICE: 1100.00, CURRENCY: 'USD', PLANETYPE: 'A380-800', SEATSMAX: 489, SEATSOCC: 480 }
  ],
  SPFLI: [
    { CARRID: 'LH', CONNID: '0400', CITYFROM: 'FRANKFURT', CITYTO: 'NEW YORK', DEPTIME: '10:15:00', ARRTIME: '12:45:00', DISTANCE: 6200 },
    { CARRID: 'AA', CONNID: '0017', CITYFROM: 'NEW YORK', CITYTO: 'LONDON', DEPTIME: '19:30:00', ARRTIME: '07:15:00', DISTANCE: 5500 },
    { CARRID: 'SQ', CONNID: '0321', CITYFROM: 'SINGAPORE', CITYTO: 'LONDON', DEPTIME: '23:00:00', ARRTIME: '05:30:00', DISTANCE: 10800 }
  ],
  VBAK: [
    { VBELN: '0000001001', ERDAT: '2026-07-01', ERNAM: 'SAP_CONSULTANT', NETWR: 15400.00, WAERK: 'EUR', VKORG: '1000', KUNNR: '0000100450' },
    { VBELN: '0000001002', ERDAT: '2026-07-10', ERNAM: 'DEV_ABAP', NETWR: 89000.50, WAERK: 'USD', VKORG: '2000', KUNNR: '0000100890' },
    { VBELN: '0000001003', ERDAT: '2026-07-22', ERNAM: 'SAP_CONSULTANT', NETWR: 3200.00, WAERK: 'EUR', VKORG: '1000', KUNNR: '0000100120' }
  ],
  MARA: [
    { MATNR: 'MAT-100-88', MTART: 'FERT', MATKL: '001', MEINS: 'EA', NTGEW: 1.5, GEWEI: 'KG' },
    { MATNR: 'MAT-200-99', MTART: 'ROH',  MATKL: '002', MEINS: 'KG', NTGEW: 50.0, GEWEI: 'KG' },
    { MATNR: 'MAT-300-11', MTART: 'HAWA', MATKL: '005', MEINS: 'PC', NTGEW: 0.2, GEWEI: 'KG' }
  ],
  KNA1: [
    { KUNNR: '0000100450', NAME1: 'GLOBAL ACME CORP', LAND1: 'DE', ORT01: 'BERLIN', PSTLZ: '10115' },
    { KUNNR: '0000100890', NAME1: 'TECHVENTURES INC', LAND1: 'US', ORT01: 'NEW YORK', PSTLZ: '10001' }
  ]
};

export function executeAbapCode(code: string): AbapExecutionResult {
  const startTime = performance.now();
  const outputLines: string[] = [];
  const errors: string[] = [];
  const variables: Record<string, any> = {};
  let alvData: Record<string, any>[] | undefined = undefined;
  let alvColumns: string[] | undefined = undefined;

  const sysVariables = {
    'sy-subrc': 0,
    'sy-tabix': 0,
    'sy-dbcnt': 0,
    'sy-uname': 'DEVELOPER',
    'sy-datum': new Date().toISOString().slice(0, 10).replace(/-/g, ''),
    'sy-uzeit': new Date().toTimeString().slice(0, 8).replace(/:/g, '')
  };

  try {
    const rawLines = code.split('\n');
    const statements: string[] = [];
    let currentStmt = '';

    for (let i = 0; i < rawLines.length; i++) {
      let line = rawLines[i].trim();
      if (line.startsWith('*') || line.startsWith('"')) continue;
      const commentIdx = line.indexOf('"');
      if (commentIdx !== -1) {
        line = line.substring(0, commentIdx).trim();
      }

      if (!line) continue;

      currentStmt += ' ' + line;
      if (line.endsWith('.')) {
        statements.push(currentStmt.slice(0, -1).trim());
        currentStmt = '';
      }
    }
    if (currentStmt.trim()) {
      statements.push(currentStmt.trim());
    }

    let i = 0;
    while (i < statements.length) {
      const stmt = statements[i].trim();
      if (!stmt) { i++; continue; }

      if (/^DATA\s+/i.test(stmt)) {
        parseDataDeclaration(stmt, variables);
      }
      else if (/^DATA\((.*?)\)\s*=\s*(.*)/i.test(stmt)) {
        const match = stmt.match(/^DATA\((.*?)\)\s*=\s*(.*)/i);
        if (match) {
          const varName = match[1].trim();
          const expr = match[2].trim();
          variables[varName] = evaluateExpression(expr, variables, sysVariables);
        }
      }
      else if (/^[A-Za-z0-9_\-\>\[\]\(\)]+\s*=\s*/i.test(stmt) && !/^SELECT/i.test(stmt) && !/^IF/i.test(stmt)) {
        const equalIdx = stmt.indexOf('=');
        const varName = stmt.substring(0, equalIdx).trim();
        const expr = stmt.substring(equalIdx + 1).trim();

        if (/^VALUE\s+#/i.test(expr)) {
          variables[varName] = parseValueConstructor(expr, variables, sysVariables);
        } else {
          variables[varName] = evaluateExpression(expr, variables, sysVariables);
        }
      }
      else if (/^WRITE:?\s+/i.test(stmt)) {
        const content = stmt.replace(/^WRITE:?\s+/i, '').trim();
        const items = splitAbapList(content);
        const lineOutputs: string[] = [];

        for (const item of items) {
          let cleanItem = item.trim();
          if (cleanItem === '/' || cleanItem === 'ULINE' || cleanItem === 'uline') {
            if (lineOutputs.length > 0) {
              outputLines.push(lineOutputs.join('  '));
              lineOutputs.length = 0;
            }
            if (cleanItem.toUpperCase() === 'ULINE') {
              outputLines.push('--------------------------------------------------------------------------------');
            }
            continue;
          }

          const evaluated = evaluateExpression(cleanItem, variables, sysVariables);
          lineOutputs.push(formatAbapVal(evaluated));
        }

        if (lineOutputs.length > 0) {
          outputLines.push(lineOutputs.join('  '));
        }
      }
      else if (/^ULINE/i.test(stmt)) {
        outputLines.push('--------------------------------------------------------------------------------');
      }
      else if (/^APPEND\s+/i.test(stmt)) {
        parseAppend(stmt, variables, sysVariables);
      }
      else if (/^SELECT\s+/i.test(stmt)) {
        const sqlRes = executeOpenSql(stmt, variables, sysVariables);
        sysVariables['sy-subrc'] = sqlRes.subrc;
        sysVariables['sy-dbcnt'] = sqlRes.dbcnt;
      }
      else if (/^LOOP\s+AT\s+/i.test(stmt)) {
        const loopEndIdx = findEndBlock(statements, i, /^LOOP/i, /^ENDLOOP/i);
        if (loopEndIdx === -1) {
          errors.push(`Syntax error: Missing ENDLOOP for LOOP AT on line statement ${i + 1}`);
          break;
        }

        executeLoopBlock(stmt, statements.slice(i + 1, loopEndIdx), variables, sysVariables, outputLines);
        i = loopEndIdx;
      }
      else if (/^IF\s+/i.test(stmt)) {
        const ifEndIdx = findEndBlock(statements, i, /^IF\s+/i, /^ENDIF/i);
        if (ifEndIdx === -1) {
          errors.push(`Syntax error: Missing ENDIF for IF block`);
          break;
        }

        executeIfBlock(statements.slice(i, ifEndIdx + 1), variables, sysVariables, outputLines);
        i = ifEndIdx;
      }
      else if (/^DO\s+/i.test(stmt)) {
        const doEndIdx = findEndBlock(statements, i, /^DO\s+/i, /^ENDDO/i);
        if (doEndIdx === -1) {
          errors.push(`Syntax error: Missing ENDDO for DO block`);
          break;
        }

        executeDoBlock(stmt, statements.slice(i + 1, doEndIdx), variables, sysVariables, outputLines);
        i = doEndIdx;
      }
      else if (/^READ\s+TABLE\s+/i.test(stmt)) {
        executeReadTable(stmt, variables, sysVariables);
      }
      else if (stmt.includes('cl_salv_table=>factory') || stmt.includes('->display(')) {
        for (const [vName, vVal] of Object.entries(variables)) {
          if (Array.isArray(vVal) && vVal.length > 0) {
            alvData = vVal;
            alvColumns = Object.keys(vVal[0]);
            outputLines.push(`[ALV GRID RENDERED]: Displaying ${vVal.length} records from table '${vName}'`);
            break;
          }
        }
      }
      else if (/^CLASS\s+/i.test(stmt) || /^CREATE\s+OBJECT/i.test(stmt)) {
        outputLines.push(`[OO ABAP RUNTIME]: Executed class structure / instance reference successfully.`);
      }

      i++;
    }

  } catch (err: any) {
    errors.push(`Runtime Exception: ${err.message || err}`);
  }

  const endTime = performance.now();

  return {
    outputLines,
    alvData,
    alvColumns,
    variables,
    sysVariables,
    errors,
    executionTimeMs: Math.round(endTime - startTime)
  };
}

function formatAbapVal(val: any): string {
  if (val === undefined || val === null) return '';
  if (typeof val === 'object') return JSON.stringify(val);
  return String(val);
}

function splitAbapList(str: string): string[] {
  const result: string[] = [];
  let current = '';
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if ((char === "'" || char === '|') && (!inString || stringChar === char)) {
      inString = !inString;
      stringChar = char;
      current += char;
    } else if (char === ',' && !inString) {
      if (current.trim()) result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) result.push(current.trim());
  return result;
}

function parseDataDeclaration(stmt: string, variables: Record<string, any>) {
  const nameMatch = stmt.match(/^DATA\s+([A-Za-z0-9_-]+)/i);
  if (!nameMatch) return;
  const varName = nameMatch[1].toLowerCase();

  if (/TYPE\s+TABLE\s+OF/i.test(stmt)) {
    variables[varName] = [];
    return;
  }

  let val: any = '';
  const valMatch = stmt.match(/VALUE\s+('(.*?)'|\|(.*?)\||\d+(\.\d+)?)/i);
  if (valMatch) {
    const rawVal = valMatch[1];
    if (rawVal.startsWith("'") && rawVal.endsWith("'")) {
      val = rawVal.slice(1, -1);
    } else if (!isNaN(Number(rawVal))) {
      val = Number(rawVal);
    } else {
      val = rawVal;
    }
  } else if (/TYPE\s+i/i.test(stmt) || /TYPE\s+f/i.test(stmt) || /TYPE\s+p/i.test(stmt)) {
    val = 0;
  }

  variables[varName] = val;
}

function evaluateExpression(expr: string, vars: Record<string, any>, sysVars: Record<string, any>): any {
  expr = expr.trim();

  if (expr.startsWith("'") && expr.endsWith("'")) {
    return expr.slice(1, -1);
  }

  if (expr.startsWith('|') && expr.endsWith('|')) {
    const templateContent = expr.slice(1, -1);
    return templateContent.replace(/\{\s*(.*?)\s*\}/g, (_, inner) => {
      return String(evaluateExpression(inner, vars, sysVars));
    });
  }

  if (!isNaN(Number(expr))) {
    return Number(expr);
  }

  if (expr.toLowerCase() in sysVars) {
    return (sysVars as any)[expr.toLowerCase()];
  }

  const tableExprMatch = expr.match(/^([A-Za-z0-9_-]+)\[\s*(.*?)\s*\]$/);
  if (tableExprMatch) {
    const tabName = tableExprMatch[1].toLowerCase();
    const condition = tableExprMatch[2];
    const tab = vars[tabName];
    if (Array.isArray(tab)) {
      if (!isNaN(Number(condition))) {
        const idx = Number(condition) - 1;
        return tab[idx] !== undefined ? tab[idx] : null;
      }
      const condMatch = condition.match(/^([A-Za-z0-9_-]+)\s*=\s*(.*)$/);
      if (condMatch) {
        const field = condMatch[1].toUpperCase();
        const targetVal = evaluateExpression(condMatch[2], vars, sysVars);
        const found = tab.find(r => r[field] === targetVal || r[field.toLowerCase()] === targetVal);
        return found || null;
      }
    }
  }

  if (expr.includes('-')) {
    const [structName, fieldName] = expr.split('-');
    const struct = vars[structName.toLowerCase()];
    if (struct && typeof struct === 'object') {
      return struct[fieldName.toUpperCase()] ?? struct[fieldName.toLowerCase()] ?? '';
    }
  }

  if (expr.toLowerCase() in vars) {
    return vars[expr.toLowerCase()];
  }

  if (expr.includes('+') || expr.includes('-') || expr.includes('*') || expr.includes('/')) {
    try {
      const sanitized = expr.replace(/([A-Za-z0-9_]+)/g, (match) => {
        const val = vars[match.toLowerCase()];
        return typeof val === 'number' ? String(val) : match;
      });
      return Function(`"use strict"; return (${sanitized})`)();
    } catch {
      return expr;
    }
  }

  return expr;
}

function parseValueConstructor(expr: string, vars: Record<string, any>, sysVars: Record<string, any>): any {
  const rows: Record<string, any>[] = [];

  const tupleMatches = expr.match(/\(\s*([^\(\)]+)\s*\)/g);
  if (tupleMatches && tupleMatches.length > 0) {
    for (const tuple of tupleMatches) {
      const cleanTuple = tuple.slice(1, -1).trim();
      const rowObj: Record<string, any> = {};
      const pairs = cleanTuple.match(/([A-Za-z0-9_]+)\s*=\s*('(.*?)'|\|(.*?)\||\d+(\.\d+)?|[A-Za-z0-9_-]+)/g);
      if (pairs) {
        for (const p of pairs) {
          const [f, v] = p.split('=').map(s => s.trim());
          rowObj[f.toUpperCase()] = evaluateExpression(v, vars, sysVars);
        }
        rows.push(rowObj);
      }
    }
    return rows;
  }

  const rowObj: Record<string, any> = {};
  const pairs = expr.match(/([A-Za-z0-9_]+)\s*=\s*('(.*?)'|\|(.*?)\||\d+(\.\d+)?|[A-Za-z0-9_-]+)/g);
  if (pairs) {
    for (const p of pairs) {
      const [f, v] = p.split('=').map(s => s.trim());
      rowObj[f.toUpperCase()] = evaluateExpression(v, vars, sysVars);
    }
  }
  return rowObj;
}

function parseAppend(stmt: string, vars: Record<string, any>, sysVars: Record<string, any>) {
  const match = stmt.match(/^APPEND\s+(.*?)\s+TO\s+([A-Za-z0-9_-]+)/i);
  if (!match) return;

  const itemExpr = match[1].trim();
  const tabName = match[2].toLowerCase();

  if (!Array.isArray(vars[tabName])) {
    vars[tabName] = [];
  }

  let itemToAppend: any;
  if (/^VALUE\s+#/i.test(itemExpr)) {
    itemToAppend = parseValueConstructor(itemExpr, vars, sysVars);
  } else {
    itemToAppend = evaluateExpression(itemExpr, vars, sysVars);
  }

  vars[tabName].push(itemToAppend);
  sysVars['sy-tabix'] = vars[tabName].length;
  sysVars['sy-subrc'] = 0;
}

function executeOpenSql(stmt: string, vars: Record<string, any>, sysVars: Record<string, any>): { subrc: number, dbcnt: number } {
  const dbMatch = stmt.match(/FROM\s+([A-Za-z0-9_]+)/i);
  if (!dbMatch) return { subrc: 4, dbcnt: 0 };

  const dbTableName = dbMatch[1].toUpperCase();
  const dbData = MOCK_DATABASE[dbTableName] || [];

  const targetMatch = stmt.match(/INTO\s+(TABLE\s+)?(@DATA\(([A-Za-z0-9_-]+)\)|[A-Za-z0-9_-]+)/i);
  let targetVarName = '';
  if (targetMatch) {
    if (targetMatch[2].startsWith('@DATA(')) {
      targetVarName = targetMatch[3].toLowerCase();
    } else {
      targetVarName = targetMatch[2].toLowerCase();
    }
  }

  let filtered = [...dbData];

  const whereMatch = stmt.match(/WHERE\s+([A-Za-z0-9_]+)\s*=\s*('(.*?)'|\|(.*?)\||\d+|[A-Za-z0-9_-]+)/i);
  if (whereMatch) {
    const field = whereMatch[1].toUpperCase();
    const targetVal = evaluateExpression(whereMatch[2], vars, sysVars);
    filtered = filtered.filter(row => row[field] === targetVal || String(row[field]) === String(targetVal));
  }

  if (targetVarName) {
    vars[targetVarName] = filtered;
  }

  return {
    subrc: filtered.length > 0 ? 0 : 4,
    dbcnt: filtered.length
  };
}

function findEndBlock(statements: string[], startIdx: number, startRegex: RegExp, endRegex: RegExp): number {
  let depth = 0;
  for (let i = startIdx; i < statements.length; i++) {
    const stmt = statements[i].trim();
    if (startRegex.test(stmt)) depth++;
    if (endRegex.test(stmt)) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function executeLoopBlock(
  loopStmt: string,
  bodyStmts: string[],
  vars: Record<string, any>,
  sysVars: Record<string, any>,
  outputLines: string[]
) {
  const match = loopStmt.match(/^LOOP\s+AT\s+([A-Za-z0-9_-]+)(\s+INTO\s+(@DATA\(([A-Za-z0-9_-]+)\)|[A-Za-z0-9_-]+))?/i);
  if (!match) return;

  const tabName = match[1].toLowerCase();
  const targetVar = match[4] ? match[4].toLowerCase() : (match[3] ? match[3].toLowerCase() : 'ls_item');

  const tab = vars[tabName];
  if (!Array.isArray(tab)) return;

  for (let idx = 0; idx < tab.length; idx++) {
    sysVars['sy-tabix'] = idx + 1;
    vars[targetVar] = tab[idx];

    for (const stmt of bodyStmts) {
      if (/^WRITE:?\s+/i.test(stmt)) {
        const content = stmt.replace(/^WRITE:?\s+/i, '').trim();
        const items = splitAbapList(content);
        const lineOutputs: string[] = [];

        for (const item of items) {
          const evaluated = evaluateExpression(item, vars, sysVars);
          lineOutputs.push(formatAbapVal(evaluated));
        }
        if (lineOutputs.length > 0) outputLines.push(lineOutputs.join('  '));
      } else if (/^[A-Za-z0-9_\-\>]+\s*=\s*/i.test(stmt)) {
        const equalIdx = stmt.indexOf('=');
        const varName = stmt.substring(0, equalIdx).trim();
        const expr = stmt.substring(equalIdx + 1).trim();
        vars[varName] = evaluateExpression(expr, vars, sysVars);
      }
    }
  }
}

function executeIfBlock(
  ifStatements: string[],
  vars: Record<string, any>,
  sysVars: Record<string, any>,
  outputLines: string[]
) {
  const ifStmt = ifStatements[0];
  const condMatch = ifStmt.match(/^IF\s+(.*)/i);
  if (!condMatch) return;

  const conditionStr = condMatch[1];
  const conditionMet = evaluateCondition(conditionStr, vars, sysVars);

  if (conditionMet) {
    for (let i = 1; i < ifStatements.length - 1; i++) {
      const s = ifStatements[i];
      if (/^ELSEIF/i.test(s) || /^ELSE/i.test(s)) break;
      if (/^WRITE:?\s+/i.test(s)) {
        const content = s.replace(/^WRITE:?\s+/i, '').trim();
        outputLines.push(formatAbapVal(evaluateExpression(content, vars, sysVars)));
      }
    }
  }
}

function executeDoBlock(
  doStmt: string,
  bodyStmts: string[],
  vars: Record<string, any>,
  sysVars: Record<string, any>,
  outputLines: string[]
) {
  const match = doStmt.match(/^DO\s+(\d+|[A-Za-z0-9_-]+)\s+TIMES/i);
  let count = 1;
  if (match) {
    count = Number(evaluateExpression(match[1], vars, sysVars)) || 1;
  }

  for (let iter = 1; iter <= count; iter++) {
    sysVars['sy-index'] = iter;
    for (const stmt of bodyStmts) {
      if (/^WRITE:?\s+/i.test(stmt)) {
        const content = stmt.replace(/^WRITE:?\s+/i, '').trim();
        outputLines.push(formatAbapVal(evaluateExpression(content, vars, sysVars)));
      }
    }
  }
}

function executeReadTable(stmt: string, vars: Record<string, any>, sysVars: Record<string, any>) {
  const match = stmt.match(/^READ\s+TABLE\s+([A-Za-z0-9_-]+)\s+INTO\s+([A-Za-z0-9_-]+)\s+WITH\s+KEY\s+(.*)/i);
  if (!match) {
    sysVars['sy-subrc'] = 4;
    return;
  }

  const tabName = match[1].toLowerCase();
  const targetVar = match[2].toLowerCase();
  const keyCond = match[3];

  const tab = vars[tabName];
  if (!Array.isArray(tab)) {
    sysVars['sy-subrc'] = 4;
    return;
  }

  const condParts = keyCond.split('=').map(s => s.trim());
  if (condParts.length === 2) {
    const keyField = condParts[0].toUpperCase();
    const val = evaluateExpression(condParts[1], vars, sysVars);

    const foundIdx = tab.findIndex(r => r[keyField] === val || r[keyField.toLowerCase()] === val);
    if (foundIdx !== -1) {
      vars[targetVar] = tab[foundIdx];
      sysVars['sy-subrc'] = 0;
      sysVars['sy-tabix'] = foundIdx + 1;
    } else {
      sysVars['sy-subrc'] = 4;
    }
  }
}

function evaluateCondition(condStr: string, vars: Record<string, any>, sysVars: Record<string, any>): boolean {
  if (condStr.includes('=')) {
    const [left, right] = condStr.split('=').map(s => s.trim());
    return evaluateExpression(left, vars, sysVars) == evaluateExpression(right, vars, sysVars);
  }
  return true;
}
