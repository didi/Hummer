import { isString } from '../Utils/is';
import { fn } from '../Utils/Utils';
import { HMEvent } from './Event';
import { HMNode } from './Node';

export function shouldBindEvent(node: HMNode, eventName: string | string[]) : boolean
export function shouldBindEvent(node: HMNode, eventName: string | string[], cb: fn) : fn | undefined
export function shouldBindEvent(node: HMNode, eventName: string | string[], cb?: fn) : fn | boolean | undefined {
  if (!node || node.attributes?.disabled) return cb ? undefined : false
  if (isString(eventName)){
    if (node.eventListeners.has(eventName)) {
      return cb ? cb : true
    }
  }else{
    const names = eventName;
    for (let index = 0; index < names.length; index++) {
      const name = names[index];
      if (node.eventListeners.has(name)) {
        return cb ? cb : true
      }
    }
  }
  return  cb ? undefined : false
}


export class EventHandler {
  private node:HMNode
  public bindEvents : Set<string> = new Set();
  constructor(node:HMNode) {
    this.node = node
  }

  checkEvent(eventName:string, bindWork:()=>void, unBindWork:()=>void){

    if(shouldBindEvent(this.node, eventName) && !this.bindEvents.has(eventName)){
      bindWork();
      this.bindEvents.add(eventName);
    }else if(!shouldBindEvent(this.node, eventName) && this.bindEvents.has(eventName)){
      unBindWork();
      this.bindEvents.delete(eventName);
    }
  }

  createEvent<T extends HMEvent>(){

  }
  dispatch(){

  }
}
