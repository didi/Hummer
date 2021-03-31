package com.didi.hummer.demo;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;

import com.didi.hummer.HummerRender;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.style.HummerLayout;

/**
 * 局部视图使用Hummer渲染
 *
 * Created by XiaoFeng on 2020-01-02.
 */
public class PartialHummerActivity extends AppCompatActivity {

    private HummerRender hmRender;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_partial);

        HummerLayout layout = findViewById(R.id.layout_hummer);

        hmRender = new HummerRender(layout, "my_namespace");

        // 页面加载回调（可选）
        hmRender.setRenderCallback(new HummerRender.HummerRenderCallback() {
            @Override
            public void onSucceed(HummerContext hmContext, JSValue jsPage) {

            }

            @Override
            public void onFailed(Exception e) {

            }
        });

        // 渲染Hummer页面
        hmRender.renderWithUrl("http://xxx.xxx.xxx.xxx:8000/HelloWorld.js");
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (hmRender != null) {
            hmRender.onResume();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (hmRender != null) {
            hmRender.onPause();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (hmRender != null) {
            hmRender.onDestroy();
        }
    }

    @Override
    public void onBackPressed() {
        if (hmRender != null && hmRender.onBack()) {
            return;
        }
        super.onBackPressed();
    }
}
