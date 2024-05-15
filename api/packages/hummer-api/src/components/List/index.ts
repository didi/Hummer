import { HummerElement } from "../../HummerElement"
import { View } from '../View'
import { HMEvent, ViewEvent } from "../../HummerElement"
import { FlexStyle } from "../../Element"


// TODO 后续待修改
export interface ListStyle extends FlexStyle {
    mode?: string
    scrollDirection?: string
    column?: number
    lineSpacing?: number | string
    itemSpacing?: number | string
    leftSpacing?: number | string
    rightSpacing?: number | string
    topSpacing?: number | string
    bottomSpacing?: number | string
}

// TODO 后续待修改
export enum ListEventState {
    normal = 0, // normal
    beganDrag,
    scroll,
    stop,
    endDrag,
}


// TODO 后续待修改
export interface ListEvent extends HMEvent<ListEventState> {
    offsetX: number
    offsetY: number
    dx: number
    dy: number
}

export class List extends HummerElement {


    private _onRegister?: Function = undefined;
    private _onCreate?: Function = undefined;
    private _onUpdate?: Function = undefined; // todo 这三个后续需根据实际类型修改

    private _onRefresh?: Function = undefined;
    private _onLoadMore?: Function = undefined;


    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("List", name, { ...props, viewId: id });
        this.addEventListener("onRegister", (event: ListEvent) => {
            this.onDispatch("onRegister", event);
        })
        this.addEventListener("onCreate", (event: ListEvent) => {
            this.onDispatch("onCreate", event);
        })
        this.addEventListener("onUpdate", (event: ListEvent) => {
            this.onDispatch("onUpdate", event);
        })
        this.addEventListener("onRefresh", (event: ListEvent) => {
            this.onDispatch("onRefresh", event);
        })
        this.addEventListener("onLoadMore", (event: ListEvent) => {
            this.onDispatch("onLoadMore", event);
        })



    }


    //扩展样式属性：有代理时通过代理处理
    public set style(value: ListStyle | Record<string, any>) {
        this.setStyle(value, false);
    }


    /**
     * 分发资源加载结果回调
     * 
     */
    protected onDispatch(type: string, event: ListEvent, cell?: View) {
        switch (type) {
            case "onRegister":
                if (this._onRegister) {
                    this._onRegister(event);
                }
                break
            case "onCreate":
                if (this._onCreate) {
                    this._onCreate(event);
                }
                break
            case "onUpdate":
                if (this._onUpdate) {
                    this._onUpdate(event, cell);
                }
                break
            case "onRefresh":
                if (this._onRefresh) {
                    this._onRefresh(event.state);
                }
                break
            case "onLoadMore":
                if (this._onLoadMore) {
                    this._onLoadMore(event.state);
                }
                break
            default:
                break
        }

    }


    /**
     * 注册 cell 复用标识的回调
     */
    get onRegister() {
        return this._getAttribute("onRegister")
    }

    set onRegister(value: (position: number) => number) {
        this._setAttribute("onRegister", value);
        this._onRegister = value
    }

    /**
     * 创建 cell 的回调
     */
    get onCreate() {
        return this._getAttribute("onCreate")
    }

    set onCreate(value: (type: number) => View) {
        let _onCreate = (type: number) => {
            return value(type).getThis()
        }
        this._setAttribute("onCreate", _onCreate);
        this._onCreate = value
    }

    /**
     * 更新 cell 的回调
     */
    get onUpdate() {
        return this._getAttribute("onUpdate")
    }

    set onUpdate(value: (position: number, cell: View) => void) {
        this._setAttribute("onUpdate", value);
        this._onUpdate = value
    }


    /**
    * 下拉刷新时展示的视图
    */
    get refreshView() {
        return this._getAttribute("refreshView")
    }

    set refreshView(value: View) {
        this._setAttribute("refreshView", value.getThis());
    }

    /**
    * 上拉加载更多时展示的视图
    */
    get loadMoreView() {
        return this._getAttribute("loadMoreView")
    }

    set loadMoreView(value: View) {
        this._setAttribute("loadMoreView", value.getThis());
    }


    /**
    * 下拉刷新时触发的回调
    */
    get onRefresh() {
        return this._getAttribute("onRefresh")
    }

    set onRefresh(value: (state: number) => void) {
        this._setAttribute("onRefresh", value);
        this._onRefresh = value
    }

    /**
    * 上拉加载时触发的回调
    */
    get onLoadMore() {
        return this._getAttribute("onLoadMore")
    }

    set onLoadMore(value: (state: number) => void) {
        this._setAttribute("onLoadMore", value);
        this._onLoadMore = value
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
    * 滑动到边缘时是否有回弹效果
    */
    get bounces() {
        return this._getAttribute("bounces")
    }

    set bounces(value: boolean) {
        this._setAttribute("bounces", value);
    }


    /**
     * 刷新列表
     * @param count 列数 cell 数量
     */
    refresh(count: number) {
        this.call("refresh", count);
    }


    /**
    * 滚动到指定位置
    * @param position 要滚动到的位置
    */
    scrollToPosition(position: number) {
        this.call("scrollToPosition", position);
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
     * 添加事件监听
     * 
     * @param eventName 
     * @param eventListener   新增事件:input @see ListEvent
     * @param useCapture 
     */
    public override addEventListener(eventName: string, eventListener: (event: ListEvent | ViewEvent | any) => void | Function | EventListener, useCapture?: boolean | undefined): void {
        super.addEventListener(eventName, eventListener, useCapture);
    }



}