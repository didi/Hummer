import { fn } from '../../../Utils/Utils';
import { HMNode, ILayoutInfo } from '../../Node';

export class HMViewNode extends HMNode {

  private _rectCallbacks:Array<fn> = new Array();
  private _isMounted = false;
  override getRect(callback: fn): void {
    if(this._isMounted){
      super.getRect(callback);
    }else{
      this._rectCallbacks.push(callback);
    }
  }
  override onMounted(){
    this._isMounted = true;
    if(this._rectCallbacks.length > 0){
      super.getRect((layoutInfo:ILayoutInfo)=>{
        this._rectCallbacks.forEach((callback:fn)=>{
          callback(layoutInfo)
        })
        this._rectCallbacks = undefined;
      })
    }
  }
}