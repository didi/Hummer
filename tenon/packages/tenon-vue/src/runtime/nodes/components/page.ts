import {View as ViewComponent, Scroller as ScrollViewComponent, Hummer} from '@hummer/hummer-front'
import {Base} from '../Base'

const noFunc =  () => {}
export interface PageOptions{
  onLoad	?:Function,
  onShow?: Function,
  onHide?: Function,
  onUnload?: Function,
  onBack?: Function,
  canScroll?: Boolean,  // 是否可滚动
  pageStyle?: Record<string, string> // 页面样式
}
export class RootViewComponent extends ViewComponent{
  public _onCreate: Function
  public _onAppear: Function
  public _onDisappear: Function
  public _onDestroy: Function
  public _onBack: Function
  private _element: ScrollViewComponent|null = null
  private _canScroll: Boolean = true
  constructor(options:PageOptions = {}){
    super();
    let {onLoad, onShow, onHide, onUnload, onBack, canScroll = true, pageStyle = {}} = options
    this._onCreate = onLoad || noFunc
    this._onAppear = onShow || noFunc
    this._onDisappear = onHide || noFunc
    this._onDestroy = onUnload || noFunc
    this._onBack = onBack || noFunc
    this._canScroll = canScroll
    this.style = {
      ...pageStyle,
      width: '100%',
      height: '100%'
    }
    if( this._canScroll){
      this._element = new ScrollViewComponent()
      this._element.style = {
        width: "100%",
        height: "100%",
      }
      this.appendChild(this._element)
    }
  }
  get element():ScrollViewComponent | ViewComponent{
    return this._canScroll && this._element ? this._element : this
  }
  onCreate(){
    // 页面创建
    this._onCreate()
  }

  onAppear(){
    // 页面显示周期
    this._onAppear()
  }

  onDisappear(){
    // 页面隐藏
    this._onDisappear()
  }

  onDestroy(){
    // 页面销毁
    this._onDestroy()
  }

  onBack(): boolean{
    // 页面销毁
    let result = this._onBack()
    return result || false
  }
}


export class Page extends Base{
  private _rootView:RootViewComponent
  constructor(options: PageOptions){
    super()
    this._rootView = new RootViewComponent(options)
    this.element = this._rootView.element
  }
  render(){
    Hummer.render(this._rootView)
  }

  set onLoad(load:Function){
    this._rootView._onCreate = load
  }

  set onShow(show:Function){
    this._rootView._onAppear = show
  }
 
  set onHide(hide:Function){
    this._rootView._onDisappear = hide
  }
 
  set onUnload(destroy:Function){
    this._rootView._onDestroy = destroy
  }
 
  set onBack(back:Function){
    this._rootView._onBack = back
  }
}