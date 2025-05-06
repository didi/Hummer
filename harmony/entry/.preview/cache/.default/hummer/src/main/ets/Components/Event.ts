export const TapEventName = 'tap';
export const TouchEventName = 'touch';
export const LongPressEventName = 'longPress';
export const PanEventName = 'pan';
export const SwipeEventName = 'swipe';
export const PinchEventName = 'pinch';
export const ScrollEventName = 'scroll';
export const OnScrollTopEventName = 'onScrollTop';
export const OnScrollBottomEventName = 'onScrollBottom';
export enum EventState {
    normal = 0,
    began = 1,
    changed = 2,
    ended = 3,
    cancelled = 4
}
export interface HMEvent<T> {
    type: string;
    state?: T;
    timestamp: number;
}
export interface HMTouchEvent extends HMEvent<EventState> {
    position: {
        x: number;
        y: number;
    };
}
export enum ScrollEventState {
    normal = 0,
    beganDrag = 1,
    scroll = 2,
    stop = 3,
    endDrag = 4
}
export interface ScrollEvent extends HMEvent<ScrollEventState> {
    offsetX: number;
    offsetY: number;
    dx: number;
    dy: number;
}
export type HMTapEvent = HMTouchEvent;
