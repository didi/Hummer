export const NODE_VIEW = Symbol('NODE_VIEW')
export const NODE_TEXT = Symbol('NODE_TEXT')
export const NODE_IMAGE = Symbol('NODE_IMAGE')
export const NODE_BUTTON = Symbol('NODE_BUTTON')
export const NODE_TEXTAREA = Symbol('NODE_TEXTAREA')
export const NODE_INPUT = Symbol('NODE_INPUT')
export const NODE_SWITCH = Symbol('NODE_SWITCH')
export const NODE_SCROLLER = Symbol('NODE_SCROLLER')
export const NODE_VIEW_PAGER = Symbol('NODE_VIEW_PAGER')
export const NODE_LIST = Symbol('NODE_LIST')
export const NODE_DIALOG = Symbol('NODE_DIALOG')
export const NODE_ANIMATION_VIEW = Symbol('NODE_ANIMATION_VIEW')
export const NODE_COMMENT = Symbol('NODE_COMMENT')
export const NODE_ANCHOR = Symbol('NODE_ANCHOR')
export const NODE_REFRESH = Symbol('NODE_REFRESH')
export const NODE_LOADMORE = Symbol('NODE_LOADMORE')


// 通用组件枚举
export const ELEMNT_TAG_MAP = getElementTagMap()

// 不包含 Children 的 Tag
export const NotHasChildrenTag = [NODE_TEXT, NODE_IMAGE, NODE_BUTTON, NODE_TEXTAREA, NODE_INPUT]

// 拥有 Text 的 Tag
export const WithTextTag = [NODE_TEXT, NODE_BUTTON]

function getElementTagMap(){
  let tagMap = new Map();
  tagMap.set(NODE_VIEW, 'view')
  tagMap.set(NODE_TEXT, 'text')
  tagMap.set(NODE_IMAGE, 'image')
  tagMap.set(NODE_BUTTON, 'button')
  tagMap.set(NODE_TEXTAREA, 'textarea')
  tagMap.set(NODE_INPUT, 'input')
  tagMap.set(NODE_SWITCH, 'switch')
  tagMap.set(NODE_SCROLLER, 'scroller')
  tagMap.set(NODE_REFRESH, 'refresh')
  tagMap.set(NODE_LOADMORE, 'loadmore')
  return tagMap
}

export function isNotHasChilrenTag(type:string){
  return NotHasChildrenTag.some(tag => {
    return ELEMNT_TAG_MAP.get(tag) === type
  })
}

export function shouldTextTag(type:string){
  return NotHasChildrenTag.some(tag => {
    return ELEMNT_TAG_MAP.get(tag) === type
  })
}

export function isWithTextTag(type: string){
  return WithTextTag.some(tag => {
    return ELEMNT_TAG_MAP.get(tag) === type
  })
}
