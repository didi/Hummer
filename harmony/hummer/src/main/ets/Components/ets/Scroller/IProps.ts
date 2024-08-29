import { IHummerBaseAttributes } from '../../../Interface/IAttribute';
import { IHummerStyle } from '../../../Interface/IHummerStyle';
import { HMNode } from '../../Node';


export interface IScrollViewStyle extends IHummerStyle {}


export interface IScrollViewAttributes extends IHummerBaseAttributes {
  refreshView?:HMNode
  loadMoreView?:HMNode
  bounces?:boolean
  showScrollBar?:boolean
}