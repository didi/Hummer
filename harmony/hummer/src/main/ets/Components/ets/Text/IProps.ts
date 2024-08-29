import { IHummerBaseAttributes } from '../../../Interface/IAttribute';
import { IHummerStyle } from '../../../Interface/IHummerStyle';


export interface IHummerTextStyle extends IHummerStyle {
  // text
  color?: string
  fontSize?: number | string //todo: lenght
  fontStyle?: 'normal' | 'italic'
  fontWeight?: 'normal' | 'bold'
  fontFamily?: string
  textAlign?:' left' | 'center' | 'right'
  textVerticalAlign?: 'top' | 'center' | 'bottom'
  textDecoration?: 'none' | 'underline' | 'line-through'
  textOverflow?: 'clip' | 'ellipsis'
  // lineHeight?: string | number //todo: lenght
  textLineClamp?: number
  letterSpacing?: number
  lineSpacingMulti?: number
}

export interface IHummerTextAttributes extends IHummerBaseAttributes {
  text?:string
  richText? : IRichTextAttributes | (IRichTextAttributes | string)[] | undefined
  textCopyEnable?:boolean
}

export interface IRichTextAttributes {
  text?: string;
  color?: string;
  backgroundColor?: string;
  fontFamily?: string;
  fontSize?: string | number;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline' | 'line-through';
  image?: string;
  imageWidth?: string | number;
  imageHeight?: string | number;
  imageAlign?: 'baseline' | 'top' | 'center' | 'bottom';
  href?: string;
  hrefColor?: string;
}
