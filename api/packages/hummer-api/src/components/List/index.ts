import { HummerElement } from "../../HummerElement"
import { View } from '../View'

export class List extends HummerElement {


    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("List", name, { ...props, viewId: id });
    }


    /**
     * 注册 cell 复用标识的回调
     */
    get onRegister() {
        return this._getAttribute("onRegister")
    }

    set onRegister(value: (position: number) => number) {
        this._setAttribute("onRegister", value);
        this.addEventListener("onRegister", value)
    }

    /**
     * 创建 cell 的回调
     */
    get onCreate() {
        return this._getAttribute("onCreate")
    }

    set onCreate(value: (type: number) => View) {
        this._setAttribute("onCreate", value);
        this.addEventListener("onCreate", value)
    }

    /**
     * 更新 cell 的回调
     */
    get onUpdate() {
        return this._getAttribute("onUpdate")
    }

    set onUpdate(value: (position: number, cell: View) => void) {
        this._setAttribute("onUpdate", value);
        this.addEventListener("onUpdate", value)
    }


    /**
    * 下拉刷新时展示的视图
    */
    get refreshView() {
        return this._getAttribute("refreshView")
    }

    set refreshView(value: View) {
        this._setAttribute("refreshView", value);
    }

    /**
    * 上拉加载更多时展示的视图
    */
    get loadMoreView() {
        return this._getAttribute("loadMoreView")
    }

    set loadMoreView(value: View) {
        this._setAttribute("loadMoreView", value);
    }


    /**
    * 下拉刷新时触发的回调
    */
    get onRefresh() {
        return this._getAttribute("onRefresh")
    }

    set onRefresh(value: (state: number) => void) {
        this._setAttribute("onRefresh", value);
        this.addEventListener("onRefresh", value)
    }

    /**
    * 上拉加载时触发的回调
    */
    get onLoadMore() {
        return this._getAttribute("onLoadMore")
    }

    set onLoadMore(value: (state: number) => void) {
        this._setAttribute("onLoadMore", value);
        this.addEventListener("onLoadMore", value)
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





}