import HashMap from "@ohos:util.HashMap";
import type { HMNotifyCenter } from './NotifyCenter';
export class GlobalNotifyCenter {
    private targets: Array<HMNotifyCenter> = new Array();
    private targetsMap: HashMap<string, Array<HMNotifyCenter>> = new HashMap();
    getGlobalAddCenter(event: string, center: HMNotifyCenter) {
        if (this.targetsMap.hasKey(event)) {
            this.targetsMap.get(event).push(center);
        }
        else {
            this.targetsMap.set(event, [center]);
        }
    }
    // 获取待移除的center
    getGlobalRemoveCenter(event: string): Array<HMNotifyCenter> {
        let center;
        if (this.targetsMap.hasKey(event)) {
            center = this.targetsMap.get(event);
            this.targetsMap.remove(event);
        }
        else {
            center = [];
        }
        return center;
    }
    // 页面销毁时候执行
    globalRemoveEventTarget(center: HMNotifyCenter) {
        return function (): void {
            let index = this.targets.indexOf(center);
            if (index > -1) {
                this.targets.splice(index, 1);
            }
            // 移除center
            for (let item of this.targetsMap) {
                item[1].forEach((middle, index) => {
                    let _index = 0;
                    middle.forEach((inner, innerIndex) => {
                        if (inner === center) {
                            _index = index;
                            return;
                        }
                    });
                    middle.splice(_index, 1);
                });
            }
        };
    }
    globalSetEventTarget(eventTarget: Function, center: HMNotifyCenter): void {
        this.targets.push(center);
    }
    // 触发事件
    triggerEvent(event: string, value: Object, triggerCenter: HMNotifyCenter) {
        this.targets.forEach((center) => {
            if (this.targetsMap.hasKey(event)) {
                center.dispatchEvent(event, value);
            }
        });
    }
    removeAllEventListener(event: string) {
        this.targets.forEach((center) => {
            if (this.targetsMap.hasKey(event)) {
                center.removeEventListenerX(event, center);
            }
        });
        this.targetsMap.remove(event);
    }
}
