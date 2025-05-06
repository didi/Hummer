import display from "@ohos:display";
import { CallEts } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/CallEts";
export type fn = (...args: any[]) => any;
export type HMAny = any;
export function isUndefined(o: unknown): o is undefined {
    return typeof o === 'undefined';
}
export function nextTick(func: Function) {
    setTimeout(func, 0);
}
export function timestamp(): number {
    return +new Date();
}
export function forceToString(value): string {
    if (value.toString) {
        return value.toString();
    }
    return JSON.stringify(value);
}
export function hm2vp(length: string, factor: number = 750): number {
    const lengthNum = parseFloat(length);
    //todo: 缓存 display
    const px = lengthNum * display.getDefaultDisplaySync().width / factor;
    return CallEts.px2vp(px);
}
export function getVP(length: string | number): number | undefined {
    if (isUndefined(length)) {
        return undefined;
    }
    if (typeof length === 'number') {
        return length;
    }
    const lengthStr: string = length.toLowerCase();
    const lengthNum = parseFloat(lengthStr);
    if (lengthStr.endsWith('hm')) {
        return hm2vp(lengthStr);
    }
    else if (lengthStr.endsWith('px')) {
        return CallEts.px2vp(lengthNum);
    }
    else if (!isUndefined(lengthNum)) {
        return lengthNum;
    }
    return undefined;
}
export function convertColorToARGB(color: string, defaultColor: number = 0x00000000): number | string {
    if (color === undefined)
        return defaultColor;
    if (!color.startsWith('#')) {
        return color;
    }
    if (color.length <= 7) {
        return color;
    }
    const rgb = color.substring(1, 7);
    const alpha = color.substring(7, 9);
    const argbColor = '#' + alpha + rgb;
    return argbColor;
}
