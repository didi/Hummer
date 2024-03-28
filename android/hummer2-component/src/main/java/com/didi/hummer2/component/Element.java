package com.didi.hummer2.component;

import android.content.Context;
import android.util.Log;

import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer2.bridge.JsiArray;
import com.didi.hummer2.bridge.JsiBoolean;
import com.didi.hummer2.bridge.JsiFunction;
import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.bridge.JsiValue;

import java.util.HashMap;
import java.util.Map;

/**
 * didi Create on 2023/12/4 .
 * <p>
 * Copyright (c) 2023/12/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/12/4 3:58 PM
 * @Description 用一句话说明文件功能
 */

public abstract class Element<VIEW extends HMBase> {


    protected Context context;
    protected JsiValue properties;
    protected VIEW renderView;

    protected long id;

    public Element(Context context, JsiValue properties) {
        this.context = context;
        this.properties = properties;
        this.renderView = createRenderView();
    }

    public abstract VIEW createRenderView();

    public void onCreate() {
        renderView.onCreate();
    }

    public VIEW getRenderView() {
        return renderView;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setAttribute(String name, JsiValue hmValue) {

    }

    public void setAttributes(JsiObject hmObject) {

    }

    public JsiValue getAttribute(String name) {
        return null;
    }

    public void setStyle(JsiValue hmValue) {
        Map<String, Object> styles = new HashMap<>();
        if (hmValue instanceof JsiObject) {

            JsiObject obj = (JsiObject) hmValue;
            JsiArray array = obj.allKeyArray();
            int size = array.length();
//            Log.e("Hummer2", "array size = " + size + "," + array.toString());
            for (int i = 0; i < size; i++) {
                String key = ((JsiString) array.getValue(i)).valueString();
                Object value = toJavaValue(obj.get(key));
                styles.put(key, value);
//                Log.e("Hummer2", "array key = " + key + ",value=" + value.toString());
            }
        }
        renderView.setStyle(styles);
    }

    public Object toJavaValue(JsiValue hmValue) {
        if (hmValue.isBoolean()) {
            return ((JsiBoolean) hmValue).getValue();
        } else if (hmValue.isString()) {
            return ((JsiString) hmValue).valueString();
        } else if (hmValue.isNumber()) {
            return ((JsiNumber) hmValue).getValue();
        } else {
            Log.e("HMValue", "::" + hmValue);
        }
        return null;
    }

    public JsiValue invoke(InvokeFunction invokeFunction) {
        return null;
    }

    public void addEventListener(String eventName, JsiFunction hmFunction) {
        renderView.addEventListener(eventName, new HVJSCallback(hmFunction));
    }

    public void removeEventListener(String eventName, JsiFunction hmFunction) {
        renderView.removeEventListener(eventName, new HVJSCallback(hmFunction));
    }


}
