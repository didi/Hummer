import { Component } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Component";
import http from "@ohos:net.http";
import type { BusinessError } from "@ohos:base";
import { isString } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/is";
import { getQueryString } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/Url";
import { HUMMER_UN_SUPPORTED_TYPE_ERROR } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/Error";
type HMResponse = {
    status: number;
    header?: object;
    error?: {
        code: number;
        msg: string;
    };
    data?: object;
};
export class HMRequest extends Component {
    private _url?: string;
    private _httpMethod: http.RequestMethod = http.RequestMethod.POST;
    private _header: object;
    private _timeout: number = 10000; //ms
    private _param: object;
    public setUrl(url: string) {
        this._url = url;
    }
    public setMethod(method: string) {
        switch (method) {
            case 'GET':
                this._httpMethod = http.RequestMethod.GET;
                break;
            case 'POST':
                this._httpMethod = http.RequestMethod.POST;
                break;
            default:
                break;
        }
    }
    public setTimeout(timeout: number) {
        this._timeout = timeout;
    }
    public setHeader(header: object) {
        this._header = header;
    }
    public setParam(param: object) {
        this._param = param;
    }
    /**
     发起网络请求
     @param callback 请求返回触发的回调,其中参数为request本身
     */
    send(callback: (response: HMResponse) => void) {
        let httpRequest = http.createHttp();
        const url = this._url;
        const body = this.getHttpRequestOptions();
        httpRequest.request(url, body, (err: BusinessError, data: http.HttpResponse) => {
            if (err) {
                const errObjc = { code: err.code, msg: err.message };
                const response: HMResponse = {
                    status: err.code,
                    error: errObjc
                };
                callback(response);
            }
            else {
                const code = data.responseCode;
                const header = data.header;
                try {
                    const jsonObject = data.result;
                    if (isString(jsonObject)) {
                        const res = JSON.parse(jsonObject);
                        const response: HMResponse = {
                            status: code,
                            header: header,
                            data: res
                        };
                        callback(response);
                    }
                    else {
                        this.context.handleError(HUMMER_UN_SUPPORTED_TYPE_ERROR + 'response 必须为JSON 对象');
                    }
                }
                catch (e) {
                    this.context.handleException(e);
                }
            }
        });
    }
    private getHttpRequestOptions(): http.HttpRequestOptions {
        const options: http.HttpRequestOptions = {
            method: this._httpMethod,
            connectTimeout: this._timeout,
            readTimeout: this._timeout,
        };
        const body = this.getBody();
        if (body) {
            options.extraData = body;
        }
        if (this._header) {
            options.header = this._header;
        }
        return options;
    }
    private getBody(): string | object | ArrayBuffer {
        if (!this._param) {
            return;
        }
        const contentType = this.getContentType();
        if (this._httpMethod == http.RequestMethod.POST) {
            //todo: 目前 hummer 支持 json 和 urlencoded。
            if (contentType == 'application/x-www-form-urlencoded') {
                return getQueryString(this._param);
            }
            else {
                return JSON.stringify(this._param);
            }
        }
        else {
            return getQueryString(this._param);
        }
    }
    private getContentType(): string | undefined {
        if (!this._header) {
            return undefined;
        }
        let contentType = this._header['Content-Type'];
        if (!contentType) {
            contentType = this._header['content-Type'];
        }
        if (!contentType) {
            contentType = this._header['content-type'];
        }
        return contentType;
    }
}
