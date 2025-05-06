import type { IHummerStyle } from '../Style/IHummerStyle';
import type { fn } from '../Utils/Utils';
export enum InvokeType {
    Common = 0,
    Render = 1
}
export enum MethodType {
    Delete = "delete",
    New = "new",
    Call = "call"
}
export declare class External {
    public readonly id: number;
    public readonly tag: string;
    public __nativeHandle__: object;
}
type AttributesType = Record<string, any>;
export interface IPlatformInst<T> {
    /**
     * Hummer Core 平台指令
     * @param { type } type - InvokeType,
     * @param { objId } objId - number，对象id，
     * @param { methodType } methodType - MethodType
     * @param { componentName } componentName - string，组件名
     * @param { methodName } methodName - string, 方法名称,创建组件和销毁组件时为null，调用方法时一定有值（方法名称
     * @param { args } args - Any[], 传递给方法的参数。
     */
    invoke(type: InvokeType, thisHandle: T, methodType: MethodType, componentName: string, methodName?: string, ...args: any[]): undefined | any;
}
/**
 * 鸿蒙运行时 <---> 鸿蒙平台：参数传递为 JS 直接传递
 * HummerCore <---> 鸿蒙平台：参数传递为 对象映射+标准对象复制
 *
 *                  tenon
 * -----------------------------------------------
 *        JS                    JS              ｜
 *                                              ｜
 *       c++               harmonyRuntime       ｜   bridge
 *                                              ｜
 *        JS                    JS              ｜
 * -----------------------------------------------
 *    id+对象映射             对象属性挂载
 *
 *              平台对象（model）
 *
 *        harmony components（element）
 *
 */
export interface IPlatformRenderInst<T> {
    create(node: T, ...args: any[]): void;
    delete(node: T, ...args: any[]): void;
    appendChild(thisObject: T, child: T): void;
    removeChild(thisObject: T, child: T): void;
    removeAll(thisObject: T): void;
    /**
     * 在某个节点之前插入节点
     * @param { thisId } number - 当前视图id,
     * @param { nodeId } number - 新视图id
     * @param { childId } number - 已经存在（被插入）的视图id
     */
    insertBefore(thisObject: T, node: T, child: T): void;
    /**
     * 替换某个视图
     * @param { thisId } number - 当前视图id,
     * @param { nodeId } number - 新视图id
     * @param { childId } number - 已经存在（被替换）的视图id
     */
    replaceChild(thisObject: T, node: T, child: T): void;
    render(node: T): void;
    // setAttributes(thisId:number* this,HMValue * argv);
    setStyle(thisObject: T, style: IHummerStyle);
    setEventTarget(thisObject: T, eventTarget: Function);
    addEventListener(thisObject: T, event: string);
    removeEventListener(thisObject: T, event: string);
    setAttributes(thisObject: T, attrs: AttributesType);
    getAttribute(thisObject: T, key: string, callback: fn);
    getReact(thisObject: T, callback: fn);
    etsInvoke(thisHandle: T, methodName?: string, ...args: any[]): undefined | any;
}
