const { document: _Document_ } = __Hummer__

//***********************************************/
//
//    引擎操作接口挂载点全局上的 ”__hummer__“上
//
//***********************************************/

export class HMObject {

    public tag: string
    public name: string
    public isApi: boolean

    private __props__: any
    private __obj__: any

    public constructor(tag: string, isApi: boolean = true, props: any) {
        this.tag = tag
        this.name = tag
        this.isApi = isApi
        this.__props__ = props
        if (isApi) {
            this.__obj__ = _Document_.createComponent(tag, props)
            this.__obj__.__shadow__ = this;
        } else {
            this.__obj__ = _Document_.createElement(tag, props)
            this.__obj__.__shadow__ = this;
        }
    }

    public static getShadowObject(obj: any) {
        if (obj && obj.__shadow__) {
            return obj.__shadow__;
        }
        return undefined;
    }

    public static getOriginObject(obj: any) {
        if (obj && obj.__obj__) {
            return obj.__obj__;
        }
    }

    //废弃方法，用“getOriginObject()”替代
    public getThis() {
        return this.__obj__;
    }

    public getOriginObject() {
        return this.__obj__;
    }

    public getCreateProps() {
        return this.__props__;
    }

    protected call(methodName: string, ...args: any): any {
        return this.__obj__.invoke(methodName, ...args)
    }




}