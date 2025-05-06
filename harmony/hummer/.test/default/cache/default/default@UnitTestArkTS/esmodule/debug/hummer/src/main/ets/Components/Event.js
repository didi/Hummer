export const TapEventName = 'tap';
export const TouchEventName = 'touch';
export const LongPressEventName = 'longPress';
export const PanEventName = 'pan';
export const SwipeEventName = 'swipe';
export const PinchEventName = 'pinch';
export const ScrollEventName = 'scroll';
export const OnScrollTopEventName = 'onScrollTop';
export const OnScrollBottomEventName = 'onScrollBottom';
export var EventState;
(function (EventState) {
    EventState[EventState["normal"] = 0] = "normal";
    EventState[EventState["began"] = 1] = "began";
    EventState[EventState["changed"] = 2] = "changed";
    EventState[EventState["ended"] = 3] = "ended";
    EventState[EventState["cancelled"] = 4] = "cancelled";
})(EventState || (EventState = {}));
export var ScrollEventState;
(function (ScrollEventState) {
    ScrollEventState[ScrollEventState["normal"] = 0] = "normal";
    ScrollEventState[ScrollEventState["beganDrag"] = 1] = "beganDrag";
    ScrollEventState[ScrollEventState["scroll"] = 2] = "scroll";
    ScrollEventState[ScrollEventState["stop"] = 3] = "stop";
    ScrollEventState[ScrollEventState["endDrag"] = 4] = "endDrag";
})(ScrollEventState || (ScrollEventState = {}));
//# sourceMappingURL=Event.js.map