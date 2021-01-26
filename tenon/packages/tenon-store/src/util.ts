/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find (list:Array<any>, f:any) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy (obj:any, cache:any = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, (c:any) => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy:any = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * forEach for object
 */
export function forEachValue (obj:any, fn:Function) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject (obj:any) {
  return obj !== null && typeof obj === 'object'
}

export function isPromise (val:any) {
  return val && typeof val.then === 'function'
}

export function assert (condition:any, msg:string) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

export function partial (fn:any, arg:string) {
  return function () {
    return fn(arg)
  }
}

