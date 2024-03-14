
import { HummerComponent } from "../../HummerComponent"

export class NotifyCenter extends HummerComponent {

    private static instance: NotifyCenter;

    public constructor(props: any = {}) {
        super("NotifyCenter", props);
    }

    protected static newInstance(): NotifyCenter {
        return new NotifyCenter();
    }

    protected static checkInstance() {
        if (!NotifyCenter.instance) {
            NotifyCenter.instance = NotifyCenter.newInstance();
        }
    }

    /**
     * 添加事件监听
     *
     * @param event 事件名称
     * @param callback 回调事件
     */
    addEventListener(event: string, callback: (value: Object) => void) {
        NotifyCenter.checkInstance();
        NotifyCenter.instance.__addEventListener(event, callback);
    }

    /**
    * 移除事件监听
    *
    * @param event 事件名称
    * @param callback 回调事件
    */
    removeEventListener(event: string, callback: (value: Object) => void) {
        NotifyCenter.checkInstance();
        return NotifyCenter.instance.__removeEventListener(event, callback);
    }



    /**
     * 触发事件
     *
     * @param event 事件名称
     * @param value 消息内容
     */
    triggerEvent(event: string, value: Object) {
        NotifyCenter.checkInstance();
        NotifyCenter.instance.__triggerEvent(event, value);
    }



    __addEventListener(event: string, callback: (value: Object) => void) {
        this.call("addEventListener", event, callback);
    }


    __removeEventListener(event: string, callback?: (value: Object) => void) {
        return this.call("removeEventListener", event, callback);
    }

    __triggerEvent(event: string, value: Object) {
        this.call("triggerEvent", event, value);
    }

   

}