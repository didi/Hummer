import { InvokeType, MethodType } from '../Instruction/IPlatformInst';
import { IHummerStyle } from '../Interface/IHummerStyle';
import { fn } from '../Utils/Utils';
import {HarmonyRuntime} from './HarmonyRuntime'

/// 鸿蒙运行时，模拟 Hummer Core 工作，实现 tenon 2 鸿蒙平台 bridge，调用鸿蒙平台指令
export class Document {
  private runtime:HarmonyRuntime;
  constructor(runtime:HarmonyRuntime) {
    this.runtime = runtime;
  }
  public createElement(tag: string, props?:object) : Element{
    return new Element(this.runtime, tag, props);
  }

  public createComponent(name:string, props?:object) : Component{
    return new Component(this.runtime, name, props);
  }

  public render(element: Element):void{
    this.runtime.render(element);
  }
}
type Callback = (...args) => void
class External {
  public readonly runtime:HarmonyRuntime;
  public readonly id: number
  public readonly tag: string;
  public __nativeHandle__ : object;

  constructor(runtime: HarmonyRuntime, tag:string, props?:object) {
    this.runtime = runtime;
    this.id = runtime.genId();
    this.tag = tag;
  }

  public invoke(methodName:string, ...args){}
}

export class Component extends External {

  constructor(runtime: HarmonyRuntime, tag:string, props?:object) {
    super(runtime, tag, props);
    return this.runtime.invoke(InvokeType.Common, this, MethodType.New, this.tag, undefined, props);
  }
  public setEventTarget(eventTarget:Callback) {

  }
  override invoke(methodName: string, ...args: any[]): undefined | any {
    return this.runtime.invoke(InvokeType.Common, this, MethodType.Call, this.tag, methodName, ...args);
  }
}

export class Element extends External{

  private _style:Record<string, any> = [];
  constructor(runtime: HarmonyRuntime, tag:string, props?:object) {
    super(runtime, tag, props);
    return this.runtime.invoke(InvokeType.Common, this, MethodType.New, this.tag, undefined, props);
  }


  public appendChild(child: Element) {
    this.runtime.appendChild(this, child);
  }

  public removeChild(child: Element) {
    this.runtime.removeChild(this, child);
  }

  public removeAll(child: Element) {
    this.runtime.removeAll(this);
  }

  public insertBefore(child: Element, existingChild: Element) {
    this.runtime.insertBefore(this, child, existingChild);
  }

  public replaceChild(newChild: Element, oldChild: Element) {
    this.runtime.replaceChild(this, newChild, oldChild);
  }
/**
 * 模拟 Hummer Core 样式处理
 * 1. 增量保存
 * 2. 单位转换
 * 3. 无效值过滤
 * 4. 模型化
 * */
  public setStyles(style:IHummerStyle) {
    // const currentStyle = this._style;
    // const newStyle = {
    //   ...currentStyle,
    //   ...style
    // };
    // this._style = newStyle;
    // const harmonyStyle = convertHarmonyStyle(style);
    this.runtime.setStyle(this, style);
  }

  public setEventTarget(eventTarget:fn){
    this.runtime.setEventTarget(this, eventTarget);
  }

  public addEventListener(event:string) {
    this.runtime.addEventListener(this, event);
  }

  public removeEventListener(event:string) {
    this.runtime.removeEventListener(this, event);
  }

  public setAttributes(attrs: { [x: string]: any; }): void {
    this.runtime.setAttributes(this, attrs);
  }

  public getAttribute(key: string, callback: fn): void {
    this.runtime.getAttribute(this, key, callback);
  }

  public getRect(callback: fn): void {
    this.runtime.getReact(this, callback);
  }

  override invoke(methodName: string, ...args: any[]): undefined | any {
   return this.runtime.etsInvoke(this, methodName, ...args);
  }
}

