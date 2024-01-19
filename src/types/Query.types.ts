export type QType =
  | 'DEF'
  | 'DEFNUM'
  | 'NEQ'
  | 'EQ'
  | 'NAME'
  | 'BOOLEAN'
  | 'IN'
  | 'INF'
  | 'GTE'
  | 'GTES'
  | 'GT'
  | 'LT'
  | 'LTE'
  | 'INC'
  | 'OR'
  | 'ORF'
  | 'AND'
  | 'ANDF'
  | 'EXPR'
  | 'EQGR'
  | 'EQGRS';

export type QInput = Date | string | string[] | number[] | number | boolean | boolean[];

export interface QGlobal<T = string> {
  input: string | undefined;
  query: T | string;
  queryInput?: QInput | QGlobal<T>[];
  type: QType;
  expect?: string | number | boolean;
}
