package com.didi.hummer.devtools.widget;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
import android.support.annotation.Nullable;
import android.support.v4.view.ViewCompat;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.jsc.jni.HummerException;
import com.didi.hummer.core.exception.ExceptionCallback;
import com.didi.hummer.devtools.HummerDevTools;
import com.didi.hummer.devtools.invoker.HummerInvokerWrapper;
import com.didi.hummer.devtools.manager.HummerLogManager;
import com.didi.hummer.hummerdebug.R;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.style.HummerLayout;
import com.didi.hummer.render.utility.DPUtil;
import com.facebook.yoga.YogaEdge;
import com.facebook.yoga.YogaPositionType;

/**
 * @author: linjizong
 * @date: 2020-04-20
 * @desc:
 */
public class DevToolsEntrance extends LinearLayout {
    private static final int DEFAULT_MARGIN_DP = 100;

    private HummerLayout mRootView;
    private boolean mShow;
    private HMBase mConsoleView;
    private HummerLogManager mLogManager;
    private HummerContext mHummerContext;
    private HummerDevTools.IParameterInjector mParameterInjector;

    public DevToolsEntrance(Context context) {
        this(context, null);
    }

    public DevToolsEntrance(Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public DevToolsEntrance(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);
    }

    private void init(Context context) {
        if (!(context instanceof HummerContext) || ((HummerContext) context).getContainer() == null) {
            return;
        }

        mHummerContext = (HummerContext) context;
        mRootView = mHummerContext.getContainer();

        initView(context);
    }

    private void initView(Context context) {
        setOrientation(VERTICAL);
        setGravity(Gravity.CENTER_HORIZONTAL);
        setFocusableInTouchMode(true);
        setOnKeyListener((v, keyCode, event) -> {
            if (keyCode == KeyEvent.KEYCODE_BACK && event.getAction() == KeyEvent.ACTION_UP) {
                if (mShow) {
                    closeDebugView();
                    return true;
                }
            }
            return false;
        });

        LinearLayout.LayoutParams lpTvJsEngine = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);

        TextView tvEntry = new TextView(context);
        tvEntry.setText("开发\n工具");
        tvEntry.setTextSize(10);
        tvEntry.setTextColor(Color.WHITE);
        tvEntry.setWidth(DPUtil.dp2px(context, 40));
        tvEntry.setHeight(DPUtil.dp2px(context, 40));
        tvEntry.setGravity(Gravity.CENTER);
        tvEntry.setBackgroundResource(R.drawable.btn_dev_tools_entrance_bg);
        addView(tvEntry, lpTvJsEngine);

        TextView tvJsEngine = new TextView(context);
        tvJsEngine.setText(getJsEngineString());
        tvJsEngine.setTextSize(7);
        tvJsEngine.setTextColor(Color.WHITE);
        tvJsEngine.setBackgroundResource(R.drawable.btn_dev_tools_js_engine_bg);
        tvJsEngine.setPadding(DPUtil.dp2px(context, 3), DPUtil.dp2px(context, 1), DPUtil.dp2px(context, 3), DPUtil.dp2px(context, 1));
        lpTvJsEngine.topMargin = DPUtil.dp2px(context, 4);
        addView(tvJsEngine, lpTvJsEngine);

        FrameLayout.LayoutParams lpEntryLayout = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        lpEntryLayout.setMarginEnd(DPUtil.dp2px(context, 12));

        FloatLayout floatLayout = new FloatLayout(context);
        floatLayout.addView(this, lpEntryLayout);
        ViewCompat.setElevation(floatLayout, 10000);
        floatLayout.setOnClickListener(v -> {
            if (!mShow) {
                openDebugView();
            } else {
                closeDebugView();
            }
        });

        HMBase<FloatLayout> base = new HMBase<FloatLayout>(mHummerContext, null, null) {
            @Override
            protected FloatLayout createViewInstance(Context context) {
                return floatLayout;
            }
        };
        base.getYogaNode().setPositionType(YogaPositionType.ABSOLUTE);
        base.getYogaNode().setPosition(YogaEdge.END, 0);
        base.getYogaNode().setPosition(YogaEdge.BOTTOM, DPUtil.dp2px(context, DEFAULT_MARGIN_DP));
        mRootView.addView(base);
    }

    public void setParameterInjector(HummerDevTools.IParameterInjector injector) {
        this.mParameterInjector = injector;
    }

    public void setLogManager(HummerLogManager manager) {
        this.mLogManager = manager;
    }

    @SuppressLint("SwitchIntDef")
    public String getJsEngineString() {
        String className = mHummerContext.getClass().getSimpleName();
        switch (className) {
            case "JSCHummerContext":
                int engine = HummerSDK.getJsEngine();
                switch (engine) {
                    case HummerSDK.JsEngine.JSC:
                        return "JSC";
                    case HummerSDK.JsEngine.JSC_WEEX:
                        return "JSC_Weex";
                    case HummerSDK.JsEngine.HERMES:
                        return "Hermes";
                    case HummerSDK.JsEngine.QUICK_JS:
                        return "QuickJS";
                    default:
                        return "Unknown";
                }
            case "V8HummerContext":
                return "V8";
            default:
                return "Unknown";
        }
    }

    private ExceptionCallback mExceptionCallback = e -> {
        mLogManager.addException(Log.getStackTraceString(e));
    };


    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        if (mHummerContext != null) {
            HummerException.addJSContextExceptionCallback(mHummerContext.getJsContext(), mExceptionCallback);
        }
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        if (mHummerContext != null) {
            HummerException.removeJSContextExceptionCallback(mHummerContext.getJsContext(), mExceptionCallback);
        }
    }

    public void closeDebugView() {
        mShow = false;
        mRootView.removeView(mConsoleView);
    }

    public void openDebugView() {
        mShow = true;
        if (mConsoleView == null) {
            createConsoleView();
        }
        mRootView.addView(mConsoleView);
        requestFocus();
    }

    private void createConsoleView() {
        ConsoleView view = new ConsoleView(getContext());
        view.bindHummerContext(mHummerContext);
        view.bindParameterInjector(mParameterInjector);
        view.bindLog(mLogManager);
        ViewCompat.setElevation(view, 9999);

        mConsoleView = new HMBase<ConsoleView>(mHummerContext, null, null) {
            @Override
            protected ConsoleView createViewInstance(Context context) {
                return view;
            }
        };
        mConsoleView.getYogaNode().setPositionType(YogaPositionType.ABSOLUTE);
        mConsoleView.getYogaNode().setWidthPercent(100);
        mConsoleView.getYogaNode().setHeightPercent(100);
    }

}
