import { Component } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Component";
import { GlobalNotifyCenter } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Module/GlobalNotifyCenter";
export class HMNotifyCenter extends Component {
    private static notifyCenterMap: WeakMap<object, GlobalNotifyCenter> = new WeakMap();
    private static nameSpaceObj: object = { nameSpace: "ssss" };
    private global: GlobalNotifyCenter;
    private _super;
    constructor(context, id, tag, props) {
        super(context, id, tag, props);
        this.init();
        this.context.removeNotifyCenter = this.global.globalRemoveEventTarget(this);
    }
    private init() {
        let has = HMNotifyCenter.notifyCenterMap.has(HMNotifyCenter.nameSpaceObj);
        if (!has) {
            HMNotifyCenter.notifyCenterMap.set(HMNotifyCenter.nameSpaceObj, new GlobalNotifyCenter());
        }
        this.global = HMNotifyCenter.notifyCenterMap.get(HMNotifyCenter.nameSpaceObj);
    }
    override setEventTarget(eventTarget: Function): void {
        super.setEventTarget(eventTarget);
        this.global.globalSetEventTarget(eventTarget, this);
    }
    // 添加事件监听器
    override addEventListener(event: string) {
        this.global.getGlobalAddCenter(event, this);
        super.addEventListener(event);
    }
    // 移除事件监听器
    removeEventListenerX(event: string, center: HMNotifyCenter) {
        center.removeEventListener(event, true);
    }
    override removeEventListener(event: string, update?: boolean) {
        if (update) {
            super.removeEventListener(event);
        }
        else {
            let centerArr: Array<HMNotifyCenter> = this.global.getGlobalRemoveCenter(event);
            if (centerArr && centerArr.length > 0) {
                centerArr.forEach(center => {
                    center.removeEventListenerX(event, center);
                });
            }
        }
    }
    dispatchEvent(eventName: string, ...args: any[]): void {
        super.dispatchEvent(eventName, ...args);
    }
    // 触发事件
    triggerEvent(event: string, value: Object) {
        this.global.triggerEvent(event, value, this);
    }
    removeAllEventListener(event: string) {
        this.global.removeAllEventListener(event);
    }
}
