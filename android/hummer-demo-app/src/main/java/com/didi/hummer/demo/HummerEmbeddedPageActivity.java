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

    // Hummer渲染器1
    private HummerRender hmRender1;
    // Hummer渲染器2
    private HummerRender hmRender2;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hummer_embedded_page);

        renderLayout1();
        renderLayout2();
    }

    /**
     * 渲染第一个嵌入式Hummer容器
     */
    private void renderLayout1() {
        HummerLayout layout1 = findViewById(R.id.layout_hummer_1);
        // 构造函数中的namespace需和HummerConfig中的namespace配合使用，可不传
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

        // 方式一：通过assets文件渲染JS页面
        // hmRender1.renderWithAssets("HelloWorld.js");

        // 方式二：通过url渲染JS页面
        hmRender1.renderWithUrl("http://xxx.xxx.xxx.xxx:8000/index.js");

        // 方式三：通过JS内容渲染JS页面，需要先通过其实方式获取到JS内容
        // String jsContent = "xxxx";
        // hmRender1.render(jsContent);
    }

    /**
     * 渲染第二个嵌入式Hummer容器
     */
    private void renderLayout2() {
        HummerLayout layout2 = findViewById(R.id.layout_hummer_2);
        // 构造函数中的namespace需和HummerConfig中的namespace配合使用，可不传
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

        // 方式一：通过assets文件渲染JS页面
        // hmRender1.renderWithAssets("HelloWorld.js");

        // 方式二：通过url渲染JS页面
        hmRender2.renderWithUrl("http://xxx.xxx.xxx.xxx:8001/index.js");

        // 方式三：通过JS内容渲染JS页面，需要先通过其实方式获取到JS内容
        // String jsContent = "yyyy";
        // hmRender1.render(jsContent);
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
