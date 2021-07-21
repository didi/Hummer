package com.didi.hummer.context;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.adapter.HummerAdapter;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.engine.jsc.jni.HummerException;
import com.didi.hummer.core.exception.JSException;
import com.didi.hummer.core.util.HMJsonUtil;
import com.didi.hummer.render.component.view.BaseInvoker;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.utility.RemUtil;
import com.didi.hummer.tools.JSLogger;

import java.util.Map;

public class HummerInvoker extends BaseInvoker<HMBase> {

    @Override
    public String getName() {
        return "Hummer";
    }

    @Override
    protected HMBase createInstance(JSValue jsValue, Object... params) {
        return null;
    }

    @Override
    protected Object invoke(HMBase instance, String methodName, Object... params) {
        Object jsRet = null;
        switch (methodName) {
            case "setBasicWidth":
                RemUtil.BASE_WIDTH = ((Number) params[0]).floatValue();
                break;
            case "render":
                long objId = ((Number) params[0]).longValue();
                HMBase v = mInstanceManager.get(objId);
                mHummerContext.render(v);
                break;
            case "loadScript":
                /**
                 * 返回值说明：
                 * - JS加载过程中无异常，则返回null/undefined；
                 * - JS加载过程中存在异常，则返回不同类型错误码：
                 *   1. JS执行异常：-1～-100，如：{errCode: -1, errMsg: "JavaScript evaluate exception"}；
                 */
                jsRet = mHummerContext.evaluateJavaScript(String.valueOf(params[0]));
                jsRet = makeHummerError(jsRet);
                break;
            case "loadScriptWithUrl":
                /**
                 * 返回值说明：
                 * - JS加载过程中无异常，则返回null/undefined；
                 * - JS加载过程中存在异常，则返回不同类型错误码：
                 *   1. 网络错误：>0，如：{errCode: 404, errMsg: "[http error]"}；
                 *   2. JS执行异常：-1～-100，如：{errCode: -1, errMsg: "JavaScript evaluate exception"}；
                 *   3. JS文件读取错误：>-100，如：{errCode: -101, errMsg: "JavaScript file read error"}；
                 */
                String url = String.valueOf(params[0]);
                JSCallback callback = params.length > 1 ? (JSCallback) params[1] : null;
                HummerAdapter.getScriptLoaderAdapter(mHummerContext.getNamespace()).loadScriptWithUrl(url, (script, errCode, errMsg) -> {
                    if (script == null) {
                        Object ret = new HummerError(errCode, errMsg);
                        if (callback != null) {
                            callback.call(ret);
                        }
                    } else {
                        Object ret = mHummerContext.evaluateJavaScript(script);
                        ret = makeHummerError(ret);
                        if (callback != null) {
                            callback.call(ret);
                        }
                    }
                });
                break;
            case "postException":
                Map<String, Object> errMap = HMJsonUtil.toMap(String.valueOf(params[0]));
                String strErr = errMap.get("name") + ": " + errMap.get("message") + "\n" + errMap.get("stack");
                HummerException.nativeException(mHummerContext.mJsContext, new JSException(strErr));
                break;
            case "console.log":
                JSLogger.log(mHummerContext.getNamespace(), String.valueOf(params[0]));
                break;
            case "console.debug":
                JSLogger.debug(mHummerContext.getNamespace(), String.valueOf(params[0]));
                break;
            case "console.info":
                JSLogger.info(mHummerContext.getNamespace(), String.valueOf(params[0]));
                break;
            case "console.warn":
                JSLogger.warn(mHummerContext.getNamespace(), String.valueOf(params[0]));
                break;
            case "console.error":
                JSLogger.error(mHummerContext.getNamespace(), String.valueOf(params[0]));
                break;
            default:
                jsRet = mHummerContext.onJsFunctionCall(methodName, params);
                break;
        }
        return jsRet;
    }

    /**
     * 根据JS代码执行结果来创建对应的HummerError对象，由于napi的JS执行返回结果和其他引擎的返回结果不一样，这里需要做引擎的区分处理
     */
    private HummerError makeHummerError(Object ret) {
        HummerError err = null;
        if (HummerSDK.getJsEngine() == HummerSDK.JsEngine.NAPI_QJS
                || HummerSDK.getJsEngine() == HummerSDK.JsEngine.NAPI_HERMES) {
            if (ret instanceof JSException) {
                err = new HummerError(-1, ((JSException) ret).getMessage());
            }
        } else {
            if (ret instanceof JSValue && ((JSValue) ret).stringValue() == null) {
                err = new HummerError(-1, "JavaScript evaluate exception");
            }
        }
        return err;
    }
}
