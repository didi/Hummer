import { AttributesType, MutationType, HMNode } from '../../Node';
import { HMContext } from '../../../Context/HMContext';
import commonStyleModifier from '../../../AttributeModifiers/CommonStyleModifier';
import { ComponentBuilderContext, componentFactoryBuilder } from '../ComponentBuilder';
import { shouldBindEvent } from '../EventHandler';

import {
  OnScrollBottomEventName,
  OnScrollTopEventName,
  ScrollEvent,
  ScrollEventName,
  ScrollEventState,
} from '../../Event';
import { IHummerListStyle } from '../../../Interface/IHummerStyle';
import { getVP, getVPNoPercent, HMAny, timestamp } from '../../../Utils/Utils';
import { getEdgeEffect, getListDirection, getScrollBarState } from '../../../AttributeModifiers/Utils';
import { PullToRefresh } from '../PullToRefresh/PullToRefresh';
import { PullToRefreshConfigurator } from '../PullToRefresh/PullToRefreshConfigurator'
import { isUndefined } from '../../../Utils/is';

class BasicDataSource implements IDataSource {
  private listeners: DataChangeListener[] = [];
  private originDataArray: string[] = [];

  public totalCount(): number {
    return 0;
  }

  public getData(index: number): string {
    return this.originDataArray[index];
  }

  registerDataChangeListener(listener: DataChangeListener): void {
    if (this.listeners.indexOf(listener) < 0) {
      console.info('add listener');
      this.listeners.push(listener);
    }
  }

  unregisterDataChangeListener(listener: DataChangeListener): void {
    const pos = this.listeners.indexOf(listener);
    if (pos >= 0) {
      console.info('remove listener');
      this.listeners.splice(pos, 1);
    }
  }

  notifyDataReload(): void {
    this.listeners.forEach(listener => {
      listener.onDataReloaded();
    })
  }

  notifyDataAdd(index: number): void {
    this.listeners.forEach(listener => {
      listener.onDataAdd(index);
    })
  }

  notifyDataChange(index: number): void {
    this.listeners.forEach(listener => {
      listener.onDataChange(index);
    })
  }

  notifyDataDelete(index: number): void {
    this.listeners.forEach(listener => {
      listener.onDataDelete(index);
    })
  }
}

class ListDataSource extends BasicDataSource {
  private dataArray: HMAny[] = [];

  public totalCount(): number {
    return this.dataArray.length;
  }

  public getData(index: number): string {
    return this.dataArray[index];
  }

  public addData(index: number, data: string): void {
    this.dataArray.splice(index, 0, data);
    this.notifyDataAdd(index);
  }

  public pushData(data: string): void {
    this.dataArray.push(data);
    this.notifyDataAdd(this.dataArray.length - 1);
  }

  public deleteData(index: number): void {
    this.dataArray.splice(index, 1);
    this.notifyDataDelete(index);
  }

  public changeData(index: number): void {
    this.notifyDataChange(index);
  }

  public reloadData(): void {
    this.notifyDataReload();
  }

  public modifyAllData(count: number): void {
    this.dataArray = (new Array(count)).map((item: HMAny, index: number): HMAny => {
      return index + new Date().getUTCMilliseconds();
    })
  }
}

@Component
export default struct HMList {
  builderContext!: ComponentBuilderContext
  private hmContext!: HMContext;
  private node!: HMNode;
  @State private style: IHummerListStyle | undefined = undefined;
  @State private attributes: AttributesType | undefined = undefined;

  private listMode: string = 'list'
  // 滚动控制器
  private scroller: Scroller = new Scroller()
  private scrollState: ScrollState = ScrollState.Idle;
  private scrollDirection : ScrollDirection = ScrollDirection.Vertical
  private recentDimOffsetDelta: number = 0;
  // item & data
  private listItemTypeList: number[] = [];
  private listItemNodeList: HMAny[] = [];
  private listDataSource: ListDataSource = new ListDataSource();
  @State  data: string[] = ['1', '2'];


  // refresh info
  private refreshNode?: HMAny = undefined;
  private refreshCallback?: (state: number) => void | null;
  private loadMoreNode?: HMAny = undefined;
  private loadMoreCallback?: (state: number) => void | null;
  private pullToRefreshConfigurator?: PullToRefreshConfigurator = new PullToRefreshConfigurator();

  aboutToAppear(): void {
    this.hmContext = this.builderContext.hmContext;
    this.node = this.builderContext.node;
    this.style = this.node.style as IHummerListStyle;
    this.attributes = this.node.attributes;

    this.listMode = this.style?.mode || 'list'

    this.handleAttr(this.attributes)

    // 监听style 和 attributes
    this.node.registerUpdateFunc(MutationType.Style, (style: IHummerListStyle) => {
      this.style = style;
    }).registerUpdateFunc(MutationType.Attribute, (attributes: AttributesType) => {
      this.attributes = attributes
      this.handleAttr(this.attributes)
    })

    // 刷新列表方法 内部触发onRegister onCreate回调
    this.node.registerNativeFunc("refresh", (count:number) => {
      for (let position = 0; position < count; position++) {
        let type = this.attributes?.onRegister(position) as number;
        this.listItemTypeList.push(type)
        this.listItemNodeList.push(this.attributes?.onCreate(type) )
      }
      this.listDataSource.modifyAllData(count)
      this.listDataSource.reloadData()
    })

    //
    this.node.registerNativeFunc("scrollTo", (x:number|string , y : number|string)=>{
      this.scroller.scrollBy(getVP(x), getVP(y));

    }).registerNativeFunc("scrollBy", (dx: number|string, dy :number|string)=>{
      this.scroller.scrollBy(getVP(dx), getVP(dy));

    }).registerNativeFunc("scrollToTop", ()=>{
      this.scroller.scrollTo({
        xOffset:0,
        yOffset:0,
      });
    }).registerNativeFunc("scrollToBottom", ()=>{
      const h = this.scroller.getItemRect(0).height;
      this.scroller.scrollTo({
        xOffset:0,
        yOffset:h,
      });
    })
  }
  // hdc
  aboutToDisappear(): void {
    this.node.unregisterAllUpdateFuncs();
  }

  handleAttr(attrs: AttributesType) {
    this.refreshCallback = attrs?.onRefresh
    this.refreshNode = attrs?.refreshView
    this.loadMoreCallback = attrs?.onLoadMore
    this.loadMoreNode = attrs?.loadMoreView
    if(!this.refreshNode) {
      this.pullToRefreshConfigurator?.setHasRefresh(false)
    }
    if(!this.loadMoreNode) {
      this.pullToRefreshConfigurator?.setHasLoadMore(false)
    }
    // TODO: 计算传入的view 高度 并设置
    // this.pullToRefreshConfigurator?.setMaxTranslate(130)
  }

  isVertical(): boolean {
    const res = this.style?.scrollDirection !== 'horizontal';
    return res
  }

  onScrollFrameBegin(offset: number, scrollState: ScrollState): number {
    const currentScrollState = this.scrollState;
    this.recentDimOffsetDelta = offset;
    if (currentScrollState != scrollState) {
      if (currentScrollState === ScrollState.Scroll) {
        this.handleDragEnd();
      } else if (currentScrollState === ScrollState.Fling) {
        this.onMomentumEnd();
      }

      if (scrollState === ScrollState.Scroll) {
        this.onDragBegin();
      } else if (scrollState === ScrollState.Fling) {
        this.onMomentumBegin();
      }
    }
    this.scrollState = scrollState
    return offset
  }

  createScrollEvent(state: ScrollEventState) : ScrollEvent {
    const currentOffset = this.scroller.currentOffset();
    const delta = this.recentDimOffsetDelta;
    const event:ScrollEvent = {
      type : ScrollEventName,
      state : state,
      timestamp : timestamp(),
      offsetX	: currentOffset.xOffset,
      offsetY	: currentOffset.yOffset,
      dx : this.isVertical() ? 0 : delta,
      dy : this.isVertical() ? delta : 0
    }
    return event;
  }
  // state = 1，开始滚动
  // 手指拖动，
  // 通过 API 触发不调用：scrollTo
  // 边界反弹不调用
  onDragBegin(){
    this.recentDimOffsetDelta = 0;
    this.node.dispatchEvent(ScrollEventName, this.createScrollEvent(ScrollEventState.beganDrag));
  }
  // state = 4，滚动过程中，手指抬起
  // 手指拖动，
  // 通过 API 触发不调用：scrollTo
  handleDragEnd(){
    this.node.dispatchEvent(ScrollEventName, this.createScrollEvent(ScrollEventState.endDrag));
  }

  // 1、滚动组件触发滚动时触发，支持键鼠操作等其他触发滚动的输入设置。
  // 2、通过滚动控制器API接口调用。
  // 3、越界回弹。
  onScroll(xOffset: number, yOffset: number){
    this.node.dispatchEvent(ScrollEventName, this.createScrollEvent(ScrollEventState.scroll));
  }


  // 触发条件
  // 1. 滚动组件触发滚动后停止，支持键鼠操作等其他触发滚动的输入设置。
  // 2、通过滚动控制器API接口调用后开始，带过渡动效。
  onScrollEnd(){
    if (this.scrollState === ScrollState.Fling) {
      this.onMomentumEnd();
    } else if (this.scrollState === ScrollState.Scroll) {
      this.handleDragEnd();
    }
    this.scrollState = ScrollState.Idle;
  }
  // 滚动动画结束时调用此函数。
  onMomentumEnd(){
    this.node.dispatchEvent(ScrollEventName, this.createScrollEvent(ScrollEventState.stop));
  }

  // 滚动动画开始时调用此函数。
  onMomentumBegin(){

  }

  onScrollToEdge(side: Edge){
    this.node.dispatchEvent(side == Edge.Top ? OnScrollTopEventName : OnScrollBottomEventName, undefined);
  }

  bounces():EdgeEffect{
    if(!isUndefined(this.attributes?.bounces) ){
      const bounces = this.attributes?.bounces ? EdgeEffect.Spring : EdgeEffect.None
      return bounces;
    }
    return EdgeEffect.Spring
  }

  showScrollBar():BarState{
    if(!isUndefined(this.attributes?.showScrollBar) ){
      const showScrollBar = this.attributes?.showScrollBar ? BarState.Auto : BarState.Off
      return showScrollBar;
    }
    return BarState.Auto
  }

  columnsTemplate(column: number): string {
    let template = ''
    for (let index = 0; index < column; index++) {
      template += '1fr '
    }
    return template
  }

  build() {
    Column() {
      if (this.isVertical()) {
        PullToRefresh({
          // 必传项，列表组件所绑定的数据
          // data: this.data,
          // 必传项，需绑定传入主体布局内的列表或宫格组件
          scroller: this.scroller,
          // 必传项，自定义主体布局，内部有列表或宫格组件
          customList: () => {
            // 一个用@Builder修饰过的UI方法
            if (this.listMode === 'list') {
              this.listBuilder()
            } else if (this.listMode === 'waterfall') {
              this.waterFallBuilder()
            } else {
              this.gridBuilder()
            }
          },
          // 可选项，组件属性配置，具有默认值
          refreshConfigurator: this.pullToRefreshConfigurator,
          // 可选项，下拉刷新回调, resolve 才会停止刷新状态
          onRefresh: () => {
            return new Promise<string>((resolve, reject) => {
              // 停止刷新状态
              this.node.registerNativeFunc("stopPullRefresh", () => {
                resolve('')
              })
            });
          },
          refreshStateChange: (state: number) => {
            this.refreshCallback && this.refreshCallback(state)
          },
          loadMoreStateChange: (state: number) => {
            this.loadMoreCallback && this.loadMoreCallback(state)
          },
          // 可选项，上拉加载更多回调 resolve 才会停止加载状态
          onLoadMore: () => {
            return new Promise<string>((resolve, reject) => {
              // TODO: stopLoadMore true false 问题
              this.node.registerNativeFunc("stopLoadMore", () => {
                resolve('')
              })
            });
          },
          // 可选项，自定义下拉刷新动画布局
          customRefresh: () => {
            this.RefreshComponent();
          },
          customLoad: () => {
            this.LoadMoreComponent()
          }
        })
      } else {
        if (this.listMode === 'list') {
          this.listBuilder()
        } else {
          Text('警告：仅List模式支持横向滚动布局')
        }
      }
    }
  }

  @Builder
  LoadMoreComponent() {
    if (this.loadMoreNode) {
      componentFactoryBuilder({
        hmContext : this.hmContext,
        tag: this.loadMoreNode.name,
        node: this.loadMoreNode,
        customComponentBuilder: this.builderContext.customComponentBuilder
      })
    }
  }

  @Builder
  RefreshComponent() {
    if (this.refreshNode) {
      componentFactoryBuilder({
        hmContext : this.hmContext,
        tag: this.refreshNode.name,
        node: this.refreshNode,
        customComponentBuilder: this.builderContext.customComponentBuilder
      })
    }
  }

  @Builder
  listBuilder() {
    List({
      space:getVP(this.style?.lineSpacing || 0),
      scroller: this.scroller
    }) {

      LazyForEach(this.listDataSource, (item: HMAny, index: number) => {
        ListItem() {
          componentFactoryBuilder({
            hmContext : this.hmContext,
            tag : this.listItemNodeList[index].name,
            node : this.listItemNodeList[index],
            customComponentBuilder : this.builderContext.customComponentBuilder
          })
        }
        .onAppear(() => {
          // 节点渲染时 触发onUpdate回调
          this.attributes?.onUpdate(index, this.listItemNodeList[index])
        })
      })
    }.attributeModifier(commonStyleModifier.setNode(this.node))
    .listDirection(getListDirection(this.style?.scrollDirection)) // 排列方向
    .scrollBar(getScrollBarState(this.attributes?.showScrollBar))
    .edgeEffect(getEdgeEffect(this.attributes?.bounces)) // 边缘效果
    .cachedCount(3)
    .contentStartOffset(getVPNoPercent(this.style?.topSpacing , 0))
    .contentEndOffset(getVPNoPercent(this.style?.topSpacing , 0))
    // TODO: leftSpacing rightSpacing 对齐
    .onScroll(shouldBindEvent(this.node, ScrollEventName, (xOffset: number, yOffset: number): void => this.onScroll(xOffset, yOffset)))
  }

  @Builder
  gridBuilder() {
    Grid(this.scroller, {
      regularSize: [1, 1]
    }) {
      LazyForEach(this.listDataSource, (item: HMAny, index: number) => {
        GridItem() {
          componentFactoryBuilder({
            hmContext : this.hmContext,
            tag : this.listItemNodeList[index].name,
            node : this.listItemNodeList[index],
            customComponentBuilder : this.builderContext.customComponentBuilder
          })
        }.onAppear(() => {
          // 节点渲染时 触发onUpdate回调
          this.attributes?.onUpdate(index, this.listItemNodeList[index])
        })
      })
    }.attributeModifier(commonStyleModifier.setNode(this.node))
    .columnsGap(getVP(this.style?.itemSpacing || 0))
    .rowsGap(getVP(this.style?.lineSpacing || 0))
    .scrollBar(getScrollBarState(this.attributes?.showScrollBar))
    .edgeEffect(getEdgeEffect(false)) // 边缘效果
    .columnsTemplate(this.columnsTemplate(this.style?.column || 2))
    .cachedCount(3)
    .onScroll(shouldBindEvent(this.node, ScrollEventName, (xOffset: number, yOffset: number): void => this.onScroll(xOffset, yOffset)))
 }


  @Builder
  waterFallBuilder() {
    WaterFlow({
      scroller: this.scroller
    }) {
      LazyForEach(this.listDataSource, (item: HMAny, index: number) => {
        FlowItem() {
          componentFactoryBuilder({
            hmContext : this.hmContext,
            tag : this.listItemNodeList[index].name,
            node : this.listItemNodeList[index],
            customComponentBuilder : this.builderContext.customComponentBuilder
          })
        }.onAppear(() => {
          // 节点渲染时 触发onUpdate回调
          this.attributes?.onUpdate(index, this.listItemNodeList[index])
        })
      })
    }.attributeModifier(commonStyleModifier.setNode(this.node))
    .columnsGap(getVP(this.style?.itemSpacing || 0))
    .rowsGap(getVP(this.style?.lineSpacing || 0))
    .scrollBar(getScrollBarState(this.attributes?.showScrollBar))
    .edgeEffect(getEdgeEffect(this.attributes?.bounces)) // 边缘效果
    .columnsTemplate(this.columnsTemplate(this.style?.column || 2))
    .cachedCount(3)
    .onScroll(shouldBindEvent(this.node, ScrollEventName, (xOffset: number, yOffset: number): void => this.onScroll(xOffset, yOffset)))
  }
}