import {Scroller as ScrollerComponent, HorizontalScroller} from '@hummer/hummer-front'
import {Base} from '../Base'
import {NODE_SCROLLER, NODE_REFRESH, NODE_LOADMORE} from '@hummer/tenon-utils'

// 增加事件
export class Scroller extends Base{
  __NAME = NODE_SCROLLER

  constructor(){
    super();
    this.element = new ScrollerComponent();
  }
  _setAttribute(key:string, value: any){
    switch(key){
      case 'scrollDirection':
        if(value === 'horizontal' &&  this.element instanceof ScrollerComponent){
          // 属性切换时，Scroller组件需要重新声明，同时进行 Children的重新赋值
          let scroller = new HorizontalScroller() as any
          scroller.style = this._style
          for(let child of this.children.values()){
            this.element.removeChild(child.element)
            scroller.appendChild(child.element)
          }
          this.element = scroller
        }
      break;
      case 'bounces':
        this.element.bounces = value !== false
        break;
      case 'showScrollBar':
        this.element.showScrollBar = value !== false
        break;
      default:
        break;
    }
  }

  appendChild(child: any) {
    child.unlinkSiblings();
    child.parent = this;
    this.children.add(child);

    if (!this.firstChild) {
      this.firstChild = child;
    }
    child.prevSibling = this.lastChild;
    child.nextSibling = null;
    if (this.lastChild) {
      this.lastChild.nextSibling = child;
    }
    this.lastChild = child;
    // 新增元素
    if(this.element && child.element){
      // 拦截refresh 和 loadmore 留作他用 其他正常渲染
      if(child.__NAME === NODE_REFRESH){
        this.element.refreshView = child.element
      }else if(child.__NAME === NODE_LOADMORE){
        this.element.loadMoreView = child.element
      }else {
        this.element.appendChild(child.element);
        child._onMounted();
        child.onMounted();
      }
    }
  }

  _insertBefore(child:any, anchor:any) {
    child.unlinkSiblings();
    child.parent = this;
    if (anchor.prevSibling) {
      child.prevSibling = anchor.prevSibling;
      anchor.prevSibling.nextSibling = child;
    }
    anchor.prevSibling = child;
    child.nextSibling = anchor;

    if (this.firstChild === anchor) {
      this.firstChild = child;
    }
    //FIXME: 插入时，children顺序需要进行变更
    this.children.add(child);
    // 插入元素
    if(this.element && child.element && anchor.element){
      // 拦截refresh 和 loadmore 留作他用 其他正常渲染
      if(child.__NAME === NODE_REFRESH){
        this.element.refreshView = child.element
      }else if(child.__NAME === NODE_LOADMORE){
        this.element.loadMoreView = child.element
      }else {
        this.element.appendChild(child.element);
        child._onMounted();
        child.onMounted();
      }
    }
  }

  /**
   * 滚动到坐标（单位：Px）
   * @param x 横坐标
   * @param y 纵坐标
   */
  scrollTo(x:number, y:number){
    this.element.scrollTo(x,y);
  }

  /**
   * 滚动一定的距离（单位：Px）
   * @param dx x偏移量
   * @param dy y偏移量
   */
  scrollBy(dx:number, dy:number){
    this.element.scrolBy(dx, dy)
  }

  /**
   * 滚动到顶部，如果是水平就滚动到最左侧
   */
  scrollToTop(){
    this.element.scrollToTop()
  }

  /**
   * 滚动到底部，如果是水平就滚动到最右侧
   */
  scrollToBottom(){
    this.element.scrollToBottom()
  }

  /**
   * 结束下拉刷新
   */
  stopPullRefresh() {
    this.element.stopPullRefresh()
  }

  /**
   * 结束加载更多
   */
  stopLoadMore(enable: boolean) {
    this.element.stopLoadMore(enable)
  }

  /**
   * 重写事件绑定
   * @param event 
   * @param func 
   */
  addEventListener(event: string, func:Function){
    switch(event){
      case "scroll":
        // event单位 px
        this.element.addEventListener('scroll', (e:any) => {
          func.call(this, e)
        })
        break;
      case "scrolltotop":
        this.element.setOnScrollToTopListener(() => {
          func.call(this)
        })
        break;
      case "scrolltobottom":
        this.element.setOnScrollToBottomListener(() => {
          func.call(this)
        })
        break;
      case 'refresh':
        this.element.onRefresh = (state: any) => {
          func.call(this, state, this)
        }
        break;
      case 'loadmore':
        this.element.onLoadMore = (state: any) => {
          func.call(this, state, this)
        }
        break;
      default:
        this.element.addEventListener(event, (e:any) => {
          func.call(this, e)
        })
        break;
    }
  }
}
