package com.didi.hummer.module.notifycenter;

import android.content.Context;
import android.support.v4.util.LongSparseArray;

import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSContext;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NotifyCenter {

    private static LongSparseArray<Map<String, List<JSCallback>>> globalNotifyMap = new LongSparseArray<>();

    @JsMethod("triggerEvent")
    public static synchronized void triggerEvent(String key, Object value) {
        for (int i = 0; i < globalNotifyMap.size(); i++) {
            Map<String, List<JSCallback>> notifyMap = globalNotifyMap.valueAt(i);
            if (notifyMap != null) {
                List<JSCallback> cbList = notifyMap.get(key);
                if (cbList != null) {
                    for (JSCallback cb : cbList) {
                        cb.call(value);
                    }
                }
            }
        }
    }

    @JsMethod("addEventListener")
    public static synchronized void addEventListener(String key, JSCallback jsCallback) {
        if (jsCallback == null) {
            return;
        }

        long contextId = -1;
        if (jsCallback instanceof NotifyCallback) {
            contextId = ((NotifyCallback) jsCallback).getContextId();
        } else if (jsCallback.getJSContext() != null) {
            contextId = jsCallback.getJSContext().getIdentify();
        }
        if (contextId < 0) {
            return;
        }

        Map<String, List<JSCallback>> notifyMap = globalNotifyMap.get(contextId);
        if (notifyMap == null) {
            notifyMap = new HashMap<>();
            globalNotifyMap.put(contextId, notifyMap);
        }
        List<JSCallback> cbList = notifyMap.get(key);
        if (cbList == null) {
            cbList = new ArrayList<>();
            notifyMap.put(key, cbList);
        }
        if (!cbList.contains(jsCallback)) {
            cbList.add(jsCallback);
        }
    }

    @JsMethod("removeEventListener")
    public static synchronized void removeEventListener(HummerContext hmContext, String key, JSCallback jsCallback) {
        long contextId = jsCallback != null ? jsCallback.getJSContext().getIdentify() : hmContext.getJsContext().getIdentify();
        removeEventListener(contextId, key, jsCallback);
    }

    public static synchronized void removeEventListener(Context context, String key, JSCallback callback) {
        long contextId = callback != null ? callback.getJSContext().getIdentify() : context.hashCode();
        removeEventListener(contextId, key, callback);
    }

    private static synchronized void removeEventListener(long contextId, String key, JSCallback callback) {
        Map<String, List<JSCallback>> notifyMap = globalNotifyMap.get(contextId);
        if (notifyMap != null) {
            List<JSCallback> cbList = notifyMap.get(key);
            if (cbList != null && !cbList.isEmpty()) {
                if (callback == null) {
                    // clear all
                    for (JSCallback cb : cbList) {
                        if (cb != null) {
                            cb.release();
                        }
                    }
                    cbList.clear();
                } else {
                    // clear one
                    JSCallback cbToRemove = null;
                    for (JSCallback cb : cbList) {
                        if (cb != null && cb.equals(callback)) {
                            cbToRemove = cb;
                            break;
                        }
                    }
                    if (cbToRemove != null) {
                        cbToRemove.release();
                        cbList.remove(cbToRemove);
                    }
                }
            }
        }
    }

    public static synchronized void release(JSContext jsContext) {
        release(jsContext.getIdentify());
    }

    public static synchronized void release(Context context) {
        release(context.hashCode());
    }

    private static synchronized void release(long contextId) {
        Map<String, List<JSCallback>> notifyMap = globalNotifyMap.get(contextId);
        if (notifyMap != null) {
            for (String key : notifyMap.keySet()) {
                List<JSCallback> cbList = notifyMap.get(key);
                if (cbList != null && !cbList.isEmpty()) {
                    for (JSCallback cb : cbList) {
                        if (cb != null) {
                            cb.release();
                        }
                    }
                    cbList.clear();
                }
            }
            notifyMap.clear();
        }
        globalNotifyMap.remove(contextId);
    }

    public static synchronized void releaseAll() {
        for (int i = 0; i < globalNotifyMap.size(); i++) {
            Map<String, List<JSCallback>> notifyMap = globalNotifyMap.valueAt(i);
            if (notifyMap != null) {
                for (String key : notifyMap.keySet()) {
                    List<JSCallback> cbList = notifyMap.get(key);
                    if (cbList != null && !cbList.isEmpty()) {
                        for (JSCallback cb : cbList) {
                            if (cb != null) {
                                cb.release();
                            }
                        }
                        cbList.clear();
                    }
                }
                notifyMap.clear();
            }
        }
        globalNotifyMap.clear();
    }
}
