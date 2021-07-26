package com.didi.hummer.devtools.widget;

import android.annotation.SuppressLint;
import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v4.view.ViewCompat;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.TextView;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.jsc.jni.HummerException;
import com.didi.hummer.core.engine.napi.jni.JSException;
import com.didi.hummer.core.exception.ExceptionCallback;
import com.didi.hummer.devtools.HummerDevTools;
import com.didi.hummer.devtools.R;
import com.didi.hummer.devtools.manager.HummerLogManager;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.style.HummerLayout;
import com.facebook.yoga.YogaEdge;
import com.facebook.yoga.YogaPositionType;

/**
 * DevTools按钮入口视图管理类
 *
 * Created by XiaoFeng on 2021/5/25.
 */
public class DevToolsEntrance {

    private HummerContext mHummerContext;
    private JSContext mJsContext;
    private HummerLayout mContainer;
    private View mLayoutDevtools;
    private HMBase mConsoleView;
    private HummerLogManager mLogManager;
    private HummerDevTools.IParameterInjector mParameterInjector;
    private boolean mIsShown;

    private ExceptionCallback mExceptionCallback = e -> {
        mLogManager.addException(Log.getStackTraceString(e));
    };

    public DevToolsEntrance(@NonNull HummerContext context) {
        mHummerContext = context;
        mJsContext = mHummerContext.getJsContext();
        mContainer = mHummerContext.getContainer();

        if (HummerSDK.getJsEngine() == HummerSDK.JsEngine.NAPI_QJS
                || HummerSDK.getJsEngine() == HummerSDK.JsEngine.NAPI_HERMES) {
            JSException.addJSContextExceptionCallback(mJsContext, mExceptionCallback);
        } else {
            HummerException.addJSContextExceptionCallback(mJsContext, mExceptionCallback);
        }

        initView(context);
    }

    public void release() {
        if (HummerSDK.getJsEngine() == HummerSDK.JsEngine.NAPI_QJS
                || HummerSDK.getJsEngine() == HummerSDK.JsEngine.NAPI_HERMES) {
            JSException.removeJSContextExceptionCallback(mJsContext, mExceptionCallback);
        } else {
            HummerException.removeJSContextExceptionCallback(mJsContext, mExceptionCallback);
        }
    }

    private void initView(Context context) {
        FloatLayout floatLayout = new FloatLayout(context);
        ViewCompat.setElevation(floatLayout, 10000);
        floatLayout.setOnClickListener(v -> {
            if (!mIsShown) {
                openConsoleView();
            } else {
                closeConsoleView();
            }
        });

        mLayoutDevtools = View.inflate(context, R.layout.layout_devtools_btn, floatLayout);
        mLayoutDevtools.setFocusableInTouchMode(true);
        mLayoutDevtools.setOnKeyListener((v, keyCode, event) -> {
            if (keyCode == KeyEvent.KEYCODE_BACK && event.getAction() == KeyEvent.ACTION_UP) {
                if (mIsShown) {
                    closeConsoleView();
                    return true;
                }
            }
            return false;
        });

        TextView tvJsEngine = mLayoutDevtools.findViewById(R.id.tv_js_engine);
        tvJsEngine.setText(getJsEngineString());

        HMBase<FloatLayout> base = new HMBase<FloatLayout>(mHummerContext, null, null) {
            @Override
            protected FloatLayout createViewInstance(Context context) {
                return floatLayout;
            }
        };
        base.getYogaNode().setPositionType(YogaPositionType.ABSOLUTE);
        base.getYogaNode().setPosition(YogaEdge.END, 0);
        base.getYogaNode().setPositionPercent(YogaEdge.BOTTOM, 20);
        mContainer.addView(base);
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
            case "JSCHummerContext": {
                int engine = HummerSDK.getJsEngine();
                switch (engine) {
                    case HummerSDK.JsEngine.JSC:
                        return "JSC";
                    case HummerSDK.JsEngine.HERMES:
                        return "Hermes";
                    case HummerSDK.JsEngine.QUICK_JS:
                        return "QuickJS";
                    default:
                        return "Unknown";
                }
            }
            case "NAPIHummerContext": {
                int engine = HummerSDK.getJsEngine();
                switch (engine) {
                    case HummerSDK.JsEngine.NAPI_QJS:
                        return "NAPI - QuickJS";
                    case HummerSDK.JsEngine.NAPI_HERMES:
                        return "NAPI - Hermes";
                    default:
                        return "Unknown";
                }
            }
            case "V8HummerContext":
                return "V8";
            default:
                return "Unknown";
        }
    }

    private void openConsoleView() {
        mIsShown = true;
        if (mConsoleView == null) {
            initConsoleView();
        }
        mContainer.addView(mConsoleView);

        mLayoutDevtools.requestFocus();
    }

    private void closeConsoleView() {
        mIsShown = false;
        mContainer.removeView(mConsoleView);
    }

    private void initConsoleView() {
        ConsoleView view = new ConsoleView(mHummerContext);
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
