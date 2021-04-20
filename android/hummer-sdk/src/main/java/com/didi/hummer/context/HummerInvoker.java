package com.didi.hummer.context;

import com.didi.hummer.adapter.HummerAdapter;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.component.view.BaseInvoker;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.utility.RemUtil;
import com.didi.hummer.tools.JSLogger;

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
                if (jsRet instanceof JSValue && ((JSValue)jsRet).stringValue() == null) {
                    jsRet = new HummerError(-1, "JavaScript evaluate exception");
                } else {
                    jsRet = null;
                }
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
                        if (ret instanceof JSValue && ((JSValue) ret).stringValue() == null) {
                            ret = new HummerError(-1, "JavaScript evaluate exception");
                        } else {
                            ret = null;
                        }
                        if (callback != null) {
                            callback.call(ret);
                        }
                    }
                });
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
}
