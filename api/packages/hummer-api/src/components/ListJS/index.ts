import { Scroller, ScrollEvent } from '../Scroller';
import { View } from '../View'
import { Hummer } from '../../Hummer'
import { HummerElement, ViewEvent } from "../../HummerElement"

export class ListJS extends HummerElement {
    private _onRegister: Function = () => { };
    private _onCreate: Function = () => { };
    private _onUpdate: Function = () => { };
    private _onRefreshList: (state: number) => void = (state: number) => {};
    private _eventListener: (event: ScrollEvent | ViewEvent | any) => void | Function | EventListener = () => {};
    private _onLoadMoreList: Function | null = null;
    private _refreshView: View = new View();
    private _loadMoreView: View = new View();
    private visibleItems = new Map<number, any>(); // 渲染中的组件数组
    private visibleItemHeight = new Map<number, number>(); // 渲染中的组件高度数组
    private scrollY: number = 0; // 滚动距离
    private startIndex: number = 0; // 开始下标
    private maxIndexByAvailableHeight: number = 0; // 首屏幕最大item的下标
    private lastStartIndex: number = 0; // 上次开始下标
    private initListItemNumber: number = 0; // 初始化的list长度
    private deletedIndices: Array<number> = []; // 记录已经从根View中移除的ListItem下标
    private direction: string = 'down'; // 滑动方向
    private viewTop: View; // 占位组件
    private scroller: Scroller; // 滚动组件
    private topViewId: number  = -1 // 在渲染数组中的位置

    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("View", name, { ...props, viewId: id });
        this.scroller = new Scroller()
        // 初始化一个topView用来在组件删除时占位
        this.viewTop = new View()
        this.viewTop.style = {
            height: 0
        }
        this.scroller.appendChild(this.viewTop)
        this.visibleItems.set(this.topViewId, this.viewTop);
        this.appendChild(this.scroller)
        this.scroller.addEventListener('scroll', this.onScroll.bind(this));
    }


    // 滑动事件回调
    private onScroll(event: any) {
        this._eventListener(event)
        this.scrollY = event.offsetY;
        this.direction = event.dy < 0 ? 'up' : 'down';
        this.updateVisibleItems();
    }

    // 到达底部事件回调
    private onScrollBottom = (state: number) => {
        if (this.startIndex >= this.initListItemNumber && this._onLoadMoreList) {
            // console.log("达到底部，loadMore调用中...")
            this._onLoadMoreList(state);
        } 
    }

    // 清空历史状态数据
    private resetListState() {
        // 清空标识
        this.startIndex = this.maxIndexByAvailableHeight =  0
        this.deletedIndices = []
        this.direction = 'down'
    }
    // 清空历史视图数据
    private resetListView() {
        this.scroller.removeAll()
        this.visibleItems.clear()
        // 重置topView
        let newTopView = new View()
        this.viewTop.style = { height: 0 }
        this.scroller.appendChild(newTopView)
        this.visibleItems.set(this.topViewId, newTopView);
    }

    // 到达顶部事件回调
    private onScrollTop = (state: number) => {
        if (!this._onRefreshList) return;
        // 清空历史数据
        if(state === 2){
            this.resetListState()
        }
        // console.error("达到顶部，数据更新中...")
        // 刷新数据
        this._onRefreshList(state)
    }

    private renderItem(index: number, cell: any) {
        this.onUpdate(index, cell);
        this.scroller.appendChild(cell);
    }

    // 处理topView
    private adjustTopView(cell: any, direction: string) {
        if (direction === 'down') {
            this.viewTop.style = { height: this.viewTop.style.height + cell.style.height };
        } else {
            this.viewTop.style = { height: this.viewTop.style.height - cell.style.height };
        }
        let oldViewTop = this.visibleItems.get(this.topViewId)
        this.scroller.replaceChild(this.viewTop, oldViewTop);
        this.visibleItems.set(this.topViewId, this.viewTop)
    }

    // 在deletedIndices中删除指定下标
    private removeDeletedIndex(index: number) {
        const arrIndex = this.deletedIndices.indexOf(index);
        if (arrIndex !== this.topViewId) {
            this.deletedIndices.splice(arrIndex, 1);
        }
    }

    // 处理向下滑动
    private handleDownDeletion(cell: any) {
        // 移动到最下方，执行刷新方法 
        let { maxValue } = this.getMinAndMaxRenderItemIndex()
        let newIndex = maxValue + 1
        this.onUpdate(newIndex + "恢复", cell);
        // 新增renderedItems
        this.visibleItems.set(newIndex, cell)
        // 删除newIndex
        this.removeDeletedIndex(newIndex)
        // 向下添加数据
        this.scroller.appendChild(cell)
    }

    // 处理向上滑动
    private handleUpDeletion(cell: any) {
        // 移动到最上方，执行刷新方法
        if (this.startIndex > 0) {
            let { minValue } = this.getMinAndMaxRenderItemIndex()
            let newIndex = minValue - 1
            if (newIndex < 0) return
            this.onUpdate(newIndex + '恢复', cell);
            // 新增renderedItems
            let oldCell = this.visibleItems.get(newIndex + 1)
            this.visibleItems.set(newIndex, cell)
            // 删除newIndex
            this.removeDeletedIndex(newIndex)
            // 向上添加数据
            this.scroller.insertBefore(cell, oldCell)
        }
    }

    // 删除数据
    private removeCell(index: number, cell: any) {
        this.scroller.removeChild(cell)
        // 删除renderedItems
        this.visibleItems.delete(index)
        this.deletedIndices.push(index);
    }

    // 处理需要删除的item
    private handleDeletion(index: number) {
        if (index === this.topViewId || this.deletedIndices.includes(index)) return
        const cell = this.visibleItems.get(index);
        if (this.direction === 'down') {
            // 处理topView
            this.adjustTopView(cell, 'down')
            this.removeCell(index, cell)
            this.handleDownDeletion(cell)
        } else {
            // 处理topView
            this.adjustTopView(cell, 'up')
            this.removeCell(index, cell)
            this.handleUpDeletion(cell)
        }
    }

    // 获取渲染数组的最小值和最大值（不包含topView）
    private getMinAndMaxRenderItemIndex() {
        let maxValue = Number.MIN_SAFE_INTEGER;
        let minValue = Number.MAX_SAFE_INTEGER;
        for (const key of this.visibleItems.keys()) {
            if (key > maxValue) {
                maxValue = key;
            }
            if (key > -1 && key < minValue) {
                minValue = key;
            }
        }
        return {
            minValue,
            maxValue
        }
    }

    // 计算开始下标
    private calculateVisibleIndices(): boolean {
        if(this.scrollY ===0 && this.startIndex !== 0) return false
        let currHeight = 0
        let currStartIndex = 0
        // 计算开始下标
        for (let i = 0; i <= this.initListItemNumber; i++) {
            let cell = this.visibleItems.get(i)
            if (!cell) {
                let cellInvisibleItemHeight = this.visibleItemHeight.get(i)
                if(cellInvisibleItemHeight){
                    currHeight += cellInvisibleItemHeight
                }
            }else{
                this.visibleItemHeight.set(i, cell.style.height)
                currHeight += cell.style.height;
            }
            if (currHeight >= this.scrollY) {
                currStartIndex = i;
                break;
            } else {
                currStartIndex = i;
            }
        }
        // 处理边界case
        if (currStartIndex === 0) return false
        // 滑动过程中动态给结束下标赋值
        if (this.lastStartIndex === currStartIndex && this.startIndex !== 0) return false
        this.startIndex = currStartIndex
        return true

    }

    // 处理向下滑动
    private handleDown() {
        // 删除上方数据
        if(this.startIndex < this.maxIndexByAvailableHeight) return
        for (let index = 0; index <= this.startIndex - this.maxIndexByAvailableHeight; index++) {
            // 处理需要删除的item
            if(!this.deletedIndices.includes(index)){
                // console.log("删除上方数据" + index)
                this.handleDeletion(index);
            }
        }
    }

    // 处理向上滑动
    private handleUp() {
        let { minValue, maxValue } = this.getMinAndMaxRenderItemIndex()
        if(maxValue <= 3*this.maxIndexByAvailableHeight) return
        // 上方保留一屏数据
        let dec = this.startIndex  - this.maxIndexByAvailableHeight + 1
        // 计算本次向上滑动的范围
        let recoverNum = Math.abs(minValue - dec) 
        for (let index = 0; index <= recoverNum; index++) {
            let itemIndex =  maxValue - index
            if(itemIndex < 0) break
            // 判断边界条件
            if (!this.deletedIndices.includes(itemIndex)) {
                // console.log("删除下方数据" + itemIndex)
                // 处理需要删除的item
                this.handleDeletion(itemIndex);
            }
        }
    }


    // 滑动过程实时渲染组件
    private updateVisibleItems() {
        // 计算开始和结束下标
        let refresh: boolean = this.calculateVisibleIndices()
        if (!refresh) return
        // 滚动过程实时渲染数据
        if (this.direction === 'up') {
            this.handleUp()
        } else {
            this.handleDown()
        }
        // 滚动计算后更新上次上下标
        this.lastStartIndex = this.startIndex;
    }


     // 初始化3屏数据
    private initList(){
        let currHeight = 0
        let currEndIndex = 0
        // 清空上次view
        this.resetListView()
        // 初始化结束下标
        for (let i = 0; i < this.initListItemNumber; i++) {
            const type = this.onRegister(i);
            const cell = this._onCreate(type);
            this.visibleItems.set(i, cell)
            currHeight += cell.style.height;
            if (currHeight > Hummer.env.availableHeight) {
                currEndIndex = i;
                break;
            } else {
                currEndIndex = i;
            }
        }
        this.maxIndexByAvailableHeight = Math.min(this.initListItemNumber, currEndIndex)
        // console.error("初始化下标数据" + this.maxIndexByAvailableHeight)
        // 渲染开始下标到结束下标的初始化视图数据 
        // 3*this.endIndex包括开始下标之前、初始化渲染的数据、下标之后
        for (let i = 0; i <= 3*this.maxIndexByAvailableHeight; i++) {
            let cell = this.visibleItems.get(i)
            if (!cell) {
                let type = this.onRegister(i);
                cell = this._onCreate(type);
                this.visibleItems.set(i, cell)
            }
            this.renderItem(i, cell)
        }
    }

    // 入口函数
    refresh(count: number) {
        this.initListItemNumber = count;
        // console.error("初始化渲染总数", this.initListItemNumber)
        // loadMore加载更多数据
        if (this.startIndex !== 0) {
           this.updateVisibleItems()
        } else {
            // 初始化首屏数据
            this.initList()
        }
    }

    
    stopLoadMore(enable: boolean){
        this.scroller.stopLoadMore(enable)
    }

    stopPullRefresh(){
        this.scroller.stopPullRefresh()
    }

    set onLoadMore(value: (state: number) => void) {
        this._onLoadMoreList = value;
        this.scroller.onLoadMore = this.onScrollBottom
    }

    set onRefresh(value: (state: number) => void) {
        this._onRefreshList = value;
        this.scroller.onRefresh = this.onScrollTop
    }

    get refreshView() {
        return this._refreshView;
    }

    set refreshView(value: View) {
        this._refreshView = value;
        this.scroller.refreshView = this._refreshView;
    }

    get loadMoreView() {
        return this._loadMoreView;
    }

    set loadMoreView(value: View) {
        this._loadMoreView = value;
        this.scroller.loadMoreView = this._loadMoreView;
    }


    get onCreate() {
        return this._onCreate;
    }

    set onCreate(value: Function) {
        this._onCreate = value;
    }

    get onUpdate() {
        return this._onUpdate;
    }

    set onUpdate(value: Function) {
        this._onUpdate = value;
    }

    get onRegister() {
        return this._onRegister;
    }

    set onRegister(value: Function) {
        this._onRegister = value;
    }

    set showScrollBar(value: boolean) {
        this.scroller.showScrollBar = value;
    }

    set bounces(value: boolean) {
        this.scroller.bounces = value;
    }

    /**
     * 添加事件监听
     * 
     * @param eventName 
     * @param eventListener   滚动事件:scroll @see ScrollEvent
     * @param useCapture 
     */
    addEventListener(eventName: string, eventListener: (event: ScrollEvent | ViewEvent | any) => void | Function | EventListener, useCapture?: boolean | undefined): void {
        if(eventName === 'scroll'){
            this._eventListener = eventListener
        }
    }
}