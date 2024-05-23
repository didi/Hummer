package com.didi.hummer2.devtools.invoker;

import android.text.TextUtils;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.bridge.JsiFunction;
import com.didi.hummer2.devtools.manager.HummerNetManager;
import com.didi.hummer2.module.Request$$Invoker;
import com.didi.hummer2.module.RequestComponent;
import com.didi.hummer2.utils.HummerObjectUtil;

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
    protected Object onInvoke(HummerContext hummerContext, RequestComponent instance, String methodName, Object[] params) {
        if (TextUtils.equals("send",methodName)){
            JsiFunction param0 = params.length > 0 && params[0] != null ? (JsiFunction)  HummerObjectUtil.toJsiValue(params[0]) : null;
            instance.send(param0);
        }
        return super.onInvoke(hummerContext, instance, methodName, params);
    }

//    @Override
//    protected Object invoke(Request instance, String methodName, Object[] params) {
//        switch (methodName) {
//            case "send":
//                JSCallback callback = params.length > 0 && params[0] != null ? (JSCallback)params[0] : null;
//                instance.send(new JSCallbackWrapper(instance.url, callback));
//                return null;
//        }
//        return super.invoke(instance, methodName, params);
//    }
//

//   static class JSCallbackWrapper extends JsiFunction {
//
//       private JsiFunction jsiFunction;
//
//        public JSCallbackWrapper(JsiFunction jsiFunction) {
//            super(0);
//            this.jsiFunction = jsiFunction;
//        }
//
//        @Override
//        public JsiValue call(JsiValue... args) {
//
//
//
//            return null;
//        }
//    }

//
//    class JSCallbackWrapper extends NAPIValue implements JSCallback {
//        private String url;
//        private JSCallback callback;
//        protected JSCallbackWrapper(String url, JSCallback callback) {
//            super(0, 0);
//            this.url = url;
//            this.callback = callback;
//        }
//        @Override
//        public Object call(Object... params) {
//            HttpResponse response = params.length > 0 && params[0] != null ? (HttpResponse)params[0] : null;
//            if (response != null) {
//                manager.addData(url, response.data, response.error);
//            }
//            return callback.call(params);
//        }
//        @Override
//        public void release() {
//            callback.release();
//        }
//    }
}
