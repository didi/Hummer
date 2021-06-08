/* eslint-disable @typescript-eslint/no-empty-function */
import {isCustomNativeTag, isNativeTags} from '@hummer/tenon-utils'

export const parserOptions = {
  isNativeTag: (tag:string) => {
    return isNativeTags(tag) || isCustomNativeTag(tag)
  },
  isBuiltInComponent: () => {}
}