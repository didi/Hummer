import { HMComponent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Component";
import promptAction from "@ohos:promptAction";
import type { BusinessError } from "@ohos:base";
export class HMToast extends HMComponent {
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
