import { IHummerBaseAttributes } from '../../../Interface/IAttribute';
import { IHummerStyle } from '../../../Interface/IHummerStyle';


export interface IImageStyle extends IHummerStyle {
  // text
  resize? : 'origin' | 'contain' | 'cover' | 'stretch';
}

export interface IImageAttributes extends IHummerBaseAttributes {
  src?:string
  gifSrc?:string
  placeholder?:string,
  failedImage?:string
}