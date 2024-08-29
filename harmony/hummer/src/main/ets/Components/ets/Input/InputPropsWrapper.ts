import { convertColorToARGB, getVP } from '../../../Utils/Utils';
import { HMNode } from '../../Node';
import { ViewBasePropsWrapper } from '../../ViewPropsWrapper';
import { IHummerTextInputStyle, IInputAttributes } from './IProps';
import { InputEventName } from './Event';
import { isUndefined } from '../../../Utils/is';

export class InputPropsWrapper extends ViewBasePropsWrapper<IHummerTextInputStyle, IInputAttributes> {

  constructor(node:HMNode) {
    super(node, node.style, node.attributes);
  }

  protected reactiveEvents(): string[] {
    return [InputEventName]
  }

  public get text() : string {

    if(isUndefined(this.attributes?.text)){
      return '';
    }
    return this.attributes?.text
  }

  public get placeholder() : string {

    if(isUndefined(this.attributes?.placeholder)){
      return '';
    }
    return this.attributes?.placeholder
  }


  public get attrFocused() : boolean | undefined{

    return this.attributes?.focused
  }

  public get focused() : boolean {

    if(isUndefined(this.attributes?.focused)){
      return false;
    }
    return this.attributes?.focused
  }


  public get maxLength() : number {

    if(isUndefined(this.style?.maxLength)){
      return -1;
    }
    return this.style?.maxLength
  }

  public get keyboardType() : string {

    if(isUndefined(this.style?.type)){
      return 'default';
    }
    return this.style?.type
  }

  public get returnKeyType() : string {

    if(isUndefined(this.style?.returnKeyType)){
      return 'done';
    }
    return this.style?.returnKeyType
  }

  public get textAlign() : string {

    if(isUndefined(this.style?.textAlign)){
      return 'left';
    }
    return this.style?.textAlign
  }

  public get placeholderColor() : string {

    if(isUndefined(this.style?.placeholderColor)){
      return '#999999';
    }
    return convertColorToARGB(this.style?.placeholderColor)
  }

  public get cursorColor() : string {

    if(isUndefined(this.style?.cursorColor)){
      return '#007AFF';
    }
    return convertColorToARGB(this.style?.cursorColor)
  }

  public get fontSize() : number | string {

    const size = this.style?.fontSize;
    if(isUndefined(size)){
      return 16;
    }
    return size;
  }


  public get color() : string {

    if(isUndefined(this.style?.color)){
      return '#000000';
    }
    return convertColorToARGB(this.style?.color)
  }


  public get fontFamily() : string {

    if(isUndefined(this.style?.fontFamily)){
      return 'New Times Roma';
    }
    return this.style?.fontFamily
  }

  public get textLineClamp() : number {

    if(isUndefined(this.style?.textLineClamp)){
      return 0;
    }
    return this.style?.textLineClamp
  }



}
