import { HMObject } from "../HMObject"


//***********************************************/
// 引擎操作接口挂载点全局上的 ”__hummer__“上
//***********************************************/

export interface EventListener {
    onEvent(event: any): any;
}

/**
 * EventTarget 事件分发实现
 */
export class EventTarget extends HMObject {

    protected envents: Map<string, Array<EventListener | Function>>;


    public constructor(tag: string, isApi: boolean = true, props: any) {
        super(tag, isApi, props)
        this.envents = new Map()
    }

    //消息事件回调入口
    public onReceiveEvent(eventName: string, event: any) {
        event = this.onHandleReceiveEvent(eventName, event);
        this.dispatchEvent(eventName, event)
    }


    //事件处理增强/扩展
    protected onHandleReceiveEvent(eventName: string, event: any): any {
        return event;
    }

    /**
     * 绑定 EventTatget
     */
    public bindEventTarget() {
        this.getThis().setEventTarget((eventName: string, event: any) => {
            this.onReceiveEvent(eventName, event);
        })
    }


    public dispatchEvent(eventName: string, event: any) {
        var listeners = this.envents.get(eventName);
        if (listeners != undefined) {
            listeners.forEach((lisener => {
                if (lisener instanceof Function) {
                    lisener.call(this, event);
                } else {
                    lisener.onEvent(event);
                }
            }))
        } else {
            console.log("dispatchEvent() eventName=" + eventName + " not found event listener.");
        }

    }


    /**
     * 
     * @param eventName 
     * @param eventListener  @see Event 
     * @param useCapture 
     */
    public addEventListener(eventName: string, eventListener: EventListener | Function, useCapture?: boolean) {
        var listeners = this.envents.get(eventName)
        if (listeners == undefined) {
            listeners = new Array()
            this.envents.set(eventName, listeners);
        }

        listeners.push(eventListener);
        this._addEventListener(eventName);
    }


    private _addEventListener(eventName: string) {
        this.getThis().addEventListener(eventName);
    }


    public removeEventListener(eventName: string, eventListener?: EventListener | Function, useCapture?: boolean) {
        var listeners = this.envents.get(eventName)
        if (listeners != undefined) {
            if (eventListener == undefined) {
                listeners.splice(0, listeners.length);
                this.envents.delete(eventName);
                this._removeEventListener(eventName);
            } else {
                const index = listeners.indexOf(eventListener); // 获取对象在数组中的索引位置
                if (index > -1) {
                    listeners.splice(index, 1); // 通过 splice() 函数将该对象从数组中移除
                } else {
                    console.log("removeEventListener() eventName=" + eventName + " not found listener.");
                }
                if (listeners.length == 0) {
                    this.envents.delete(eventName);
                    this._removeEventListener(eventName);
                }
            }
        }

    }

    private _removeEventListener(eventName: string) {
        this.getThis().removeEventListener(eventName);
    }


}