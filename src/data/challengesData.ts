import type { CodingChallenge } from '../types';

export const CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: 'ch_1',
    title: 'Challenge 1: Declare & Print Employee Details',
    difficulty: 'Beginner',
    category: 'Syntax & Output',
    description: 'Declare an integer variable `lv_emp_id` with value `5001` and a string variable `lv_name` with value `Moinu`. Output them using `WRITE:` on separate lines.',
    initialCode: `* Challenge 1: Declare lv_emp_id (i) and lv_name (string)
* Write your solution below:

DATA: lv_emp_id TYPE i VALUE 5001,
      lv_name   TYPE string VALUE 'Moinu'.

WRITE: / 'Employee ID:', lv_emp_id,
       / 'Employee Name:', lv_name.
`,
    solutionHint: 'Use DATA lv_emp_id TYPE i VALUE 5001 and WRITE: / ...',
    points: 100,
    testCases: [
      {
        description: 'Outputs Employee ID 5001',
        expectedOutputSubstring: '5001'
      },
      {
        description: 'Outputs Employee Name Moinu',
        expectedOutputSubstring: 'Moinu'
      }
    ]
  },
  {
    id: 'ch_2',
    title: 'Challenge 2: Modern ABAP Table Construction (VALUE #)',
    difficulty: 'Intermediate',
    category: 'Modern ABAP 7.4+',
    description: 'Use the Modern ABAP `VALUE #()` operator to construct an internal table `lt_flights` containing 2 rows with fields `CARRID`, `CONNID`, and `PRICE`. Print the rows using a `LOOP AT` statement.',
    initialCode: `* Challenge 2: Inline table construction
* Build lt_flights with 2 rows using VALUE #()

DATA(lt_flights) = VALUE #(
  ( CARRID = 'LH' CONNID = '0400' PRICE = '899.00' )
  ( CARRID = 'AA' CONNID = '0017' PRICE = '650.00' )
).

LOOP AT lt_flights INTO DATA(ls_flight).
  WRITE: / ls_flight-carrid, ls_flight-connid, ls_flight-price.
ENDLOOP.
`,
    solutionHint: 'Construct lt_flights = VALUE #( ( CARRID = "LH" CONNID = "0400" PRICE = "899.00" ) ... ) and loop with WRITE.',
    points: 200,
    testCases: [
      {
        description: 'Outputs LH 0400',
        expectedOutputSubstring: 'LH'
      },
      {
        description: 'Outputs AA 0017',
        expectedOutputSubstring: 'AA'
      }
    ]
  },
  {
    id: 'ch_3',
    title: 'Challenge 3: Open SQL DB Query & Host Escaping (@)',
    difficulty: 'Advanced',
    category: 'Open SQL',
    description: 'Query the mock `sflight` database table for flights where `carrid = "LH"` into table `@DATA(lt_res)`. Output the record count and loop through the result.',
    initialCode: `* Challenge 3: Open SQL Query
DATA: lv_carrier TYPE string VALUE 'LH'.

SELECT * FROM sflight 
  INTO TABLE @DATA(lt_res) 
  WHERE carrid = @lv_carrier.

WRITE: / 'Total Records Found:', sy-dbcnt.

LOOP AT lt_res INTO DATA(ls_row).
  WRITE: / ls_row-carrid, ls_row-connid, ls_row-price.
ENDLOOP.
`,
    solutionHint: 'Use SELECT * FROM sflight INTO TABLE @DATA(lt_res) WHERE carrid = @lv_carrier.',
    points: 300,
    testCases: [
      {
        description: 'Returns correct DB count',
        expectedOutputSubstring: 'Total Records Found:'
      },
      {
        description: 'Finds LH flights',
        expectedOutputSubstring: 'LH'
      }
    ]
  },
  {
    id: 'ch_4',
    title: 'Challenge 4: Object-Oriented ABAP Class & Method Call',
    difficulty: 'S/4HANA',
    category: 'OO ABAP',
    description: 'Create a local class `lcl_calculator` with a public method `add_numbers` accepting `iv_a` and `iv_b` and returning their sum. Instantiate using `NEW lcl_calculator( )` and print the result.',
    initialCode: `* Challenge 4: OO ABAP Calculator Class

CLASS lcl_calculator DEFINITION.
  PUBLIC SECTION.
    METHODS: add_numbers IMPORTING iv_a TYPE i iv_b TYPE i RETURNING VALUE(rv_sum) TYPE i.
ENDCLASS.

CLASS lcl_calculator IMPLEMENTATION.
  METHOD add_numbers.
    rv_sum = iv_a + iv_b.
  ENDMETHOD.
ENDCLASS.

* Test instance
DATA(lo_calc) = NEW lcl_calculator( ).
DATA(lv_res) = lo_calc->add_numbers( iv_a = 40 iv_b = 60 ).

WRITE: / 'Calculated Sum Result:', lv_res.
`,
    solutionHint: 'Define CLASS lcl_calculator, implement add_numbers returning rv_sum, and instantiate with NEW.',
    points: 400,
    testCases: [
      {
        description: 'Calculates sum 100 correctly',
        expectedOutputSubstring: '100'
      }
    ]
  }
];
