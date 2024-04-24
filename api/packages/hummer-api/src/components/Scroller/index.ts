import { LifeCycleElement } from "../../LifeCycleElement"
import { View } from "../View"
import { HMEvent } from "../../HummerElement"


enum ScrollEventState {
    normal = 0, // normal
    beganDrag,
    scroll,
    stop,
    endDrag,
}

interface ScrollEvent extends HMEvent<ScrollEventState> {
    offsetX: number
    offsetY: number
    dx: number
    dy: number
}


export class Scroller extends LifeCycleElement {

    private _onScrollTop?: Function = undefined;
    private _onScrollBottom?: Function = undefined;
    private _onRefresh?: Function = undefined;
    private _onLoadMore?: Function = undefined;


    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("Scroller", name, { ...props, viewId: id });

        this.addEventListener("onRefresh", (event: ScrollEvent) => {
            this.onDispatch("onRefresh", event);
        })
        this.addEventListener("onLoadMore", (event: ScrollEvent) => {
            this.onDispatch("onLoadMore", event);
        })
        this.addEventListener("onScrollTop", () => {
            this.onDispatch("onScrollTop");
        })
        this.addEventListener("onScrollBottom", () => {
            this.onDispatch("onScrollBottom");
        })

    }


    /**
     * 分发资源加载结果回调
     * 
     */
    protected onDispatch(type: string, event?: ScrollEvent) {
        switch (type) {
            case "onRefresh":
                if (this._onRefresh) {
                    this._onRefresh(event?.state);
                }
                break
            case "onLoadMore":
                if (this._onLoadMore) {
                    this._onLoadMore(event?.state);
                }
                break
            case "onScrollTop":
                if (this._onScrollTop) {
                    this._onScrollTop();
                }
                break
            case "onScrollBottom":
                if (this._onScrollBottom) {
                    this._onScrollBottom();
                }
                break
            default:
                break
        }

    }


    /**
    * 下拉刷新时展示的视图
    */
    get refreshView(): View | undefined {
        let view = this._getAttribute("refreshView");
        if (view) {
            return view.__element__
        }
        return undefined;
    }

    set refreshView(value: View) {
        this._setAttribute("refreshView", value.getThis());
    }

    /**
    * 上拉加载更多时展示的视图
    */
    get loadMoreView(): View | undefined {
        let view = this._getAttribute("loadMoreView");
        if (view) {
            return view.__element__
        }
        return undefined;
    }

    set loadMoreView(value: View) {
        this._setAttribute("loadMoreView", value.getThis());
    }


    /**
     * 上拉加载时触发的回调
     */
    get onLoadMore() {
        return this._getAttribute("onLoadMore")
    }

    set onLoadMore(value: (state: number) => void) {
        this._onLoadMore = value
        this._setAttribute("onLoadMore", value);
    }


    /**
     * 下拉刷新时触发的回调
     */
    get onRefresh() {
        return this._getAttribute("onRefresh")
    }

    set onRefresh(value: (state: number) => void) {
        this._onRefresh = value
        this._setAttribute("onRefresh", value);
    }




    /**
     * 滑动到边缘时是否有回弹效果
     */
    get bounces() {
        return this._getAttribute("bounces")
    }

    set bounces(value: boolean) {
        this._setAttribute("bounces", value);
    }

    /**
     * 滑动时是否显示滚动条
     */
    get showScrollBar() {
        return this._getAttribute("showScrollBar")
    }

    set showScrollBar(value: boolean) {
        this._setAttribute("showScrollBar", value);
    }


    /**
     * 滚动到指定坐标（单位：dp/pt/hm/px）
     */
    scrollTo(x: number | string, y: number | string) {
        this.call("scrollTo", x, y);
    }

    /**
    * 滚动到指定坐标（单位：dp/pt/hm/px）
    */
    scrollBy(dx: number | string, dy: number | string) {
        this.call("scrollBy", dx, dy);
    }


    /**
    * 滚动到顶部
    */
    scrollToTop() {
        this.call("scrollToTop");
    }


    /**
    * 滚动到底部
    */
    scrollToBottom() {
        this.call("scrollToBottom");
    }



    /**
    * 滚动到顶部事件监听
    */
    setOnScrollToTopListener(callback: () => void) {
        this._onScrollTop = callback
    }

    /**
     * 滚动到底部事件监听
     */
    setOnScrollToBottomListener(callback: () => void) {
        this._onScrollBottom = callback
    }



    /**
    * 结束下拉刷新
    */
    stopPullRefresh() {
        this.call("stopPullRefresh");
    }


    /**
     * 结束上拉加载更多
     * 
     * @param enable 下次能否继续触发加载更多
     */
    stopLoadMore(enable: boolean) {
        this.call("stopLoadMore", enable);
    }


    /**
     * 
     * @param eventName 
     * @param eventListener   滚动事件:scroll @see ScrollEvent
     * @param useCapture 
     */
    public override addEventListener(eventName: string, eventListener: (event: ScrollEvent) => void | Function | EventListener, useCapture?: boolean | undefined): void {
        super.addEventListener(eventName, eventListener, useCapture);
    }

}