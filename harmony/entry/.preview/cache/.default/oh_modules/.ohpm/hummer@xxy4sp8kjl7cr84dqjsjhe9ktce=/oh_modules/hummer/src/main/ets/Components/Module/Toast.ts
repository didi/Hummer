import { Component } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Component";
import promptAction from "@ohos:promptAction";
import type { BusinessError } from "@ohos:base";
export class HMToast extends Component {
    private show(msg: string, duration: number = 2000) {
        try {
            promptAction.showToast({
                message: msg,
                duration: duration
            });
        }
        catch (error) {
            let message = (error as BusinessError).message;
            let code = (error as BusinessError).code;
            console.error(`showToast args error code is ${code}, message is ${message}`);
        }
        ;
    }
}
