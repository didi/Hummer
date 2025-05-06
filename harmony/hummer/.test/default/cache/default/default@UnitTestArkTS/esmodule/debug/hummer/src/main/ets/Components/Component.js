import { unrecognizedMethod } from '@bundle:com.example.hummer/hummer/ets/Utils/Error';
import { forceToString } from '@bundle:com.example.hummer/hummer/ets/Utils/Utils';
import HMBase from '@bundle:com.example.hummer/hummer/ets/Components/Base';
export class HMComponent extends HMBase {
    invoke(funcName, ...args) {
        /// 不使用
        const props = this[funcName];
        if (props instanceof Function) {
            const func = props;
            try {
                return func.call(this, ...args);
            }
            catch (e) {
                this.context.handleException(forceToString(e));
            }
        }
        else {
            this.context.handleError(unrecognizedMethod(funcName));
        }
    }
}
//# sourceMappingURL=Component.js.map