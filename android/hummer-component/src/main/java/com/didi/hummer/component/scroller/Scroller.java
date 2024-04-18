package com.didi.hummer.component.scroller;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.component.R;
import com.didi.hummer.component.refresh.HummerFooter;
import com.didi.hummer.component.refresh.HummerHeader;
import com.didi.hummer.component.refresh.LoadMoreState;
import com.didi.hummer.component.refresh.PullRefreshState;
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
import com.didi.hummer.render.utility.YogaNodeUtil;
import com.facebook.yoga.YogaNode;
import com.facebook.yoga.YogaOverflow;
import com.facebook.yoga.YogaUnit;
import com.scwang.smart.refresh.layout.SmartRefreshLayout;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 垂直滚动组件
 *
 * Created by XiaoFeng on 2019-12-25.
 */
@Component("Scroller")
public class Scroller extends HMBase<SmartRefreshLayout> implements HMBase.PositionChangedListener {

    private SmartRefreshLayout refreshLayout;
    private HummerHeader hummerHeader;
    private HummerFooter hummerFooter;
    private VScrollView scrollView;
    private HummerLayout layout;
    private JSCallback onScrollToTopListener;
    private JSCallback onScrollToBottomListener;
    private HummerContext hummerContext;
    private ScrollEvent scrollEvent = new ScrollEvent();
    private List<HMBase> children = new ArrayList<>();
    private Map<HMBase, FixedNoneBox> fixedNoneBoxMap = new HashMap<>();

    public Scroller(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
        hummerContext = context;
    }

    @Override
    protected SmartRefreshLayout createViewInstance(Context context) {
        scrollView = (VScrollView) LayoutInflater.from(context).inflate(R.layout.scroll_view, null, false);
        scrollView.setClipChildren(false);
        scrollView.setFillViewport(true);

        refreshLayout = new SmartRefreshLayout(context);
        refreshLayout.setEnableRefresh(false);
        refreshLayout.setEnableLoadMore(false);
        refreshLayout.setEnableOverScrollDrag(true); // 默认有回弹效果
        refreshLayout.setRefreshContent(scrollView);

        hummerHeader = new HummerHeader(context);
        hummerFooter = new HummerFooter(context);
        refreshLayout.setRefreshHeader(hummerHeader);
        refreshLayout.setRefreshFooter(hummerFooter);

        hummerHeader.setOnRefreshListener(new HummerHeader.OnRefreshListener() {
            @Override
            public void onRefreshStarted() {
                if (refreshCallback != null) {
                    refreshCallback.call(PullRefreshState.START_PULL_DOWN);
                }
            }

            @Override
            public void onRefreshing() {
                if (refreshCallback != null) {
                    refreshCallback.call(PullRefreshState.REFRESHING);
                }
            }

            @Override
            public void onRefreshFinished() {
                if (refreshCallback != null) {
                    refreshCallback.call(PullRefreshState.IDLE);
                }
            }
        });

        hummerFooter.setOnLoadListener(new HummerFooter.OnLoadListener() {
            @Override
            public void onLoadStarted() {

            }

            @Override
            public void onLoading() {
                if (loadMoreCallback != null) {
                    loadMoreCallback.call(LoadMoreState.LOADING);
                }
            }

            @Override
            public void onLoadFinished() {

            }
        });

        return refreshLayout;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        initScrollView();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        scrollView.release();
    }

    @Override
    protected void onStyleUpdated(Map<String, Object> newStyle) {
        // 把最外层的Yoga属性复制一份给最内层的Layout，使JS侧设置的样式生效
        layout.getYogaNode().copyStyle(getYogaNode());
        adjustWidthAndHeight();
        adjustMinMaxWidthAndHeight();
    }

    private void initScrollView() {
        layout = new HummerLayout(getContext());
        layout.addOnLayoutChangeListener((v, left, top, right, bottom, oldLeft, oldTop, oldRight, oldBottom) -> {
            adjustWidthAndHeight();
        });
        scrollView.addView(layout);

        YogaNode scrollViewNode = YogaNodeUtil.createYogaNode();
        scrollViewNode.setData(scrollView);
        scrollViewNode.addChildAt(layout.getYogaNode(), 0);
        scrollViewNode.setOverflow(YogaOverflow.SCROLL);
        getYogaNode().setMeasureFunction(null);
        getYogaNode().setFlexShrink(1);
        getYogaNode().addChildAt(scrollViewNode, 0);

        // 默认隐藏滚动条
        scrollView.setVerticalScrollBarEnabled(false);

        scrollView.setOnScrollListener(new OnScrollListener() {
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

        scrollView.setOnScrollToTopListener(() -> {
            if (onScrollToTopListener != null) {
                onScrollToTopListener.call();
            }
        });
        scrollView.setOnScrollToBottomListener(() -> {
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
        scrollView.setVerticalScrollBarEnabled(isShow);
    }

    @JsProperty("refreshView")
    private HMBase refreshView;
    public void setRefreshView(HMBase view) {
        refreshLayout.setEnableRefresh(true);
        hummerHeader.addHeaderView(view);
    }

    @JsProperty("loadMoreView")
    private HMBase loadMoreView;
    public void setLoadMoreView(HMBase view) {
        refreshLayout.setEnableLoadMore(true);
        hummerFooter.addFooterView(view);
    }

    @JsProperty("onRefresh")
    private JSCallback refreshCallback;
    public void setOnRefresh(JSCallback callback) {
        refreshCallback = callback;
    }

    @JsProperty("onLoadMore")
    private JSCallback loadMoreCallback;
    public void setOnLoadMore(JSCallback callback) {
        loadMoreCallback = callback;
    }

    @JsMethod("stopPullRefresh")
    public void stopPullRefresh() {
        // 这里加一个delay时间，是为了解决RefreshFinish状态回调有时候不来的问题
        refreshLayout.finishRefresh(30);
    }

    @JsMethod("stopLoadMore")
    public void stopLoadMore(boolean enable) {
        if (enable) {
            refreshLayout.finishLoadMore();
        } else {
            refreshLayout.finishLoadMoreWithNoMoreData();
        }

        if (loadMoreCallback != null) {
            loadMoreCallback.call(enable ? LoadMoreState.IDLE : LoadMoreState.NO_MORE_DATA);
        }
    }

    /**
     * 是否有回弹效果（默认true）
     */
    @JsProperty("bounces")
    public boolean bounces;
    public void setBounces(boolean bounces) {
        refreshLayout.setEnableOverScrollDrag(bounces);
    }

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
            scrollView.smoothScrollTo(nX, nY);
        } else {
            scrollView.scrollTo(nX, nY);
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
            scrollView.smoothScrollBy(nDx, nDy);
        } else {
            scrollView.scrollBy(nDx, nDy);
        }
    }

    @JsMethod("scrollToTop")
    public void scrollToTop() {
        scrollView.fullScroll(View.FOCUS_UP);
    }

    @JsMethod("scrollToBottom")
    public void scrollToBottom() {
        scrollView.fullScroll(View.FOCUS_DOWN);
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
