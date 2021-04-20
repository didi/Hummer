package com.didi.hummer.demo;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.util.Log;

import com.didi.hummer.HummerFragment;
import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.adapter.navigator.impl.DefaultNavigatorAdapter;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.engine.base.ICallback;
import com.didi.hummer.register.HummerRegister$$hummer_demo_app;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Hummer单页面示例
 *
 * Created by XiaoFeng on 2020/9/21.
 */
public class HummerSinglePageFragment extends HummerFragment {

    public static HummerFragment newInstance(@NonNull NavPage page) {
        HummerSinglePageFragment fragment = new HummerSinglePageFragment();
        Bundle args = new Bundle();
        args.putSerializable(DefaultNavigatorAdapter.EXTRA_PAGE_MODEL, page);
        fragment.setArguments(args);
        return fragment;
    }

//    @Override
//    protected String getNamespace() {
//        return "my_demo";
//    }

    @Override
    protected void initHummerRegister(HummerContext context) {
        super.initHummerRegister(context);
        HummerRegister$$hummer_demo_app.init(context);

        Map<String, Object> data = new HashMap<>();
        data.put("dddd", 11111);
        data.put("eeee", 22222);
        hmRender.setNativeDataToHummer("nativeData", data);

        // Native向JS静态类注册回调方法（可选）
        // js中调用：Test.nativeFunc(111, 222);
        hmRender.getHummerContext().registerJSFunction("Test.nativeFunc", new ICallback() {
            @Override
            public Object call(Object... params) {
                Log.v("zdf", "Test.nativeFunc, params = " + Arrays.toString(params));
                if (params.length > 4) {
                    ((JSCallback) params[4]).call(12.34, true);
                }
                return "result1";
            }
        });
    }

    @Override
    protected void onPageRenderSucceed(@NonNull HummerContext hmContext, @NonNull JSValue jsPage) {
        Log.d("zdf", "onPageRenderSucceed");
        Map<String, String> map = new HashMap<>();
        map.put("aaa", "1111");
        map.put("bbb", "2222");
        List<String> list = new ArrayList<>();
        list.add("qqq");
        list.add("www");

        // Native调用JS的全局方法（可选）
        hmContext.getJsContext().callFunction("onTestBase", 111, 222.22, true, "ttt");
        hmContext.getJsContext().callFunction("onTestCollection", map, list);

        // Native调用JS某个对象的方法（可选）
        jsPage.callFunction("onTestBase", 111, 222.22, true, "ttt");
        jsPage.callFunction("onTestCollection", map, list);

        // Native向JS对象注册回调方法（可选）
        // js中调用：this.nativeFunc(111, 222);
        hmContext.registerJSFunction(jsPage, "nativeFunc", new ICallback() {
            @Override
            public Object call(Object... params) {
                Log.v("zdf", "this.nativeFunc, params = " + Arrays.toString(params));
                return "result2";
            }
        });

        // NotifyCenter全局通知消息
//        NotifyCenter.addEventListener("testEvent", new NotifyCallback(mHMContext.getJsContext()) {
//            @Override
//            public void onNotify(Object event) {
//                Log.v("zdf", "onNotify, obj = " + obj);
//            }
//        });
//
//        Map<String, Object> value = new HashMap<>();
//        value.put("testkey", 2222);
//        NotifyCenter.triggerEvent("testEvent", null);
//        NotifyCenter.triggerEvent("testEvent", 111);
//        NotifyCenter.triggerEvent("testEvent", value);
    }

    @Override
    protected void onPageRenderFailed(@NonNull Exception e) {
        Log.e("zdf", "onPageRenderFailed, " + Log.getStackTraceString(e));
    }
}
