import commonStyleModifier from '../../../AttributeModifiers/CommonStyleModifier';
import { FlexManager } from '../../../AttributeModifiers/Utils';
import {
  OnScrollBottomEventName,
  OnScrollTopEventName,
  ScrollEvent,
  ScrollEventName,
  ScrollEventState,
  TapEventName,
  TouchEventName
} from '../../Event';
import { HMContext } from '../../../Context/HMContext';
import { getVP, timestamp } from '../../../Utils/Utils';
import { HMNode } from '../../Node';
import { ComponentBuilderContext, componentFactoryBuilder } from '../ComponentBuilder';
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from '../EventHandler';
import { PullToRefresh, PullToRefreshConfigurator, fakeStyleModifier } from '../PullToRefresh/ets';
import { ScrollViewPropsWrapper } from './ScrollViewPropsWrapper';
import {
  createLoadMoreEvent,
  createRefreshEvent,
  OnLoadMoreEventName,
  OnRefreshEventName,
  RefreshEventState
} from '../PullToRefresh/Event';
import { isUndefined } from '../../../Utils/is';
import { FlexibleColumn } from '../PullToRefresh/FlexibleColumn';


@Component
export default struct HMScroller {
  builderContext!: ComponentBuilderContext;
  scrollDirection: ScrollDirection = ScrollDirection.Vertical
  private hmContext!: HMContext;
  private node!: HMNode;
  private scroller = new Scroller()
  private scrollState: ScrollState = ScrollState.Idle
  private recentDimOffsetDelta: number = 0
  private stopRefresh:undefined | ((message:string)=>void) = undefined;
  private stopLoadMore:undefined | ((message:string)=>void) = undefined;
  private refreshNodeHeight = -1;
  private loadMoreNodeHeight = -1;
  // refresh & loadMore info
  private pullToRefreshConfigurator: PullToRefreshConfigurator = new PullToRefreshConfigurator();
  @State private props: ScrollViewPropsWrapper | undefined = undefined;
  @State private useYogaLayout: Boolean = false;
  @State private children: HMNode[] = []
  @State data: string[] = [];
  @State pullDownAnimatedHeight: number = 0;

  aboutToAppear(): void {

    this.hmContext = this.builderContext.hmContext;
    this.node = this.builderContext.node;

    this.props = new ScrollViewPropsWrapper(this.node);
    this.children = this.props.child;

    this.props.bindPropsUpdate(() => {
      this.handleRefreshLoadMoreAttr()
    })
    this.props.onChildUpdate((child: HMNode[]) => {
      this.children = child;
    })

    this.handleRefreshLoadMoreAttr()

    this.node.registerNativeFunc("scrollTo", (x: number | string, y: number | string) => {
      this.scroller.scrollBy(getVP(x), getVP(y));

    })
    this.node.registerNativeFunc("scrollBy", (dx: number | string, dy: number | string) => {
        this.scroller.scrollBy(getVP(dx), getVP(dy));

      })
    this.node.registerNativeFunc("scrollToTop", () => {

        this.scroller.scrollTo({
          xOffset: 0,
          yOffset: 0,
        });
      })
    this.node.registerNativeFunc("scrollToBottom", () => {
        const h = this.scroller.getItemRect(0).height;
        this.scroller.scrollTo({
          xOffset: 0,
          yOffset: h,
        });
      })
    // 停止刷新状态
    this.node.registerNativeFunc("stopPullRefresh", () => {
      this.stopRefresh?.('success')
    })
    this.node.registerNativeFunc("stopLoadMore", () => {
      this.stopLoadMore?.('success')
    })
  }

  aboutToDisappear(): void {
    this.props?.dispose();
  }

  handleRefreshLoadMoreAttr() {
    const refreshNode = this.props?.refreshView;
    const loadMoreNode = this.props?.loadMoreView;
    if (!refreshNode) {
      this.pullToRefreshConfigurator?.setHasRefresh(false)
      this.refreshNodeHeight = -1;
    }
    if (!loadMoreNode) {
      this.loadMoreNodeHeight = -1;
      this.pullToRefreshConfigurator?.setHasLoadMore(false)
    }
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

  isVertical(): boolean {
    const res = this.scrollDirection == ScrollDirection.Vertical;
    return res
  }

  createScrollEvent(state: ScrollEventState): ScrollEvent {
    const currentOffset = this.scroller.currentOffset();
    const delta = this.recentDimOffsetDelta;
    const event: ScrollEvent = {
      type: ScrollEventName,
      state: state,
      timestamp: timestamp(),
      offsetX: currentOffset.xOffset,
      offsetY: currentOffset.yOffset,
      dx: this.isVertical() ? 0 : delta,
      dy: this.isVertical() ? delta : 0
    }
    return event;
  }

  // state = 1，开始滚动
  // 手指拖动，
  // 通过 API 触发不调用：scrollTo
  // 边界反弹不调用
  onDragBegin() {
    this.recentDimOffsetDelta = 0;
    this.node.dispatchEvent(ScrollEventName, this.createScrollEvent(ScrollEventState.beganDrag));
  }

  // state = 4，滚动过程中，手指抬起
  // 手指拖动，
  // 通过 API 触发不调用：scrollTo
  handleDragEnd() {
    this.node.dispatchEvent(ScrollEventName, this.createScrollEvent(ScrollEventState.endDrag));
  }

  // 1、滚动组件触发滚动时触发，支持键鼠操作等其他触发滚动的输入设置。
  // 2、通过滚动控制器API接口调用。
  // 3、越界回弹。
  onScroll(xOffset: number, yOffset: number) {
    this.node.dispatchEvent(ScrollEventName, this.createScrollEvent(ScrollEventState.scroll));
  }

  onRefresh(state: RefreshEventState) {
    this.node.dispatchEvent(OnRefreshEventName, createRefreshEvent(state));
  }

  onLoadMore(state: RefreshEventState) {
    this.node.dispatchEvent(OnLoadMoreEventName, createLoadMoreEvent(state));
  }

  // 触发条件
  // 1. 滚动组件触发滚动后停止，支持键鼠操作等其他触发滚动的输入设置。
  // 2、通过滚动控制器API接口调用后开始，带过渡动效。
  onScrollEnd() {

    if (this.scrollState === ScrollState.Fling) {
      this.onMomentumEnd();
    } else if (this.scrollState === ScrollState.Scroll) {
      this.handleDragEnd();
    }
    this.scrollState = ScrollState.Idle;
  }

  // 滚动动画结束时调用此函数。
  onMomentumEnd() {

    this.node.dispatchEvent(ScrollEventName, this.createScrollEvent(ScrollEventState.stop));
  }

  // 滚动动画开始时调用此函数。
  onMomentumBegin() {

  }

  onScrollToEdge(side: Edge) {

    this.node.dispatchEvent(side == Edge.Top ? OnScrollTopEventName : OnScrollBottomEventName, undefined);
  }

  bounces(): EdgeEffect {
    // 垂直滚动 且 有刷新或加载视图，取消边缘弹性效果
    if (this.isVertical() && (this.props?.refreshView || this.props?.loadMoreView)) {
      return EdgeEffect.None
    }
    const bounces = this.props?.bounces ? EdgeEffect.Spring : EdgeEffect.None
    return bounces;
  }

  showScrollBar(): BarState {

    const showScrollBar = this.props?.showScrollBar ? BarState.Auto : BarState.Off
    return showScrollBar;
  }

  private hasPullToRefresh(): boolean {
    return (this.isVertical() && (!isUndefined(this.props?.refreshView) || !isUndefined(this.props?.loadMoreView)));
  }

  private setMaxTranslate(){
    this.pullToRefreshConfigurator?.setMaxTranslate(Math.max(this.loadMoreNodeHeight, this.refreshNodeHeight)/0.75);
  }
  build() {
    if (this.hasPullToRefresh()) {
      Column() {
        PullToRefresh({
          mWidth: undefined,
          mHeight: undefined,
          // 必传项，需绑定传入主体布局内的列表或宫格组件
          scroller: this.scroller,
          // 必传项，自定义主体布局，内部有列表或宫格组件
          customList: () => {
            // 一个用@Builder修饰过的UI方法
            this.buildScroller()
          },
          // 可选项，组件属性配置，具有默认值
          refreshConfigurator: this.pullToRefreshConfigurator,
          // 可选项，下拉刷新回调, resolve 才会停止刷新状态
          onRefresh: () => {
            return new Promise<string>((resolve, reject) => {
              this.stopRefresh = resolve;
            });
          },
          refreshStateChange: (state: RefreshEventState) => {
            this.onRefresh(state);
          },
          loadMoreStateChange: (state: RefreshEventState) => {
            this.onLoadMore(state);
          },

          onAnimPullDown: (value, width, height) => {
            if (isUndefined(height)) {
              return
            }
            this.pullDownAnimatedHeight = height;
          },
          onAnimRefreshing: (value, width, height) => {
            if (isUndefined(height)) {
              return
            }
            this.pullDownAnimatedHeight = height;
          },
          onLoadMore: () => {
            return new Promise<string>((resolve, reject) => {
              // TODO: stopLoadMore true false 问题
              this.stopLoadMore = resolve
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
      }
      .attributeModifier(commonStyleModifier.setNode(this.node, this.props?.style))
    } else {
      this.buildScroller()
    }
  }
  @Builder
  loadMoreComponentChild() {
    componentFactoryBuilder({
      hmContext: this.hmContext,
      tag: this.props!.loadMoreView!.name,
      node: this.props!.loadMoreView!,
      customComponentBuilder: this.builderContext.customComponentBuilder
    })
  }

  @Builder
  LoadMoreComponent() {
    if (this.props?.loadMoreView) {
      FlexibleColumn({
        childBuilder: this.loadMoreComponentChild.bind(this),
        didUpdateLayout: (width, height) => {
          this.loadMoreNodeHeight = height;
          this.setMaxTranslate();
        }
      }).height(1000)
    }
  }

  @Builder
  refreshComponentChild() {
    componentFactoryBuilder({
      hmContext: this.hmContext,
      tag: this.props!.refreshView!.name,
      node: this.props!.refreshView!,
      customComponentBuilder: this.builderContext.customComponentBuilder
    })
  }

  @Builder
  RefreshComponent() {
    if (this.props?.refreshView) {
      FlexibleColumn({
        childBuilder: this.refreshComponentChild.bind(this),
        didUpdateLayout: (width, height) => {
          this.refreshNodeHeight = height;
          this.setMaxTranslate();
        }
      }).height(1000)
        .translate({ x: 0, y: this.pullDownOffsetYAnimation() })
    }
  }

  pullDownOffsetYAnimation(): number {
    const value = this.pullDownAnimatedHeight - this.pullToRefreshConfigurator!.getMaxTranslate()! * 0.75
    return value
  }

  @Builder
  buildScroller() {
    //scroller 的高度没办法超出父容器
    Scroll(this.scroller) {
      if (this.hmContext.flexOptimize && FlexManager.canConvertToRow(this.props?.style)) {
        this.buildRow();
      } else if (this.hmContext.flexOptimize && FlexManager.canConvertToColumn(this.props?.style)) {
        this.buildColumn();
      } else {
        this.buildFlex();
      }
    }
    .align(Alignment.TopStart)
    .scrollable(this.scrollDirection)
    .edgeEffect(this.bounces())
    .scrollBar(this.showScrollBar())
    .onScrollFrameBegin(shouldBindEvent(this.node, ScrollEventName, (offset: number, state: ScrollState) => this.onScrollFrameBegin(offset, state)))
    .onScroll(shouldBindEvent(this.node, ScrollEventName, (xOffset: number, yOffset: number): void => this.onScroll(xOffset, yOffset)))
    .onScrollStop(shouldBindEvent(this.node, ScrollEventName, (): void => this.onScrollEnd()))
    .onScrollEdge(shouldBindEvent(this.node, [OnScrollBottomEventName, OnScrollTopEventName], (side: Edge): void => this.onScrollToEdge(side)))
    .width('100%')//fixme
    .height('100%')//fixme
    .attributeModifier(this.hasPullToRefresh() ? fakeStyleModifier : commonStyleModifier.setNode(this.node, this.props?.style))
    .onClick(shouldBindEvent(this.props!.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.props!.node, e)))
    .onTouch(shouldBindEvent(this.props!.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.props!.node, e)))
  }

  // scroller 内部容器只设置 宽高。其他属性由 scroller 设置
  @Builder
  buildColumn() {
    Column() {
      this.buildChildren()
    }
    .alignItems(FlexManager.convertFlexAlignItemsToColumnOrRow(this.props?.style?.flexDirection, this.props?.style?.alignItems) as HorizontalAlign)
    .justifyContent(FlexManager.flexOptions(this.props?.style).justifyContent)
    .width(this.isVertical() ? '100%' : null)
    .height(this.isVertical() ? null : '100%')
  }

  @Builder
  buildRow() {
    Row() {
      this.buildChildren()
    }
    .alignItems(FlexManager.convertFlexAlignItemsToColumnOrRow(this.props?.style?.flexDirection, this.props?.style?.alignItems) as VerticalAlign)
    .justifyContent(FlexManager.flexOptions(this.props?.style).justifyContent)
    .width(this.isVertical() ? '100%' : null)
    .height(this.isVertical() ? null : '100%')
  }

  @Builder
  buildFlex() {
    Flex(FlexManager.flexOptions(this.props?.style)) {
      this.buildChildren()
    }
    .width(this.isVertical() ? '100%' : null)
    .height(this.isVertical() ? null : '100%')
  }

  @Builder
  buildChildren() {
    ForEach(this.children, (node: HMNode) => {
      componentFactoryBuilder({
        hmContext: this.hmContext,
        tag: node.name,
        node: node,
        customComponentBuilder: this.builderContext.customComponentBuilder
      })
    }, (node: HMNode) => node.id.toString())
  }
}
