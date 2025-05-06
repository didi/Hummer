export declare class HMObject {
    tag: string;
    name: string;
    isApi: boolean;
    private __props__;
    private __obj__;
    constructor(tag: string, isApi: boolean | undefined, props: any);
    static getShadowObject(obj: any): any;
    static getOriginObject(obj: any): any;
    getThis(): any;
    getOriginObject(): any;
    getCreateProps(): any;
    protected call(methodName: string, ...args: any): any;
}
