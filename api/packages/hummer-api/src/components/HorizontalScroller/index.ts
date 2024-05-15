import { LifeCycleElement } from "../../LifeCycleElement"
import { ViewEvent } from "../../HummerElement"
import { ScrollEvent } from "../../components/Scroller"

// state: 0 // normal（初始禁止状态）
// state: 1 // began（开始滚动）
// state: 2 // scroll（滚动中）
// state: 3 // ended（停止滚动）
// state: 4 // scroll_up（滚动过程中，手指抬起）

// export enum ScrollEventState {
//     normal = 0,
//     beganDrag,
//     scroll,
//     stop,
//     endDrag,
// }

// export interface ScrollEvent extends HMEvent<ScrollEventState> {
//     /**
//      * x方向实际滚动偏移量（单位：dp或pt）	
//      */
//     offsetX: number
//     /**
//      * y方向实际滚动偏移量（单位：dp或pt）	
//      */
//     offsetY: number
//     /**
//      * x方向滚动与上一个事件的差值（单位：dp或pt）	
//      */
//     dx: number
//     /**
//      * y方向滚动与上一个事件的差值（单位：dp或pt）	
//      */
//     dy: number
// }


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

    updateContentSize() {

    }

    /**
     * 添加事件监听
     * 
     * @param eventName 
     * @param eventListener   滚动事件:scroll @see ScrollEvent
     * @param useCapture 
     */
    public override addEventListener(eventName: string, eventListener: (event: ScrollEvent | ViewEvent | any) => void | Function | EventListener, useCapture?: boolean | undefined): void {
        super.addEventListener(eventName, eventListener, useCapture);
    }

}