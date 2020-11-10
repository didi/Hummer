package com.didi.hummer.render.component.view;

import android.content.Context;

import com.didi.hummer.context.HummerContext;

/**
 * fixed布局的虚拟节点
 */
public class FixedNoneBox extends HMBase<android.view.View> {

    public FixedNoneBox(HummerContext context) {
        super(context, null, null);
        // 虚拟节点，自己触发生onCreate生命周期
        onCreate();
    }

    @Override
    protected android.view.View createViewInstance(Context context) {
        return new android.view.View(context);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        // 虚拟节点，不对原布局产生印象
        getYogaNode().setWidth(0);
        getYogaNode().setHeight(0);
    }
}