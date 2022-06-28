package com.didi.hummer.devtools.invoker;

import com.didi.hummer.adapter.http.HttpResponse;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.napi.NAPIValue;
import com.didi.hummer.devtools.manager.HummerNetManager;
import com.didi.hummer.module.Request;
import com.didi.hummer.module.Request$$Invoker;

/**
 * @author: xingjingmin
 * @date: 2022-04-08
 * @desc:
 */
public class RequestInvokerWrapper extends Request$$Invoker {

    private HummerNetManager manager;

    public RequestInvokerWrapper(HummerNetManager manager) {
        this.manager = manager;
    }

    @Override
    protected Object invoke(Request instance, String methodName, Object[] params) {
        switch (methodName) {
            case "send":
                JSCallback callback = params.length > 0 && params[0] != null ? (JSCallback)params[0] : null;
                instance.send(new JSCallbackWrapper(instance.url, callback));
                return null;
        }
        return super.invoke(instance, methodName, params);
    }

    class JSCallbackWrapper extends NAPIValue implements JSCallback {
        private String url;
        private JSCallback callback;
        protected JSCallbackWrapper(String url, JSCallback callback) {
            super(0, 0);
            this.url = url;
            this.callback = callback;
        }
        @Override
        public Object call(Object... params) {
            HttpResponse response = params.length > 0 && params[0] != null ? (HttpResponse)params[0] : null;
            if (response != null) {
                manager.addData(url, response.data, response.error);
            }
            return callback.call(params);
        }
        @Override
        public void release() {
            callback.release();
        }
    }
}
