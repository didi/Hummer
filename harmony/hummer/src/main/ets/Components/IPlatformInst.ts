import { IHummerStyle } from '../Interface/IHummerStyle';
import { fn } from '../Utils/Utils';
import { HMNode } from './Node';



export interface IInvokeInstruction {
  invoke(funcName:string, ...args:any[]): void | any;
}

export interface IComponentInstruction extends IInvokeInstruction {

  setEventTarget(eventTarget:Function);
}

export interface IDomInstruction extends IInvokeInstruction {

  appendChild(child: HMNode): HMNode;
  removeChild(child: HMNode): HMNode;
  removeAll(): void;
  setStyles(style : IHummerStyle);
  insertBefore(newNode: HMNode, referenceNode?: HMNode): HMNode | undefined;
  replaceChild(newChild: HMNode, oldChild: HMNode): HMNode;
  setEventTarget(eventTarget:Function);
  addEventListener(event:string);
  removeEventListener(event:string);
  setAttributes(attrs : Record<string, any>);
  getAttribute(key:string, callback:fn);
  getRect(callback: fn);
}
