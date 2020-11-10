package com.didi.hummer.component.scroller;

import android.content.Context;
import android.view.View;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsAttribute;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.component.view.FixedNoneBox;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.event.view.ScrollEvent;
import com.didi.hummer.render.style.HummerLayout;
import com.didi.hummer.render.style.HummerLayoutExtendUtils;
import com.didi.hummer.render.style.HummerStyleUtils;
import com.facebook.yoga.YogaFlexDirection;

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
        return new HScrollView(context);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        initScrollView();
    }

    private void initScrollView() {
        layout = new HummerLayout(getContext());
        layout.getYogaNode().setFlexDirection(YogaFlexDirection.ROW);
        layout.setOnSizeChangeListener((w, h, oldw, oldh) -> getYogaNode().dirty());
        getView().addView(layout);

        // 默认隐藏滚动条
        getView().setHorizontalScrollBarEnabled(false);

        // 使ScrollView的最大高度限制在屏幕范围之内，不超出屏幕
        getYogaNode().setFlexShrink(1);

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
                scrollEvent.setOffsetX(x);
                scrollEvent.setOffsetY(y);
                scrollEvent.setDx(dx);
                scrollEvent.setDy(dy);
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

    @JsMethod("appendChild")
    public void appendChild(HMBase child) {
        if (child == null) {
            return;
        }

        getYogaNode().dirty();
        child.getJSValue().protect();
        child.setPositionChangedListener(this);
        children.add(child);
        HMBase finalChild = child;

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
        getYogaNode().dirty();

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
        getYogaNode().dirty();

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

        layout.removeAllViews();
    }

    @JsMethod("insertBefore")
    public void insertBefore(HMBase child, HMBase existing) {
        if (child == null || existing == null) {
            return;
        }

        getYogaNode().dirty();
        child.getJSValue().protect();
        child.setPositionChangedListener(this);
        children.add(child);
        HMBase finalChild = child;
        HMBase finalExisting = existing;

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

        getYogaNode().dirty();
        child.getJSValue().protect();
        child.setPositionChangedListener(this);
        old.getJSValue().unprotect();
        old.setPositionChangedListener(null);
        children.add(child);
        children.remove(old);
        HMBase finalChild = child;
        HMBase finalOld = old;

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

    @JsMethod("layout")
    public void layout() {
        layout.requestLayout();
    }

    @JsAttribute("overflow")
    public void setOverflow(String overflow) {
        boolean needClip = "hidden".equals(overflow);
        layout.setNeedClipChildren(needClip);
    }

    @JsAttribute("hideScrollBar")
    public void setShowScrollBar(boolean isShow) {
        getView().setHorizontalScrollBarEnabled(isShow);
    }

    @JsMethod("scrollTo")
    public void scrollTo(int x, int y) {
        getView().smoothScrollTo(x, y);
    }

    @JsMethod("scrollBy")
    public void scrollBy(int dx, int dy) {
        getView().smoothScrollBy(dx, dy);
    }

    @JsMethod("scrollToTop")
    public void scrollToTop() {
        getView().fullScroll(View.FOCUS_UP);
    }

    @JsMethod("scrollToBottom")
    public void scrollToBottom() {
        getView().fullScroll(View.FOCUS_DOWN);
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

    @Override
    public boolean setStyle(String key, Object value) {
        switch (key) {
            case HummerStyleUtils.Hummer.SHOW_SCROLL_BAR:
                setShowScrollBar((boolean) value);
                break;
            default:
                return false;
        }
        return true;
    }
}
