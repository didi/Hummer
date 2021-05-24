export const NODE_VIEW = Symbol('NODE_VIEW')
export const NODE_TEXT = Symbol('NODE_TEXT')
export const NODE_IMAGE = Symbol('NODE_IMAGE')
export const NODE_BUTTON = Symbol('NODE_BUTTON')
export const NODE_TEXTAREA = Symbol('NODE_TEXTAREA')
export const NODE_INPUT = Symbol('NODE_INPUT')
export const NODE_SCROLLER = Symbol('NODE_SCROLLER')
export const NODE_VIEW_PAGER = Symbol('NODE_VIEW_PAGER')
export const NODE_LIST = Symbol('NODE_LIST')
export const NODE_DIALOG = Symbol('NODE_DIALOG')
export const NODE_ANIMATION_VIEW = Symbol('NODE_ANIMATION_VIEW')
export const NODE_COMMENT = Symbol('NODE_COMMENT')

/**
 * 通用组件枚举
 */
export const ELEMNT_TAG_MAP = {
  [NODE_VIEW]: 'view',
  [NODE_TEXT]: 'text',
  [NODE_IMAGE]: 'image',
  [NODE_BUTTON]: 'button',
  [NODE_TEXTAREA]: 'textarea',
  [NODE_INPUT]: 'input',
  [NODE_SCROLLER]: 'scroller',
  [NODE_VIEW_PAGER]: 'view-pager',
  [NODE_LIST]: 'list',
  [NODE_DIALOG]: 'dialog',
  [NODE_ANIMATION_VIEW]: 'animation'
}
