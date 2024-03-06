import { Hummer } from "../../Hummer"
import { PageOptions } from "./PageOptions"
import { RootScrollView } from "./RootScrollView"
import { RootView } from "./RootView"


export class Page {
    private _rootView: RootScrollView | RootView;

    constructor(options: PageOptions) {
        var canScroll = options.canScroll;
        if (canScroll) {
            this._rootView = new RootScrollView(options)
        } else {
            this._rootView = new RootView(options)
        }
    }

    public render() {
        Hummer.render(this._rootView)
    }

    set onLoad(load: Function) {
        this._rootView._onCreate = load
    }

    set onReady(ready: Function) {
        this._rootView._onReady = ready
    }

    set onShow(show: Function) {
        this._rootView._onAppear = show
    }

    set onHide(hide: Function) {
        this._rootView._onDisappear = hide
    }

    set onUnload(destroy: Function) {
        this._rootView._onDestroy = destroy
    }

    set onBack(back: Function) {
        this._rootView._onBack = back
    }
}