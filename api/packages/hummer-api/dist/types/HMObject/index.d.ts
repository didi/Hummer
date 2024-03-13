export declare class HMObject {
    tag: string;
    name: string;
    isApi: boolean;
    protected props: any;
    protected obj: any;
    constructor(tag: string, isApi: boolean | undefined, props: any);
    getThis(): any;
    protected call(methodName: string, ...args: any): any;
}
