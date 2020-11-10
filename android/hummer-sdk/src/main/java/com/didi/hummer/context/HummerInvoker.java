package com.didi.hummer.context;

import com.didi.hummer.tools.JSLogger;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.component.view.BaseInvoker;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.utility.RemUtil;

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
