package com.didi.hummer2.render.component.view;

import android.content.Context;

//import com.didi.hummer.context.HummerContext;
//import com.didi.hummer.render.style.HummerLayout;
import com.didi.hummer2.HummerContext;
import com.didi.hummer2.render.style.HummerLayout;
import com.facebook.yoga.YogaFlexDirection;

import java.util.ArrayList;
import java.util.List;

/**
 * inline布局用于承载横向扩展的虚拟节点
 */
public class InlineBox extends HMBase<HummerLayout> {

    private List<HMBase> children = new ArrayList<>();

    public InlineBox(HummerContext context) {
        super(context, null, null);
        // 虚拟节点，自己触发生onCreate生命周期
        onCreate();
    }

    @Override
    protected HummerLayout createViewInstance(Context context) {
        return new HummerLayout(context);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        // 默认改成子View可以超出父容器，和iOS保持对齐
        getView().setClipChildren(false);
        // inline 为横向布局
        getYogaNode().setFlexDirection(YogaFlexDirection.ROW);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (getView() != null) {
            getView().removeAllViews();
        }
    }

    public void add(HMBase child) {
        getView().addView(child);
        getView().setClipChildren(true);
        children.add(child);
    }

    public void remove(HMBase child) {
        getView().removeView(child);

        children.remove(child);
    }

    public boolean isChildrenEmpty() {
        return children.size() == 0;
    }

    public void insertBefore(HMBase child, HMBase existing) {
        getView().insertBefore(child, existing);

        int index = children.indexOf(existing);
        children.add(index, child);
    }

    public void replace(HMBase child, HMBase old) {
        getView().replaceView(child, old);

        int index = children.indexOf(old);
        children.set(index, child);
    }

    public HMBase getSubview(String viewID) {
        return getView().getViewById(viewID);
    }

    public List<HMBase> getChildren() {
        return children;
    }
}