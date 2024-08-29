import { HMNode } from '../../Node';
import { ViewBasePropsWrapper } from '../../ViewPropsWrapper';
import { IImageAttributes, IImageStyle } from './IProps';

export class ImagePropsWrapper extends ViewBasePropsWrapper<IImageStyle, IImageAttributes> {

  constructor(public readonly node:HMNode) {
    super(node, node.style, node.attributes);
  }

  public get src(){
    return this.attributes.src;
  }

  public get gifSrc(){
    return this.attributes.gifSrc;
  }

  public get resize(){
    return this.style.resize
  }

}
