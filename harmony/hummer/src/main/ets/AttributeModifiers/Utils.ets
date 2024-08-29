import { convertColorToARGB, getVP, getVPNoPercent } from '../Utils/Utils'
import { IHummerStyle } from '../Interface/IHummerStyle'
import { isUndefined } from '../Utils/is';

const MaxLength = 99999999 // 文本的最大长度

export class FlexManager {

  static isNoWrap(style?:IHummerStyle) : Boolean {
    const wrap: FlexWrap | undefined = FlexManager.flexWrap(style?.flexWrap);
    const isNoWrap = isUndefined(wrap) ? true : wrap == FlexWrap.NoWrap
    return isNoWrap;
  }

  static canConvertToRow(style?:IHummerStyle) : Boolean {
    const isNoWrap = FlexManager.isNoWrap(style);
    if(!isNoWrap){
      return false;
    }
    const direction: FlexDirection | undefined = FlexManager.direction(style?.flexDirection);
    return isUndefined(direction) ? false : direction == FlexDirection.Row
  }

  static canConvertToColumn(style?:IHummerStyle) : Boolean {
    const isNoWrap = FlexManager.isNoWrap(style);
    if(!isNoWrap){
      return false;
    }
    const direction: FlexDirection | undefined = FlexManager.direction(style?.flexDirection);
    return isUndefined(direction) ? true : direction == FlexDirection.Column
  }

  // alignItems? : 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  static convertFlexAlignItemsToColumnOrRow(direction : string = 'column', alignItems: string='stretch'): 	VerticalAlign | HorizontalAlign {
    if (direction === 'column') {
      switch (alignItems) {
        case 'center':
          return HorizontalAlign.Center
        case 'flex-end':
          return HorizontalAlign.End
        default:
          return HorizontalAlign.Start
      }
    } else {
      switch (alignItems) {
        case 'center':
          return VerticalAlign.Center
        case 'flex-end':
          return VerticalAlign.Bottom
        default:
          return VerticalAlign.Top
      }
    }
  }
  static flexOptions(style?:IHummerStyle) : FlexOptions {

    if(isUndefined(style)){
      return {};
    }
    const justifyContent: FlexAlign | undefined = FlexManager.justifyContent(style.justifyContent);
    const alignContent : FlexAlign | undefined = FlexManager.alignContent(style.alignContent);

    const alignItems: ItemAlign | undefined = FlexManager.alignItems(style.alignItems);
    const wrap: FlexWrap | undefined = FlexManager.flexWrap(style.flexWrap);
    const direction: FlexDirection | undefined = FlexManager.direction(style.flexDirection);

    return {
      direction: !isUndefined(direction) ? direction: FlexDirection.Column,
      wrap : !isUndefined(wrap) ? wrap : FlexWrap.NoWrap,
      justifyContent: !isUndefined(justifyContent) ? justifyContent : FlexAlign.Start,
      alignItems : !isUndefined(alignItems) ? alignItems : ItemAlign.Stretch,
      alignContent : !isUndefined(alignContent) ? alignContent : FlexAlign.Start
    }
  }

  static flexAlign (value: string | number | undefined): FlexAlign | undefined {
    switch (value) {
      case 'flex-end':
        return FlexAlign.End
      case 'flex-start':
        return FlexAlign.Start
      case 'center':
        return FlexAlign.Center
      case 'space-between':
        return FlexAlign.SpaceBetween
      case 'space-around':
        return FlexAlign.SpaceAround
      case 'space-evenly':
        return FlexAlign.SpaceEvenly
      default:
        return undefined
    }
  }

  static reverseFlexAlign (value: FlexAlign): string {
    switch (value) {
      case FlexAlign.Start:
        return 'flex-start'
      case FlexAlign.End:
        return 'flex-end'
      case FlexAlign.Center:
        return 'center'
      case FlexAlign.SpaceBetween:
        return 'space-between'
      case FlexAlign.SpaceAround:
        return 'space-around'
      case FlexAlign.SpaceEvenly:
        return 'space-evenly'
      default:
        return ''
    }
  }

  static direction (value?: string): FlexDirection|undefined {
    switch (value) {
      case 'row': return FlexDirection.Row
      case 'row-reverse': return FlexDirection.RowReverse
      case 'column-reverse': return FlexDirection.ColumnReverse
      default: return undefined
    }
  }

  static reverseDirection (value: FlexDirection): string {
    switch (value) {
      case FlexDirection.Row: return 'row'
      case FlexDirection.RowReverse: return 'row-reverse'
      case FlexDirection.Column: return 'column'
      case FlexDirection.ColumnReverse: return 'column-reverse'
      default: return ''
    }
  }

  static itemAlign (value: string | number | undefined): ItemAlign | undefined {
    switch (value) {
      case 'flex-start':
        return ItemAlign.Start
      case 'flex-end':
        return ItemAlign.End
      case 'center':
        return ItemAlign.Center
      case 'stretch':
        return ItemAlign.Stretch
      case 'baseline':
        return ItemAlign.Baseline
      default:
        return undefined
    }
  }

  static reverseItemAlign (value: ItemAlign): string {
    switch (value) {
      case ItemAlign.Start:
        return 'flex-start'
      case ItemAlign.End:
        return 'flex-end'
      case ItemAlign.Center:
        return 'center'
      case ItemAlign.Stretch:
        return 'stretch'
      case ItemAlign.Baseline:
        return 'baseline'
      case ItemAlign.Auto:
        return 'auto'
      default:
        return ''
    }
  }

  static justifyContent (value?: string): FlexAlign | undefined {
    return FlexManager.flexAlign(value)
  }

  static alignItems (value?: string): ItemAlign | undefined{
    return FlexManager.itemAlign(value)
  }

  static alignSelf (value: string): ItemAlign | undefined {
    return FlexManager.itemAlign(value)
  }

  static flexWrap (value?: string): FlexWrap | undefined{
    switch (value) {
      case 'nowrap':
        return FlexWrap.NoWrap
      case 'wrap':
        return FlexWrap.Wrap
      case 'wrap-reverse':
        return FlexWrap.WrapReverse
      default:
        return undefined
    }
  }

  static reverseFlexWrap (value: FlexWrap): string {
    switch (value) {
      case FlexWrap.NoWrap:
        return 'nowrap'
      case FlexWrap.Wrap:
        return 'wrap'
      case FlexWrap.WrapReverse:
        return 'wrap-reverse'
      default:
        return 'nowrap'
    }
  }

  static alignContent (value? : string): FlexAlign | undefined {
    return FlexManager.flexAlign(value)
  }

  static flexSize (style: Record<string, string | number> = {}): [number, number, number | string] {
    const flex = style.flex
    const flexGrow = style.flexGrow || 0
    const flexShrink = style.flexShrink || 0
    const flexBasis = style.flexBasis || 'auto'
    let res: [number, number, number | string] = [Number(flexGrow), Number(flexShrink), flexBasis]

    if (typeof flex === 'number') {
      res = [flex, 1, 0]
    } else if (flex === 'auto') {
      res = [1, 1, 'auto']
    } else if (flex === 'none') {
      res = [0, 0, 'auto']
    } else if (typeof flex === 'string') {
      const FlexList = flex.replace(new RegExp('\\s+'), ' ').split(' ')
      FlexList.forEach((item, index) => {
        res[index] = index < 2 ? Number(item) : item
      })
    }
    return res
  }
}

export function getBorderStyle(border?:string) : BorderStyle | undefined {
  if(border == 'none'){
    return BorderStyle.Dotted
  }else if(border == 'solid'){
    return BorderStyle.Solid
  }else if(border == 'dashed'){
    return BorderStyle.Dashed
  }else if(border == 'dotted'){
    return BorderStyle.Dotted
  }
  return undefined
}


export function getDisplay(type?:string) : 'none'| 'flex' | undefined {
  if(type == 'none'){
    return 'none'
  }else if(type == 'flex'){
    return 'flex'
  }
  return undefined
}

export function getPosition(type?:string) : 'absolute'| 'fixed' | 'relative' | undefined {
  if(type == 'absolute'){
    return 'absolute'
  }else if(type == 'fixed'){
    return 'fixed'
  }else if(type == 'relative'){
    return 'relative'
  }
  return undefined
}
export function getNodeMarginOrPaddingData (dataValue: string) : Padding | undefined {
  let res: Padding = {}
  if (dataValue) {
    const values = dataValue.trim().split(new RegExp('\\s+'))
    switch (values.length) {
      case 1:
        res = { top: values[0], right: values[0], bottom: values[0], left: values[0] }
        break
      case 2:
        res = { top: values[0], right: values[1], bottom: values[0], left: values[1] }
        break
      case 3:
        res = { top: values[0], right: values[1], bottom: values[2], left: values[1] }
        break
      case 4:
        res = { top: values[0], right: values[1], bottom: values[2], left: values[3] }
        break
      default:
        break
    }
    Object.keys(res).forEach(key => {
      const exec = `${res[key]}`.match(new RegExp('/(\d+)(px)$/'))
      if (exec && values.length > 1) {
        res[key] = getVP(exec[1])
      }
    })
  }
  return res
}
//            shadow: '5px      5px      10px #000000'，
// 控件阴影（属性分别为：水平偏移量，垂直偏移量，模糊度，颜色）
export function getShadow (val?:string) : ShadowOptions | undefined {
  if (typeof val !== 'string') {
    return undefined;
  }
  const styles = val.split(" ");
  if(styles.length!=4){
    return undefined
  }
  const offsetX = vp2px(getVPNoPercent(styles[0]));
  const offsetY = vp2px(getVPNoPercent(styles[1]));
  const radius = vp2px(getVPNoPercent(styles[2]));
  const color = styles[3];
  if(isUndefined(offsetX) || isUndefined(offsetY) || isUndefined(radius) || isUndefined(color)){
    return undefined
  }
  return {
    radius: radius,
    color: color,
    offsetX: offsetX,
    offsetY: offsetY,
  }
}


//linear-gradient(90deg #FF000080 #00FF0080)
export function getLinearGradient(color?:string) : LinearGradient | undefined {
  if(!color){
    return undefined
  }
  if(!color.startsWith('linear-gradient')){
    return undefined
  }
  const start = color.indexOf('(');
  const end = color.indexOf(')')
  if(start < 0 || end < 0){
    return undefined;
  }
  const colorData = color.substring(start+1, end);
  const colors = colorData.split(' ');
  if(colors.length != 3){
    return undefined;
  }
  const color1 = convertColorToARGB(colors[1])
  const color2 = convertColorToARGB(colors[2])
  if(color1 && color2){
    const linearGradient:LinearGradient = {
      angle: colors[0], // 渐变方向
      colors: [[color1 , 0], [color2 , 1]] // 数组末尾元素占比小于1时满足重复着色效果
    }
    return linearGradient
  }
  return undefined
}

export function getTextAlign(textAlign?:string) : TextAlign | undefined {
  if(textAlign == 'left'){
    return TextAlign.Start
  }else if(textAlign == 'center'){
    return TextAlign.Center
  }else if(textAlign == 'right'){
    return TextAlign.End
  }
  return undefined
}

export function getTextVerticalAlign(textVerticalAlign?:string) : Alignment | undefined {
  if(textVerticalAlign == 'top'){
    return Alignment.Top
  }else if(textVerticalAlign == 'center'){
    return Alignment.Center
  }else if(textVerticalAlign == 'bottom'){
    return Alignment.Bottom
  }
  return Alignment.Center
}


export function getMaxLength(maxLength?:number | undefined) : number {
   if(maxLength === 0) return MaxLength
   if(maxLength)  return maxLength
   return MaxLength
}


export function getTextOverflow(textOverflow?:string) : TextOverflow | undefined {
  if(textOverflow == 'clip'){
    return TextOverflow.Clip
  }else if(textOverflow == 'ellipsis'){
    return TextOverflow.Ellipsis
  }
  return TextOverflow.Ellipsis
}

export function getTextDecoration(textDecoration?:string) : TextDecorationType | undefined {
  if(textDecoration == 'none'){
    return TextDecorationType.None
  }else if(textDecoration == 'underline'){
    return TextDecorationType.Underline
  }else if(textDecoration == 'line-through'){
    return TextDecorationType.LineThrough
  }
  return undefined
}

export function getCopyOptions(textCopyEnable?: boolean) : CopyOptions {
  if (textCopyEnable) {
    return CopyOptions.LocalDevice
  }
  return CopyOptions.None
}

export function getFontStyle(fontStyle?:string) : FontStyle | undefined {
  if(fontStyle == 'normal'){
    return FontStyle.Normal
  }else if(fontStyle == 'italic'){
    return FontStyle.Italic
  }
  return FontStyle.Normal
}

export function getFontWeight(fontWeight?:string) : FontWeight | undefined {
  if(fontWeight == 'normal'){
    return FontWeight.Normal
  }else if(fontWeight == 'bold'){
    return FontWeight.Bold
  }
  return FontWeight.Normal
}


export function getImageSpanAlignment(imageAlign?: 'baseline' | 'top' | 'center' | 'bottom') : ImageSpanAlignment | undefined {
  if(imageAlign == 'baseline'){
    return ImageSpanAlignment.BASELINE
  }else if(imageAlign == 'top'){
    return ImageSpanAlignment.TOP
  }else if(imageAlign == 'center'){
    return ImageSpanAlignment.CENTER
  }else if(imageAlign == 'bottom'){
    return ImageSpanAlignment.BOTTOM
  }
  return ImageSpanAlignment.BASELINE
}

export function getListDirection(scrollDirection?: 'vertical' | 'horizontal') : Axis | undefined {
  if(scrollDirection == 'vertical'){
    return Axis.Vertical
  }else if(scrollDirection == 'horizontal'){
    return Axis.Horizontal
  }
  return Axis.Vertical
}

export function getScrollBarState(showScrollBar?: boolean | undefined) : BarState | undefined {
  if(showScrollBar === undefined){
    return BarState.On
  } else if(showScrollBar) {
    return BarState.On
  } else {
    return BarState.Off
  }
}
export function getEdgeEffect(bounces?: boolean | undefined) : EdgeEffect | undefined {
  if(bounces === undefined){
    return EdgeEffect.None
  } else if(bounces) {
    return EdgeEffect.Spring
  } else {
    return EdgeEffect.None
  }
}

export function usePosition(style?:IHummerStyle) : boolean{

  if(style?.position === 'absolute' || style?.position === 'fixed'){
    return true
  }
  return false
}

// 只有在 view 中并且 没有宽或高时，才使用 RelativeContainer
export function useRelativeContainer(style?:IHummerStyle) : boolean{

  if(style?.position === 'absolute' || style?.position === 'fixed'){
    const top = getVP(style.top)
    const right = getVP(style.right)
    const bottom = getVP(style.bottom)
    const left = getVP(style.left)
    if(isUndefined(style?.width) && !isUndefined(left) && !isUndefined(right)) {
      return true
    }else if(isUndefined(style?.height) && !isUndefined(top) && !isUndefined(bottom)){
      return true
    }
  }
  return false
}