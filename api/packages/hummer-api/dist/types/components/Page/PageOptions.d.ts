export interface PageOptions {
    onLoad?: Function;
    onReady?: Function;
    onShow?: Function;
    onHide?: Function;
    onUnload?: Function;
    onBack?: Function;
    canScroll?: Boolean;
    pageStyle?: Record<string, string>;
}
