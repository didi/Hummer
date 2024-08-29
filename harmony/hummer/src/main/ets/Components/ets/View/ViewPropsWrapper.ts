import { IHummerBaseAttributes } from '../../../Interface/IAttribute';
import { IHummerStyle } from '../../../Interface/IHummerStyle';
import { HMNode } from '../../Node';
import { ViewBasePropsWrapper } from '../../ViewPropsWrapper';

export class ViewPropsWrapper extends ViewBasePropsWrapper<IHummerStyle, IHummerBaseAttributes> {

  constructor(public readonly node:HMNode) {
    super(node, node.style, node.attributes);
  }
  get flexDirection(){
    return this.node.style.flexDirection;
  }
  get alignItems(){
    return this.node.style.alignItems;
  }


}
