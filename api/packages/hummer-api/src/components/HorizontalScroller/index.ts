import { LifeCycleElement } from "../../LifeCycleElement"
import { HMEvent } from "../../HummerElement"


enum ScrollEventState {
    normal = 0,
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


export class HorizontalScroller extends LifeCycleElement {

    private _onScrollTop?: Function = undefined;
    private _onScrollBottom?: Function = undefined;

    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("HorizontalScroller", name, { ...props, viewId: id });

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

    updateContentSize(){
        
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