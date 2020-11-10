package com.didi.hummer.module.notifycenter;

import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.util.HMGsonUtil;
import com.didi.hummer.render.component.view.BaseInvoker;
import com.didi.hummer.render.component.view.HMBase;
import com.google.gson.reflect.TypeToken;

public class NotifyCenterInvoker extends BaseInvoker<HMBase> {

    @Override
    public String getName() {
        return "NotifyCenter";
    }

    @Override
    protected HMBase createInstance(JSValue jsValue, Object... params) {
        return null;
    }

    @Override
    protected JSValue invoke(HMBase instance, String methodName, Object... params) {
        switch (methodName) {
            case "addEventListener": {
                String key = String.valueOf(params[0]);
                JSCallback callback = (JSCallback) params[1];
                NotifyCenter.addEventListener(key, callback);
                break;
            }
            case "removeEventListener": {
                String key = String.valueOf(params[0]);
                JSCallback callback = params.length > 1 ? (JSCallback) params[1] : null;
                NotifyCenter.removeEventListener(mHummerContext, key, callback);
                break;
            }
            case "triggerEvent": {
                String key = String.valueOf(params[0]);
                Object value = params.length > 1 ? ((params[1] instanceof String && (HMGsonUtil.isJsonObject((String) params[1]) || HMGsonUtil.isJsonArray((String) params[1]))) ? HMGsonUtil.fromJson((String) params[1], new TypeToken<Object>(){}.getType()) : params[1]) : null;
                NotifyCenter.triggerEvent(key, value);
                break;
            }
            default:
                break;
        }
        return null;
    }
}
