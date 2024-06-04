import { HummerComponent } from "../../HummerComponent"



export class WebSocket extends HummerComponent {

    protected _url_?: string = "";
    protected __onopen__?: Function = undefined;
    protected __onmessage__?: Function = undefined;
    protected __onclose__?: Function = undefined;
    protected __onerror__?: Function = undefined;


    public constructor(url: string) {
        super("WebSocket", {},false);
        this.addEventListener("__onopen__", () => {
            if (this.__onopen__ != undefined) {
                this.__onopen__();
            }
        });
        this.addEventListener("__onmessage__", (event:any) => {
            if (this.__onmessage__ != undefined) {
                this.__onmessage__(event);
            }
        });
        this.addEventListener("__onclose__", (event:any) => {
            if (this.__onclose__ != undefined) {
                this.__onclose__(event);
            }
        });
        this.addEventListener("__onerror__", () => {
            if (this.__onerror__ != undefined) {
                this.__onerror__();
            }
        });
        this.connect(url);
    }


    set onopen(onopen: Function | undefined) {
        this.__onopen__ = onopen;
    }

    get onopen() {
        return this.__onopen__;
    }

    set onmessage(onmessage: Function | undefined) {
        this.__onmessage__ = onmessage;
    }

    get onmessage() {
        return this.__onmessage__;
    }

    set onclose(onclose: Function | undefined) {
        this.__onclose__ = onclose;
    }

    get onclose() {
        return this.__onclose__;
    }

    set onerror(onerror: Function | undefined) {
        this.__onerror__ = onerror;
    }

    get onerror() {
        return this.__onerror__;
    }


    public connect(url: string) {
        this._url_ = url;
        this.call("connect", url);
    }


    public close() {
        this.call("close");
    }

    /**
    * 发送数据
    */
    public send(data: string) {
        this.call("send", data);
    }


}