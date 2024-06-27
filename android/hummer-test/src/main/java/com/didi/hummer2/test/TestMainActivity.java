package com.didi.hummer2.test;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.didi.hummer2.test.jsi.JsiValueTest;

/**
 * didi Create on 2024/6/14 .
 * <p>
 * Copyright (c) 2024/6/14 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/6/14 11:38 AM
 * @Description 用一句话说明文件功能
 */

public class TestMainActivity extends AppCompatActivity {


    private Button button;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        button = findViewById(R.id.testEngine);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                testJsiValue();
                testF4NObject();
//                testF4NComponent();
//                testF4NElement();


            }
        });
    }


    public void testJsiValue() {
        JsiValueTest jsiValueTest = new JsiValueTest();
        jsiValueTest.setUp();
        jsiValueTest.testJsiValueProtect();
    }


    public void testF4NObject() {
        JsiValueTest jsiValueTest = new JsiValueTest();
        jsiValueTest.setUp();
        jsiValueTest.testEvaluateJavaScript(getApplicationContext(), "F4NObjectTest", "unit-test/F4NObject-test.js");
    }


    public void testF4NComponent() {
        JsiValueTest jsiValueTest = new JsiValueTest();
        jsiValueTest.setUp();
        jsiValueTest.testEvaluateJavaScript(getApplicationContext(), "F4NComponentTest", "unit-test/F4NComponent-test.js");
    }


    public void testF4NElement() {
        JsiValueTest jsiValueTest = new JsiValueTest();
        jsiValueTest.setUp();
        jsiValueTest.testEvaluateJavaScript(getApplicationContext(), "F4NElementTest", "unit-test/F4NElement-test.js");
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}
