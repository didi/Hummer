declare type Length = string | number;

export interface IHummerStyle {

  width?: Length
  height?: Length

  //constraintSize
  minWidth?: Length
  maxWidth?: Length
  minHeight?: Length
  maxHeight?: Length

  marginLeft?: Length
  marginTop?: Length
  marginRight?: Length
  marginBottom?: Length

  paddingLeft?: Length
  paddingTop?: Length
  paddingRight?: Length
  paddingBottom?: Length

  display?: 'flex' | 'none'

  // position
  top?: Length
  left?: Length
  right?: Length
  bottom?: Length

  // flex
  // 布局方式，分相对布局和绝对布局，相对布局即flex布局, 默认 relative
  position?: 'relative' | 'absolute' | 'fixed'

  // 主轴方向, 默认 column
  flexDirection? : 'column' | 'row'

  // 子控件是否折行排列, 默认 NoWrap
  flexWrap? : 'NoWrap' | 'Wrap' | 'WrapReverse'

  // 主轴方向上的子控件排列方式，默认 flex-start
  justifyContent? : 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'

  // 交叉轴方向上的子控件的对齐方式，默认 stretch
  alignItems? : 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'

  //多主轴情况下，交叉轴方向上的子控件的排列方式，默认 flex-start
  alignContent? : 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch'

  // 子控件占有父容器剩余空间的权重，默认 0
  flexGrow? : number

  // 父容器空间不足时，子控件的收缩权重，默认 0
  flexShrink? : number

  flexBasis?: number | string
  // 子控件在交叉轴上的对齐方式，默认
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | 'auto'


  // background
  backgroundColor?: string
  backgroundImage?: string
  // 盒模型模式，默认 'none'
  boxSizing? : 'none' | 'border-box'

  // 四个边的边框类型，默认 'solid'
  borderTopStyle?: 'none' | 'solid' | 'dashed' | 'dotted'
  borderLeftStyle?: 'none' | 'solid' | 'dashed' | 'dotted'
  borderRightStyle?: 'none' | 'solid' | 'dashed' | 'dotted'
  borderBottomStyle?: 'none' | 'solid' | 'dashed' | 'dotted'

  // border
  borderLeftColor?:string
  borderTopColor?:string
  borderRightColor?:string
  borderBottomColor?:string

  borderLeftWidth?:Length
  borderTopWidth?:Length
  borderRightWidth?:Length
  borderBottomWidth?:Length

  borderTopLeftRadius?:Length;
  borderTopRightRadius?:Length;
  borderBottomLeftRadius?:Length;
  borderBottomRightRadius?:Length;

  shadow?:string;
  // gradient
  // linearGradient?: HarmonyType.LinearGradient

  // 透明度，默认 1
  opacity? : number

  visibility?: 'visible' | 'hidden'

  // 控件z轴层级，默认 0
  zIndex?: number

  // 子控件超出父容器部分是否显示，默认 visible
  overflow?:'hidden' | 'visible'

  transform?:string

  transformModel? : ITransform //视图的最终 transform， 动画和 style 叠加的结果
}

export interface ITransform {

  translate? : {x:Length, y:Length}
  scale? : {x:number, y:number}
  rotation? :{x:number, y:number, z:number, angle:Length}
}

export interface IHummerListStyle extends IHummerStyle {
  mode?: 'list' | 'grid' | 'waterfall'
  scrollDirection?: 'vertical' | 'horizontal'
  column?: number
  lineSpacing?: number | string
  itemSpacing?: number | string
  leftSpacing?: number | string
  rightSpacing?: number | string
  topSpacing?: number | string
  bottomSpacing?: number | string
}

export interface IHummerSwiperStyle extends IHummerStyle {
  scrollDirection?: 'vertical' | 'horizontal'
  column?: number
  edgeSpacing?: number | string
  itemSpacing?: number | string
  canLoop?: boolean
  autoPlay?: boolean
  loopInterval?: number
  scaleFactor?: number
  alphaFactor?: number
}