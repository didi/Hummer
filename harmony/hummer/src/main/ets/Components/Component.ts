import { unrecognizedMethod } from '../Utils/Error';
import { forceToString } from '../Utils/Utils';
import HMBase from './Base';
import { IComponentInstruction } from './IPlatformInst';

export class HMComponent extends HMBase implements IComponentInstruction {

  invoke(funcName: string, ...args: any[]): any {
    /// 不使用
    const props = this[funcName];
    if (props instanceof Function) {
      const func = props as Function;
      try {
        return func.call(this, ...args);
      } catch (e) {
        this.context.handleException(forceToString(e));
      }
    } else {
      this.context.handleError(unrecognizedMethod(funcName));
    }
  }
}