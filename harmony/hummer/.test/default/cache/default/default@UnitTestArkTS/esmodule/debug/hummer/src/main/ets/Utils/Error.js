export const HUMMER_CALL_CREATE_ERROR = '组件未注册：';
export const HUMMER_CALL_NATIVE_ERROR = '未定义的方法或属性：';
export const HUMMER_NO_UICONTEXT_ERROR = '找不到 uiContext，请检查 HMEntrance 是否存在该变量或是否执行了aboutOnAppear';
export const HUMMER_NO_NAVSTACK_ERROR = '找不到导航栈对象，请检查 HMEntrance.pageData 是否传入了导航对象';
export const HUMMER_UN_SUPPORTED_TYPE_ERROR = '不支持的类型：';
export const HUMMER_CALL_DATA_ERROR = '数据未找到：';
export const HUMMER_INVALID_ARG_ERROR = '参数错误：';
export const HUMMER_DOM_OPERATION_ERROR = 'dom操作错误：';
export function unrecognizedMethod(name) {
    return HUMMER_CALL_NATIVE_ERROR + name;
}
export function componentNotFind(name) {
    return HUMMER_CALL_CREATE_ERROR + name;
}
export function dataNotFind(name) {
    return HUMMER_CALL_DATA_ERROR + name;
}
export function invalidArg(name) {
    return HUMMER_INVALID_ARG_ERROR + name;
}
export function domOperationError(name) {
    return HUMMER_DOM_OPERATION_ERROR + name;
}
//# sourceMappingURL=Error.js.map