export function isString(o) {
    return typeof o === 'string';
}
export function isBoolean(o) {
    return o === true || o === false;
}
export function isUndefined(o) {
    return typeof o === 'undefined';
}
export function isNumber(o) {
    return typeof o === 'number';
}
export function isNull(o) {
    return o === null;
}
export function isObject(o) {
    return o !== null && typeof o === 'object';
}
export function isFunction(o) {
    return typeof o === 'function';
}
export const isArray = Array.isArray;
//# sourceMappingURL=is.js.map