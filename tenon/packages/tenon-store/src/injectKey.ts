import { inject } from '@hummer/tenon-vue'

export const storeKey = 'store'

export function useStore (key?:string) {
  return inject(key || storeKey)
}
