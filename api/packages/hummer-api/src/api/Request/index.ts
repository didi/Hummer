import { HummerComponent } from "../../HummerComponent"

const HUMMER = __Hummer__;
export class Request extends HummerComponent {

    protected _url: string = '';
    protected _method: string = 'POST';
    protected _timeout: number = 10000;
    protected _header: object = {};
    protected _param: object = {};



    public constructor(props: any = {}) {
        super("Request", props);
    }


    protected static newInstance(): Request {
        return new Request();
    }


    protected static checkInstance() {
        if (!HUMMER.__request__) {
            HUMMER.__request__ = Request.newInstance();
        }
    }

    static get instance(): Request {
        return HUMMER.__request__
    }

    // API地址
    set url(value: string) {
        this._url = value;
        this.call("setUrl", value);
    }

    // 请求方式
    set method(value: string) {
        this._method = value;
        this.call("setMethod", value);
    }

    // 超时时间（单位：毫秒）
    set timeout(value: number) {
        this._timeout = value;
        this.call("setTimeout", value);
    }

    // 网络请求头部
    set header(value: object) {
        this._header = value;
        this.call("setHeader", value);
    }

    // 网络请求参数
    set param(value: object) {
        this._param = value;
        this.call("setParam", value);
    }



    /**
    发起网络请求
    @param callback 请求返回触发的回调,其中参数为request本身
    */
    static send(callback: (response: Response) => void){
        Request.checkInstance();
        Request.instance.send(callback);
    }


    protected send(callback: (response: Response) => void) {
        this.call("send", callback);
    }


}