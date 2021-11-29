import { styleDynamicTransformer } from '@hummer/tenon-utils'
import { setCacheNode, handleFixedNodeByStyle, removeChildWithFixed } from '../helper/fixed-helper'
import { handleAnimation, Animation } from '../helper/animation-helper'
import { getClassStyle } from '../../utils/style'

let __view_id = 0;
export class Base {
  public _scopedIds = new Set<string>();
  public __NAME: Symbol | null = null;
  public element: any = null;
  public dataset: any = {};
  protected children = new Set<Base>();
  public parent?: Base = undefined;
  public firstChild: Base | null = null;
  public lastChild: Base | null = null;
  public prevSibling: Base | null = null;
  public nextSibling: Base | null = null;
  private props = new Map<any, any>();
  public __view_id: number = 0;
  protected _defaultStyle: Record<string, string> | null = {};
  protected _style: Record<string, string> | null = {};
  private _baseStyle: Record<string, string> | null = {};

  constructor() {
    this.__view_id = __view_id++
    setCacheNode(this)
  }
  // 是否响应交互
  // Hummer组件Enabled true可响应交互
  get disabled() {
    return !this.element.enabled
  }
  set disabled(disabled: Boolean) {
    this.element.enabled = !disabled
  }

  get style() {
    return this._style || {}
  }
  get className() {
    return this.props.get('class')
  }
  set style(value) {
    this.setStyle(value, true)
  }

  public setScopeId(id: string) {
    this._scopedIds.add(id)
    this.updateStyle();
  }

  public updateStyle() {
    if (!this._scopedIds.size) {
      return
    }
    let className = this.getAttribute('class');
    this._scopedIds.forEach(scopedId => {
        let elementStyle = getClassStyle(this, className, true, scopedId);
        if (Object.keys(elementStyle).length > 0) {
            this.setStyle(elementStyle);
        }
    })
  }

  // Mounted 生命周期
  private _onMounted() {
    this.onMounted();
  }

  protected onMounted() {

  }

  // Destoryed 生命周期
  private _onDestoryed() {
    removeChildWithFixed(this);
    this.onDestoryed();
  }

  protected onDestoryed() { }

  _appendChild(child: Base) {
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
    if (this.element && child.element) {
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

  _removeChild(child: Base) {
    child._onDestoryed();
    child.unlinkSiblings();
    child.parent = undefined;
    this.children.delete(child);
    // 删除元素
    if (this.element && child.element) {
      this.element.removeChild(child.element)
    }
  }

  _insertBefore(child: Base, anchor: Base) {
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
    if (this.element && child.element && anchor.element) {
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

  protected hackForStyle(style: any, base: Base) {
    return styleDynamicTransformer.transformStyle(style, base)
  }
  /**
   * 设定属性
   * @param key 属性名
   * @param value 属性值
   */
  setAttribute(key: string, value: any) {
    this.setCacheProp(key, value)
    switch (key) {
      case 'disabled':
        this.disabled = value !== false
        break;
      case 'class':
        this.updateStyle()
        break;
      default:
        // FIX: 修复Viewpager组件Data属性赋值问题
        // this.element[key] = value
        this._setAttribute(key, value)
        break;
    }
  }

  // Cache Props To Get
  private setCacheProp(key:string, value:any){
    // 如果是 datattr 格式的属性，缓存到 dataset 中，方便事件可以获取到 dataset （Chameleon事件需求）
    if(/^data/.test(key)){
      let dataKey = key.slice(4).toLowerCase()
      if(dataKey){
        this.dataset[dataKey] = value
      }
    }
    this.props.set(key, value)
  }


  /**
   * 允许自定义组件覆盖
   * @param key 
   * @param value 
   */
  protected _setAttribute(key: string, value: any) {

  }

  /**
   * 获取属性名
   * @param key 属性名
   */
  getAttribute(key: string) {
    switch (key) {
      case 'disabled':
        return this.disabled
      default:
        return this.props.get(key)
    }
  }

  handleAnimation(animation: Animation) {
    handleAnimation(this, animation)
  }
  addEventListener(event: string, func: Function) {
    this.element.addEventListener(event, (e: any) => {
      // iOS 中 event 无法被重新赋值，不要进行 event 的深拷贝
      e.target = {
        dataset: this.dataset
      }
      func.call(this, e)
    })
  }
  removeEventListener(event: string, func?: Function) {
    this.element.removeEventListener(event, func)
  }

  getRect(func: Function) {
    this.element.getRect((rect: object) => {
      func.call(this, rect)
    })
  }
}