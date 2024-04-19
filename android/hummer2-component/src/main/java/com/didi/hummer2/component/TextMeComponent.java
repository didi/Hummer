package com.didi.hummer2.component;


import android.os.Handler;
import android.os.Looper;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.bridge.JsiArray;
import com.didi.hummer2.bridge.JsiBoolean;
import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.component.hummer.toast.Toast;

/**
 * didi Create on 2024/4/10 .
 * <p>
 * Copyright (c) 2024/4/10 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/10 3:08 PM
 * @Description TestMe
 */

@HMComponent("TestMe")
public class TextMeComponent extends Component {

    private HummerContext context;

    private Handler handler = new Handler(Looper.getMainLooper());

    public TextMeComponent(HummerContext context) {
        this.context = context;
    }

    @HMMethod("show")
    public void show(String msg, int duration) {
        handler.post(new Runnable() {
            @Override
            public void run() {
                Toast.show(msg, duration);
            }
        });
    }

    @HMMethod("call")
    public void call(HummerContext context, String msg, int duration) {
        handler.post(new Runnable() {
            @Override
            public void run() {
                Toast.show(msg, duration);
            }
        });
    }

    @HMMethod("testReturn")
    public String testReturn(HummerContext context, String text) {
        return "me is testReturn";
    }

    @HMMethod("testReturnX")
    public Object testReturnX(HummerContext context, String text) {

        JsiObject object = new JsiObject();
        object.put("key", new JsiBoolean(true));
        object.put("name", new JsiString("hummer 2.0"));
        object.put("a", new JsiNumber(100));
        object.put("value1", new JsiNumber(100));
        object.put("return", new JsiString(text));
        object.put("value2", new JsiNumber(200));
        object.put("value3", new JsiNumber(1000));
        object.put("x1", new JsiArray());
        object.put("x2", new JsiObject());
        JsiArray array = new JsiArray();
        array.push(new JsiNumber(100));
        array.push(new JsiNumber(200));
        array.push(new JsiNumber(300));
        array.push(new JsiString("name"));
        array.push(new JsiString("nameX"));
        array.push(new JsiBoolean(true));
        object.put("x1", array);


        return object;
    }

    @HMMethod("testEvent")
    public Object testEvent(HummerContext context, String eventName) {
        JsiObject object = new JsiObject();
        object.put("state", new JsiNumber(3));
        object.put("timestamp", new JsiNumber(System.currentTimeMillis()));
        object.put("type", new JsiString(eventName));
        object.put("version", new JsiString("hummer 2.0"));
        dispatchEvent(eventName, object);
        return object;
    }
}
