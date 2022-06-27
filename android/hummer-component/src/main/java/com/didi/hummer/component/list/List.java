package com.didi.hummer.component.list;

import android.app.Activity;
import android.content.Context;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsAttribute;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.component.R;
import com.didi.hummer.component.input.FocusUtil;
import com.didi.hummer.component.input.KeyboardUtil;
import com.didi.hummer.component.list.decoration.GridSpacingItemDecoration;
import com.didi.hummer.component.list.decoration.LinearSpacingItemDecoration;
import com.didi.hummer.component.list.decoration.StaggeredGridSpacingItemDecoration;
import com.didi.hummer.component.refresh.HummerFooter;
import com.didi.hummer.component.refresh.HummerHeader;
import com.didi.hummer.component.refresh.LoadMoreState;
import com.didi.hummer.component.refresh.PullRefreshState;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.util.DebugUtil;
import com.didi.hummer.pool.ObjectPool;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.event.view.ScrollEvent;
import com.didi.hummer.render.style.HummerNode;
import com.didi.hummer.render.style.HummerStyleUtils;
import com.didi.hummer.render.utility.DPUtil;
import com.didi.hummer.render.utility.YogaNodeUtil;
import com.facebook.yoga.YogaNode;
import com.facebook.yoga.android.YogaLayout;
import com.scwang.smart.refresh.layout.SmartRefreshLayout;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

/**
 * 列表组件（包含垂直和水平）
 *
 * Created by XiaoFeng on 2020-09-30.
 */
@Component("List")
public class List extends HMBase<SmartRefreshLayout> {
    private static final int MODE_LIST = 1;
    private static final int MODE_GRID = 2;
    private static final int MODE_WATERFALL = 3;

    private static final int DIRECTION_VERTICAL = 1;
    private static final int DIRECTION_HORIZONTAL = 2;

    private int mode = MODE_LIST;
    private int direction = DIRECTION_VERTICAL;
    private int column = 2;
    private int lineSpacing;
    private int itemSpacing;
    private int leftSpacing;
    private int rightSpacing;
    private int topSpacing;
    private int bottomSpacing;

    private boolean needUpdateMode = true;
    private boolean needUpdateLineSpacing = true;
    private boolean needUpdateEdgeSpacing = true;

    private SmartRefreshLayout refreshLayout;
    private HummerHeader hummerHeader;
    private HummerFooter hummerFooter;
    private RecyclerView recyclerView;
    private YogaNode recyclerViewNode;
    private HMListAdapter adapter;
    private RecyclerView.LayoutManager layoutManager;
    private RecyclerView.ItemDecoration itemDecoration;

    private ObjectPool instanceManager;

    private boolean isLoadingMore;

    private boolean isScrollStarted = false;
    private ScrollEvent scrollEvent = new ScrollEvent();

    private RecyclerView.OnScrollListener mOnScrollListener = new RecyclerView.OnScrollListener() {
        @Override
        public void onScrolled(RecyclerView recyclerView, int dx, int dy) {
            if (!mEventManager.contains(ScrollEvent.HM_EVENT_TYPE_SCROLL)) {
                return;
            }

            if (!isScrollStarted) {
                return;
            }

            int offsetX = recyclerView.computeHorizontalScrollOffset();
            int offsetY = recyclerView.computeVerticalScrollOffset();

            scrollEvent.setType(ScrollEvent.HM_EVENT_TYPE_SCROLL);
            scrollEvent.setState(ScrollEvent.HM_SCROLL_STATE_SCROLL);
            scrollEvent.setOffsetX(DPUtil.px2dpF(getContext(), offsetX));
            scrollEvent.setOffsetY(DPUtil.px2dpF(getContext(), offsetY));
            scrollEvent.setDx(DPUtil.px2dpF(getContext(), dx));
            scrollEvent.setDy(DPUtil.px2dpF(getContext(), dy));
            scrollEvent.setTimestamp(System.currentTimeMillis());
            mEventManager.dispatchEvent(ScrollEvent.HM_EVENT_TYPE_SCROLL, scrollEvent);

            hideKeyboardIfNeed(dx, dy);
        }

        @Override
        public void onScrollStateChanged(RecyclerView recyclerView, int newState) {
            super.onScrollStateChanged(recyclerView, newState);
            if (!mEventManager.contains(ScrollEvent.HM_EVENT_TYPE_SCROLL)) {
                return;
            }

            switch (newState) {
                case RecyclerView.SCROLL_STATE_IDLE:
                    isScrollStarted = false;
                    scrollEvent.setType(ScrollEvent.HM_EVENT_TYPE_SCROLL);
                    scrollEvent.setState(ScrollEvent.HM_SCROLL_STATE_ENDED);
                    scrollEvent.setOffsetX(0);
                    scrollEvent.setOffsetY(0);
                    scrollEvent.setDx(0);
                    scrollEvent.setDy(0);
                    scrollEvent.setTimestamp(System.currentTimeMillis());
                    mEventManager.dispatchEvent(ScrollEvent.HM_EVENT_TYPE_SCROLL, scrollEvent);
                    refreshNodeTree();
                    break;
                case RecyclerView.SCROLL_STATE_DRAGGING:
                    isScrollStarted = true;
                    scrollEvent.setType(ScrollEvent.HM_EVENT_TYPE_SCROLL);
                    scrollEvent.setState(ScrollEvent.HM_SCROLL_STATE_BEGAN);
                    scrollEvent.setOffsetX(0);
                    scrollEvent.setOffsetY(0);
                    scrollEvent.setDx(0);
                    scrollEvent.setDy(0);
                    scrollEvent.setTimestamp(System.currentTimeMillis());
                    mEventManager.dispatchEvent(ScrollEvent.HM_EVENT_TYPE_SCROLL, scrollEvent);
                    break;
                case RecyclerView.SCROLL_STATE_SETTLING:
                    scrollEvent.setType(ScrollEvent.HM_EVENT_TYPE_SCROLL);
                    scrollEvent.setState(ScrollEvent.HM_SCROLL_STATE_SCROLL_UP);
                    scrollEvent.setTimestamp(System.currentTimeMillis());
                    mEventManager.dispatchEvent(ScrollEvent.HM_EVENT_TYPE_SCROLL, scrollEvent);
                    break;
                default:
                    break;
            }
        }
    };

    public List(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
        this.instanceManager = context.getObjectPool();
    }

    @Override
    protected SmartRefreshLayout createViewInstance(Context context) {
        // 这里不用代码new一个RecyclerView，而是通过xml，是为了解决设置scrollerbar显示无效的问题
        recyclerView = (RecyclerView) LayoutInflater.from(context).inflate(R.layout.recycler_view, null, false);
        recyclerView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        recyclerView.setClipChildren(false);
        recyclerView.setOnTouchListener((v, event) -> {
            // 手指按下时，如果有键盘已弹出，则把键盘消失掉
            if (event.getAction() == MotionEvent.ACTION_DOWN) {
                FocusUtil.clearFocus(context);
            }
            return false;
        });

        refreshLayout = new SmartRefreshLayout(context);
        refreshLayout.setEnableRefresh(false);
        refreshLayout.setEnableLoadMore(false);
        refreshLayout.setEnableOverScrollDrag(true); // 默认有回弹效果
        refreshLayout.setRefreshContent(recyclerView);

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
                isLoadingMore = true;
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
        recyclerView.addOnScrollListener(mOnScrollListener);
        adapter = new HMListAdapter(getContext(), instanceManager);
        recyclerView.setAdapter(adapter);

        recyclerViewNode = YogaNodeUtil.createYogaNode();
        recyclerViewNode.setMeasureFunction(new YogaLayout.ViewMeasureFunction());
        recyclerViewNode.setData(recyclerView);
        recyclerViewNode.setFlexGrow(1);
        getYogaNode().setMeasureFunction(null);
        getYogaNode().addChildAt(recyclerViewNode, 0);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (adapter != null) {
            adapter.destroy();
        }
    }

    @Override
    protected void onStyleUpdated(Map<String, Object> newStyle) {
        if (needUpdateMode) {
            initLayoutManager();
        }

        if (needUpdateLineSpacing) {
            initLineSpacing();
        }

        if (needUpdateEdgeSpacing) {
            initEdgeSpacing();
        }

        needUpdateMode = false;
        needUpdateLineSpacing = false;
        needUpdateEdgeSpacing = false;
    }

    private void initLayoutManager() {
        switch (mode) {
            case MODE_LIST:
            default: {
                int orientation = direction == DIRECTION_HORIZONTAL ? LinearLayoutManager.HORIZONTAL : LinearLayoutManager.VERTICAL;
                layoutManager = new LinearLayoutManager(getContext(), orientation, false);
//                layoutManager = new LinearLayoutManager(getContext(), orientation, false) {
//                    /**
//                     * 方法二：解决scrollToPosition时item无法滚动到屏幕开始处的问题
//                     * 参考：https://www.jianshu.com/p/bde672af4e11
//                     */
//                    @Override
//                    public void smoothScrollToPosition(RecyclerView view, RecyclerView.State state, int position) {
//                        TopLinearSmoothScroller scroller = new TopLinearSmoothScroller(view.getContext());
//                        scroller.setTargetPosition(position);
//                        startSmoothScroll(scroller);
//                    }
//                };
                break;
            }
            case MODE_GRID: {
                int orientation = direction == DIRECTION_HORIZONTAL ? GridLayoutManager.HORIZONTAL : GridLayoutManager.VERTICAL;
                layoutManager = new GridLayoutManager(getContext(), column, orientation, false);
                break;
            }
            case MODE_WATERFALL: {
                int orientation = direction == DIRECTION_HORIZONTAL ? StaggeredGridLayoutManager.HORIZONTAL : StaggeredGridLayoutManager.VERTICAL;
                layoutManager = new StaggeredGridLayoutManager(column, orientation) {
                    /**
                     * 这里重写StaggeredGridLayoutManager，是为了修复滑动过程中自动触发动画后，item间距错乱的问题。
                     * 参考：https://blog.kyleduo.com/2017/07/27/recyclerview-wrong-decoration-inset/
                     */
                    private Method markItemDecorInsetsDirty = null;
                    private boolean reflectError = false;

                    @Override
                    public void onLayoutChildren(RecyclerView.Recycler recycler, RecyclerView.State state) {
                        if (markItemDecorInsetsDirty == null && !reflectError) {
                            try {
                                markItemDecorInsetsDirty = RecyclerView.class.getDeclaredMethod("markItemDecorInsetsDirty");
                                markItemDecorInsetsDirty.setAccessible(true);
                            } catch (NoSuchMethodException e) {
                                e.printStackTrace();
                                reflectError = true;
                            }
                        }
                        if (markItemDecorInsetsDirty != null && state.willRunSimpleAnimations()) {
                            // noinspection TryWithIdenticalCatches
                            try {
                                markItemDecorInsetsDirty.invoke(recyclerView);
                            } catch (IllegalAccessException e) {
                                e.printStackTrace();
                            } catch (InvocationTargetException e) {
                                e.printStackTrace();
                            }
                        }
                        super.onLayoutChildren(recycler, state);
                    }

                    @Override
                    public void requestSimpleAnimationsInNextLayout() {
                        super.requestSimpleAnimationsInNextLayout();
                        if (markItemDecorInsetsDirty != null) {
                            // noinspection TryWithIdenticalCatches
                            try {
                                markItemDecorInsetsDirty.invoke(recyclerView);
                            } catch (IllegalAccessException e) {
                                e.printStackTrace();
                            } catch (InvocationTargetException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                };
                break;
            }
        }
        recyclerView.setLayoutManager(layoutManager);
    }

    private void initLineSpacing() {
        RecyclerView.ItemDecoration oldItemDecoration = itemDecoration;

        switch (mode) {
            case MODE_LIST:
            default:
                if (lineSpacing > 0) {
                    itemDecoration = new LinearSpacingItemDecoration(lineSpacing, false);
                }
                break;
            case MODE_GRID:
                if (lineSpacing > 0 || itemSpacing > 0) {
                    itemDecoration = new GridSpacingItemDecoration(column, lineSpacing, itemSpacing, false);
                }
                break;
            case MODE_WATERFALL:
                if (lineSpacing > 0 || itemSpacing > 0) {
                    itemDecoration = new StaggeredGridSpacingItemDecoration(column, lineSpacing, itemSpacing, false);
                }
                break;
        }

        // 更新ItemDecoration
        if (itemDecoration != null) {
            if (oldItemDecoration != null) {
                recyclerView.removeItemDecoration(oldItemDecoration);
            }
            recyclerView.addItemDecoration(itemDecoration);
        }
    }

    private void initEdgeSpacing() {
        // List组件四周边缘的间距
        if (leftSpacing > 0 || rightSpacing > 0 || topSpacing > 0 || bottomSpacing > 0) {
            recyclerView.setPadding(leftSpacing, topSpacing, rightSpacing, bottomSpacing);
            recyclerView.setClipToPadding(false);
        }
    }

    private void hideKeyboardIfNeed(int dx, int dy) {
        int d = 0;
        if (direction == DIRECTION_VERTICAL) {
            d = Math.abs(dy);
        } else if (direction == DIRECTION_HORIZONTAL) {
            d = Math.abs(dx);
        }
        if (d > 20 && getView().getContext() instanceof Activity) {
            Activity act = (Activity) getView().getContext();
            if (act.getCurrentFocus() != null && act.getCurrentFocus().getWindowToken() != null) {
                KeyboardUtil.hideKeyboard(act.getCurrentFocus());
            }
        }
    }

    @JsAttribute("mode")
    public void setMode(String strMode) {
        int curMode;
        switch (strMode) {
            case "list":
            default:
                curMode = MODE_LIST;
                break;
            case "grid":
                curMode = MODE_GRID;
                break;
            case "waterfall":
                curMode = MODE_WATERFALL;
                break;
        }

        if (mode != curMode) {
            mode = curMode;
            needUpdateMode = true;

            // 瀑布流模式下的默认值为8
            if (curMode == MODE_WATERFALL) {
                if (lineSpacing <= 0) {
                    lineSpacing = DPUtil.dp2px(getContext(), 8);
                }
                if (itemSpacing <= 0) {
                    itemSpacing = DPUtil.dp2px(getContext(), 8);
                }
                needUpdateLineSpacing = true;
            }
        }
    }

    @JsAttribute("scrollDirection")
    public void setScrollDirection(String strDirection) {
        int curDirection;
        switch (strDirection) {
            case "vertical":
            default:
                curDirection = DIRECTION_VERTICAL;
                break;
            case "horizontal":
                curDirection = DIRECTION_HORIZONTAL;
                break;
        }

        if (direction != curDirection) {
            direction = curDirection;
            needUpdateMode = true;
        }
    }

    @JsAttribute("column")
    public void setColumn(int column) {
        if (this.column != column) {
            this.column = column;
            if (mode == MODE_GRID || mode == MODE_WATERFALL) {
                needUpdateMode = true;
                needUpdateLineSpacing = true;
            }
        }
    }

    @JsAttribute("lineSpacing")
    public void setLineSpacing(int spacing) {
        if (this.lineSpacing != spacing) {
            this.lineSpacing = spacing;
            needUpdateLineSpacing = true;
        }
    }

    @JsAttribute("itemSpacing")
    public void setItemSpacing(int spacing) {
        if (this.itemSpacing != spacing) {
            this.itemSpacing = spacing;
            if (mode == MODE_GRID || mode == MODE_WATERFALL) {
                needUpdateLineSpacing = true;
            }
        }
    }

    @JsAttribute("leftSpacing")
    public void setLeftSpacing(int spacing) {
        if (this.leftSpacing != spacing) {
            this.leftSpacing = spacing;
            needUpdateEdgeSpacing = true;
        }
    }

    @JsAttribute("rightSpacing")
    public void setRightSpacing(int spacing) {
        if (this.rightSpacing != spacing) {
            this.rightSpacing = spacing;
            needUpdateEdgeSpacing = true;
        }
    }

    @JsAttribute("topSpacing")
    public void setTopSpacing(int spacing) {
        if (this.topSpacing != spacing) {
            this.topSpacing = spacing;
            needUpdateEdgeSpacing = true;
        }
    }

    @JsAttribute("bottomSpacing")
    public void setBottomSpacing(int spacing) {
        if (this.bottomSpacing != spacing) {
            this.bottomSpacing = spacing;
            needUpdateEdgeSpacing = true;
        }
    }

    @JsProperty("refreshView")
    private HMBase refreshView;
    public void setRefreshView(HMBase view) {
        refreshView = view;
        refreshLayout.setEnableRefresh(true);
        hummerHeader.addHeaderView(view);
    }

    @JsProperty("loadMoreView")
    private HMBase loadMoreView;
    public void setLoadMoreView(HMBase view) {
        loadMoreView = view;
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

    @JsProperty("onRegister")
    private JSCallback onRegister;
    public void setOnRegister(JSCallback onRegister) {
        adapter.setTypeCallback(onRegister);
    }

    @JsProperty("onCreate")
    private JSCallback onCreate;
    public void setOnCreate(JSCallback onCreate) {
        adapter.setCreateCallback(onCreate);
    }

    @JsProperty("onUpdate")
    private JSCallback onUpdate;
    public void setOnUpdate(JSCallback onUpdate) {
        adapter.setUpdateCallback(onUpdate);
    }

    /**
     * 是否显示滚动条（默认false）
     */
    @JsProperty("showScrollBar")
    private boolean showScrollBar;
    public void setShowScrollBar(boolean isShow) {
        showScrollBar = isShow;
        if (direction == DIRECTION_VERTICAL) {
            recyclerView.setVerticalScrollBarEnabled(isShow);
        } else if (direction == DIRECTION_HORIZONTAL) {
            recyclerView.setHorizontalScrollBarEnabled(isShow);
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

    @JsMethod("refresh")
    public void refresh(int count) {
        if (!isLoadingMore) {
            // 下拉刷新的情况下，重置加载更多状态
            refreshLayout.resetNoMoreData();
        }
        if (recyclerViewNode != null) {
            recyclerViewNode.dirty();
        }
        if (adapter != null) {
            adapter.refresh(count, isLoadingMore);
        }
        isLoadingMore = false;

        refreshNodeTree();
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
            refreshLayout.resetNoMoreData();
        } else {
            refreshLayout.finishLoadMoreWithNoMoreData();
        }

        if (loadMoreCallback != null) {
            loadMoreCallback.call(enable ? LoadMoreState.IDLE : LoadMoreState.NO_MORE_DATA);
        }
    }

    @JsMethod("scrollTo")
    public void scrollTo(Object x, Object y) {
        int nX = (int) HummerStyleUtils.convertNumber(x);
        int nY = (int) HummerStyleUtils.convertNumber(y);
        recyclerView.scrollTo(nX, nY);
    }

    @JsMethod("scrollBy")
    public void scrollBy(Object dx, Object dy) {
        int nDx = (int) HummerStyleUtils.convertNumber(dx);
        int nDy = (int) HummerStyleUtils.convertNumber(dy);
        recyclerView.scrollBy(nDx, nDy);
    }

    @JsMethod("scrollToPosition")
    public void scrollToPosition(int position) {
        // 方法一：解决item无法滚动到屏幕开始处的问题（无平滑滚动效果）
        if (layoutManager instanceof LinearLayoutManager) {
            ((LinearLayoutManager) layoutManager).scrollToPositionWithOffset(position, 0);
        }
        // 平滑滚动
//        recyclerView.smoothScrollToPosition(position);
    }

    @JsMethod("dbg_getDescription")
    public void dbg_getDescription(JSCallback callback, int depth) {
        refreshNodeTree();
        super.dbg_getDescription(callback, depth);
    }

    private void refreshNodeTree() {
        if (!DebugUtil.isDebuggable()) {
            return;
        }

        getView().post(() -> {
            getNode().removeAll();

            if (refreshView != null) {
                refreshView.getNode().setAlias("Header");
                getNode().appendChild(refreshView.getNode());
            }

            int firstPosition = ListUtil.getFirstVisibleItemPosition(layoutManager);
            int lastPosition = ListUtil.getLastVisibleItemPosition(layoutManager);
            for (int i = firstPosition; i <= lastPosition; i++) {
                RecyclerView.ViewHolder vh = recyclerView.findViewHolderForAdapterPosition(i);
                if (vh instanceof HMListAdapter.ViewHolder) {
                    HummerNode node = ((HMListAdapter.ViewHolder) vh).getNode();
                    if (node != null) {
                        node.setAlias(String.valueOf(i));
                        getNode().appendChild(node);
                    }
                }
            }

            if (loadMoreView != null) {
                loadMoreView.getNode().setAlias("Footer");
                getNode().appendChild(loadMoreView.getNode());
            }
        });
    }

    @Override
    public void resetStyle() {
        super.resetStyle();
        setMode("list");
        setScrollDirection("vertical");
        setColumn(2);
        setShowScrollBar(false);
    }

    @Override
    public boolean setStyle(String key, Object value) {
        switch (key) {
            case HummerStyleUtils.Hummer.MODE:
                setMode(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.SCROLL_DIRECTION:
                setScrollDirection(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.COLUMN:
                setColumn((int) (float) value);
                break;
            case HummerStyleUtils.Hummer.LINE_SPACING:
                setLineSpacing((int) (float) value);
                break;
            case HummerStyleUtils.Hummer.ITEM_SPACING:
                setItemSpacing((int) (float) value);
                break;
            case HummerStyleUtils.Hummer.LEFT_SPACING:
                setLeftSpacing((int) (float) value);
                break;
            case HummerStyleUtils.Hummer.RIGHT_SPACING:
                setRightSpacing((int) (float) value);
                break;
            case HummerStyleUtils.Hummer.TOP_SPACING:
                setTopSpacing((int) (float) value);
                break;
            case HummerStyleUtils.Hummer.BOTTOM_SPACING:
                setBottomSpacing((int) (float) value);
                break;
            default:
                return false;
        }
        return true;
    }
}

