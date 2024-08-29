import { IHummerBaseAttributes } from '../../../Interface/IAttribute';
import { IHummerStyle } from '../../../Interface/IHummerStyle';


export interface IHummerTextInputStyle extends IHummerStyle {
  color?: string
  textAlign?:' left' | 'center' | 'right'
  placeholderColor?: string
  cursorColor?: string
  fontSize?: number | string
  fontFamily?: string
  type?: string
  maxLength?: number
  returnKeyType?: string
  textLineClamp?:number
}

export interface IInputAttributes extends IHummerBaseAttributes {
  placeholder?:string
  text?:string
  focused?:boolean
}