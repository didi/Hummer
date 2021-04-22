package com.didi.hummer;

import android.content.Context;
import android.support.v4.view.ViewCompat;
import android.view.View;
import android.widget.Toast;

import com.didi.hummer.adapter.http.HttpCallback;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.devtools.widget.FloatLayout;
import com.didi.hummer.pool.ComponentPool;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.utils.NetworkUtil;
import com.facebook.yoga.YogaEdge;
import com.facebook.yoga.YogaPositionType;

/**
 * Created by XiaoFeng on 2020/9/29.
 */
public class HummerDebugger {

    public static void init(HummerContext context, String url) {
        if (HummerSDK.getHermesDebugger() != null) {
            Hummer.getHermesDebugger().enableDebugging(context.getJsContext().getIdentify(), url);
        }

        if (HummerSDK.getV8Debugger() != null) {
            NetworkUtil.httpGet(url, (HttpCallback<String>) response -> {
                Hummer.getV8Debugger().addScriptSource(url, response.data);
            });
        }

        initRefreshView(context, url);
    }

    public static void release(HummerContext context) {
        if (HummerSDK.getHermesDebugger() != null) {
            Hummer.getHermesDebugger().disableDebugging(context.getJsContext().getIdentify());
        }
    }

    private static void initRefreshView(HummerContext context, String url) {
        FloatLayout floatLayout = new FloatLayout(context);
        floatLayout.setOnClickListener(v -> {
            context.onRefresh();
            NetworkUtil.httpGet(url, (HttpCallback<String>) response -> {
                context.evaluateJavaScript(response.data, url);
                Toast.makeText(context, "页面已刷新", Toast.LENGTH_SHORT).show();
            });
        });
        ViewCompat.setElevation(floatLayout, 9000);
        View.inflate(context, R.layout.layout_refresh_btn, floatLayout);

        HMBase<FloatLayout> base = new HMBase<FloatLayout>(context, null, null) {
            @Override
            protected FloatLayout createViewInstance(Context context) {
                return floatLayout;
            }
        };
        base.getYogaNode().setPositionType(YogaPositionType.ABSOLUTE);
        base.getYogaNode().setPosition(YogaEdge.END, 0);
        base.getYogaNode().setPositionPercent(YogaEdge.TOP, 50);
        context.getContainer().addView(base);
    }
}
