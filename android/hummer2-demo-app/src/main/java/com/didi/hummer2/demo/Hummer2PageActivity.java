package com.didi.hummer2.demo;

import android.os.Bundle;
import android.widget.FrameLayout;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.didi.hummer.adapter.http.HttpCallback;
import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.adapter.navigator.impl.DefaultNavigatorAdapter;
import com.didi.hummer.utils.NetworkUtil;
import com.didi.hummer2.HummerContext;
import com.didi.hummer2.HummerRender;
import com.didi.hummer2.component.ViewComponentFactory;
import com.didi.hummer2.hvdom.TypeDef;
import com.facebook.soloader.SoLoader;
import com.getkeepsafe.relinker.ReLinker;

/**
 * didi Create on 2023/11/21 .
 * <p>
 * Copyright (c) 2023/11/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/21 3:44 PM
 * @Description 用一句话说明文件功能
 */

public class Hummer2PageActivity extends AppCompatActivity {
    protected NavPage page;
    protected HummerContext hummerFalconContext;
    FrameLayout frameLayout;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        SoLoader.init(getApplication(), false);
        SoLoader.loadLibrary("yoga");
//        ReLinker.loadLibrary(getApplication(), "yoga");
        ReLinker.loadLibrary(getApplication(), "hummer2");
        ReLinker.loadLibrary(getApplication(), "hvdom");

        hummerFalconContext = new HummerContext(getApplicationContext());


        HummerRender hummerRender = new HummerRender(this);
        hummerFalconContext.registerComponent(TypeDef.TYPE_COMPONENT, new ViewComponentFactory(this, hummerRender));

        frameLayout = new FrameLayout(this);
        setContentView(frameLayout);

        hummerRender.setRootContentView(frameLayout);


        initData();
        if (page != null) {
            if (page.isHttpUrl()) {
                String url = Constant.HOST +"test.js";
//                String url = Constant.HOST +"test_bridge.js";
                requestUrl(url);
            }
        }

        setTestView();
    }


    private void setTestView() {
//
//        HummerContext context = new NAPIHummerContext(this);
//        View view = new View(context, null, null);
//        view.setStyle(HummerStyleUtils.Hummer.BACKGROUND_COLOR, "#ff00ff");
//        Text test = new Text(context, null, null);
//        test.setText("xxxxxxxx");
//        view.appendChild(test);
//
//        test = new Text(context, null, null);
//        test.setText("xxxxxxxx2222");
//        view.appendChild(test);
//
//        test = new Text(context, null, null);
//        test.setText("xxxxxxxx3333");
//        view.appendChild(test);



//        frameLayout.addView(view.getView());

    }


    @Override
    protected void onStart() {
        super.onStart();
    }


    @Override
    protected void onStop() {
        super.onStop();
    }


    @Override
    protected void onResume() {
        super.onResume();

        hummerFalconContext.init();

//        HMValue hmValue = new HMValue();
//
//        hmValue.protect();
//        hmValue.unprotect();


        String code = "(function(x, y) {\n" + "    var result = x + y;\n" + "    console.log(\"结果是：\" + result);\n" + "    console.debug(\"结果是：\" + result);\n" + "    console.info(\"结果是：\" + result);\n" + "    console.warn(\"结果是：\" + result);\n" + "    console.error(\"结果是：\" + result);\n" + "return result;\n" + "})(100, 20);";


//        hummer2Context.evaluateJavaScript(code, "test.js");
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }


    private void requestUrl(String url) {
        NetworkUtil.httpGet(url, (HttpCallback<String>) response -> {
            if (response != null) {
                String js = response.data;
                hummerFalconContext.evaluateJavaScript(js, "test.js");
            }
        });
    }

    /**
     * 初始化数据（子类可以重写，初始化自己需要的数据）
     */
    protected void initData() {
        page = getPageInfo();
        if (page == null) {
            page = new NavPage();
        }
    }

    /**
     * 获取通过Intent传递过来的PageInfo（子类可以重写，用自己的方式获取PageInfo）
     */
    protected NavPage getPageInfo() {
        NavPage page = null;
        try {
            page = (NavPage) getIntent().getSerializableExtra(DefaultNavigatorAdapter.EXTRA_PAGE_MODEL);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return page;
    }
}

