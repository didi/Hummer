import { CleanupCallback, EventEmitter, EventMode } from '../../Context/EventEmitter';
import { HMContext, HMContextEventType } from '../../Context/HMContext';
import { fn } from '../../Utils/Utils';
import { HMComponent } from '../Component';


export class NotifyCenter {
  private static instanceMap : Map<string, NotifyCenter> = new Map();
  private eventEmitter : EventEmitter = new EventEmitter({mode: EventMode.default});
  static getInstance(namespace:string):NotifyCenter{
    let notifyCenter = NotifyCenter.instanceMap.get(namespace);
    if(!notifyCenter){
      notifyCenter = new NotifyCenter();
      NotifyCenter.instanceMap.set(namespace, notifyCenter);
    }
    return notifyCenter;
  }

  private constructor() {}

  public addEventListener(event: string, callback: fn) : CleanupCallback{
    return this.eventEmitter.on(event, callback);
  }

  public removeEventListener(event: string, callback?: fn){
    this.eventEmitter.off(event, callback);
  }

  public triggerEvent(event: string, ...args: any[]){
    this.eventEmitter.emit(event, ...args);
  }
}

export class HMNotifyCenter extends HMComponent {
  private notifyCenter!: NotifyCenter
  private eventCleanMap:Map<string, fn> = new Map();
  constructor(context:HMContext, id:number, name:string, ...args: any[]) {
    super(context, id, name, ...args);
    this.notifyCenter = NotifyCenter.getInstance(context.config.nameSpace);
    const cleanFunc = this.context.eventEmitter.on(HMContextEventType.OnDestroy, ()=>{
      cleanFunc();
      this.eventCleanMap.forEach((value: fn, key: string,)=>{
        value();
      })
      this.eventCleanMap = undefined;
    })
  }

  override addEventListener(event: string) : boolean{
    const res = super.addEventListener(event);
    if(!res) {return res}
    const fn = this.notifyCenter.addEventListener(event, (...args: any[])=>{
      this.dispatchEvent(event, ...args);
    })
    this.eventCleanMap.set(event, fn);
    return res
  }

  override removeEventListener(event: string) : boolean{
    const res =  super.removeEventListener(event)
    if(!res) {return res}
    const cleanFn = this.eventCleanMap.get(event);
    this.eventCleanMap.delete(event);
    cleanFn?.()
    return res;
  }

  triggerEvent(event: string, ...args: any[]){
    this.notifyCenter.triggerEvent(event, ...args);
  }
}
