import {isCustomNativeTag, isNativeTags} from '@hummer/tenon-utils'



export const parserOptions = {
  isNativeTag: (tag:string) => {
    return isNativeTags(tag) || isCustomNativeTag(tag)
  },
  isBuiltInComponent: () => {}
}