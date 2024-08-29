import { HMComponent } from '../Component';
import { promptAction } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';

export class HMToast extends HMComponent {

  private show(msg: string, duration: number = 2000){

    try {
      promptAction.showToast({
        message: msg,
        duration: duration
      });
    } catch (error) {
      this.context.handleError('toast 失败：'+ error.toString())
    };
  }
}