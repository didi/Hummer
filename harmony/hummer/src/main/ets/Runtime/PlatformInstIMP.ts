import { IHummerStyle } from 'Hummer/Style/IHummerStyle';
import { fn } from 'Hummer/Utils/Utils';
import { HMNode } from '../Components/Node';
import { InvokeType, MethodType, IPlatformInst, IPlatformRenderInst, External} from '../Instruction/IPlatformInst'


export interface Descriptor<TType = string,
TProps extends Object = Object,
TState = {}, TRawProps extends Object = {}> {
  type: TType;
  tag: number;
  parentTag?: number;
  props: TProps;
  state: TState;
  rawProps: TRawProps;
  childrenTags: number[];
  // layoutMetrics: LayoutMetrics;
  // isDynamicBinder: boolean;
};

/**
 * 鸿蒙运行时，将平台侧对象直接挂在到导出对象上
 * */
export class PlatformInstIMP implements IPlatformInst<External> {
  constructor() {
  }
  invoke(type: InvokeType, thisHandle: External, methodType: MethodType, componentName: string, methodName?: string, ...args: any[]): void {

    if(methodType == MethodType.New){
      this._create(thisHandle, componentName, args);
    }else if(methodType == MethodType.Delete){
      this._delete(thisHandle, componentName, args);
    }else if(methodType == MethodType.Call){
      this._call(thisHandle, methodName, args);
    }
  }

  _create(thisHandle: External, componentName: string, ...args: any[]): void {


  }
  /// JS 内无法感知到 GC，因此不会调用 delete，
  _delete(thisHandle: External, componentName: string, ...args: any[]): void {


  }

  _call(thisHandle: External, methodName?: string, ...args: any[]): void {
    let nativeHandle = thisHandle.__nativeHandle__;
    let func = nativeHandle[methodName];
    if(func){

    }
  }
}

export class UIManager implements IPlatformRenderInst<External> {
  etsInvoke(thisHandle: External, methodName?: string, ...args: any[]): void {
    throw new Error('Method not implemented.');
  }

  setEventTarget(thisObject: External, eventTarget: Function): void {
    throw new Error('Method not implemented.');
  }

  addEventListener(thisObject: External, event: string): void {
    throw new Error('Method not implemented.');
  }

  removeEventListener(thisObject: External, event: string): void {
    throw new Error('Method not implemented.');
  }

  setAttributes(thisObject: External, attrs: { [x: string]: any; }): void {
    throw new Error('Method not implemented.');
  }

  getAttribute(thisObject: External, key: string, callback: fn): void {
    throw new Error('Method not implemented.');
  }

  getReact(thisObject: External, callback: fn): void {
    throw new Error('Method not implemented.');
  }

  setStyle(thisObject: External, style: IHummerStyle): void {
    throw new Error('Method not implemented.');
  }

  create(node: External, ...args: any[]): void {

  }

  delete(node: External, ...args: any[]): void {
    throw new Error('Method not implemented.');
  }

  appendChild(thisObject: External, child: External): void {
    throw new Error('Method not implemented.');
  }

  removeChild(thisObject: External, child: External): void {
    throw new Error('Method not implemented.');
  }

  removeAll(thisObject: External): void {
    throw new Error('Method not implemented.');
  }

  insertBefore(thisObject: External, node: External, child: External): void {
    throw new Error('Method not implemented.');
  }

  replaceChild(thisObject: External, node: External, child: External): void {
    throw new Error('Method not implemented.');
  }

  render(node: External): void {
    throw new Error('Method not implemented.');
  }
}