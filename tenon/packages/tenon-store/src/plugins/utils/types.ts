/**
 * Store的数据操作类型
 */
export enum OperationType {
  ADD,
  DELETE,
  UPDATE
}

export interface Operation{
  type: OperationType,
  key: Array<string>,
  value: any
}

export type Operations = Array<Operation>