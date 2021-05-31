package com.didi.hummer.component.viewpager;

import android.content.Context;
import android.view.MotionEvent;
import android.view.View;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsAttribute;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.component.R;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.lifecycle.IFullLifeCycle;
import com.didi.hummer.pool.ObjectPool;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.style.HummerStyleUtils;
import com.zhpan.bannerview.BannerViewPager;
import com.zhpan.bannerview.constants.PageStyle;
import com.zhpan.bannerview.holder.ViewHolder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by XiaoFeng on 2020-01-10.
 */
@Component("ViewPager")
public class ViewPager extends HMBase<BannerViewPager<Object, ViewHolder>> implements IFullLifeCycle {

    private static final String STYLE_ITEM_SPACING  = "itemSpacing";
    private static final String STYLE_EDGE_SPACING  = "edgeSpacing";
    private static final String STYLE_CAN_LOOP      = "canLoop";
    private static final String STYLE_AUTO_PLAY     = "autoPlay";
    private static final String STYLE_LOOP_INTERVAL = "loopInterval";
    private static final String STYLE_SCALE_FACTOR  = "scaleFactor";
    private static final String STYLE_ALPHA_FACTOR  = "alphaFactor";

    private CyclePagerAdapter adapter;
    private JSCallback mOnPageChangeListener;
    private JSCallback mOnPageScrollListener;
    private JSCallback mOnPageScrollStateChangeListener;
    private JSCallback mOnItemClickListener;
    private JSCallback mOnItemViewCallback;
    private float itemSpacing;
    private float edgeSpacing;
    private boolean canLoop;
    private boolean autoPlay;
    private int loopInterval;
    private float scaleFactor = ScaleAndAlphaTransformer.DEFAULT_MIN_SCALE;
    private float alphaFactor = ScaleAndAlphaTransformer.DEFAULT_MIN_ALPHA;
    private int cornerRadius;

    /**
     * 是否正在设置数据，设置数据过程中不需要回调mOnPageChange
     */
    private boolean isDataSetting;

    public ViewPager(HummerContext context, JSValue jsValue) {
        super(context, jsValue, null);
        HummerStyleUtils.addNonDpStyle(STYLE_LOOP_INTERVAL);
        HummerStyleUtils.addNonDpStyle(STYLE_SCALE_FACTOR);
        HummerStyleUtils.addNonDpStyle(STYLE_ALPHA_FACTOR);

        ObjectPool instanceManager = context.getObjectPool();
        adapter = new CyclePagerAdapter(context, instanceManager);
        adapter.setOnItemClickListener(position -> {
            int curIndex = getView().getViewPager().getCurrentItem();
            curIndex = adapter.getRealPosition(curIndex);
            if (position == curIndex) {
                if (mOnItemClickListener != null) {
                    mOnItemClickListener.call(position);
                }
            } else if (position == curIndex - 1 || position == curIndex + 1) {
                setCurrentItem(position);
            }
        });

        // 去除边缘半月阴影
        getView().getViewPager().setOverScrollMode(View.OVER_SCROLL_NEVER);

        getView().setScrollDuration(1000)
                .setCanLoop(false)
                .setIndicatorVisibility(View.GONE)
                // 先设一个空的ViewHolder，后面会重写掉整个ViewPager的PagerAdapter
                .setHolderCreator(EmptyViewHolder::new)
                .setOnPageChangeListener(new android.support.v4.view.ViewPager.OnPageChangeListener() {
                    @Override
                    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
                        /**
                         * Page 滑动距离回调
                         *
                         * @param position 当前滑动到的Page位置（滑动到中间位置时会切换position）
                         * @param positionOffset 当前Page滑动的距离（单位px）
                         */
                        if (mOnPageScrollListener != null) {
                            // 滑动到中间位置时切换position
                            if (positionOffset >= 0.5) {
                                position++;
                            }
                            mOnPageScrollListener.call(position, positionOffset);
                        }
                    }

                    @Override
                    public void onPageSelected(int position) {
                        if (mOnPageChangeListener != null && !isDataSetting) {
                            mOnPageChangeListener.call(position, mData.size());
                        }
                    }

                    @Override
                    public void onPageScrollStateChanged(int state) {
                        /**
                         * Page 滑动状态改变回调
                         *
                         * 0-停止滑动时
                         * 1-手动拖拽时
                         * 2-手指抬起时、自动滑动开始时
                         */
                        if (mOnPageScrollStateChangeListener != null) {
                            mOnPageScrollStateChangeListener.call(state);
                        }
                    }
                });
    }

    @Override
    protected BannerViewPager<Object, ViewHolder> createViewInstance(Context context) {
        return new BannerViewPager<Object, ViewHolder>(context) {
            private int startX, startY;

            // 这里重写父类的dispatchTouchEvent，把事件分发给内部的ViewPager子控件，是为了在ViewPager区域外点击和滑动时也能响应事件
            @Override
            public boolean dispatchTouchEvent(MotionEvent ev) {
                if (getCurrentItem() == 0 && getViewPager().getChildCount() == 0) {
                    return true;
                }
                processMotionEventConflict(ev);
                ev.offsetLocation(-edgeSpacing, 0);
                try {
                    return getViewPager().dispatchTouchEvent(ev);
                } catch (Exception e) {
                    e.printStackTrace();
                    return true;
                }
            }

            /**
             * 解决ViewPager放到ScrollView等控件中时的滑动冲突问题
             */
            protected void processMotionEventConflict(MotionEvent ev) {
                switch (ev.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        stopLoop();
                        startX = (int) ev.getX();
                        startY = (int) ev.getY();
                        getParent().requestDisallowInterceptTouchEvent(true);
                        break;
                    case MotionEvent.ACTION_MOVE:
                        int endX = (int) ev.getX();
                        int endY = (int) ev.getY();
                        int disX = Math.abs(endX - startX);
                        int disY = Math.abs(endY - startY);
                        if (2 * disX >= disY) {
                            if (!canLoop) {
                                if (getViewPager().getCurrentItem() == 0 && endX - startX > 0) {
                                    getParent().requestDisallowInterceptTouchEvent(false);
                                } else if (getViewPager().getCurrentItem() == getList().size() - 1 && endX - startX < 0) {
                                    getParent().requestDisallowInterceptTouchEvent(false);
                                }
                            }
                        } else {
                            getParent().requestDisallowInterceptTouchEvent(false);
                        }
                        break;
                    case MotionEvent.ACTION_UP:
                    case MotionEvent.ACTION_CANCEL:
                        startLoop();
                        getParent().requestDisallowInterceptTouchEvent(false);
                        break;
                    case MotionEvent.ACTION_OUTSIDE:
                        startLoop();
                        break;
                }
            }
        };
    }

    @Override
    public void onStart() {

    }

    @Override
    public void onResume() {
        getView().startLoop();
    }

    @Override
    public void onPause() {
        getView().stopLoop();
    }

    @Override
    public void onStop() {

    }

    @Override
    public void onStyleUpdated(Map<String, Object> style) {
        initPageStyle();
    }

    private void initPageStyle() {
        boolean canAutoPlay = autoPlay && loopInterval > 0;
        if (!canAutoPlay) {
            getView().stopLoop();
        }

        getView()
                .setPageStyle(edgeSpacing > 0 ? PageStyle.MULTI_PAGE : PageStyle.NORMAL)
                .setRevealWidth((int) (edgeSpacing - itemSpacing))
                .setAutoPlay(canAutoPlay)
                .setInterval(loopInterval)
                .setRoundCorner(cornerRadius);

        // getView().setPageMargin内部的mViewPager.setPageMargin多次快速设置时，在AutoPlay模式下，会出现短暂白屏，需要限制调用
        int pageMargin = (int) itemSpacing;
        if (pageMargin != getView().getViewPager().getPageMargin()) {
            getView().setPageMargin(pageMargin);
        }

        // 是否可以循环也是个重操作，也需要限制调用
        if (canLoop != adapter.isCanLoop()) {
            getView().setCanLoop(canLoop);
            adapter.setCanLoop(canLoop);
            if (!mData.isEmpty()) {
                setData(mData);
            }
        }
    }

    @JsProperty("data")
    public List<Object> mData = new ArrayList<>();

    public void setData(List<Object> data) {
        if (data == null) {
            data = new ArrayList<>();
        }

        // 如果是非图片url的数据源，但是又没有设置自定义控件的回调，则直接返回
        if (!data.isEmpty() && !(data.get(0) instanceof String) && mOnItemViewCallback == null) {
            return;
        }

        isDataSetting = true;

        mData = data;

        getView().create(data);

        // 设置前后两个item的样式
        if (edgeSpacing > 0 ) {
            if (scaleFactor > 0 || alphaFactor > 0) {
                getView().setPageTransformer(new ScaleAndAlphaTransformer(scaleFactor, alphaFactor));
            } else {
                getView().setPageTransformer(null);
            }
        }

        // 这里重写PagerAdapter，以适用自定义View
        adapter.setData(data);
        getView().getViewPager().setAdapter(adapter);

        isDataSetting = false;

        setCurrentItem(0);
    }

    @JsMethod("setCurrentItem")
    public void setCurrentItem(int position) {
        if (position < 0 || adapter.getItemCount() <= 0) {
            return;
        }
        position = Math.min(position, adapter.getItemCount() - 1);
        getView().setCurrentItem(position);
    }

    @JsMethod("onPageChange")
    public void onPageChange(JSCallback callback) {
        mOnPageChangeListener = callback;
    }

    @JsMethod("onPageScroll")
    public void onPageScroll(JSCallback callback) {
        mOnPageScrollListener = callback;
    }

    @JsMethod("onPageScrollStateChange")
    public void onPageScrollStateChange(JSCallback callback) {
        mOnPageScrollStateChangeListener = callback;
    }

    @JsMethod("onItemClick")
    public void onItemClick(JSCallback callback) {
        mOnItemClickListener = callback;
    }

    @JsMethod("onItemView")
    public void onItemView(JSCallback callback) {
        mOnItemViewCallback = callback;
        adapter.setOnItemViewCallback(callback);
    }

    @JsAttribute("itemSpacing")
    public void setItemSpacing(float spacing) {
        itemSpacing = spacing;
    }

    @JsAttribute("edgeSpacing")
    public void setEdgeSpacing(float spacing) {
        edgeSpacing = spacing;
    }

    @JsAttribute("canLoop")
    public void setCanLoop(boolean loop) {
        canLoop = loop;
    }

    @JsAttribute("autoPlay")
    public void setAutoPlay(boolean auto) {
        autoPlay = auto;
    }

    @JsAttribute("loopInterval")
    public void setLoopInterval(int interval) {
        loopInterval = interval;
    }

    @JsAttribute("scaleFactor")
    public void setScaleFactor(float factor) {
        scaleFactor = factor;
    }

    @JsAttribute("alphaFactor")
    public void setAlphaFactor(float factor) {
        alphaFactor = factor;
    }

    public void setBorderRadius(float radius) {
        cornerRadius = (int) radius;
    }

    @Override
    public void resetStyle() {
        super.resetStyle();

        getView()
                .setPageStyle(PageStyle.NORMAL)
                .setPageMargin(0)
                .setRevealWidth(0)
                .setCanLoop(false)
                .setAutoPlay(false)
                .setInterval(0)
                .setRoundCorner(0)
                .setPageTransformer(null);

        adapter.setCanLoop(false);
    }

    @Override
    public boolean setStyle(String key, Object value) {
        switch (key) {
            case STYLE_ITEM_SPACING:
                setItemSpacing((float) value);
                break;
            case STYLE_EDGE_SPACING:
                setEdgeSpacing((float) value);
                break;
            case STYLE_CAN_LOOP:
                setCanLoop((boolean) value);
                break;
            case STYLE_AUTO_PLAY:
                setAutoPlay((boolean) value);
                break;
            case STYLE_LOOP_INTERVAL:
                setLoopInterval((int) (float) value);
                break;
            case STYLE_SCALE_FACTOR:
                setScaleFactor((float) value);
                break;
            case STYLE_ALPHA_FACTOR:
                setAlphaFactor((float) value);
                break;
            case HummerStyleUtils.Hummer.BORDER_RADIUS:
                if (value instanceof Float) {
                    setBorderRadius((float) value);
                }
                break;
            default:
                return false;
        }
        return true;
    }

    public class EmptyViewHolder implements ViewHolder<Object> {

        @Override
        public int getLayoutId() {
            return R.layout.viewpager_empty_view;
        }

        @Override
        public void onBind(View itemView, Object data, int position, int size) {

        }
    }
}
