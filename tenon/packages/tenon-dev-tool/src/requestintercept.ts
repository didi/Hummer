import { guid } from './utils'
import { sendMessage } from './socket'
// Request拦截
export const requestintercept = (ws: any):void => {
    const { Request, __requestInterceptFlag__ } = __GLOBAL__
    __GLOBAL__.__requestInterceptFlag__ = true
    !__requestInterceptFlag__ && (__GLOBAL__.__requestOriginSend__ = Request.prototype.send)
    Request.prototype.send = function () {
        const requestId = guid()
        sendMessage(ws, {
            type: 'netWork',
            method: 'updateNetWorkList',
            params: {
                id: requestId,
                requestInfo: {
                    method: this.method,
                    header: this.header,
                    url: this.url,
                    param: this.param,
                },
            }
        })
        const callback = arguments[0]
        const mergeCallback = (res: any) => {
            sendMessage(ws, {
                type: 'netWork',
                method: 'updateNetWorkList',
                params: {
                    id: requestId,
                    responseInfo: res,
                }
            })
            callback.call(this, res)
        }
        __GLOBAL__.__requestOriginSend__.apply(this, [mergeCallback])
    }
}