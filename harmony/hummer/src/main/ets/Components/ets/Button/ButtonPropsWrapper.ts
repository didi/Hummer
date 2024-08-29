import { getVP } from '../../../Utils/Utils';
import { HMNode } from '../../Node';
import { ViewBasePropsWrapper } from '../../ViewPropsWrapper';
import { IButtonStyle, IButtonAttributes } from './IProps';


export class ButtonPropsWrapper extends ViewBasePropsWrapper<IButtonStyle, IButtonAttributes> {

  constructor(public readonly node:HMNode) {
    super(node, node.style, node.attributes);
  }

  public get text() : string {
    if(this.attributes.text){
      return this.attributes.text
    }
    return ''
  }

  public get enable() : boolean {
    if(this.attributes?.enable === false){
      return false
    }
    return true
  }


  public get color() : string {
    if(this.style.color){
      return this.style.color
    }
    return '#000000'
  }



  public get textAlign() : string {
    if(this.style.textAlign){
      return this.style.textAlign
    }
    return 'center'
  }

  public get fontSize() : number | string {
    if(this.style.fontSize){
      return getVP(this.style.fontSize);
    }
    return 16
  }

  public get fontFamily() : string {
    if(this.style.fontFamily){
      return this.style.fontFamily;
    }
    return 'HarmonyOS Sans';
  }

}
