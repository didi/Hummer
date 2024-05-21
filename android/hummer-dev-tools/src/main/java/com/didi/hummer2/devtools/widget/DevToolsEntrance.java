package com.didi.hummer2.devtools.widget;

import android.content.Context;
import android.content.Intent;
import android.view.KeyEvent;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.core.view.ViewCompat;

import com.didi.hummer2.Hummer;
import com.didi.hummer2.HummerScriptContext;
import com.didi.hummer2.adapter.navigator.NavCallback;
import com.didi.hummer2.adapter.navigator.NavPage;
import com.didi.hummer2.HummerContext;
import com.didi.hummer2.devtools.HummerDevTools;
import com.didi.hummer2.devtools.R;
import com.didi.hummer2.devtools.manager.HummerLogManager;
import com.didi.hummer2.devtools.manager.HummerNetManager;
import com.didi.hummer2.devtools.qrcode.QrcodeHistoriesManager;
import com.didi.hummer2.devtools.qrcode.QrcodeMainActivity;
import com.didi.hummer2.render.component.view.HMBase;
import com.didi.hummer2.render.style.HummerLayout;
import com.facebook.yoga.YogaEdge;
import com.facebook.yoga.YogaPositionType;

import java.util.Map;

/**
 * DevTools按钮入口视图管理类
 * <p>
 * Created by XiaoFeng on 2021/5/25.
 */
public class DevToolsEntrance {

    private HummerContext mHummerContext;
    private HummerLayout mContainer;
    private View mLayoutDevtools;
    private HMBase mConsoleView;
    private HummerLogManager mLogManager;
    private HummerDevTools.IParameterInjector mParameterInjector;
    private HummerNetManager mNetManager;
    private boolean mIsShown;

    public DevToolsEntrance(@NonNull HummerContext context) {
        mHummerContext = context;
        mContainer = ((HummerScriptContext) mHummerContext).getContainer();
        initView(context);
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

        floatLayout.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                if (!mIsShown) {
                    QrcodeHistoriesManager.getInstance().setQrcodeCallback(qrcodeCallback);

                    Intent intent = new Intent(mHummerContext.getContext(), QrcodeMainActivity.class);
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    mHummerContext.startActivity(intent);
                    return true;
                }
                return false;
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

    public void setNetManager(HummerNetManager manager) {
        this.mNetManager = manager;
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
        view.bindNet(mNetManager);

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

    private QrcodeHistoriesManager.QrcodeCallback qrcodeCallback = new QrcodeHistoriesManager.QrcodeCallback() {
        @Override
        public void onQrcodeReceive(String url) {
            QrcodeHistoriesManager.getInstance().removeQrcodeCallback();
            ((HummerScriptContext) mHummerContext).getHummerConfig().getNavAdapter().openPage(mHummerContext, new NavPage(url), new NavCallback() {
                @Override
                public void onResult(Map<String, Object> data) {

                }
            });
        }
    };
}
