import { PageOptions } from "./PageOptions";
export declare class Page {
    private _rootView;
    constructor(options: PageOptions);
    render(): void;
    set onLoad(load: Function);
    set onReady(ready: Function);
    set onShow(show: Function);
    set onHide(hide: Function);
    set onUnload(destroy: Function);
    set onBack(back: Function);
}
