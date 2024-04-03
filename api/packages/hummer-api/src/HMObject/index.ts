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

    protected props: any
    protected obj: any

    public constructor(tag: string, isApi: boolean = true, props: any) {
        this.tag = tag
        this.name = tag
        this.isApi = isApi
        this.props = props
        if (isApi) {
            this.obj = _Document_.createComponent(tag, props)
        } else {
            this.obj = _Document_.createElement(tag, props)
        }
    }

    public getThis() {
        return this.obj;
    }


    protected call(methodName: string, ...args: any): any {
        return this.obj.invoke(methodName, ...args)
    }




}