
import { View as ScrollViewComponent } from "../View"
import { PageOptions } from "./PageOptions"

const noFunc = () => { }

export class RootScrollView extends ScrollViewComponent {
    public _onCreate: Function
    public _onReady: Function
    public _onAppear: Function
    public _onDisappear: Function
    public _onDestroy: Function
    public _onBack: Function
    // private _element: ScrollViewComponent | null = null
    // private _canScroll: Boolean = true
    constructor(options: PageOptions = {}) {
        super();
        let { onLoad, onReady, onShow, onHide, onUnload, onBack, canScroll = true, pageStyle = {} } = options
        this._onCreate = onLoad || noFunc
        this._onReady = onReady || noFunc
        this._onAppear = onShow || noFunc
        this._onDisappear = onHide || noFunc
        this._onDestroy = onUnload || noFunc
        this._onBack = onBack || noFunc
        // this._canScroll = canScroll
        this.style = {
            width: '100%',
            height: '100%',
            ...pageStyle
        }
        // if( this._canScroll){
        //   this._element = new ScrollViewComponent()
        //   this._element.style = {
        //     width: "100%",
        //     height: "100%",
        //   }
        //   this.appendChild(this._element)
        // }
    }
    // get element():ScrollViewComponent | ViewComponent{
    //   return this._canScroll && this._element ? this._element : this
    // }

    onCreate() {
        // 页面创建
        this._onCreate()
        // native 不提供onReady， 手动加一个onReady生命周期
        this.onReady()
    }

    onReady() {
        // 页面ready
        this._onReady()
    }

    onAppear() {
        // 页面显示周期
        this._onAppear()
    }

    onDisappear() {
        // 页面隐藏
        this._onDisappear()
    }

    onDestroy() {
        // 页面销毁
        this._onDestroy()
    }

    onBack(): boolean {
        // 页面销毁
        let result = this._onBack()
        return result || false
    }
}