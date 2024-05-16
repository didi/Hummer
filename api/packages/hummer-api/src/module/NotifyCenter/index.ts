import { HummerComponent } from "../../HummerComponent"

const HUMMER = __Hummer__;

export class NotifyCenter extends HummerComponent {


    public constructor(props: any = {}) {
        super("NotifyCenter", props);
    }

    protected static checkInstance() {
        if (!HUMMER.__notifyCenter__) {
            HUMMER.__notifyCenter__ = NotifyCenter.newInstance();
        }
    }

    protected static newInstance(): NotifyCenter {
        return new NotifyCenter();
    }


    static get instance(): NotifyCenter {
        return HUMMER.__notifyCenter__
    }

    /**
     * 添加事件监听
     *
     * @param event 事件名称
     * @param callback 回调事件
     */
    static addEventListener(event: string, callback: Function) {
        NotifyCenter.checkInstance();
        NotifyCenter.instance.addEventListener(event, callback)
    }

    /**
    * 移除事件监听
    *
    * @param event 事件名称
    * @param callback 回调事件
    */
    static removeEventListener(event: string, callback: Function) {
        NotifyCenter.checkInstance();
        if (!callback) {
            NotifyCenter.instance.call("removeAllEventListener", event)
        } else {
            NotifyCenter.instance.removeEventListener(event, callback)
        }

    }



    /**
     * 触发事件
     *
     * @param event 事件名称
     * @param value 消息内容
     */
    static triggerEvent(eventName: string, value: Record<string, any>) {
        let event = {
            type: eventName,
            state: 0,
            timestamp: new Date().getTime(),
            value: value,
        };

        NotifyCenter.checkInstance();
        NotifyCenter.instance.call("triggerEvent", eventName, event);
    }

    /**
     * 重新获取实际传递的数据
     * @param eventName 
     * @param event 
     * @returns 
     */
    protected onHandleReceiveEvent(eventName: string, event: any): any {
        if (event) {
            return event.value;
        }
        return undefined;
    }



}