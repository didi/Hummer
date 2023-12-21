package com.didi.hummer2;

import android.content.Context;
import android.content.ContextWrapper;

import com.didi.hummer2.hvdom.HMVFactory;
import com.didi.hummer2.hvdom.TypeDef;
import com.didi.hummer2.service.StorageServiceFactory;

/**
 * didi Create on 2023/11/20 .
 * <p>
 * Copyright (c) 2023/11/20 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/20 4:36 下午
 * @Description Hummer2Context 注册及绑定Hummer2的相关组件，初始设置数据状态等
 */

public class Hummer2Context extends ContextWrapper {

    private Context context;
    private HummerVdomContext hummerVdomContext;
    private HummerVdomRender hummerVdomRender;


    public Hummer2Context(Context context) {
        super(context);
        this.context = context;
        this.hummerVdomContext = new HummerVdomContext();
    }


    public void init() {
        hummerVdomContext.registerService(TypeDef.TYPE_SERVICE, new StorageServiceFactory());
        hummerVdomContext.bindVdomContext();
    }


    public void registerService(int type, HMVFactory hmvFactory) {
        hummerVdomContext.registerService(type, hmvFactory);
    }


    public void registerComponent(int type, HMVFactory hmvFactory) {
        hummerVdomContext.registerComponent(type, hmvFactory);
    }


    public void setHummerVdomRender(HummerVdomRender hummerVdomRender) {
        this.hummerVdomRender = hummerVdomRender;
    }

    public Object evaluateJavaScript(String script, String scriptId) {
        return hummerVdomContext.evaluateJavaScript(script, scriptId);
    }


    public void destroy() {

        hummerVdomContext.destroyVdomContext();
    }


}
