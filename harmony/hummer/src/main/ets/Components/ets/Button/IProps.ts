import { IHummerBaseAttributes } from '../../../Interface/IAttribute';
import { IHummerStyle } from '../../../Interface/IHummerStyle';



export interface IButtonStyle extends IHummerStyle {
  // text
  color?:	string
  textAlign?:	'left' | 'center' | 'right'
  fontFamily?:	string
  fontSize?:	string | number
}


export interface IButtonAttributes extends IHummerBaseAttributes {
  text?:string
  enable?: boolean
}