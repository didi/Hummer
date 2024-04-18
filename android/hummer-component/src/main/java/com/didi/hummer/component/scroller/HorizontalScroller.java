package com.didi.hummer.component.scroller;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsAttribute;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.component.R;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.component.view.FixedNoneBox;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.event.view.ScrollEvent;
import com.didi.hummer.render.style.HummerLayout;
import com.didi.hummer.render.style.HummerLayoutExtendUtils;
import com.didi.hummer.render.style.HummerStyleUtils;
import com.didi.hummer.render.utility.DPUtil;
import com.facebook.yoga.YogaFlexDirection;
import com.facebook.yoga.YogaOverflow;
import com.facebook.yoga.YogaUnit;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by XiaoFeng on 2019-12-25.
 */
@Component("HorizontalScroller")
public class HorizontalScroller extends HMBase<HScrollView> implements HMBase.PositionChangedListener {

    private HummerLayout layout;
    private JSCallback onScrollToTopListener;
    private JSCallback onScrollToBottomListener;
    private HummerContext hummerContext;
    private ScrollEvent scrollEvent = new ScrollEvent();
    private List<HMBase> children = new ArrayList<>();
    private Map<HMBase, FixedNoneBox> fixedNoneBoxMap = new HashMap<>();

    public HorizontalScroller(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
        hummerContext = context;
    }

    @Override
    protected HScrollView createViewInstance(Context context) {
        HScrollView scrollView = (HScrollView) LayoutInflater.from(context).inflate(R.layout.horizontal_scroll_view, null, false);
        scrollView.setClipChildren(false);
        scrollView.setFillViewport(true);
        return scrollView;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        initScrollView();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        getView().release();
    }

    @Override
    protected void onStyleUpdated(Map<String, Object> newStyle) {
        // 把最外层的Yoga属性复制一份给最内层的Layout，使JS侧设置的样式生效
        layout.getYogaNode().copyStyle(getYogaNode());
        layout.getYogaNode().setFlexDirection(YogaFlexDirection.ROW);
        adjustWidthAndHeight();
        adjustMinMaxWidthAndHeight();
    }

    private void initScrollView() {
        layout = new HummerLayout(getContext());
        layout.getYogaNode().setFlexDirection(YogaFlexDirection.ROW);
        layout.addOnLayoutChangeListener((v, left, top, right, bottom, oldLeft, oldTop, oldRight, oldBottom) -> {
            adjustWidthAndHeight();
        });
        getView().addView(layout);

        getYogaNode().setOverflow(YogaOverflow.SCROLL);
        getYogaNode().setMeasureFunction(null);
        getYogaNode().addChildAt(layout.getYogaNode(), 0);

        // 默认隐藏滚动条
        getView().setHorizontalScrollBarEnabled(false);

        getView().setOnScrollListener(new OnScrollListener() {
            @Override
            public void onScrollStarted() {
                if (!mEventManager.contains(ScrollEvent.HM_EVENT_TYPE_SCROLL)) {
                    return;
                }
                scrollEvent.setType(ScrollEvent.HM_EVENT_TYPE_SCROLL);
                scrollEvent.setState(ScrollEvent.HM_SCROLL_STATE_BEGAN);
                scrollEvent.setOffsetX(0);
                scrollEvent.setOffsetY(0);
                scrollEvent.setDx(0);
                scrollEvent.setDy(0);
                scrollEvent.setTimestamp(System.currentTimeMillis());
                mEventManager.dispatchEvent(ScrollEvent.HM_EVENT_TYPE_SCROLL, scrollEvent);
            }

            @Override
            public void onScrollFinished() {
                if (!mEventManager.contains(ScrollEvent.HM_EVENT_TYPE_SCROLL)) {
                    return;
                }
                scrollEvent.setType(ScrollEvent.HM_EVENT_TYPE_SCROLL);
                scrollEvent.setState(ScrollEvent.HM_SCROLL_STATE_ENDED);
                scrollEvent.setTimestamp(System.currentTimeMillis());
                mEventManager.dispatchEvent(ScrollEvent.HM_EVENT_TYPE_SCROLL, scrollEvent);
            }

            @Override
            public void onScrollUp() {
                if (!mEventManager.contains(ScrollEvent.HM_EVENT_TYPE_SCROLL)) {
                    return;
                }
                scrollEvent.setType(ScrollEvent.HM_EVENT_TYPE_SCROLL);
                scrollEvent.setState(ScrollEvent.HM_SCROLL_STATE_SCROLL_UP);
                scrollEvent.setTimestamp(System.currentTimeMillis());
                mEventManager.dispatchEvent(ScrollEvent.HM_EVENT_TYPE_SCROLL, scrollEvent);
            }

            @Override
            public void onScrollChanged(View scrollView, int x, int y, int dx, int dy) {
                if (!mEventManager.contains(ScrollEvent.HM_EVENT_TYPE_SCROLL)) {
                    return;
                }
                scrollEvent.setType(ScrollEvent.HM_EVENT_TYPE_SCROLL);
                scrollEvent.setState(ScrollEvent.HM_SCROLL_STATE_SCROLL);
                scrollEvent.setOffsetX(DPUtil.px2dpF(getContext(), x));
                scrollEvent.setOffsetY(DPUtil.px2dpF(getContext(), y));
                scrollEvent.setDx(DPUtil.px2dpF(getContext(), dx));
                scrollEvent.setDy(DPUtil.px2dpF(getContext(), dy));
                scrollEvent.setTimestamp(System.currentTimeMillis());
                mEventManager.dispatchEvent(ScrollEvent.HM_EVENT_TYPE_SCROLL, scrollEvent);
            }
        });

        getView().setOnScrollToTopListener(() -> {
            if (onScrollToTopListener != null) {
                onScrollToTopListener.call();
            }
        });
        getView().setOnScrollToBottomListener(() -> {
            if (onScrollToBottomListener != null) {
                onScrollToBottomListener.call();
            }
        });
    }

    private void adjustWidthAndHeight() {
        if (getYogaNode().getWidth().unit == YogaUnit.AUTO) {
            layout.getYogaNode().setWidthAuto();
        } else {
            layout.getYogaNode().setWidthPercent(100);
        }
        if (getYogaNode().getHeight().unit == YogaUnit.AUTO) {
            layout.getYogaNode().setHeightAuto();
        } else {
            layout.getYogaNode().setHeightPercent(100);
        }
    }

    private void adjustMinMaxWidthAndHeight() {
        layout.getYogaNode().setMinWidth(Float.NaN);
        layout.getYogaNode().setMaxWidth(Float.NaN);
        layout.getYogaNode().setMinHeight(Float.NaN);
        layout.getYogaNode().setMaxHeight(Float.NaN);
    }

    @JsMethod("appendChild")
    public void appendChild(HMBase child) {
        if (child == null) {
            return;
        }

        child.getJSValue().protect();
        child.setPositionChangedListener(this);
        children.add(child);
        HMBase finalChild = child;
        getNode().appendChild(child.getNode());

        // 支持 position:fixed 布局样式，添加至窗口视图
        if (child.getPosition() == HummerLayoutExtendUtils.Position.FIXED) {
            hummerContext.getContainer().addView(child);
            FixedNoneBox fixedNoneBox = new FixedNoneBox(hummerContext);
            fixedNoneBoxMap.put(child, fixedNoneBox);
            finalChild = fixedNoneBox;
        }

        layout.addView(finalChild);
    }

    @JsMethod("removeChild")
    public void removeChild(HMBase child) {
        if (child == null) {
            return;
        }

        child.getJSValue().unprotect();
        child.setPositionChangedListener(null);
        children.remove(child);
        getNode().removeChild(child.getNode());

        // fixed 布局操作
        if (fixedNoneBoxMap.containsKey(child)) {
            FixedNoneBox noneBox = fixedNoneBoxMap.remove(child);
            hummerContext.getContainer().removeView(child);
            layout.removeView(noneBox);
            return;
        }

        layout.removeView(child);
    }

    @JsMethod("removeAll")
    public void removeAll() {
        // fixed
        for (Map.Entry<HMBase, FixedNoneBox> entry : fixedNoneBoxMap.entrySet()) {
            HMBase hmBase = entry.getKey();
            FixedNoneBox noneBox = entry.getValue();
            hummerContext.getContainer().removeView(hmBase);
            layout.removeView(noneBox);
        }
        fixedNoneBoxMap.clear();
        // 解除 PositionChangedListener 绑定关系
        for (HMBase hmBase : children) {
            hmBase.getJSValue().unprotect();
            hmBase.setPositionChangedListener(null);
        }
        children.clear();
        getNode().removeAll();

        layout.removeAllViews();
    }

    @JsMethod("insertBefore")
    public void insertBefore(HMBase child, HMBase existing) {
        if (child == null || existing == null) {
            return;
        }

        child.getJSValue().protect();
        child.setPositionChangedListener(this);
        children.add(child);
        HMBase finalChild = child;
        HMBase finalExisting = existing;
        getNode().insertBefore(child.getNode(), existing.getNode());

        // 支持 position:fixed 布局样式
        if (child.getPosition() == HummerLayoutExtendUtils.Position.FIXED) {
            hummerContext.getContainer().addView(child);
            FixedNoneBox fixedNoneBox = new FixedNoneBox(hummerContext);
            fixedNoneBoxMap.put(child, fixedNoneBox);
            finalChild = fixedNoneBox;
        }
        if (fixedNoneBoxMap.containsKey(existing)) {
            finalExisting = fixedNoneBoxMap.get(existing);
        }

        // 默认处理
        layout.insertBefore(finalChild, finalExisting);
    }

    @JsMethod("replaceChild")
    public void replaceChild(HMBase child, HMBase old) {
        if (child == null || old == null) {
            return;
        }

        child.getJSValue().protect();
        child.setPositionChangedListener(this);
        old.getJSValue().unprotect();
        old.setPositionChangedListener(null);
        children.add(child);
        children.remove(old);
        HMBase finalChild = child;
        HMBase finalOld = old;
        getNode().replaceChild(child.getNode(), old.getNode());

        // 支持 position:fixed 布局样式
        if (child.getPosition() == HummerLayoutExtendUtils.Position.FIXED) {
            hummerContext.getContainer().addView(child);
            FixedNoneBox fixedNoneBox = new FixedNoneBox(hummerContext);
            fixedNoneBoxMap.put(child, fixedNoneBox);
            finalChild = fixedNoneBox;
        }
        if (fixedNoneBoxMap.containsKey(old)) {
            hummerContext.getContainer().removeView(old);
            finalOld = fixedNoneBoxMap.get(old);
        }

        // 默认处理
        layout.replaceView(finalChild, finalOld);
    }

    @Deprecated
    @JsMethod("getElementById")
    public HMBase getSubview(String viewID) {
        HMBase result = layout.getViewById(viewID);

        // fixed 事件透传
        if (result == null) {
            for (Map.Entry<HMBase, FixedNoneBox> entry : fixedNoneBoxMap.entrySet()) {
                HMBase hmBase = entry.getKey();
                if (hmBase.getViewID().equals(viewID)) {
                    result = hmBase;
                    break;
                }
            }
        }

        if (result != null) {
            // JSValue从native返回到js侧时，引用计数会自动减1，这里需要protect一下避免被回收
            result.getJSValue().protect();
        }
        return result;
    }

    @Deprecated
    @JsMethod("layout")
    public void layout() {
        layout.requestLayout();
    }

    /**
     * 是否显示滚动条（默认false）
     */
    @JsProperty("showScrollBar")
    private boolean showScrollBar;
    public void setShowScrollBar(boolean isShow) {
        getView().setHorizontalScrollBarEnabled(isShow);
    }

    /**
     * 是否有回弹效果（默认true，暂时先空实现）
     */
    @JsProperty("bounces")
    public boolean bounces;

    @JsMethod("scrollTo")
    public void scrollTo(Object x, Object y, Object animated) {
        // animated设置为Object类型，是为了实现不传参时默认为true
        int nX = (int) HummerStyleUtils.convertNumber(x);
        int nY = (int) HummerStyleUtils.convertNumber(y);

        boolean smooth = true;
        if (animated instanceof Boolean) {
            smooth = (boolean) animated;
        }
        if (smooth) {
            getView().smoothScrollTo(nX, nY);
        } else {
            getView().scrollTo(nX, nY);
        }
    }

    @JsMethod("scrollBy")
    public void scrollBy(Object dx, Object dy, Object animated) {
        // animated设置为Object类型，是为了实现不传参时默认为true
        int nDx = (int) HummerStyleUtils.convertNumber(dx);
        int nDy = (int) HummerStyleUtils.convertNumber(dy);

        boolean smooth = true;
        if (animated instanceof Boolean) {
            smooth = (boolean) animated;
        }
        if (smooth) {
            getView().smoothScrollBy(nDx, nDy);
        } else {
            getView().scrollBy(nDx, nDy);
        }
    }

    @JsMethod("scrollToTop")
    public void scrollToTop() {
        getView().fullScroll(View.FOCUS_LEFT);
    }

    @JsMethod("scrollToBottom")
    public void scrollToBottom() {
        getView().fullScroll(View.FOCUS_RIGHT);
    }

    @JsMethod("setOnScrollToTopListener")
    public void setOnScrollToTopListener(JSCallback callback) {
        onScrollToTopListener = callback;
    }

    @JsMethod("setOnScrollToBottomListener")
    public void setOnScrollToBottomListener(JSCallback callback) {
        onScrollToBottomListener = callback;
    }

    @Deprecated
    @JsMethod("updateContentSize")
    public void updateContentSize() {
        // 更新滚动视图大小（iOS特有方法，Android空实现）
    }

    @Override
    public void dispatchChildPositionChanged(HMBase child,
                                             HummerLayoutExtendUtils.Position origin,
                                             HummerLayoutExtendUtils.Position replace) {

        // 转换逻辑: position:fixed -> position:relative | position:absolute | position:none
        if (origin == HummerLayoutExtendUtils.Position.FIXED
                && replace == HummerLayoutExtendUtils.Position.YOGA) {
            if (fixedNoneBoxMap.containsKey(child)) {
                FixedNoneBox fixedNoneBox = fixedNoneBoxMap.remove(child);
                hummerContext.getContainer().removeView(child);
                layout.replaceView(child, fixedNoneBox);
            }
        }

        // 转换逻辑: position:relative | position:absolute | position:none -> position:fixed
        if (origin == HummerLayoutExtendUtils.Position.YOGA
                && replace == HummerLayoutExtendUtils.Position.FIXED) {
            FixedNoneBox fixedNoneBox = new FixedNoneBox(hummerContext);
            fixedNoneBoxMap.put(child, fixedNoneBox);
            layout.replaceView(fixedNoneBox, child);
            hummerContext.getContainer().addView(child);
        }
    }

    @Override
    public void resetStyle() {
        super.resetStyle();
        setShowScrollBar(false);
    }
}
