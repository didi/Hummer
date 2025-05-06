export const TapEventName = 'tap';
export const TouchEventName = 'touch';
export const FocusEventName = 'focus';
export const ChangeEventName = 'input';
export const SubmitEventName = 'submit';
export const BlurEventName = 'blur';
export const LongPressEventName = 'longPress';
export const PanEventName = 'pan';
export const SwipeEventName = 'swipe';
export const PinchEventName = 'pinch';
export const ScrollEventName = 'scroll';
export const OnScrollTopEventName = 'onScrollTop';
export const OnScrollBottomEventName = 'onScrollBottom';
//页面创建
export const PageOnCreate = '__onCreate__';
//页面显示
export const PageOnAppear = '__onAppear__';
//页面隐藏
export const PageOnDisappear = '__onDisappear__';
//页面销毁
export const PageOnDestroy = '__onDestroy__';
// 页面返回事件
export const PageOnBack = '__onBack__';
export enum EventState {
    normal = 0,
    began = 1,
    changed = 2,
    ended = 3,
    cancelled = 4
}
export enum ScrollEventState {
    normal = 0,
    beganDrag = 1,
    scroll = 2,
    stop = 3,
    endDrag = 4
}
export interface TouchEvent {
    type: string;
    state: EventState;
    timestamp: number;
    position: {
        x: number;
        y: number;
    };
}
export interface ScrollEvent {
    type: string;
    state: ScrollEventState;
    timestamp: number;
    offsetX: number;
    offsetY: number;
    dx: number;
    dy: number;
}
// hummer InputEvent
export interface ChangeEvent {
    type: string;
    state: number;
    text: string;
    timestamp: number;
}
export type TapEvent = TouchEvent;
