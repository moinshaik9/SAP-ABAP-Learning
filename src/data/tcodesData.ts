import type { TCodeInfo } from '../types';

export const TCODES_DICTIONARY: TCodeInfo[] = [
  // ABAP Core & Workbench
  {
    tcode: 'SE11',
    name: 'ABAP Data Dictionary',
    module: 'Data Dictionary',
    description: 'The master hub for managing Database Tables, Views, Data Elements, Domains, Structures, Table Types, and Search Helps.',
    usage: 'Use SE11 to create custom Z-tables (e.g. ZCUSTOMER), add fields, activate indexes, or inspect SAP standard table definitions like MARA, VBAK, BSEG.',
    tips: 'Use Ctrl+F3 to activate DDIC objects after making changes.'
  },
  {
    tcode: 'SE38',
    name: 'ABAP Editor',
    module: 'ABAP Core',
    description: 'The classic ABAP source code editor for executable programs, includes, subroutines, and report variants.',
    usage: 'Create new executable reports (ZREPORT_DEMO), set variant selections, or debug background jobs.',
    tips: 'Type SE80 instead if working on multi-object packages.'
  },
  {
    tcode: 'SE80',
    name: 'Object Navigator (IDE Workbench)',
    module: 'ABAP Core',
    description: 'The primary integrated development environment (IDE) in SAP GUI. Displays trees for packages, programs, classes, function groups, and web dynpros.',
    usage: 'Essential for organizing related objects inside software packages ($TMP or custom Z packages).',
    tips: 'Right click on package names to create new repository objects directly.'
  },
  {
    tcode: 'SE24',
    name: 'Class Builder',
    module: 'ABAP Core',
    description: 'Create and manage global Object-Oriented ABAP classes (CL_*) and interfaces (IF_*).',
    usage: 'Define methods, parameters, public/protected/private visibility, and event handlers.',
    tips: 'Check method signatures carefully before changing public interfaces.'
  },
  {
    tcode: 'SE37',
    name: 'Function Builder',
    module: 'ABAP Core',
    description: 'Maintain Function Modules (FM), RFC interfaces, and Function Groups.',
    usage: 'Test function modules (e.g. BAPI_TRANSACTION_COMMIT) directly with mock import data.',
    tips: 'Press F8 inside SE37 to execute and test function module parameters.'
  },

  // Performance & Debug
  {
    tcode: 'ST05',
    name: 'Performance Trace (SQL / Buffer / Enqueue)',
    module: 'Performance & Debug',
    description: 'Traces database operations, SQL execution plans, index usage, and buffer access times.',
    usage: 'Activate trace, run your transaction/report, deactivate trace, and analyze SQL execution times.',
    tips: 'Filter trace results by your username to avoid capturing system background processes.'
  },
  {
    tcode: 'SAT',
    name: 'ABAP Runtime Analysis',
    module: 'Performance & Debug',
    description: 'Replaces older SE30. Measures exact CPU breakdown percentage between ABAP code execution and DB queries.',
    usage: 'Use SAT when optimizing slow reports to see if the bottleneck is in ABAP loops or database fetches.',
    tips: 'Look at the Hit List tab to identify high execution frequency subroutines.'
  },
  {
    tcode: 'ST22',
    name: 'ABAP Dump Analysis',
    module: 'Performance & Debug',
    description: 'Displays system runtime errors and ABAP short dumps (e.g. MOVE_CAST_ERROR, ITAB_LINE_NOT_FOUND).',
    usage: 'Diagnose crashes by viewing the exact program line, call stack, and variable values at the moment of failure.',
    tips: 'Double click on a dump to view the exact source code line where the error occurred.'
  },
  {
    tcode: 'SM50',
    name: 'Work Process Overview',
    module: 'Performance & Debug',
    description: 'Monitors active work processes (Dialog, Background, Update, Spool, Enqueue) on the current application server.',
    usage: 'Cancel long-running background tasks or debug running processes.',
    tips: 'Use SM51 to view work processes across all servers in a multi-instance SAP landscape.'
  },

  // Data & Table Browsing
  {
    tcode: 'SE16N',
    name: 'General Table Display',
    module: 'Data Dictionary',
    description: 'Advanced data browser for inspecting table records, setting quick field filters, and exporting to Excel.',
    usage: 'Quickly verify database table contents (e.g., check created sales order numbers in VBAK).',
    tips: 'Press Ctrl+F to filter column values instantly.'
  },
  {
    tcode: 'SM30',
    name: 'Call View Maintenance',
    module: 'Data Dictionary',
    description: 'Maintain configuration entries inside custom Z-table maintenance dialog views.',
    usage: 'Used by functional consultants and developers to update master parameter tables.',
    tips: 'Ensure table maintenance generator (TMG) is built via SE11 before running SM30.'
  },

  // Transport & Administration
  {
    tcode: 'SE09',
    name: 'Transport Organizer',
    module: 'Administration',
    description: 'Manage Workbench and Customizing Transport Requests (TRs).',
    usage: 'Release transport tasks and requests to transport code changes from DEV to QAS and PRD.',
    tips: 'Always release sub-tasks before releasing the main transport request header.'
  },
  {
    tcode: 'STMS',
    name: 'Transport Management System',
    module: 'Administration',
    description: 'Administer transport routes, import queues, and transport status across DEV, QAS, and PRD.',
    usage: 'Import transport requests into target systems.',
    tips: 'Check the import monitor tab for red return codes (RC=8, RC=12).'
  },

  // S/4HANA & RAP
  {
    tcode: 'SEGW',
    name: 'SAP Gateway Service Builder',
    module: 'S/4HANA & RAP',
    description: 'Model and implement OData services (V2) for SAP Fiori applications.',
    usage: 'Create entity types, sets, and implement ABAP DPC_EXT class methods.',
    tips: 'In S/4HANA, consider using CDS Views with @OData.publish: true or RAP service bindings instead.'
  },
  {
    tcode: 'SWO1',
    name: 'Business Object Builder',
    module: 'S/4HANA & RAP',
    description: 'Create and edit Business Object repository (BOR) objects and BAPIs.',
    usage: 'Inspect standard SAP business object definitions (e.g., BUS2032 for Sales Orders).',
    tips: 'Useful when finding underlying BAPI function modules.'
  },

  // Functional Modules (SD, MM, FI)
  {
    tcode: 'VA01',
    name: 'Create Sales Order',
    module: 'SD',
    description: 'Standard Sales & Distribution transaction for creating Customer Sales Orders.',
    usage: 'Test custom User Exits (SDVFX001) or BAdIs triggered during sales order save.',
    tips: 'Table VBAK stores header data; VBAP stores line item details.'
  },
  {
    tcode: 'ME21N',
    name: 'Create Purchase Order',
    module: 'MM',
    description: 'Materials Management transaction to create Purchase Orders.',
    usage: 'Test MM BAPIs (BAPI_PO_CREATE1) or enhancement points in purchasing.',
    tips: 'Header data lives in EKKO; item data in EKPO.'
  },
  {
    tcode: 'FB01',
    name: 'Post Financial Document',
    module: 'FI/CO',
    description: 'Post G/L accounting documents in Financial Accounting.',
    usage: 'Test financial document postings, tax validations, and ACDOCA entries.',
    tips: 'BKPF stores header info; BSEG / ACDOCA store line item details.'
  }
];
