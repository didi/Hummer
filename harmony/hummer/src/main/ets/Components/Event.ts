export const TapEventName = 'tap'
export const TouchEventName = 'touch'
export const LongPressEventName = 'longPress'
export const PanEventName = 'pan'
export const SwipeEventName = 'swipe'
export const PinchEventName = 'pinch'

export const ScrollEventName = 'scroll'
export const OnScrollTopEventName = 'onScrollTop'
export const OnScrollBottomEventName = 'onScrollBottom'


export enum EventState {
  normal = 0, // normal
  began,
  changed,
  ended,
  cancelled,
}

export interface HMEvent<T = number> {
  type : string
  state?	: T
  timestamp	: number
}

export interface HMTouchEvent extends HMEvent<EventState> {
  position: {x:number, y:number}
}

export interface HMPanEvent extends HMEvent<EventState> {
  translation: {deltaX:number, deltaY:number}
}

export interface HMLongPressEvent extends HMEvent<EventState> {
  position: {x:number, y:number}
}

export interface HMSwipeEvent extends HMEvent<EventState> {
  direction: number
}

export interface HMPinchEvent extends HMEvent<EventState> {
  scale: number
}

export enum ScrollEventState {
  normal = 0, // normal
  beganDrag,
  scroll,
  stop,
  endDrag,
}

export interface ScrollEvent extends HMEvent<ScrollEventState> {
  offsetX: number
  offsetY: number
  dx: number
  dy: number
}

export type HMTapEvent = HMTouchEvent
