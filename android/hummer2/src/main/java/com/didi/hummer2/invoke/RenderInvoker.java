package com.didi.hummer2.invoke;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.HummerScriptContext;
import com.didi.hummer2.component.Element;
import com.didi.hummer2.register.HummerObject;
import com.didi.hummer2.utils.HummerObjectUtil;

/**
 * didi Create on 2024/4/7 .
 * <p>
 * Copyright (c) 2024/4/7 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/7 5:02 PM
 * @Description 负责渲染接口转接
 */

public class RenderInvoker extends AbsInvoker<RenderInvoker> implements HummerObject {

    /**
     * 单例方式运行
     */
    public static final RenderInvoker INSTANCE = new RenderInvoker();

    private long objectId = 0;

    private RenderInvoker() {
    }

    @Override
    public String getName() {
        return "Render";
    }


    @Override
    protected RenderInvoker onCreateInstance(HummerContext hummerContext, Object... params) {
        //没有组件实例
        return INSTANCE;
    }

    @Override
    protected Object onInvoke(HummerContext hummerContext, RenderInvoker instance, String methodName, Object... params) {
        if ("render".equals(methodName)) {
            Element rootElement = HummerObjectUtil.toElement(hummerContext, params[0]);
            if (rootElement != null && hummerContext instanceof HummerScriptContext) {
                ((HummerScriptContext) hummerContext).renderElement(rootElement);
            }
        }
        return null;
    }

    @Override
    public Invoker getInvoker() {
        return this;
    }

    @Override
    public void setInvoker(Invoker invoker) {

    }

    @Override
    public long getObjectId() {
        return objectId;
    }

    @Override
    public void setObjectId(long objectId) {
        this.objectId = objectId;
    }

    @Override
    public void onCreate() {

    }

    @Override
    public void onDestroy() {

    }
}
