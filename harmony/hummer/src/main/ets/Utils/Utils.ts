import { display } from '@kit.ArkUI';
import { CallEts } from './CallEts';
import { isArray, isUndefined } from './is';

export type fn = (...args: any[]) => any

export type HMAny = any;

export function isEqualArray<T>(arr1:Array<T>, arr2:Array<T>, compareFunc:(item1:T, item2:T)=>Boolean) : boolean {
  if(!arr1 || !arr2){return false}
  if(!isArray(arr1) || !isArray(arr1)){return false}
  if(arr1.length != arr2.length){return false}
  if(arr1 == arr2){return true}
  const length = arr1.length
  for (let index = 0; index < length; index++) {
    const e1 = arr1[index];
    const e2 = arr2[index];
    if(!compareFunc(e1, e2)){
      return false
    }
  }
  return true;
}

export function nextTick(func:Function) {
  setTimeout(func, 0);
}

export function timestamp() : number {
  return +new Date();
}

export function forceToString(value) : string {
  if(value.toString){
    return value.toString();
  }
  return JSON.stringify(value);
}

export function hm2vp (length:string, factor:number = 750) : number {
  const lengthNum = parseFloat(length);
  //todo: 缓存 display
  const px = lengthNum * display.getDefaultDisplaySync().width / factor;
  return CallEts.px2vp(px);
}

export function px2vp (px:number) : number {
  return CallEts.px2vp(px);
}

export function hm2px (length:string, factor:number = 750) : number {
  const lengthNum = parseFloat(length);
  //todo: 缓存 display
  const px = lengthNum * display.getDefaultDisplaySync().width / factor;
  return px
}
export function _getVP(length:string|number, supportPercent=true, defaultValue?:string|number) : number| string | undefined{

  if(isUndefined(length)){
    return undefined
  }
  if (typeof length === 'number') {
    return length;
  }
  const lengthStr:string = length.toLowerCase();
  const lengthNum = parseFloat(lengthStr);
  if(lengthStr.endsWith('hm')){
    return hm2vp(lengthStr);
  }else if(lengthStr.endsWith('px')){
    return CallEts.px2vp(lengthNum);
  }else if(lengthStr.endsWith('%') && supportPercent){
    return lengthStr;
  }else if(!isUndefined(lengthNum) && !isNaN(lengthNum)){
    return lengthNum;
  }
  if(!isUndefined(defaultValue)){
    return defaultValue;
  }
  return undefined
}

export function getVPNoPercent(length:string|number) : number | undefined;
export function getVPNoPercent(length:string|number, defaultValue:string|number) : number;
export function getVPNoPercent(length:string|number, defaultValue?:string|number) : number | undefined {
  return _getVP(length, false, defaultValue) as number | undefined;
}

export function getVP(length:string|number) : number | string | undefined;
export function getVP(length:string|number, defaultValue:string|number) : number | string;
export function getVP(length:string|number, defaultValue?:string|number) : number | string | undefined{

  return _getVP(length, true, defaultValue);
}

export function getPX (length:string|number) : number | undefined{
  if(isUndefined(length)){
    return undefined
  }

  if (typeof length === 'number') {
    return CallEts.vp2px(length);
  }
  const lengthStr:string = length.toLowerCase();
  const lengthNum = parseFloat(lengthStr);
  if(lengthStr.endsWith('hm')){
    return hm2px(lengthStr);
  }else if(lengthStr.endsWith('px')){
    return lengthNum;
  }else if(!isUndefined(lengthNum)){
    return lengthNum;
  }
  return undefined
}

export function convertColorToARGB(color: string, defaultColor?: string) : string | undefined{
  if (color === undefined) return defaultColor;
  if(!color.startsWith('#')){
    return color;
  }
  if(color.length <= 7){
    return color;
  }

  const rgb = color.substring(1, 7);
  const alpha = color.substring(7, 9);
  const argbColor = '#' + alpha + rgb;

  return argbColor;
}
