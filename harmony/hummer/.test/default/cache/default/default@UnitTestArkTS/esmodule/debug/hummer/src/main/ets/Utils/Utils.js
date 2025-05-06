import display from '@ohos:display';
import { CallEts } from '@bundle:com.example.hummer/hummer/ets/Utils/CallEts';
import { isArray, isUndefined } from '@bundle:com.example.hummer/hummer/ets/Utils/is';
export function isEqualArray(arr1, arr2, compareFunc) {
    if (!arr1 || !arr2) {
        return false;
    }
    if (!isArray(arr1) || !isArray(arr1)) {
        return false;
    }
    if (arr1.length != arr2.length) {
        return false;
    }
    if (arr1 == arr2) {
        return true;
    }
    const length = arr1.length;
    for (let index = 0; index < length; index++) {
        const e1 = arr1[index];
        const e2 = arr2[index];
        if (compareFunc(e1, e2)) {
            return false;
        }
    }
    return true;
}
export function nextTick(func) {
    setTimeout(func, 0);
}
export function timestamp() {
    return +new Date();
}
export function forceToString(value) {
    if (value.toString) {
        return value.toString();
    }
    return JSON.stringify(value);
}
export function hm2vp(length, factor = 750) {
    const lengthNum = parseFloat(length);
    //todo: 缓存 display
    const px = lengthNum * display.getDefaultDisplaySync().width / factor;
    return CallEts.px2vp(px);
}
export function hm2px(length, factor = 750) {
    const lengthNum = parseFloat(length);
    //todo: 缓存 display
    const px = lengthNum * display.getDefaultDisplaySync().width / factor;
    return px;
}
export function getVP(length) {
    if (isUndefined(length)) {
        return undefined;
    }
    if (typeof length === 'number') {
        return length;
    }
    const lengthStr = length.toLowerCase();
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
export function getPX(length) {
    if (isUndefined(length)) {
        return undefined;
    }
    if (typeof length === 'number') {
        return CallEts.vp2px(length);
    }
    const lengthStr = length.toLowerCase();
    const lengthNum = parseFloat(lengthStr);
    if (lengthStr.endsWith('hm')) {
        return hm2px(lengthStr);
    }
    else if (lengthStr.endsWith('px')) {
        return lengthNum;
    }
    else if (!isUndefined(lengthNum)) {
        return lengthNum;
    }
    return undefined;
}
export function convertColorToARGB(color, defaultColor) {
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
//# sourceMappingURL=Utils.js.map