import {Text as TextComponent} from '@hummer/hummer-front'
import {Base} from '../Base'
import {NODE_TEXT} from '@hummer/tenon-utils'
export class Text extends Base{
  __NAME = NODE_TEXT
  private _text:string = ''
  constructor(){
    super()
    this.element = new TextComponent()
  }

  // FIXME: 去除 Hack SetElementText方法，直接操作属性即可
  setElementText(text:string){
    this._text = text
    this.element.text = text
    // 在文本嵌套的case下，嵌套的文本不会在原生生成真正的element,需要向上通知类型为Text的parent重新获取内部文本
    this.parent && (this.parent.__NAME === NODE_TEXT) && this.parent.setElementText((this.parent as Text).getInnerText())
  }

  // 获取当前text标签内部所有嵌套的text/文本
  getInnerText() {
    let innerText = ''
    this.children.forEach(child => {
      innerText += (child && (child as Text)._text || '')
    });
    return innerText
  }

  // 重写节点append
  _appendChild(child: any) {
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
      this.setElementText(this.getInnerText())
    }
    child._onMounted();
  }

  // 重写节点insert
  _insertBefore(child: any, anchor: any) {
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
    if (this.element && child.element && anchor.element) {
      this.setElementText(this.getInnerText())
      child._onMounted();
    }
  }
  _removeChild(child: any) {
    child._onDestoryed();
    child.unlinkSiblings();
    child.parent = undefined;
    this.children.delete(child);
    if (this.element && child.element) {
      this.setElementText(this.getInnerText())
    }
  }

  // 文案
  get text(){
    return this._text
  }
  set text(text:string){
    this._text = text
    this.element.text = text
  }

  set richText(value: Array<String>){
    this.element.richText = value
  }

  _setAttribute(key:string, value: any){
    switch(key){
      case 'richText':
        this.richText = value
        break;
      default:
        break;
    }
  }
}