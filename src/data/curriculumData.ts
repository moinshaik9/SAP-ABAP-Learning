import type { Level } from '../types';

export const CURRICULUM_DATA: Level[] = [
  {
    id: 1,
    phaseName: 'Phase 1: ERP & ABAP Foundations',
    title: 'Phase 1: ERP & ABAP Foundations',
    subtitle: 'ERP Concepts, Landscape, Architecture, ABAP Syntax, Control Flow & Modularization',
    iconName: 'Building2',
    badge: 'Foundations',
    color: '#0284c7',
    lessons: [
      {
        id: 'p1_1',
        levelId: 1,
        phaseName: 'Phase 1: ERP & ABAP Foundations',
        topicName: 'ERP Concepts, SAP Landscape, ECC vs S/4HANA, SAP Architecture, ABAP Consultant Role',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-07-29',
        targetDate: '2026-07-29',
        duration: '25 mins',
        concepts: ['ERP Core', '3-Tier System', 'ECC vs S/4HANA', 'HANA In-Memory', 'ABAP Consultant Role'],
        content: `
### 📌 Core ERP & SAP Architecture Masterclass

- **ERP Core Concept**:
  Systems, Applications, and Products in Data Processing. It integrates Sales, Purchasing, Finance, Inventory, and HR into one real-time enterprise database.

- **SAP System Landscape (DEV → QAS → PRD)**:
  DEV is the Development System where ABAP developers write code inside Transport Requests (TRs).
  QAS is the Quality Assurance System used for Integration Testing, UAT, and User Training.
  PRD is the live Production System where business transactions execute and direct code editing is strictly blocked.

- **ECC vs S/4HANA Architecture Comparison**:
  Classic ECC relies on disk-bound databases and requires 20+ aggregate summary tables (BSIS, BSAS, GLT0).
  S/4HANA operates 100% in-memory (RAM) using SAP HANA with columnar storage and replaces legacy summary tables with ACDOCA (Universal Journal).

- **SAP 3-Tier System Architecture**:
  Tier 1: Presentation Layer (UI) captures user inputs and displays SAP GUI desktop or web SAP Fiori screens.
  Tier 2: Application Layer (AS ABAP) executes business logic work processes (Dialog, Background, Update, Spool, Enqueue).
  Tier 3: Database Layer stores all enterprise master and transactional data in SAP HANA or RDBMS.

- **ABAP Consultant Role & Responsibilities**:
  Translates Functional Specification Documents (FSD) into Technical Specifications (TSD) and builds RICEFW objects.
        `,
        codeSnippet: `* Simulating 3-Tier Request Processing
WRITE: / '• [PRESENTATION LAYER]: User clicked Display Employee Details'.
WRITE: / '• [APPLICATION LAYER] : Validating permissions & executing ABAP logic...'.
WRITE: / '• [DATABASE LAYER]   : SAP HANA fetched employee row from DB in 0.4ms'.
`,
        quiz: [
          {
            id: 'qp1_1_1',
            question: 'What is the role of the Presentation Layer in SAP 3-Tier Architecture?',
            options: [
              'Executes ABAP bytecode',
              'Captures user inputs and displays graphical UI screens (SAP GUI/Fiori)',
              'Stores database tables',
              'Backs up the database'
            ],
            correctAnswer: 1,
            explanation: 'The Presentation Layer handles front-end user interaction via SAP GUI or SAP Fiori screens.'
          }
        ]
      },
      {
        id: 'p1_2',
        levelId: 1,
        phaseName: 'Phase 1: ERP & ABAP Foundations',
        topicName: 'ABAP Workbench, Packages, Transport Requests, Naming Standards',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-07-30',
        targetDate: '2026-07-30',
        duration: '20 mins',
        concepts: ['SE80 Workbench', 'Packages ($TMP vs Z)', 'Transport Requests (TR)', 'Naming Standards'],
        content: `
### 📌 ABAP Workbench & Transport Management System

- **ABAP Workbench IDE (SE80)**:
  Central developer IDE organizing software packages, programs, classes, function groups, and database tables.

- **Package Architecture ($TMP vs Z Custom)**:
  $TMP (Local Package) stores non-transportable temporary test objects.
  Z or Y Custom Packages store transportable enterprise objects assigned to Transport Requests.

- **Transport Request Types (TMS)**:
  Workbench TR (Prefix K) contains technical custom code and ABAP objects.
  Customizing TR (Prefix C) contains functional configuration settings (SPRO).

- **Customer Naming Standards**:
  All custom objects developed by customers MUST start with Z or Y (e.g. ZCL_SALES_SERVICE).
        `,
        codeSnippet: `* Simulating Custom Object Naming Standard Validation
DATA: lv_object_name TYPE string VALUE 'ZCL_CUSTOMER_SERVICE'.

IF lv_object_name STARTS WITH 'Z' OR lv_object_name STARTS WITH 'Y'.
  WRITE: / '• [NAMING OK]: Custom Object starts with Z/Y namespace.'.
ELSE.
  WRITE: / '• [NAMING ERROR]: Standard SAP namespace restricted!'.
ENDIF.
`,
        quiz: [
          {
            id: 'qp1_2_1',
            question: 'Which letter prefix MUST custom ABAP objects start with to avoid overwriting standard SAP code?',
            options: ['A or B', 'X or Y', 'Z or Y', 'S or P'],
            correctAnswer: 2,
            explanation: 'Custom customer developments must start with Z or Y in SAP systems.'
          }
        ]
      },
      {
        id: 'p1_3',
        levelId: 1,
        phaseName: 'Phase 1: ERP & ABAP Foundations',
        topicName: 'ABAP Syntax, Keywords, Data Types, Constants, Variables',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-07-31',
        targetDate: '2026-07-31',
        duration: '20 mins',
        concepts: ['DATA Declaration', 'TYPES', 'CONSTANTS', 'Elementary Types'],
        content: `
### 📌 ABAP Syntax & Elementary Data Types

- **Statement Termination Rule**:
  Every ABAP statement MUST end with a period (.). Failure to add a period results in syntax compiler errors.

- **Elementary Data Types**:
  I (Integer): 4-byte whole numbers for iteration counters.
  STRING: Dynamic variable-length text strings.
  C (Character): Fixed-length text string.
  P (Packed Number): Exact decimal math for currency amounts and quantities.
  D (Date): YYYYMMDD date string.

- **CONSTANTS Declaration**:
  Declares read-only constants that cannot be mutated during program execution (e.g. CONSTANTS gc_tax TYPE p VALUE '0.18').
        `,
        codeSnippet: `DATA: lv_amount TYPE p DECIMALS 2 VALUE '500.00'.
CONSTANTS: gc_tax_rate TYPE p DECIMALS 2 VALUE '0.18'.

DATA(lv_total) = lv_amount * ( 1 + gc_tax_rate ).
WRITE: / '• Net Amount :', lv_amount, 'EUR',
       / '• Gross Total:', lv_total, 'EUR'.
`,
        quiz: [
          {
            id: 'qp1_3_1',
            question: 'Which character MUST terminate every statement in ABAP?',
            options: ['Semicolon (;)', 'Period (.)', 'Comma (,)', 'Colon (:)'],
            correctAnswer: 1,
            explanation: 'In ABAP, every single statement ends with a period (.).'
          }
        ]
      },
      {
        id: 'p1_4',
        levelId: 1,
        phaseName: 'Phase 1: ERP & ABAP Foundations',
        topicName: 'Operators, Control Statements (IF, CASE, LOOP, WHILE), SY Fields',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-01',
        targetDate: '2026-08-01',
        duration: '20 mins',
        concepts: ['IF/ELSEIF', 'CASE/WHEN', 'DO/WHILE', 'sy-subrc', 'sy-tabix', 'sy-dbcnt'],
        content: `
### 📌 Control Branching & Essential System Variables (sy-)

- **IF / ELSEIF / ELSE Branching**:
  Evaluates boolean expressions top-to-bottom sequentially.

- **CASE / WHEN Branching**:
  Matches a single variable against multiple discrete constant values.

- **DO n TIMES & WHILE Loops**:
  Executes code blocks repeatedly. System variable sy-index tracks the current iteration count (1, 2, 3...).

- **Crucial System Environment Variables (sy- Structure)**:
  sy-subrc: Return code of the last executed statement (0 = Success!).
  sy-tabix: Current row index during internal table LOOP AT cycles.
  sy-dbcnt: Number of rows fetched or updated by the last Open SQL query.
        `,
        codeSnippet: `DATA: lv_sales TYPE i VALUE 85000.

IF lv_sales >= 100000.
  WRITE: / '• Customer Tier: PLATINUM'.
ELSEIF lv_sales >= 50000.
  WRITE: / '• Customer Tier: GOLD'.
ELSE.
  WRITE: / '• Customer Tier: SILVER'.
ENDIF.

DO 3 TIMES.
  WRITE: / '• Iteration Count (sy-index):', sy-index.
ENDDO.
`,
        quiz: [
          {
            id: 'qp1_4_1',
            question: 'What does sy-subrc = 0 indicate in ABAP runtime?',
            options: [
              'Statement failed',
              'Statement executed successfully without error',
              'Out of memory',
              'Zero rows found'
            ],
            correctAnswer: 1,
            explanation: 'sy-subrc = 0 indicates that the preceding ABAP operation succeeded.'
          }
        ]
      },
      {
        id: 'p1_5',
        levelId: 1,
        phaseName: 'Phase 1: ERP & ABAP Foundations',
        topicName: 'Modularization: Includes, Subroutines, Parameter Passing',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-02',
        targetDate: '2026-08-02',
        duration: '20 mins',
        concepts: ['INCLUDE', 'PERFORM subroutines', 'FORM ... ENDFORM', 'USING / CHANGING'],
        content: `
### 📌 Modularization & Subroutines (PERFORM / FORM)

- **INCLUDE Programs**:
  Splits large ABAP programs into smaller readable code files without memory overhead.

- **Subroutine Definition (PERFORM / FORM)**:
  Procedural reusable code block (e.g. PERFORM calc_bonus USING lv_sal CHANGING lv_bonus).

- **USING Parameter Clause**:
  Passes input values into subroutines by value.

- **CHANGING Parameter Clause**:
  Passes output parameters by reference to return updated values.
        `,
        codeSnippet: `DATA: lv_price TYPE p DECIMALS 2 VALUE 100,
      lv_tax   TYPE p DECIMALS 2.

PERFORM calc_tax USING lv_price CHANGING lv_tax.
WRITE: / '• Base Price:', lv_price, 'EUR | Calculated Tax:', lv_tax, 'EUR'.

FORM calc_tax USING iv_price TYPE p CHANGING cv_tax TYPE p.
  cv_tax = iv_price * '0.19'.
ENDFORM.
`,
        quiz: [
          {
            id: 'qp1_5_1',
            question: 'Which clause in PERFORM subroutines is used for output parameters expected to be updated?',
            options: ['USING', 'CHANGING', 'EXPORTING', 'IMPORTING'],
            correctAnswer: 1,
            explanation: 'CHANGING parameters in PERFORM subroutines pass variables by reference to return updated values.'
          }
        ]
      },
      {
        id: 'p1_6',
        levelId: 1,
        phaseName: 'Phase 1: ERP & ABAP Foundations',
        topicName: 'Program Flow, Events, Debugging (Breakpoints, Watchpoints)',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-03',
        targetDate: '2026-08-03',
        duration: '20 mins',
        concepts: ['Breakpoints', 'Watchpoints', 'ABAP Debugger', 'Single Step (F5)', 'Execute (F6)'],
        content: `
### 📌 ABAP Debugger, Breakpoints, & Watchpoints

- **Session & External Breakpoints**:
  Session Breakpoint pauses GUI execution at a specific line.
  External Breakpoint pauses HTTP/OData web service requests.

- **Watchpoints**:
  Monitors memory variables and pauses execution ONLY when a specific variable's value changes.

- **Debugger Execution Controls**:
  F5 (Single Step): Steps into method/subroutine implementations line-by-line.
  F6 (Execute): Executes current function/method block without stepping inside.
  F8 (Continue): Continues program execution until the next breakpoint.
        `,
        codeSnippet: `DATA: lv_counter TYPE i VALUE 0.

DO 5 TIMES.
  lv_counter = lv_counter + 1.
  IF lv_counter = 3.
    WRITE: / '• [WATCHPOINT TRIGGERED]: lv_counter reached value 3'.
  ENDIF.
ENDDO.
`,
        quiz: [
          {
            id: 'qp1_6_1',
            question: 'Which debugger tool pauses program execution ONLY when a specified variable value changes?',
            options: ['Breakpoint', 'Watchpoint', 'Transport', 'Include'],
            correctAnswer: 1,
            explanation: 'Watchpoints monitor variable memory and pause execution whenever the monitored variable changes.'
          }
        ]
      }
    ]
  },

  {
    id: 2,
    phaseName: 'Phase 2: DDIC & Open SQL',
    title: 'Phase 2: DDIC & Open SQL Masterclass',
    subtitle: 'Data Dictionary Architecture, Domains, Data Elements, Tables, Views, Foreign Keys, Open SQL CRUD & Performance',
    iconName: 'Database',
    badge: 'DDIC & SQL',
    color: '#7c3aed',
    lessons: [
      {
        id: 'p2_1',
        levelId: 2,
        phaseName: 'Phase 2: DDIC & Open SQL',
        topicName: 'DDIC Architecture, Domains, Data Elements, Tables',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-04',
        targetDate: '2026-08-04',
        duration: '25 mins',
        concepts: ['SE11', 'Domain', 'Data Element', 'Transparent Table', 'Field Type'],
        content: `
### 📌 ABAP Data Dictionary (SE11) 3-Layer Architecture

- **Layer 1: Domain (Technical Attributes)**:
  Defines technical data type, length, decimals, and value range (e.g. CHAR 10, Upper Case).

- **Layer 2: Data Element (Semantic Attributes)**:
  Defines field labels (Short, Medium, Long UI descriptions) and documentation text.

- **Layer 3: Database Table Field**:
  Combines Data Elements with table column definitions in transparent tables (e.g. MARA, VBAK).
        `,
        codeSnippet: `* Simulating DDIC 3-Layer Field Mapping
WRITE: / '• [SE11 DOMAIN]      : ZDOM_CARRID (CHAR 3, Upper Case Only)'.
WRITE: / '• [SE11 DATA ELEMENT]: ZDE_CARRID   (Label: Airline Carrier Code)'.
WRITE: / '• [SE11 TABLE FIELD ]: ZSFLIGHT-CARRID (Primary Key Column)'.
`,
        quiz: [
          {
            id: 'qp2_1_1',
            question: 'Which DDIC object defines screen field labels and descriptions in SE11?',
            options: ['Domain', 'Data Element', 'Technical Setting', 'Delivery Class'],
            correctAnswer: 1,
            explanation: 'Data Elements define semantic field labels and documentation, while Domains define technical types/lengths.'
          }
        ]
      },
      {
        id: 'p2_2',
        levelId: 2,
        phaseName: 'Phase 2: DDIC & Open SQL',
        topicName: 'Structures, Views (Database / Maintenance), Search Helps',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-05',
        targetDate: '2026-08-05',
        duration: '25 mins',
        concepts: ['Append Structure', 'Database View', 'Maintenance View', 'Search Help F4'],
        content: `
### 📌 DDIC Structures, Views, & Search Helps

- **Append Structure**:
  Adds custom Z-fields to standard SAP tables without modifying standard SAP core code.

- **Database View**:
  Executes SQL INNER JOIN queries across multiple database tables.

- **Maintenance View (SM30)**:
  Allows users to edit and maintain custom table data via maintenance dialogs.

- **Search Help (F4 Help)**:
  Populates drop-down search selection lists on input screens.
        `,
        codeSnippet: `* Simulating Search Help F4 Popup Lookup
DATA: lv_selected_carrid TYPE string.

WRITE: / '• [F4 SEARCH HELP TRIGGERED]: Displaying available Airline Carriers...'.
WRITE: / '   [1] LH - Lufthansa German Airlines'.
WRITE: / '   [2] AA - American Airlines'.
WRITE: / '   [3] SQ - Singapore Airlines'.
`,
        quiz: [
          {
            id: 'qp2_2_1',
            question: 'How do ABAP developers add custom fields to standard SAP tables safely without modifying standard code?',
            options: ['Edit standard table directly', 'Append Structure', 'Delete the table', 'Use a subquery'],
            correctAnswer: 1,
            explanation: 'Append Structures append custom fields to standard tables while maintaining upgrade stability.'
          }
        ]
      },
      {
        id: 'p2_3',
        levelId: 2,
        phaseName: 'Phase 2: DDIC & Open SQL',
        topicName: 'Table Relationships, Foreign Keys, Cardinality',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-06',
        targetDate: '2026-08-06',
        duration: '25 mins',
        concepts: ['Foreign Key', 'Check Table', 'Cardinality (1:1, 1:N, N:M)', 'Referential Integrity'],
        content: `
### 📌 Foreign Key Relationships & Cardinality

- **Foreign Key Relationship**:
  Enforces referential integrity at the database level by validating entered values against a Check Table.

- **Check Table**:
  Master table containing valid records (e.g. T001 for Company Codes, KNA1 for Customers).

- **Cardinality**:
  Defines relationship ratio (1:N means 1 header order in VBAK has N line items in VBAP).
        `,
        codeSnippet: `* Foreign Key Validation Logic Simulation
DATA: lv_input_kunnr TYPE string VALUE '0000100450'.

SELECT SINGLE kunnr FROM kna1 INTO @DATA(lv_kunnr_check) WHERE kunnr = @lv_input_kunnr.
IF sy-subrc = 0.
  WRITE: / '• [FOREIGN KEY VALIDATED]: Customer ID exists in KNA1 Check Table.'.
ELSE.
  WRITE: / '• [FOREIGN KEY ERROR]: Customer ID does not exist!'.
ENDIF.
`,
        quiz: [
          {
            id: 'qp2_3_1',
            question: 'What is the purpose of a Foreign Key relationship in an SAP DDIC table?',
            options: ['Encrypts data', 'Enforces data integrity by validating entries against a Check Table', 'Deletes old records', 'Generates PDF forms'],
            correctAnswer: 1,
            explanation: 'Foreign Keys validate entries against check tables to ensure invalid data cannot be saved.'
          }
        ]
      },
      {
        id: 'p2_4',
        levelId: 2,
        phaseName: 'Phase 2: DDIC & Open SQL',
        topicName: 'Technical Settings, Delivery Class, Table Buffering',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-07',
        targetDate: '2026-08-07',
        duration: '20 mins',
        concepts: ['Delivery Class A/C', 'Data Class', 'Size Category', 'Table Buffering'],
        content: `
### 📌 Technical Settings & Table Buffering

- **Delivery Class A**:
  Assigned to Application Master & Transaction tables.

- **Delivery Class C**:
  Assigned to Customizing Configuration tables (SPRO).

- **Table Buffering**:
  Stores table data in application server RAM memory to avoid DB roundtrips. Single Record Buffer, Generic Buffer, Full Buffer.
        `,
        codeSnippet: `* Table Buffering Read Simulation
WRITE: / '• [READ 1]: Fetching T001 Company Code from Database... (3.2 ms)'.
WRITE: / '• [READ 2]: Fetching T001 Company Code from Application Server RAM Buffer... (0.01 ms)'.
`,
        quiz: [
          {
            id: 'qp2_4_1',
            question: 'Which Delivery Class is used for SAP Application Master and Transaction tables?',
            options: ['Class C', 'Class A', 'Class E', 'Class L'],
            correctAnswer: 1,
            explanation: 'Delivery Class A is assigned to Application master data and transactional records.'
          }
        ]
      },
      {
        id: 'p2_5',
        levelId: 2,
        phaseName: 'Phase 2: DDIC & Open SQL',
        topicName: 'Open SQL CRUD Operations',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-08',
        targetDate: '2026-08-08',
        duration: '25 mins',
        concepts: ['SELECT', 'INSERT', 'UPDATE', 'MODIFY', 'DELETE', 'sy-subrc'],
        content: `
### 📌 Open SQL CRUD Statements

- **SELECT Statement**:
  Fetches database records into host variables or internal tables.

- **INSERT Statement**:
  Adds new rows into database tables.

- **UPDATE Statement**:
  Updates existing database table rows.

- **MODIFY Statement**:
  Inserts a new record if non-existent, or updates the row if primary key exists.

- **DELETE Statement**:
  Deletes matching records from database tables.
        `,
        codeSnippet: `DATA(ls_flight) = VALUE sflight( carrid = 'LH' connid = '0400' fldate = '20260815' price = 899 ).

WRITE: / '• Executing Open SQL MODIFY statement...'.
WRITE: / '• [MODIFY OK]: Record saved successfully in memory DB.'.
`,
        quiz: [
          {
            id: 'qp2_5_1',
            question: 'Which Open SQL command inserts a record if it does not exist, or updates it if the primary key already exists?',
            options: ['INSERT', 'UPDATE', 'MODIFY', 'ALTER'],
            correctAnswer: 2,
            explanation: 'MODIFY acts as an upsert: it inserts a new row if key is not found, or updates it if key exists.'
          }
        ]
      },
      {
        id: 'p2_6',
        levelId: 2,
        phaseName: 'Phase 2: DDIC & Open SQL',
        topicName: 'Advanced Open SQL – Joins, Aggregates, Subqueries',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-09',
        targetDate: '2026-08-09',
        duration: '25 mins',
        concepts: ['INNER JOIN', 'LEFT OUTER JOIN', 'SUM/AVG/MAX', 'GROUP BY', 'Subqueries'],
        content: `
### 📌 Advanced Open SQL Joins & Aggregations

- **INNER JOIN**:
  Returns matching rows across both left and right tables.

- **LEFT OUTER JOIN**:
  Returns all rows from the left table, with null/blank fields if no match in right table.

- **Aggregations (SUM, AVG, MAX, MIN)**:
  Performs calculations directly inside the database engine using GROUP BY.
        `,
        codeSnippet: `SELECT f~carrid, f~connid, p~cityfrom, p~cityto, f~price
  FROM sflight AS f
  INNER JOIN spfli AS p ON f~carrid = p~carrid AND f~connid = p~connid
  INTO TABLE @DATA(lt_joined)
  WHERE f~carrid = 'LH'.

WRITE: / '• Joined SFLIGHT & SPFLI tables successfully. Found:', sy-dbcnt, 'rows.'.
`,
        quiz: [
          {
            id: 'qp2_6_1',
            question: 'Which JOIN type returns all rows from the primary left table regardless of whether matching records exist in the right table?',
            options: ['INNER JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
            correctAnswer: 1,
            explanation: 'LEFT OUTER JOIN returns all rows from the left table, with null/blank fields if no match in right table.'
          }
        ]
      },
      {
        id: 'p2_7',
        levelId: 2,
        phaseName: 'Phase 2: DDIC & Open SQL',
        topicName: 'SQL Performance – Indexes, FOR ALL ENTRIES, ST05',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-10',
        targetDate: '2026-08-10',
        duration: '25 mins',
        concepts: ['Primary Index', 'Secondary Index', 'FOR ALL ENTRIES', 'ST05 Trace', 'N+1 Query Avoidance'],
        content: `
### 📌 Open SQL Performance Optimization & ST05 Trace

- **Secondary Database Indexes**:
  Speeds up WHERE clause queries on non-primary key columns.

- **FOR ALL ENTRIES IN Clause**:
  Joins internal tables with database queries. ALWAYS check IF lt_tab IS NOT INITIAL first!

- **ST05 SQL Performance Trace**:
  Traces query execution time, index hits, and full table scans.
        `,
        codeSnippet: `DATA(lt_carriers) = VALUE ty_carrier_tab( ( carrid = 'LH' ) ( carrid = 'AA' ) ).

IF lt_carriers IS NOT INITIAL.
  SELECT * FROM sflight 
    INTO TABLE @DATA(lt_flights)
    FOR ALL ENTRIES IN @lt_carriers
    WHERE carrid = @lt_carriers-carrid.
ENDIF.
`,
        quiz: [
          {
            id: 'qp2_7_1',
            question: 'Why MUST you check IF lt_table IS NOT INITIAL before running a SELECT with FOR ALL ENTRIES IN @lt_table?',
            options: [
              'To speed up CPU clock',
              'If internal table is empty, FOR ALL ENTRIES ignores the WHERE clause and fetches the ENTIRE database table!',
              'To clear memory',
              'To close the session'
            ],
            correctAnswer: 1,
            explanation: 'An empty FOR ALL ENTRIES table causes Open SQL to ignore the WHERE clause, triggering a catastrophic full table fetch.'
          }
        ]
      }
    ]
  },

  {
    id: 3,
    phaseName: 'Phase 3: Reporting',
    title: 'Phase 3: Classical & Interactive Reporting',
    subtitle: 'Classical Reports, WRITE Formatting, Selection Screens, Report Events, & Mini Project 1',
    iconName: 'Zap',
    badge: 'Reporting',
    color: '#059669',
    lessons: [
      {
        id: 'p3_1',
        levelId: 3,
        phaseName: 'Phase 3: Reporting',
        topicName: 'Classical Reports, WRITE, Formatting',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-11',
        targetDate: '2026-08-11',
        duration: '20 mins',
        concepts: ['Classical Report', 'WRITE', 'ULINE', 'SKIP', 'COLOR', 'FORMAT'],
        content: `
### 📌 Classical Report Output Formatting

- **Classical Report Definition**:
  Linear text report output generated using WRITE: statements.

- **ULINE Statement**:
  Draws horizontal separation lines across report pages.

- **SKIP n Statement**:
  Skips n blank output lines.

- **FORMAT COLOR Command**:
  Applies background colors to output text.
        `,
        codeSnippet: `FORMAT COLOR COL_HEADING INTENSIFIED ON.
WRITE: / '--- CLASSICAL REPORT HEADER ---'.
FORMAT COLOR OFF.

ULINE.
WRITE: / '• Flight LH-0400 | Price: 899 EUR | Status: ON TIME'.
`,
        quiz: [
          {
            id: 'qp3_1_1',
            question: 'Which formatting command draws a horizontal separation line across a classical ABAP report page?',
            options: ['SKIP', 'ULINE', 'NEW-PAGE', 'LINE-COUNT'],
            correctAnswer: 1,
            explanation: 'ULINE draws a horizontal line across the report output window.'
          }
        ]
      },
      {
        id: 'p3_2',
        levelId: 3,
        phaseName: 'Phase 3: Reporting',
        topicName: 'Selection Screens – PARAMETERS, SELECT-OPTIONS',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-12',
        targetDate: '2026-08-12',
        duration: '20 mins',
        concepts: ['PARAMETERS', 'SELECT-OPTIONS', 'OBLIGATORY', 'DEFAULT', 'LOW/HIGH range'],
        content: `
### 📌 Selection Screen Input Elements

- **PARAMETERS Statement**:
  Creates single-field input controls (e.g. PARAMETERS p_carrid TYPE c LENGTH 3 OBLIGATORY).

- **SELECT-OPTIONS Statement**:
  Creates complex range selection tables with LOW, HIGH, SIGN, and OPTION fields.
        `,
        codeSnippet: `* Selection Screen Simulation
WRITE: / '• [SELECTION SCREEN]: Input PARAMETERS p_carrid = "LH"'.
WRITE: / '• [SELECTION SCREEN]: Input SELECT-OPTIONS s_price = 500 TO 1000 EUR'.
`,
        quiz: [
          {
            id: 'qp3_2_1',
            question: 'Which selection screen element allows users to enter range intervals (From/To) and complex filter selections?',
            options: ['PARAMETERS', 'SELECT-OPTIONS', 'TYPES', 'TABLES'],
            correctAnswer: 1,
            explanation: 'SELECT-OPTIONS creates a selection table supporting range intervals (LOW/HIGH) and complex criteria.'
          }
        ]
      },
      {
        id: 'p3_3',
        levelId: 3,
        phaseName: 'Phase 3: Reporting',
        topicName: 'Report Events, Control Flow',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-13',
        targetDate: '2026-08-13',
        duration: '20 mins',
        concepts: ['INITIALIZATION', 'AT SELECTION-SCREEN', 'START-OF-SELECTION', 'END-OF-SELECTION'],
        content: `
### 📌 Report Execution Event Lifecycle

- **INITIALIZATION Event**:
  Triggers before selection screen opens to populate default values.

- **AT SELECTION-SCREEN Event**:
  Triggers when user submits screen to validate input entries.

- **START-OF-SELECTION Event**:
  Primary event block for executing Open SQL database queries.

- **END-OF-SELECTION Event**:
  Triggers after data retrieval to format and write output lists.
        `,
        codeSnippet: `WRITE: / '1. [EVENT]: INITIALIZATION -> Set default p_carrid = "LH"'.
WRITE: / '2. [EVENT]: AT SELECTION-SCREEN -> Validate carrier code'.
WRITE: / '3. [EVENT]: START-OF-SELECTION -> Fetch DB records'.
WRITE: / '4. [EVENT]: END-OF-SELECTION -> Display report list'.
`,
        quiz: [
          {
            id: 'qp3_3_1',
            question: 'Which report event is used to write Open SQL SELECT queries after the user submits the selection screen?',
            options: ['INITIALIZATION', 'START-OF-SELECTION', 'END-OF-PAGE', 'TOP-OF-PAGE'],
            correctAnswer: 1,
            explanation: 'START-OF-SELECTION is the primary event block for executing database queries and main business logic.'
          }
        ]
      },
      {
        id: 'p3_4',
        levelId: 3,
        phaseName: 'Phase 3: Reporting',
        topicName: 'Interactive Reports – AT LINE-SELECTION, HIDE',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-14',
        targetDate: '2026-08-14',
        duration: '20 mins',
        concepts: ['Interactive Report', 'AT LINE-SELECTION', 'HIDE statement', 'sy-lsind'],
        content: `
### 📌 Interactive Reports & HIDE Memory

- **Interactive Report**:
  Allows users to double-click lines in a basic list to open secondary drill-down screens.

- **AT LINE-SELECTION Event**:
  Triggers when user double-clicks a report row.

- **HIDE Statement**:
  Stores hidden line data in memory for retrieval during drill-down events.
        `,
        codeSnippet: `WRITE: / '• [BASIC LIST]: Double-click Flight LH-0400 to view passengers'.
WRITE: / '• [HIDE MEMORY]: HIDE sflight-carrid, sflight-connid stored.'.
WRITE: / '• [AT LINE-SELECTION]: Triggered secondary list for LH-0400!'.
`,
        quiz: [
          {
            id: 'qp3_4_1',
            question: 'Which event triggers when a user double-clicks a line in a classical interactive report?',
            options: ['AT SELECTION-SCREEN', 'AT LINE-SELECTION', 'START-OF-SELECTION', 'INITIALIZATION'],
            correctAnswer: 1,
            explanation: 'AT LINE-SELECTION triggers on line double-clicks or F2 actions in interactive reports.'
          }
        ]
      },
      {
        id: 'p3_5',
        levelId: 3,
        phaseName: 'Phase 3: Reporting',
        topicName: 'Report Optimization & Modularization',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-15',
        targetDate: '2026-08-15',
        duration: '20 mins',
        concepts: ['Modular Reporting', 'SALV Grid', 'cl_salv_table', 'Clean Code'],
        content: `
### 📌 OO SALV Grid Report Optimization

- **cl_salv_table OO Class**:
  Replaces legacy WRITE outputs with interactive grids providing sorting, filtering, and Excel export out of the box!
        `,
        codeSnippet: `SELECT * FROM sflight INTO TABLE @DATA(lt_report).

cl_salv_table=>factory(
  IMPORTING r_salv_table = DATA(lo_alv)
  CHANGING  t_table      = lt_report
).
lo_alv->display( ).
`,
        quiz: [
          {
            id: 'qp3_5_1',
            question: 'Which OO class is the modern standard for interactive tabular report outputs?',
            options: ['cl_salv_table', 'WRITE', 'SE38', 'ST05'],
            correctAnswer: 0,
            explanation: 'cl_salv_table provides out-of-the-box sorting, filtering, and Excel export.'
          }
        ]
      },
      {
        id: 'p3_6',
        levelId: 3,
        phaseName: 'Phase 3: Reporting',
        topicName: 'Mini Project 1 – Reporting Application',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-16',
        targetDate: '2026-08-16',
        duration: '30 mins',
        concepts: ['Mini Project 1', 'Sales Order Report', 'Selection Screen', 'ALV Grid'],
        isMiniProject: true,
        content: `
### 🛠️ Mini Project 1: Enterprise Sales Order Report

- **Project Objective**:
  Build an interactive Sales Order Report querying VBAK & VBAP with selection screen filters and OO ALV Grid display.
        `,
        codeSnippet: `* Mini Project 1: Sales Order ALV Report
SELECT v~vbeln, v~erdat, v~netwr, v~waerk, v~kunnr
  FROM vbak AS v
  INTO TABLE @DATA(lt_sales_report).

cl_salv_table=>factory(
  IMPORTING r_salv_table = DATA(lo_alv)
  CHANGING  t_table      = lt_sales_report
).
lo_alv->display( ).
`,
        quiz: [
          {
            id: 'qp3_6_1',
            question: 'In Mini Project 1, which table stores Sales Order Header data?',
            options: ['VBAP', 'VBAK', 'MARA', 'KNA1'],
            correctAnswer: 1,
            explanation: 'VBAK stores Sales Order Header data; VBAP stores Item details.'
          }
        ]
      }
    ]
  },

  {
    id: 4,
    phaseName: 'Phase 4: Internal Tables',
    title: 'Phase 4: Internal Tables & Data References',
    subtitle: 'Internal Table Kinds, ITAB Operations, Field Symbols, Debugging & Mini Project 2',
    iconName: 'Table',
    badge: 'Internal Tables',
    color: '#d97706',
    lessons: [
      {
        id: 'p4_1',
        levelId: 4,
        phaseName: 'Phase 4: Internal Tables',
        topicName: 'Internal Tables – Types, Structure',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-17',
        targetDate: '2026-08-17',
        duration: '20 mins',
        concepts: ['Standard Table', 'Sorted Table', 'Hashed Table', 'Primary Key'],
        content: `
### 📌 Internal Table Categories & Complexity

- **Standard Table**:
  Linear index table with fast appends and O(N) linear search time.

- **Sorted Table**:
  Kept sorted automatically by key, enabling O(log N) binary search lookups.

- **Hashed Table**:
  Uses internal hash algorithm providing O(1) constant lookup time regardless of size!
        `,
        codeSnippet: `DATA: lt_standard TYPE TABLE OF sflight,
      lt_sorted   TYPE SORTED TABLE OF sflight WITH UNIQUE KEY carrid connid fldate,
      lt_hashed   TYPE HASHED TABLE OF sflight WITH UNIQUE KEY carrid connid fldate.
`,
        quiz: [
          {
            id: 'qp4_1_1',
            question: 'Which internal table type guarantees O(1) constant time lookup?',
            options: ['Standard Table', 'Sorted Table', 'Hashed Table', 'Index Table'],
            correctAnswer: 2,
            explanation: 'Hashed tables use hashing algorithms providing O(1) lookup.'
          }
        ]
      },
      {
        id: 'p4_2',
        levelId: 4,
        phaseName: 'Phase 4: Internal Tables',
        topicName: 'ITAB Operations – READ, MODIFY, SORT, COLLECT',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-18',
        targetDate: '2026-08-18',
        duration: '25 mins',
        concepts: ['READ TABLE', 'MODIFY TABLE', 'SORT', 'COLLECT', 'DELETE'],
        content: `
### 📌 Internal Table Operations & Aggregation

- **READ TABLE Statement**:
  Retrieves a single row into a work area or field symbol.

- **MODIFY Statement**:
  Updates matching rows in internal tables.

- **SORT Statement**:
  Sorts rows by specified key fields.

- **COLLECT Statement**:
  Sums numeric fields for matching non-numeric key fields.
        `,
        codeSnippet: `DATA(lt_sales) = VALUE ty_sales_tab(
  ( region = 'DE' amount = 100 )
  ( region = 'DE' amount = 200 )
).

DATA: lt_summary TYPE TABLE OF ty_sales.
LOOP AT lt_sales INTO DATA(ls_s).
  COLLECT ls_s INTO lt_summary.
ENDLOOP.
`,
        quiz: [
          {
            id: 'qp4_2_1',
            question: 'Which ITAB statement automatically aggregates numeric fields for matching character keys?',
            options: ['MODIFY', 'COLLECT', 'SORT', 'APPEND'],
            correctAnswer: 1,
            explanation: 'COLLECT aggregates numeric totals for matching non-numeric key fields.'
          }
        ]
      },
      {
        id: 'p4_3',
        levelId: 4,
        phaseName: 'Phase 4: Internal Tables',
        topicName: 'Work Areas, Field Symbols, Data References',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-19',
        targetDate: '2026-08-19',
        duration: '25 mins',
        concepts: ['Field Symbols (<fs>)', 'ASSIGN', 'Data References (REF TO)', 'Memory Pointers'],
        content: `
### 📌 Field Symbols (<fs>) & Direct Memory Access

- **Field Symbol Concept**:
  A memory pointer referencing table rows directly without copying data.

- **High-Performance Loop**:
  LOOP AT lt_tab ASSIGNING FIELD-SYMBOL(<fs_row>). Updates memory directly without MODIFY statements!
        `,
        codeSnippet: `DATA(lt_flights) = VALUE ty_flight_tab( ( price = 100 ) ).

LOOP AT lt_flights ASSIGNING FIELD-SYMBOL(<fs_flight>).
  <fs_flight>-price = <fs_flight>-price * '1.10'.
ENDLOOP.
`,
        quiz: [
          {
            id: 'qp4_3_1',
            question: 'Why are Field Symbols (<fs>) faster than Work Areas inside LOOP AT internal tables?',
            options: [
              'They bypass memory security',
              'They point directly to table memory, avoiding expensive data copying and MODIFY statements',
              'They run in background threads',
              'They delete old rows'
            ],
            correctAnswer: 1,
            explanation: 'Field Symbols act as direct pointers to memory, avoiding copying data back and forth.'
          }
        ]
      },
      {
        id: 'p4_4',
        levelId: 4,
        phaseName: 'Phase 4: Internal Tables',
        topicName: 'Debugging, Runtime Errors, Dumps, SAT',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-20',
        targetDate: '2026-08-20',
        duration: '20 mins',
        concepts: ['ST22 Dump', 'ITAB_LINE_NOT_FOUND', 'SAT Analysis', 'Performance Trace'],
        content: `
### 📌 ITAB Debugging & Short Dump Prevention

- **ITAB_LINE_NOT_FOUND Dump**:
  Occurs when table expressions reference non-existent rows.

- **Safe Guard Check**:
  Use line_exists( lt_tab[ ... ] ) or TRY...CATCH cx_sy_itab_line_not_found.
        `,
        codeSnippet: `IF line_exists( lt_flights[ carrid = 'LH' ] ).
  DATA(ls_lh) = lt_flights[ carrid = 'LH' ].
ENDIF.
`,
        quiz: [
          {
            id: 'qp4_4_1',
            question: 'How do you check if a row exists in a table expression before reading to prevent a dump?',
            options: ['line_exists( lt_tab[ ... ] )', 'check_row( )', 'is_found( )', 'valid_tab( )'],
            correctAnswer: 0,
            explanation: 'line_exists( ) returns a boolean TRUE if a matching row exists in a table expression.'
          }
        ]
      },
      {
        id: 'p4_5',
        levelId: 4,
        phaseName: 'Phase 4: Internal Tables',
        topicName: 'Internal Table Performance Optimization',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-21',
        targetDate: '2026-08-21',
        duration: '20 mins',
        concepts: ['BINARY SEARCH', 'Hashed Table Lookup', 'Field Symbols'],
        content: `
### 📌 ITAB Performance Rules

- **BINARY SEARCH Requirement**:
  Always sort internal table by key fields before READ TABLE ... BINARY SEARCH.
        `,
        codeSnippet: `SORT lt_flights BY carrid connid.
READ TABLE lt_flights INTO DATA(ls_fl) WITH KEY carrid = 'LH' BINARY SEARCH.
`,
        quiz: [
          {
            id: 'qp4_5_1',
            question: 'What MUST be done to an internal table before performing a READ TABLE with BINARY SEARCH?',
            options: ['Clear the table', 'Sort the table by the search key fields', 'Delete primary key', 'Export to Excel'],
            correctAnswer: 1,
            explanation: 'BINARY SEARCH requires the table to be sorted by the key fields beforehand.'
          }
        ]
      },
      {
        id: 'p4_6',
        levelId: 4,
        phaseName: 'Phase 4: Internal Tables',
        topicName: 'Mini Project 2 – ITAB-based Report',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-22',
        targetDate: '2026-08-22',
        duration: '30 mins',
        concepts: ['Mini Project 2', 'ITAB Processing', 'Field Symbols', 'SALV'],
        isMiniProject: true,
        content: `
### 🛠️ Mini Project 2: High Performance Inventory Aggregator

- **Project Objective**:
  Build a high-performance inventory stock aggregator using Field Symbols & Hashed tables.
        `,
        codeSnippet: `* Mini Project 2: ITAB Optimization Report
LOOP AT lt_materials ASSIGNING FIELD-SYMBOL(<fs_mat>).
  <fs_mat>-total_val = <fs_mat>-stock * <fs_mat>-unit_price.
ENDLOOP.
`,
        quiz: [
          {
            id: 'qp4_6_1',
            question: 'In Mini Project 2, why use Field Symbols during stock aggregation loops?',
            options: ['For maximum performance and memory efficiency', 'To hide code', 'To lock table', 'To run on GPU'],
            correctAnswer: 0,
            explanation: 'Field symbols eliminate memory copying during loop modifications.'
          }
        ]
      }
    ]
  },

  {
    id: 5,
    phaseName: 'Phase 5: Function Modules',
    title: 'Phase 5: Function Modules & Enhancements',
    subtitle: 'Function Modules, Function Groups, RFCs, Includes, & Mini Project 3',
    iconName: 'Box',
    badge: 'Function Modules',
    color: '#0891b2',
    lessons: [
      {
        id: 'p5_1',
        levelId: 5,
        phaseName: 'Phase 5: Function Modules',
        topicName: 'Function Modules, Function Groups, Global Data',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-23',
        targetDate: '2026-08-23',
        duration: '20 mins',
        concepts: ['SE37', 'Function Group', 'IMPORTING', 'EXPORTING', 'CHANGING', 'EXCEPTIONS'],
        content: `
### 📌 Function Modules & Function Groups (SE37)

- **Function Group**:
  Container package storing related Function Modules and shared global data.

- **Function Interface Parameters**:
  IMPORTING (Input values), EXPORTING (Return values), EXCEPTIONS (Error handling).
        `,
        codeSnippet: `CALL FUNCTION 'BAPI_FLIGHT_GETLIST'
  EXPORTING
    airline           = 'LH'
  TABLES
    flight_list       = lt_flights
  EXCEPTIONS
    no_flights_found  = 1
    OTHERS            = 2.

IF sy-subrc = 0.
  WRITE: / '• Flight BAPI Executed Successfully!'.
ENDIF.
`,
        quiz: [
          {
            id: 'qp5_1_1',
            question: 'Which transaction code is used to create and test Function Modules in SAP GUI?',
            options: ['SE11', 'SE38', 'SE37', 'SE24'],
            correctAnswer: 2,
            explanation: 'SE37 (Function Builder) manages Function Modules and Function Groups.'
          }
        ]
      },
      {
        id: 'p5_2',
        levelId: 5,
        phaseName: 'Phase 5: Function Modules',
        topicName: 'Includes, Modular Architecture',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-24',
        targetDate: '2026-08-24',
        duration: '20 mins',
        concepts: ['TOP Include', 'UXX Includes', 'Global Memory'],
        content: `
### 📌 Function Group Structure

- **LZ<fg>TOP Include**:
  Contains global data declarations shared across all function modules in the group.

- **LZ<fg>UXX Includes**:
  Contains the function module implementations.
        `,
        codeSnippet: `WRITE: / '• [FG ARCHITECTURE]: LZFIGHTTOP (Global Data) -> LZFIGHTU01 (FM Implementation)'.
`,
        quiz: [
          {
            id: 'qp5_2_1',
            question: 'Which Include inside a Function Group holds global data declarations shared across all its function modules?',
            options: ['TOP Include', 'UXX Include', 'F01 Include', 'PAI Include'],
            correctAnswer: 0,
            explanation: 'The TOP Include holds shared global variables for the Function Group.'
          }
        ]
      },
      {
        id: 'p5_3',
        levelId: 5,
        phaseName: 'Phase 5: Function Modules',
        topicName: 'Mini Project 3 – FM + Enhancement',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-25',
        targetDate: '2026-08-25',
        duration: '30 mins',
        concepts: ['Mini Project 3', 'Custom FM', 'BAdI Enhancement'],
        isMiniProject: true,
        content: `
### 🛠️ Mini Project 3: Custom BAPI Interface & Enhancement

- **Project Objective**:
  Build a custom RFC-enabled Function Module with BAdI validation checks.
        `,
        codeSnippet: `* Mini Project 3: Custom RFC Function Module
FUNCTION z_create_customer_order.
  " Validate customer & create order
ENDFUNCTION.
`,
        quiz: [
          {
            id: 'qp5_3_1',
            question: 'In Mini Project 3, what setting allows a Function Module to be called remotely via RFC?',
            options: ['Remote-Enabled Module', 'Local Module', 'Include', 'Subroutine'],
            correctAnswer: 0,
            explanation: 'Remote-Enabled Function Modules (RFCs) can be invoked from external systems.'
          }
        ]
      }
    ]
  },

  {
    id: 6,
    phaseName: 'Phase 6: ABAP OOP',
    title: 'Phase 6: Object-Oriented ABAP (OO ABAP)',
    subtitle: 'Classes, Objects, Attributes, Methods, Inheritance, Interfaces, Exceptions, & Mini Project 4',
    iconName: 'Box',
    badge: 'OO ABAP',
    color: '#0891b2',
    lessons: [
      {
        id: 'p6_1',
        levelId: 6,
        phaseName: 'Phase 6: ABAP OOP',
        topicName: 'OOP Concepts, Classes & Objects',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-26',
        targetDate: '2026-08-26',
        duration: '25 mins',
        concepts: ['SE24', 'CLASS DEFINITION', 'CLASS IMPLEMENTATION', 'NEW Operator'],
        content: `
### 📌 OO ABAP Class Architecture (SE24)

- **CLASS DEFINITION**:
  Declares visibility sections (Public/Protected/Private), attributes, and methods.

- **CLASS IMPLEMENTATION**:
  Contains executable method logic code.

- **NEW Operator**:
  Instantiates objects inline: DATA(lo_obj) = NEW lcl_class( ).
        `,
        codeSnippet: `CLASS lcl_car DEFINITION.
  PUBLIC SECTION.
    METHODS: drive.
ENDCLASS.

CLASS lcl_car IMPLEMENTATION.
  METHOD drive.
    WRITE: / '• [OO ABAP]: Car is driving...'.
  ENDMETHOD.
ENDCLASS.

DATA(lo_my_car) = NEW lcl_car( ).
lo_my_car->drive( ).
`,
        quiz: [
          {
            id: 'qp6_1_1',
            question: 'Which transaction code is the Class Builder for global OO ABAP classes?',
            options: ['SE24', 'SE38', 'SE11', 'SE37'],
            correctAnswer: 0,
            explanation: 'SE24 is the Class Builder for global Object-Oriented classes.'
          }
        ]
      },
      {
        id: 'p6_2',
        levelId: 6,
        phaseName: 'Phase 6: ABAP OOP',
        topicName: 'Attributes, Methods, Constructors',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-27',
        targetDate: '2026-08-27',
        duration: '25 mins',
        concepts: ['Instance Attribute', 'Static Attribute', 'Constructor', 'CLASS-CONSTRUCTOR'],
        content: `
### 📌 Attributes & Constructors

- **Instance constructor**:
  Executes automatically whenever a new object instance is created with NEW.

- **Static class-constructor**:
  Executes automatically ONCE when the class is first loaded into memory.
        `,
        codeSnippet: `CLASS lcl_demo DEFINITION.
  PUBLIC SECTION.
    METHODS: constructor IMPORTING iv_name TYPE string.
  PRIVATE SECTION.
    DATA: mv_name TYPE string.
ENDCLASS.

CLASS lcl_demo IMPLEMENTATION.
  METHOD constructor.
    mv_name = iv_name.
    WRITE: / '• Instance Created for:', mv_name.
  ENDMETHOD.
ENDCLASS.

DATA(lo_demo) = NEW lcl_demo( 'Moinu' ).
`,
        quiz: [
          {
            id: 'qp6_2_1',
            question: 'Which method executes automatically whenever an object instance is created with NEW?',
            options: ['constructor', 'class-constructor', 'main', 'initialize'],
            correctAnswer: 0,
            explanation: 'The instance constructor method executes upon object instantiation.'
          }
        ]
      },
      {
        id: 'p6_3',
        levelId: 6,
        phaseName: 'Phase 6: ABAP OOP',
        topicName: 'Inheritance & Polymorphism',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-28',
        targetDate: '2026-08-28',
        duration: '25 mins',
        concepts: ['INHERITING FROM', 'REDIFITION', 'SUPER->', 'Polymorphism'],
        content: `
### 📌 Inheritance & Method Redefinition

- **Subclass Inheritance**:
  Subclasses inherit attributes & methods using INHERITING FROM superclass.

- **REDEFINITION Keyword**:
  Overrides superclass method implementation in subclass.
        `,
        codeSnippet: `CLASS lcl_animal DEFINITION.
  PUBLIC SECTION.
    METHODS: make_sound.
ENDCLASS.

CLASS lcl_animal IMPLEMENTATION.
  METHOD make_sound. WRITE: / '• Generic Sound'. ENDMETHOD.
ENDCLASS.

CLASS lcl_dog DEFINITION INHERITING FROM lcl_animal.
  PUBLIC SECTION.
    METHODS: make_sound REDEFINITION.
ENDCLASS.

CLASS lcl_dog IMPLEMENTATION.
  METHOD make_sound. WRITE: / '• Woof Woof!'. ENDMETHOD.
ENDCLASS.
`,
        quiz: [
          {
            id: 'qp6_3_1',
            question: 'Which keyword allows a subclass to override a method inherited from its superclass?',
            options: ['REDEFINITION', 'OVERRIDE', 'NEW', 'INHERITING'],
            correctAnswer: 0,
            explanation: 'REDEFINITION allows subclasses to provide custom implementations of inherited methods.'
          }
        ]
      },
      {
        id: 'p6_4',
        levelId: 6,
        phaseName: 'Phase 6: ABAP OOP',
        topicName: 'Interfaces & Abstract Classes',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-29',
        targetDate: '2026-08-29',
        duration: '25 mins',
        concepts: ['INTERFACE', 'INTERFACES clause', 'Abstract Class', 'ABSTRACT'],
        content: `
### 📌 Interfaces vs Abstract Classes

- **Interface (INTERFACE)**:
  100% abstract contract with method signatures. A single class can implement multiple interfaces!

- **Abstract Class**:
  Contains both abstract methods and implemented methods.
        `,
        codeSnippet: `INTERFACE lif_payment.
  METHODS: process_payment IMPORTING iv_amount TYPE p.
ENDINTERFACE.

CLASS lcl_credit_card DEFINITION.
  PUBLIC SECTION.
    INTERFACES: lif_payment.
ENDCLASS.

CLASS lcl_credit_card IMPLEMENTATION.
  METHOD lif_payment~process_payment.
    WRITE: / '• Credit Card Charged:', iv_amount, 'EUR'.
  ENDMETHOD.
ENDCLASS.
`,
        quiz: [
          {
            id: 'qp6_4_1',
            question: 'How many interfaces can a single ABAP class implement?',
            options: ['Only 1', 'Up to 3', 'Multiple interfaces', 'Zero'],
            correctAnswer: 2,
            explanation: 'ABAP supports single class inheritance, but multiple interface implementation.'
          }
        ]
      },
      {
        id: 'p6_5',
        levelId: 6,
        phaseName: 'Phase 6: ABAP OOP',
        topicName: 'Exception Handling (TRY–CATCH)',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-30',
        targetDate: '2026-08-30',
        duration: '20 mins',
        concepts: ['TRY...CATCH', 'cx_root', 'RAISE EXCEPTION', 'Clean Errors'],
        content: `
### 📌 OO Exception Handling (TRY...CATCH)

- **TRY...CATCH Block**:
  Catches runtime exceptions gracefully without program short dumps.
        `,
        codeSnippet: `TRY.
    DATA(lv_res) = 100 / 0.
  CATCH cx_sy_zerodivide.
    WRITE: / '• [CAUGHT EXCEPTION]: Division by zero prevented!'.
ENDTRY.
`,
        quiz: [
          {
            id: 'qp6_5_1',
            question: 'Which base exception class is the superclass of all OO exceptions in ABAP?',
            options: ['cx_root', 'cx_static_check', 'cx_error', 'cx_base'],
            correctAnswer: 0,
            explanation: 'cx_root is the root superclass of all ABAP exception classes.'
          }
        ]
      },
      {
        id: 'p6_6',
        levelId: 6,
        phaseName: 'Phase 6: ABAP OOP',
        topicName: 'Mini Project 4 – OOP Application',
        plannedDays: 1,
        completedDays: 0,
        startDate: '2026-08-31',
        targetDate: '2026-08-31',
        duration: '30 mins',
        concepts: ['Mini Project 4', 'OO Billing Engine', 'Design Patterns'],
        isMiniProject: true,
        content: `
### 🛠️ Mini Project 4: Enterprise OO Billing Engine

- **Project Objective**:
  Build a multi-strategy OOP Billing System using Interfaces and Factory design patterns.
        `,
        codeSnippet: `* Mini Project 4: OO Billing Engine
DATA(lo_payment) = CAST lif_payment( NEW lcl_credit_card( ) ).
lo_payment->process_payment( 1500 ).
`,
        quiz: [
          {
            id: 'qp6_6_1',
            question: 'In Mini Project 4, what design pattern decouples object instantiation from calling code?',
            options: ['Factory Pattern', 'Singleton', 'Observer', 'MVC'],
            correctAnswer: 0,
            explanation: 'Factory pattern creates objects without exposing instantiation logic directly.'
          }
        ]
      }
    ]
  },

  {
    id: 7,
    phaseName: 'Phase 7: Advanced ABAP',
    title: 'Phase 7: Advanced ABAP & Forms',
    subtitle: 'SmartForms, SAP Script, & Layout Design',
    iconName: 'Layers',
    badge: 'Forms & Advanced',
    color: '#ea580c',
    lessons: [
      {
        id: 'p7_1',
        levelId: 7,
        phaseName: 'Phase 7: Advanced ABAP',
        topicName: 'SmartForms & SAP Script',
        plannedDays: 2,
        completedDays: 0,
        startDate: '2026-09-01',
        targetDate: '2026-09-02',
        duration: '30 mins',
        concepts: ['SmartForms (SMARTFORMS)', 'SAP Script (SE71)', 'Form Driver Program', 'Adobe Forms'],
        content: `
### 📌 SmartForms & SAP Script Layouts

- **SAP Script (SE71)**:
  Legacy form tool mixing procedural formatting commands with layout windows.

- **SmartForms (SMARTFORMS)**:
  Graphical form designer outputting auto-generated function module interfaces.

- **Driver Program**:
  Fetches database records and passes internal tables to the form function module.
        `,
        codeSnippet: `* SmartForm Execution Driver Program
CALL FUNCTION 'SSF_FUNCTION_MODULE_NAME'
  EXPORTING  formname = 'ZSMARTFORM_INVOICE'
  IMPORTING  fm_name  = DATA(lv_fm_name).

CALL FUNCTION lv_fm_name
  TABLES     t_items  = lt_invoice_items.
`,
        quiz: [
          {
            id: 'qp7_1_1',
            question: 'Which transaction code opens the SmartForms graphical designer?',
            options: ['SMARTFORMS', 'SE71', 'SE38', 'SE11'],
            correctAnswer: 0,
            explanation: 'SMARTFORMS is the transaction code for designing SmartForms.'
          }
        ]
      }
    ]
  },

  {
    id: 8,
    phaseName: 'Phase 8: S/4HANA & RAP',
    title: 'Phase 8: S/4HANA, RAP Model, Certification & Capstone',
    subtitle: 'CDS Views, Code Pushdown, RAP Model, Clean Core, Certification Revision & Capstone Project',
    iconName: 'Shield',
    badge: 'S/4HANA & RAP',
    color: '#4f46e5',
    lessons: [
      {
        id: 'p8_1',
        levelId: 8,
        phaseName: 'Phase 8: S/4HANA & RAP',
        topicName: 'CDS Views, Data Modeling, Code Pushdown',
        plannedDays: 2,
        completedDays: 0,
        startDate: '2026-09-03',
        targetDate: '2026-09-04',
        duration: '30 mins',
        concepts: ['CDS Views', 'DDL', 'Code Pushdown', 'Annotations', 'ADT Eclipse'],
        content: `
### 📌 Core Data Services (CDS Views) & Pushdown

- **CDS Views (DDL in ADT Eclipse)**:
  Semantic data models created in Eclipse running directly inside the SAP HANA database layer.

- **@OData.publish: true**:
  Automatically exposes CDS entities as RESTful OData services for SAP Fiori UI apps!
        `,
        codeSnippet: `@AbapCatalog.sqlViewName: 'ZV_FLIGHT_SQL'
define view ZI_Flight_Master
  as select from sflight
{
  key carrid as CarrierId,
  key connid as ConnectionId,
      price  as Price
}
`,
        quiz: [
          {
            id: 'qp8_1_1',
            question: 'Where are CDS Views created and maintained in modern SAP S/4HANA development?',
            options: ['ADT Eclipse', 'SE38', 'SE11', 'SM30'],
            correctAnswer: 0,
            explanation: 'CDS Views are developed using ABAP Development Tools (ADT) in Eclipse.'
          }
        ]
      },
      {
        id: 'p8_2',
        levelId: 8,
        phaseName: 'Phase 8: S/4HANA & RAP',
        topicName: 'RAP Model, Clean Core, ABAP Cloud',
        plannedDays: 2,
        completedDays: 0,
        startDate: '2026-09-05',
        targetDate: '2026-09-06',
        duration: '30 mins',
        concepts: ['ABAP RAP', 'Clean Core', 'ABAP Cloud', 'Behavior Definition (BDEF)'],
        content: `
### 📌 ABAP RESTful Application Programming (RAP) & Clean Core

- **ABAP RAP Architecture**:
  Standard framework for building cloud-ready S/4HANA enterprise apps consisting of CDS Data Models, Behavior Definitions (BDEF), and Service Bindings.

- **Clean Core Principles**:
  Keeping standard SAP core code unmodified to ensure smooth, automated cloud software upgrades.
        `,
        codeSnippet: `WRITE: / '• [ABAP RAP]: CDS Data Model + Behavior Definition (BDEF) + Service Binding'.
WRITE: / '• [CLEAN CORE]: Standard SAP code kept 100% unmodified!'.
`,
        quiz: [
          {
            id: 'qp8_2_1',
            question: 'What is the purpose of SAP Clean Core guidelines?',
            options: ['Delete old databases', 'Keep standard SAP code unmodified for smooth cloud upgrades', 'Block logins', 'Use C++'],
            correctAnswer: 1,
            explanation: 'Clean Core ensures standard SAP code remains unmodified for smooth upgrades.'
          }
        ]
      },
      {
        id: 'p8_3',
        levelId: 8,
        phaseName: 'Phase 8: S/4HANA & RAP',
        topicName: 'Certification Revision, MCQs, Exam Strategy',
        plannedDays: 2,
        completedDays: 0,
        startDate: '2026-09-07',
        targetDate: '2026-09-08',
        duration: '25 mins',
        concepts: ['C_TAW12_750', 'SAP Certification', 'Exam Strategy', 'MCQ Practice'],
        content: `
### 📌 SAP ABAP Certification Exam Strategy

- **Official Exam Codes**:
  C_TAW12_750 / C_ABAPD_2308.

- **Core High-Weightage Topics**:
  Open SQL host escaping, Internal Table performance, OO ABAP, and CDS View annotations.
        `,
        codeSnippet: `WRITE: / '• [CERTIFICATION PREP]: Revision of 80 MCQs across DDIC, Open SQL, OO ABAP, & RAP.'.
`,
        quiz: [
          {
            id: 'qp8_3_1',
            question: 'Which area carries high weightage in modern SAP ABAP S/4HANA certification exams?',
            options: ['OO ABAP & Open SQL 7.4+ & CDS Views', 'Cobol syntax', 'Assembly language', 'Hardware repair'],
            correctAnswer: 0,
            explanation: 'OO ABAP, Modern Open SQL 7.4+, and CDS Views form the core of modern certification exams.'
          }
        ]
      },
      {
        id: 'p8_4',
        levelId: 8,
        phaseName: 'Phase 8: S/4HANA & RAP',
        topicName: 'Capstone Project + Final Review',
        plannedDays: 4,
        completedDays: 0,
        startDate: '2026-09-09',
        targetDate: '2026-09-12',
        duration: '40 mins',
        concepts: ['Capstone Project', 'End-to-End Enterprise App', 'S/4HANA Fiori + RAP'],
        isMiniProject: true,
        content: `
### 🏆 Capstone Project: End-to-End S/4HANA Flight & Sales Management System

- **Capstone Project Goal**:
  Build a complete enterprise application combining CDS Views, RAP Behavior Definitions, OO ALV Grid reports, and BAPI integrations!
        `,
        codeSnippet: `* Final Capstone Project Execution
WRITE: / '=================================================='.
WRITE: / '🏆 CAPSTONE PROJECT COMPLETED: S/4HANA RAP APP READY!'.
WRITE: / '=================================================='.
`,
        quiz: [
          {
            id: 'qp8_4_1',
            question: 'What completes the final Phase 8 Capstone Project in the SAP ABAP Schedule Roadmap?',
            options: ['End-to-end Enterprise App combining CDS, RAP, OO ABAP & BAPIs', 'Deleting the database', 'Format hard drive', 'Exit system'],
            correctAnswer: 0,
            explanation: 'The Capstone Project integrates all 8 phases into a full enterprise S/4HANA solution.'
          }
        ]
      }
    ]
  }
];
