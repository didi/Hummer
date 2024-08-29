export function isString (o: unknown): o is string {
  return typeof o === 'string'
}
export function isBoolean (o: unknown): o is boolean {
  return o === true || o === false
}

export function isUndefined (o: unknown): o is undefined {
  return typeof o === 'undefined'
}

export function isNumber (o: unknown): o is number {
  return typeof o === 'number'
}
export function isNull (o: unknown): o is null {
  return o === null
}

export function isObject<T> (o: unknown): o is T {
  return o !== null && typeof o === 'object'
}

export function isFunction (o: unknown): o is (...args: any[]) => any {
  return typeof o === 'function'
}

export const isArray = Array.isArray
