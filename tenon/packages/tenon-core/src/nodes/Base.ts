import {styleDynamicTransformer} from '@hummer/tenon-utils'
import {setCacheNode,handleFixedNodeByStyle,removeChildWithFixed} from '../helper/fixed-helper'
import {handleAnimation, Animation} from '../helper/animation-helper'
let __view_id = 0;
export class Base {
  public _scopedId:string|null = null
  public __NAME: Symbol|null = null;
  public element: any = null;
  public dataset:  any = {};
  protected children = new Set<Base>();
  public parent?: Base = undefined;
  public firstChild: Base | null = null;
  public lastChild: Base | null = null;
  public prevSibling: Base | null = null;
  public nextSibling: Base | null = null;
  private props =  new Map<any, any>();
  public  __view_id:number = 0;
  protected _defaultStyle: Record<string, string>| null = {};
  protected _style: Record<string, string>| null = {};
  private _baseStyle: Record<string, string>| null = {};

  constructor() {
    this.__view_id = __view_id++
    setCacheNode(this)
  }
  // 是否响应交互
  // Hummer组件Enabled true可响应交互
  get disabled(){
    return !this.element.enabled
  }
  set disabled(disabled:Boolean){
    this.element.enabled = !disabled 
  }

  get style(){
    return this._style || {}
  }

  set style(value){
    this.setStyle(value, true)
  }

  public updateStyle(className:string = ''){
    let CSSOM : any,
        elementStyle = {}
    if(!(CSSOM = (<any>__GLOBAL__).CSSOM)) return
    const classList = className.split(/\s/)
    
    classList.forEach((item: any) => {
      if(item){
        let globalStyleArr = CSSOM['global'].classMap.get(item) || []
        globalStyleArr = globalStyleArr.map((item : any) => item?.style)
        // 将元素总样式、全局变量、scoped变量按照顺序合并
        elementStyle = Object.assign({}, elementStyle, ...globalStyleArr)
      }
    })
    if(Object.keys(elementStyle).length > 0){
      this.setStyle(elementStyle)
    }
  }

  // Mounted 生命周期
  private _onMounted(){
    this.onMounted();
  }

  protected onMounted(){

  }

  // Destoryed 生命周期
  private _onDestoryed(){
    removeChildWithFixed(this);
    this.onDestoryed();
  }

  protected onDestoryed(){}

  appendChild(child: Base) {
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
    if(this.element && child.element){
      this.element.appendChild(child.element)
    }
    child._onMounted()
  }

  private unlinkSiblings() {
    if (this.parent && this.parent.firstChild === this) {
      this.parent.firstChild = this.nextSibling;
    }

    if (this.parent && this.parent.lastChild === this) {
      this.parent.lastChild = this.prevSibling;
    }

    if (this.prevSibling) {
      this.prevSibling.nextSibling = this.nextSibling;
    }

    if (this.nextSibling) {
      this.nextSibling.prevSibling = this.prevSibling;
    }

    this.prevSibling = null;
    this.nextSibling = null;
  }

  removeChild(child: Base) {
    child._onDestoryed();
    child.unlinkSiblings();
    child.parent = undefined;
    this.children.delete(child);
    // 删除元素
    if(this.element && child.element){
      this.element.removeChild(child.element)
    }
  }

  insertBefore(child: Base, anchor: Base) {
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
    this.children.add(child);
    // 插入元素
    if(this.element && child.element && anchor.element){
      this.element.insertBefore(child.element, anchor.element)
      child._onMounted();
    }
  }

  setElementText(text: string) {
    // TODO 抛出异常
    console.warn('非text元素不支持')
  }

  /**
   * 设定元素样式，进行聚合
   * @param style 
   * @param flag 是否来自 style 属性
   */
  setStyle(style: any, flag: boolean = false) {
    let tempStyle = this.hackForStyle(style, this)
    flag && (this._baseStyle = tempStyle);
    let newStyle = {
      ...this._defaultStyle,
      ...tempStyle,
      ...this._baseStyle
    };
    handleFixedNodeByStyle(this, newStyle);
    this.element.style = this._style = newStyle;
  }

  protected hackForStyle(style: any, base:Base){
    return styleDynamicTransformer.transformStyle(style, base)
  }
  /**
   * 设定属性
   * @param key 属性名
   * @param value 属性值
   */
  setAttribute(key:string, value: any){
    key.search(/^data-/) === 0 && key.split('data-')[1] && (this.dataset[key.split('data-')[1]] = value);
    this.props.set(key, value)

    switch(key){
      case 'disabled':
        this.disabled = value
        break;
      case 'style':
        this.setStyle(value, true)
        break;
      default:
        this._setAttribute(key, value)
        break;
    }
  }

  setClassStyle(value:string){
    this.updateStyle(value)
  }
  /**
   * 允许自定义组件覆盖
   * @param key 
   * @param value 
   */
  protected _setAttribute(key:string, value: any){

  }

  /**
   * 获取属性名
   * @param key 属性名
   */
  getAttribute(key:string){
    switch(key){
      case 'disabled':
        return this.disabled
      default:
        return this.props.get(key)
    }
  }

  handleAnimation(animation: Animation){
    handleAnimation(this, animation)
  }
  addEventListener(event: string, func:Function){
    this.element.addEventListener(event, (e:any) => {
      // iOS 中 event 无法被重新赋值，不要进行 event 的深拷贝
      e.target = {
        dataset: this.dataset
      }
      func.call(this, e)
    })
  }
  removeEventListener(event: string, func?:Function){
    this.element.removeEventListener(event, func)
  }

  getRect(func:Function) {
    this.element.getRect((rect: object) => {
      func.call(this, rect)
    })
  }

  hide(){
    // TOOD 隐藏当前元素
  }

  show(){
    // TODO 展示当前元素
  }
}