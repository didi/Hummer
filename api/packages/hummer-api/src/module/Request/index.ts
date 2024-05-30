import { HummerComponent } from "../../HummerComponent"


export class Request extends HummerComponent {

    protected _url: string = '';
    protected _method: string = 'POST';
    protected _timeout: number = 10000;
    protected _header: object | undefined = undefined;
    protected _param: object | undefined = undefined;


    public constructor(props: any = {}) {
        super("Request", props);
    }


    // API地址
    public set url(value: string) {
        this._url = value;
        this.call("setUrl", value);
    }

    public get url() {
        return this._url;
    }

    // 请求方式
    public set method(value: string) {
        this._method = value;
        this.call("setMethod", value);
    }

    public get method() {
        return this._method;
    }

    // 超时时间（单位：毫秒）
    public set timeout(value: number) {
        this._timeout = value;
        this.call("setTimeout", value);
    }

    public get timeout() {
        return this._timeout;
    }

    // 网络请求头部
    public set header(value: object | undefined) {
        this._header = value;
        this.call("setHeader", value);
    }

    public get header() {
        return this._header;
    }

    // 网络请求参数
    public set param(value: object | undefined) {
        this._param = value;
        this.call("setParam", value);
    }

    public get param() {
        return this._param;
    }

    /**
    * 发起网络请求
    * @param callback 请求返回触发的回调,其中参数为request本身
    */
    public send(callback: (response: Response) => void) {
        this.call("send", callback);
    }


}