import type { InterviewQuestion } from '../types';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // 1. SAP Core & Architecture
  {
    id: 'iq_1',
    category: 'SAP Core & Architecture',
    question: 'What is SAP and when/where was it founded?',
    shortAnswer: 'SAP stands for Systems, Applications, and Products in Data Processing. It was founded in 1972 in Germany by 5 former IBM engineers.',
    detailedPoints: [
      '• SAP = Systems, Applications, and Products in Data Processing.',
      '• History: Invented in 1972 in Germany by 5 former IBM engineers.',
      '• ERP Category: Uses Enterprise Resource Planning (ERP) software to integrate all enterprise business functions into a real-time system.',
      '• Broad Role Classification: Broadly classified into Functional Consultants (MM, SD, FICO, PP, PM, QM) and Technical Consultants (ABAP, BASIS, BI/BW, PI/PO).'
    ],
    interviewTip: 'Mention 1972 IBM Germany background and highlight how SAP replaces disconnected legacy systems with a single real-time database.',
    difficulty: 'Basic'
  },
  {
    id: 'iq_2',
    category: 'SAP Core & Architecture',
    question: 'Explain the 3-Tier Architecture of SAP with a real-life example.',
    shortAnswer: 'SAP uses a 3-tier client-server architecture: Presentation Layer (UI), Application Layer (Brain/ABAP logic), and Database Layer (Data storage).',
    detailedPoints: [
      '• 1. Presentation Layer: The user interface (SAP GUI, SAP Fiori, Web Browser). Accepts user input and displays output.',
      '• 2. Application Layer: The brain of SAP. Contains business logic, executes ABAP code, validates data, and communicates with database work processes.',
      '• 3. Database Layer: Stores all SAP data (Customer, Vendor, Employee, Sales records). Databases include SAP HANA, Oracle, MS SQL Server, IBM Db2.',
      '• Real-Life Example Workflow:',
      '   - User clicks "Display Employee Details" (Presentation Layer).',
      '   - Application server checks employee ID and sends SQL query (Application Layer).',
      '   - Database fetches employee record and returns it to Application server (Database Layer).',
      '   - Application server formats result and displays it to user on screen.'
    ],
    codeSnippet: `* Simulating 3-Tier Execution Workflow
WRITE: / '[PRESENTATION LAYER]: User clicked Display Employee Details (ID: 10045)'.
WRITE: / '[APPLICATION LAYER] : Validating permissions & executing SELECT query...'.
WRITE: / '[DATABASE LAYER]   : SAP HANA fetched record from KNA1 table in 0.4ms'.
WRITE: / '[PRESENTATION LAYER]: Displaying Employee Name: Global Acme Corp'.
`,
    interviewTip: 'Use the Employee Lookup step-by-step example. It clearly proves you understand end-to-end request processing.',
    difficulty: 'Basic'
  },
  {
    id: 'iq_3',
    category: 'SAP Core & Architecture',
    question: 'What are the key SAP Functional Modules?',
    shortAnswer: 'The core functional modules handle business operations: MM (Materials), SD (Sales), FICO (Finance/Controlling), PP (Production), PM (Plant Maintenance), QM (Quality).',
    detailedPoints: [
      '• 1. MM (Materials Management): Procurement, inventory, purchase orders, vendor management.',
      '• 2. SD (Sales & Distribution): Sales quotes, customer orders, shipping, deliveries, billing.',
      '• 3. FICO (Finance & Controlling): FI = General Ledger, AP, AR, Balance Sheets; CO = Cost Center Accounting, Profitability.',
      '• 4. PP (Production Planning): Master Production Schedules (MPS), Material Requirements Planning (MRP), Bill of Materials (BOM).',
      '• 5. PM (Plant Maintenance): Equipment maintenance, preventive maintenance, repair work orders.',
      '• 6. QM (Quality Management): Quality inspections, certifications, audit notifications.'
    ],
    interviewTip: 'As an ABAP developer, state that you write custom RICEFW objects for these functional module teams.',
    difficulty: 'Basic'
  },

  // 2. BASIS & Transports (TMS)
  {
    tcode: 'SE09',
    id: 'iq_4',
    category: 'BASIS & Transports (TMS)',
    question: 'What is SAP BASIS and what are its main responsibilities?',
    shortAnswer: 'SAP BASIS (Business Application Software Integrated System) is the system administration layer responsible for server configuration, user authorizations, DB management, and system health.',
    detailedPoints: [
      '• Definition: BASIS = Business Application Software Integrated System.',
      '• Key Responsibilities of BASIS Administrator:',
      '   1. Installing & configuring SAP application servers and system instances.',
      '   2. Managing SAP users, roles, security profiles, and authorizations (SU01 / PFCG).',
      '   3. Monitoring system performance, CPU/memory usage, and work processes (SM50 / SM51).',
      '   4. Managing SAP databases (backups, restoration, DB tuning, memory allocation).',
      '   5. Performing system upgrades, Support Package Stacks (SPS), and kernel patches.',
      '   6. Handling system error dumps (ST22) and emergency disaster recovery.',
      '   7. Managing Transport Management System (TMS) imports between DEV, QAS, and PRD.',
      '• Role Summary: BASIS knows every single moment of system production health or disaster!'
    ],
    interviewTip: 'Emphasize that BASIS is the system administration team keeping servers, security, and transport pipelines online 24/7.',
    difficulty: 'Intermediate'
  },
  {
    id: 'iq_5',
    category: 'BASIS & Transports (TMS)',
    question: 'Explain Transport Management System (TMS), Transport Requests (TRs), and the 4 TR types.',
    shortAnswer: 'TMS moves software changes across DEV, QAS, and PRD. There are 4 TR types: Workbench TR (K), Customizing TR (C), TOC (T), and ToR (R).',
    detailedPoints: [
      '• What is TMS?: Transport Management System moves developments and configurations across the 3-system landscape (Development → Quality → Production).',
      '• Package: A container package ($TMP or Z package) holding development objects and attached Transport Requests.',
      '• The 4 Transport Request (TR) Types:',
      '   1. Workbench TR (Prefix K - e.g. DEVK900123): Used for custom code development, ABAP reports, classes, CDS views, and technical objects. Handled by ABAP/Technical team.',
      '   2. Customizing TR (Prefix C - e.g. DEVC900456): Used for business configuration changes (SPRO settings). Handled by Functional team.',
      '   3. TOC - Transport of Copies (Prefix T - e.g. DEVT900789): Used to release partial versions into Quality system for UAT testing without releasing main TR header.',
      '   4. ToR - Transport of Relocations (Prefix R): Used when permanently relocating objects from one package/system to another.'
    ],
    interviewTip: 'Memorize TR prefixes: Workbench (K), Customizing (C), TOC (T), Relocations (R). Interviewers love asking this exact breakdown!',
    difficulty: 'Intermediate'
  },

  // 3. BI / BW & PIPO
  {
    id: 'iq_6',
    category: 'BI / BW & PIPO',
    question: 'What is the difference between SAP BI and SAP BW?',
    shortAnswer: 'SAP BW is the Data Warehouse ETL storage layer; SAP BI is the Analytics and Business Reporting layer.',
    detailedPoints: [
      '• SAP BW (Business Warehouse):',
      '   - SAP’s data warehousing solution.',
      '   - Focuses on ETL (Extract, Transform, Load), storing, and organizing data from multiple SAP & non-SAP sources into InfoCubes/DSOs.',
      '• SAP BI (Business Intelligence):',
      '   - Focuses on analytics, data visualization, and reporting.',
      '   - Collects, integrates, analyzes, and presents business data through interactive reports and dashboards (e.g. SAP Analytics Cloud, BusinessObjects).',
      '• Key Distinction: BW handles data extraction & storage; BI handles reporting & decision-making insights.'
    ],
    interviewTip: 'Think of BW as the warehouse database storehouse, and BI as the executive dashboard display.',
    difficulty: 'Intermediate'
  },
  {
    id: 'iq_7',
    category: 'BI / BW & PIPO',
    question: 'Explain SAP PI vs SAP PO (PIPO).',
    shortAnswer: 'SAP PI handles system integration & data exchange; SAP PO includes PI plus complete Business Process Orchestration and automation.',
    detailedPoints: [
      '• PIPO = Process Integration & Process Orchestration.',
      '• SAP PI (Process Integration):',
      '   - Focuses mainly on system-to-system integration, mapping, and data exchange between SAP and third-party systems.',
      '• SAP PO (Process Orchestration):',
      '   - Includes full integration PLUS business process management (BPM) & process automation.',
      '   - Manages and automates complex multi-system workflow business processes end-to-end.'
    ],
    interviewTip: 'State clearly that PO is the modern Java-based evolution of PI combining ESB integration with Business Process Management.',
    difficulty: 'Intermediate'
  },

  // 4. Project Types & FSD
  {
    id: 'iq_8',
    category: 'Project Types & FSD',
    question: 'What is an FSD and UAT in an SAP project delivery cycle?',
    shortAnswer: 'FSD (Functional Specification Document) explains business requirements for developers; UAT (User Acceptance Test) validates customer acceptance.',
    detailedPoints: [
      '• FSD (Functional Specification Document):',
      '   - Prepared by Functional Consultants and handed to ABAP Developers.',
      '   - Explains business requirements, table fields, selection criteria, logic rules, and expected output.',
      '   - The ABAP Developer converts the FSD into a TSD (Technical Specification Document) before writing code.',
      '• UAT (User Acceptance Testing):',
      '   - Conducted in the Quality (QAS) system by key business end-users.',
      '   - Checks whether the developed custom ABAP solution fulfills business expectations before Go-Live.'
    ],
    interviewTip: 'Walk the interviewer through the lifecycle: Business Request → FSD (Functional) → TSD (ABAP) → Development → Unit Testing → UAT (User) → Production Go-Live.',
    difficulty: 'Basic'
  },
  {
    id: 'iq_9',
    category: 'Project Types & FSD',
    question: 'What are the 4 SAP Project Types (Greenfield, Brownfield, Migration, Rollout)?',
    shortAnswer: 'Greenfield is starting fresh from scratch; Brownfield is converting existing SAP; Migration is software upgrades; Rollout is business expansion.',
    detailedPoints: [
      '• 1. Greenfield Implementation:',
      '   - Building a brand new SAP system from scratch (from beginning to date).',
      '   - Clean slate implementation without legacy constraints.',
      '• 2. Brownfield Implementation:',
      '   - System conversion of an existing non-SAP or older SAP ECC system into SAP S/4HANA.',
      '   - Preserves historical customization while upgrading backend tables.',
      '• 3. Migration / Upgrade Project:',
      '   - Updating SAP software versions, Enhancement Packages (EHP), or moving DB to SAP HANA.',
      '• 4. Rollout Project:',
      '   - Expanding an existing template SAP system to new company codes, plants, subsidiaries, or countries.'
    ],
    interviewTip: 'Greenfield = New house from scratch; Brownfield = Renovation of existing house; Rollout = Expanding chain stores to new cities.',
    difficulty: 'Intermediate'
  },

  // 5. ABAP Core & Data Dictionary
  {
    id: 'iq_10',
    category: 'ABAP Core & Data Dictionary',
    question: 'What is ABAP and what programming paradigms does it support?',
    shortAnswer: 'ABAP (Advanced Business Application Programming) supports procedural subroutines/function modules and Object-Oriented (OO) classes.',
    detailedPoints: [
      '• Full Form: ABAP = Advanced Business Application Programming.',
      '• Dual Paradigm: Supports both Procedural programming (Form subroutines, Function Modules) and Object-Oriented programming (Classes, Interfaces, Methods).',
      '• Execution Environment: Runs inside AS ABAP application server VM.'
    ],
    interviewTip: 'Emphasize that modern SAP S/4HANA development strictly mandates Object-Oriented ABAP over legacy procedural code.',
    difficulty: 'Basic'
  },

  // 6. Modern ABAP 7.4+ & S/4HANA
  {
    id: 'iq_11',
    category: 'Modern ABAP 7.4+ & S/4HANA',
    question: 'What does S/4HANA stand for and how does Modern Open SQL differ from classic ABAP?',
    shortAnswer: 'S/4HANA = 4th Generation SAP Suite on High-Performance Analytic Appliance (HANA). Modern Open SQL uses host escaping (@) and inline declarations (@DATA).',
    detailedPoints: [
      '• Name Breakdown:',
      '   - S/4 = 4th Generation Business Suite.',
      '   - HANA = High-Performance Analytic Appliance.',
      '• Modern Open SQL Enhancements in ABAP 7.4+:',
      '   1. Host Variable Escaping (@): ABAP variables inside SQL must be prefixed with @.',
      '   2. Inline Declarations (@DATA): Target internal tables are declared inline: INTO TABLE @DATA(lt_tab).',
      '   3. Comma Separated Fields: SELECT carrid, connid, price FROM sflight...',
      '   4. Database Code Pushdown: Aggregations (SUM, AVG) executed directly on HANA engine.'
    ],
    codeSnippet: `* Modern Open SQL in S/4HANA
DATA: lv_carrid TYPE string VALUE 'LH'.

SELECT carrid, connid, fldate, price
  FROM sflight
  INTO TABLE @DATA(lt_flights)
  WHERE carrid = @lv_carrid.
`,
    interviewTip: 'Highlight that S/4HANA Code Pushdown pushes heavy data processing to the HANA database layer rather than looping in ABAP memory.',
    difficulty: 'Advanced'
  }
];
