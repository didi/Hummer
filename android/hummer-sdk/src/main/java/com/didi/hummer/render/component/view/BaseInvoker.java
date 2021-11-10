package com.didi.hummer.render.component.view;

import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.util.HMJsonUtil;
import com.didi.hummer.lifecycle.ILifeCycle;
import com.didi.hummer.pool.ObjectPool;
import com.didi.hummer.render.component.anim.BasicAnimation;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

public abstract class BaseInvoker<T> implements Invoker {

    protected HummerContext mHummerContext;
    protected ObjectPool mInstanceManager;

    protected abstract T createInstance(JSValue jsValue, Object... params);

    protected abstract Object invoke(T instance, String methodName, Object... params);

    @Override
    public Object onInvoke(HummerContext context, long objectID, String methodName, Object... params) {
        this.mHummerContext = context;
        this.mInstanceManager = context.getObjectPool();

        Object ret;
        T instance = getInstance(objectID, methodName, params);
        if (instance instanceof HMBase) {
            ret = invokeHMBase(instance, methodName, params);
        } else {
            ret = invoke(instance, methodName, params);
        }
        return ret;
    }

    private Object invokeHMBase(T instance, String methodName, Object... params) {
        HMBase base = (HMBase) instance;
        Object ret = null;
        switch (methodName) {
            case "setStyle":
                Map<String, Object> styleMap = HMJsonUtil.toMap(String.valueOf(params[0])); // json耗时1ms
                base.setStyle(getSortedMap(styleMap)); // sort耗时1ms
                break;
            case "setEnabled":
                base.setEnabled((boolean) params[0]);
                break;
            case "setAccessible":
                base.setAccessible((boolean) params[0]);
                break;
            case "setAccessibilityLabel":
                base.setAccessibilityLabel(String.valueOf(params[0]));
                break;
            case "setAccessibilityHint":
                base.setAccessibilityHint(String.valueOf(params[0]));
                break;
            case "setAccessibilityRole":
                base.setAccessibilityRole(String.valueOf(params[0]));
                break;
            case "setAccessibilityState":
                Map<String, Object> stateMap = HMJsonUtil.toMap(String.valueOf(params[0]));
                base.setAccessibilityState(stateMap);
                break;
            case "addEventListener": {
                String eventName = String.valueOf(params[0]);
                JSCallback callback = (JSCallback) params[1];
                base.addEventListener(eventName, callback);
                break;
            }
            case "removeEventListener": {
                String eventName = String.valueOf(params[0]);
                JSCallback callback = params.length > 1 ? (JSCallback) params[1] : null;
                base.removeEventListener(eventName, callback);
                break;
            }
            case "addAnimation": {
                long objId = ((Number) params[0]).longValue();
                BasicAnimation anim = mInstanceManager.get(objId);
                String id = (String) params[1];
                base.addAnimation(anim, id);
                break;
            }
            case "removeAnimationForKey": {
                String id = String.valueOf(params[0]);
                base.removeAnimationForKey(id);
                break;
            }
            case "removeAllAnimation": {
                base.removeAllAnimation();
                break;
            }
            case "getRect": {
                base.getRect((JSCallback) params[0]);
                break;
            }
            case "resetStyle": {
                base.resetStyle();
                break;
            }
            case "dbg_highlight": {
                base.dbg_highlight(params.length > 0 ? params[0] : null);
                break;
            }
            case "dbg_getDescription": {
                JSCallback callback = params.length > 0 ? (JSCallback) params[0] : null;
                int depth = params.length > 1 ? ((Number) params[1]).intValue() : 0;
                base.dbg_getDescription(callback, depth);
                break;
            }
            case "recycle": {
                // 已弃用
                break;
            }
            default:
                ret = invoke(instance, methodName, params);
                break;
        }
        return ret;
    }

    private T getInstance(long objectID, String methodName, Object... params) {
        // objectID <= 0说明是static方法
        if (objectID <= 0) {
            return null;
        }
        T instance = mInstanceManager.get(objectID);
        if (instance == null && "constructor".equals(methodName)) {
            JSValue jsValue = params.length > 0 ? ((JSValue) params[0]) : null;
            if (jsValue != null) {
                if (params.length > 1) {
                    Object[] parameters = Arrays.copyOfRange(params, 1, params.length);
                    instance = createInstance(jsValue, parameters);
                } else {
                    instance = createInstance(jsValue);
                }
                if (instance instanceof ILifeCycle) {
                    ((ILifeCycle) instance).onCreate();
                }
                mInstanceManager.put(objectID, instance);
            }
        }
        return instance;
    }

    /**
     * 把"position"和"display"这两个属性放到Map的最前面，保证 display、position 优先处理
     *
     * @param srcMap 原生Map
     * @return 排序后的Map
     */
    private Map<String, Object> getSortedMap(Map<String, Object> srcMap) {
        if (!srcMap.containsKey("position") && !srcMap.containsKey("display")) {
            return srcMap;
        }
        Map<String, Object> sortedMap = new LinkedHashMap<>();
        Object posValue = srcMap.remove("position");
        if (posValue != null) {
            sortedMap.put("position", posValue);
        }
        Object displayValue = srcMap.remove("display");
        if (displayValue != null) {
            sortedMap.put("display", displayValue);
        }
        sortedMap.putAll(srcMap);
        return sortedMap;
    }
}
