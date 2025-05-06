import { unrecognizedMethod } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/Error";
import { forceToString } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/Utils";
import HMBase from "@bundle:com.example.hummer/entry@hummer/ets/Components/Base";
import type { IComponentInstruction } from './IPlatformInst';
export class HMComponent extends HMBase implements IComponentInstruction {
    invoke(funcName: string, ...args: any[]): any {
        /// 不使用
        const props = this[funcName];
        if (props instanceof Function) {
            const func = props as Function;
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
