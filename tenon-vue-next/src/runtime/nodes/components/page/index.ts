
import { Hummer, View as ViewComponent, Scroller as ScrollerViewComponent } from '@hummer/hummer-api'
import { PageOptions } from "./PageOptions"
// import { RootScrollView } from "./RootScrollView"
// import { RootView } from "./RootView"

export * from './PageOptions'

const noFunc = () => { }

export class Page extends ViewComponent {
  public _onCreate: Function
  public _onReady: Function
  public _onAppear: Function
  public _onDisappear: Function
  public _onDestroy: Function
  public _onBack: Function

  constructor(options: PageOptions = {}) {
    super()
    let { onLoad, onReady, onShow, onHide, onUnload, onBack, pageStyle = {} } = options
    this._onCreate = onLoad || noFunc
    this._onReady = onReady || noFunc
    this._onAppear = onShow || noFunc
    this._onDisappear = onHide || noFunc
    this._onDestroy = onUnload || noFunc
    this._onBack = onBack || noFunc
    this.style = {
      width: '100%',
      height: '100%',
      ...pageStyle
    }
  }

  public render() {
    Hummer.render(this)
  }

/* rootView 生命周期 Tenon侧额外模拟提供的生命周期 */
  /**
   *  Tenon onReady
  */
  onReady() {
    this._onReady()
  }

  /* rootView 生命周期 HummerAPI原生提供的生命周期 */

  /**
   * HummerAPI rootView创建  -> Tenon onLoad
  */
  onCreate() {
    // 
    this._onCreate()
    // HummerAPI 不提供onReady， 手动加一个onReady生命周期
    this.onReady()
  }

  /**
   * HummerAPI rootView销毁  -> Tenon onUnload
  */
  onDestroy() {
    this._onDestroy()
  }

  /**
   * HummerAPI rootView显示  -> Tenon onShow
  */
  onAppear() {
    this._onAppear()
  }

  /**
   * HummerAPI rootView隐藏  -> Tenon onHide
  */
  onDisappear() {
    this._onDisappear()
  }

  /**
   * HummerAPI rootView返回  -> Tenon onBack
  */
  onBack(): boolean {
    // 页面销毁
    let result = this._onBack()
    return result || false
  }


  /**
   * Tenon侧 页面实例 生命周期初始化时 进行页面生命周期设置
   * Tenon侧生命周期名称与 HummerAPI侧重复，使用set方式中转一下
  */
  set onPageLoad(load: Function) {
    this._onCreate = load
  }

  set onPageReady(ready: Function) {
    this._onReady = ready
  }

  set onPageShow(show: Function) {
    this._onAppear = show
  }

  set onPageHide(hide: Function) {
    this._onDisappear = hide
  }

  set onPageUnload(destroy: Function) {
    this._onDestroy = destroy
  }

  set onPageBack(back: Function) {
    this._onBack = back
  }
}

export class ScrollPage extends ScrollerViewComponent {
  public _onCreate: Function
  public _onReady: Function
  public _onAppear: Function
  public _onDisappear: Function
  public _onDestroy: Function
  public _onBack: Function

  constructor(options: PageOptions = {}) {
    super()
    let { onLoad, onReady, onShow, onHide, onUnload, onBack, pageStyle = {} } = options
    this._onCreate = onLoad || noFunc
    this._onReady = onReady || noFunc
    this._onAppear = onShow || noFunc
    this._onDisappear = onHide || noFunc
    this._onDestroy = onUnload || noFunc
    this._onBack = onBack || noFunc
    this.style = {
      width: '100%',
      height: '100%',
      ...pageStyle
    }
  }

  public render() {
    Hummer.render(this)
  }

  /* rootView 生命周期 Tenon侧额外模拟提供的生命周期 */
  /**
   *  Tenon onReady
  */
  onReady() {
    this._onReady()
  }

  /* rootView 生命周期 HummerAPI原生提供的生命周期 */

  /**
   * HummerAPI rootView创建  -> Tenon onLoad
  */
  onCreate() {
    // 
    this._onCreate()
    // HummerAPI 不提供onReady， 手动加一个onReady生命周期
    this.onReady()
  }

  /**
   * HummerAPI rootView销毁  -> Tenon onUnload
  */
  onDestroy() {
    this._onDestroy()
  }

  /**
   * HummerAPI rootView显示  -> Tenon onShow
  */
  onAppear() {
    this._onAppear()
  }

  /**
   * HummerAPI rootView隐藏  -> Tenon onHide
  */
  onDisappear() {
    this._onDisappear()
  }

  /**
   * HummerAPI rootView返回  -> Tenon onBack
  */
  onBack(): boolean {
    // 页面销毁
    let result = this._onBack()
    return result || false
  }


  /**
   * Tenon侧 页面实例 生命周期初始化时 进行页面生命周期设置
   * Tenon侧生命周期名称与 HummerAPI侧重复，使用set方式中转一下
  */
  set onPageLoad(load: Function) {
    this._onCreate = load
  }

  set onPageReady(ready: Function) {
    this._onReady = ready
  }

  set onPageShow(show: Function) {
    this._onAppear = show
  }

  set onPageHide(hide: Function) {
    this._onDisappear = hide
  }

  set onPageUnload(destroy: Function) {
    this._onDestroy = destroy
  }

  set onPageBack(back: Function) {
    this._onBack = back
  }
}

// export class Page extends ViewComponent {
//   private _rootView: RootView | ScrollRootView
//   constructor(options: PageOptions) {
//     super()
//     if (options.canScroll) {
//       this._rootView = new ScrollRootView(options)
//     } else {
//       this._rootView = new RootView(options)
//     }
//   }

//   render() {
//     this._rootView.render()
//   }

//   set onLoad(load: Function) {
//     this._rootView._onCreate = load
//   }

//   set onReady(ready: Function) {
//     this._rootView._onReady = ready
//   }

//   set onShow(show: Function) {
//     this._rootView._onAppear = show
//   }

//   set onHide(hide: Function) {
//     this._rootView._onDisappear = hide
//   }

//   set onUnload(destroy: Function) {
//     this._rootView._onDestroy = destroy
//   }

//   set onBack(back: Function) {
//     this._rootView._onBack = back
//   }
// }