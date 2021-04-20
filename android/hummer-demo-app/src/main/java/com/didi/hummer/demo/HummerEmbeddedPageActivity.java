package com.didi.hummer.demo;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;

import com.didi.hummer.HummerRender;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.style.HummerLayout;

/**
 * Hummer嵌入式页面示例
 *
 * Created by XiaoFeng on 2020-01-02.
 */
public class HummerEmbeddedPageActivity extends AppCompatActivity {

    private HummerRender hmRender1;
    private HummerRender hmRender2;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hummer_embedded_page);

        renderLayout1();
        renderLayout2();
    }

    private void renderLayout1() {
        HummerLayout layout1 = findViewById(R.id.layout_hummer_1);
        hmRender1 = new HummerRender(layout1, "test_namespace");
        // 页面加载回调（可选）
        hmRender1.setRenderCallback(new HummerRender.HummerRenderCallback() {
            @Override
            public void onSucceed(HummerContext hmContext, JSValue jsPage) {

            }

            @Override
            public void onFailed(Exception e) {

            }
        });

        // 渲染Hummer页面
        hmRender1.renderWithUrl("http://xxx.xxx.xxx.xxx:8000/index.js");
    }

    private void renderLayout2() {
        HummerLayout layout2 = findViewById(R.id.layout_hummer_2);
        hmRender2 = new HummerRender(layout2, "test_namespace");
        // 页面加载回调（可选）
        hmRender2.setRenderCallback(new HummerRender.HummerRenderCallback() {
            @Override
            public void onSucceed(HummerContext hmContext, JSValue jsPage) {

            }

            @Override
            public void onFailed(Exception e) {

            }
        });

        // 渲染Hummer页面
        hmRender2.renderWithUrl("http://xxx.xxx.xxx.xxx:8001/index.js");
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (hmRender1 != null) {
            hmRender1.onResume();
        }
        if (hmRender2 != null) {
            hmRender2.onResume();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (hmRender1 != null) {
            hmRender1.onPause();
        }
        if (hmRender2 != null) {
            hmRender2.onPause();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (hmRender1 != null) {
            hmRender1.onDestroy();
        }
        if (hmRender2 != null) {
            hmRender2.onDestroy();
        }
    }

    @Override
    public void onBackPressed() {
        if (hmRender1 != null && hmRender1.onBack()) {
            return;
        }
        if (hmRender2 != null && hmRender2.onBack()) {
            return;
        }
        super.onBackPressed();
    }
}
