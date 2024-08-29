import { HMNode } from './../../Node';
import { fn } from '../../../Utils/Utils';

export class ViewPagerNode extends HMNode {
  triggerItemView?: fn
  triggerPageChange?: fn
  triggerItemClick?: fn
  // TODO:
  onPageScrollCallback?: fn
  // TODO:
  onPageScrollStateChangeCallback?: fn
  onItemView(callback: fn){
    this.triggerItemView = callback;
  }
  onPageChange(callback: fn){
    this.triggerPageChange = callback;
  }
  onItemClick(callback: fn) {
    this.triggerItemClick = callback;
  }
}