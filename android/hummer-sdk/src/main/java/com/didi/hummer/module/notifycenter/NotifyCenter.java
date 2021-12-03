package com.didi.hummer.module.notifycenter;

import android.content.Context;
import android.support.v4.util.LongSparseArray;

import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.base.ICallback;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

public class NotifyCenter {

    private static LongSparseArray<Map<String, List<ICallback>>> globalNotifyMap = new LongSparseArray<>();

    private static long getContextId(ICallback callback) {
        long contextId = -1;
        if (callback == null) {
            return contextId;
        }
        if (callback instanceof NotifyCallback) {
            contextId = ((NotifyCallback) callback).getContextId();
        } else if (callback instanceof JSCallback) {
            JSContext jsContext = ((JSCallback) callback).getJSContext();
            if (jsContext != null) {
                contextId = jsContext.getIdentify();
            }
        }
        return contextId;
    }

    @JsMethod("triggerEvent")
    public static synchronized void triggerEvent(String key, Object value) {
        for (int i = 0; i < globalNotifyMap.size(); i++) {
            Map<String, List<ICallback>> notifyMap = globalNotifyMap.valueAt(i);
            if (notifyMap != null) {
                List<ICallback> cbList = notifyMap.get(key);
                if (cbList != null) {
                    for (ICallback cb : cbList) {
                        cb.call(value);
                    }
                }
            }
        }
    }

    @JsMethod("addEventListener")
    public static synchronized void addEventListener(String key, JSCallback callback) {
        addEventListener(key, (ICallback) callback);
    }

    public static synchronized void addEventListener(String key, NotifyCallback callback) {
        addEventListener(key, (ICallback) callback);
    }

    private static synchronized void addEventListener(String key, ICallback callback) {
        if (callback == null) {
            return;
        }

        long contextId = getContextId(callback);
        if (contextId < 0) {
            return;
        }

        Map<String, List<ICallback>> notifyMap = globalNotifyMap.get(contextId);
        if (notifyMap == null) {
            notifyMap = new ConcurrentHashMap<>();
            globalNotifyMap.put(contextId, notifyMap);
        }
        List<ICallback> cbList = notifyMap.get(key);
        if (cbList == null) {
            // 这里用CopyOnWriteArrayList，防止遍历的时候去做删除操作
            cbList = new CopyOnWriteArrayList<>();
            notifyMap.put(key, cbList);
        }
        if (!cbList.contains(callback)) {
            cbList.add(callback);
        }
    }

    @JsMethod("removeEventListener")
    public static synchronized void removeEventListener(HummerContext hmContext, String key, JSCallback callback) {
        long contextId = getContextId(callback);
        if (contextId < 0 && hmContext != null) {
            contextId = hmContext.getJsContext().getIdentify();
        }
        removeEventListener(contextId, key, callback);
    }

    public static synchronized void removeEventListener(Context context, String key) {
        removeEventListener(context, key, null);
    }

    public static synchronized void removeEventListener(String key, ICallback callback) {
        removeEventListener(null, key, callback);
    }

    public static synchronized void removeEventListener(Context context, String key, ICallback callback) {
        long contextId = getContextId(callback);
        if (contextId < 0 && context != null) {
            contextId = context.hashCode();
        }
        removeEventListener(contextId, key, callback);
    }

    private static synchronized void removeEventListener(long contextId, String key, ICallback callback) {
        if (contextId < 0) {
            return;
        }
        Map<String, List<ICallback>> notifyMap = globalNotifyMap.get(contextId);
        if (notifyMap != null) {
            List<ICallback> cbList = notifyMap.get(key);
            if (cbList != null && !cbList.isEmpty()) {
                if (callback == null) {
                    // clear all
                    for (ICallback cb : cbList) {
                        if (cb instanceof JSCallback) {
                            ((JSCallback) cb).release();
                        }
                    }
                    cbList.clear();
                } else {
                    // clear one
                    ICallback cbToRemove = null;
                    for (ICallback cb : cbList) {
                        if (cb != null && cb.equals(callback)) {
                            cbToRemove = cb;
                            break;
                        }
                    }
                    if (cbToRemove instanceof JSCallback) {
                        ((JSCallback) cbToRemove).release();
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
        Map<String, List<ICallback>> notifyMap = globalNotifyMap.get(contextId);
        if (notifyMap != null) {
            for (String key : notifyMap.keySet()) {
                List<ICallback> cbList = notifyMap.get(key);
                if (cbList != null && !cbList.isEmpty()) {
                    for (ICallback cb : cbList) {
                        if (cb instanceof JSCallback) {
                            ((JSCallback) cb).release();
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
            Map<String, List<ICallback>> notifyMap = globalNotifyMap.valueAt(i);
            if (notifyMap != null) {
                for (String key : notifyMap.keySet()) {
                    List<ICallback> cbList = notifyMap.get(key);
                    if (cbList != null && !cbList.isEmpty()) {
                        for (ICallback cb : cbList) {
                            if (cb instanceof JSCallback) {
                                ((JSCallback) cb).release();
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
