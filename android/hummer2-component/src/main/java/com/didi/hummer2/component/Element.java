package com.didi.hummer2.component;

import android.content.Context;
import android.util.Log;

import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer2.bridge.HMArray;
import com.didi.hummer2.bridge.HMBoolean;
import com.didi.hummer2.bridge.HMFunction;
import com.didi.hummer2.bridge.HMNumber;
import com.didi.hummer2.bridge.HMObject;
import com.didi.hummer2.bridge.HMString;
import com.didi.hummer2.bridge.HMValue;

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
    protected HMValue properties;
    protected VIEW renderView;

    protected long id;

    public Element(Context context, HMValue properties) {
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

    public void setAttribute(String name, HMValue hmValue) {

    }

    public void setAttributes(HMObject hmObject) {

    }

    public HMValue getAttribute(String name) {
        return null;
    }

    public void setStyle(HMValue hmValue) {
        Map<String, Object> styles = new HashMap<>();
        if (hmValue instanceof HMObject) {

            HMObject obj = (HMObject) hmValue;
            HMArray array = obj.allKeys();
            int size = array.length();
            Log.e("Hummer2", "array size = " + size + "," + array.toString());
            for (int i = 0; i < size; i++) {
                String key = ((HMString) array.get(i)).valueString();
                Object value = toJavaValue(obj.get(key));
                styles.put(key, value);
                Log.e("Hummer2", "array key = " + key + ",value=" + value.toString());
            }
        }
        renderView.setStyle(styles);
    }

    public Object toJavaValue(HMValue hmValue) {
        if (hmValue.isBoolean()) {
            return ((HMBoolean) hmValue).getValue();
        } else if (hmValue.isString()) {
            return ((HMString) hmValue).valueString();
        } else if (hmValue.isNumber()) {
            return ((HMNumber) hmValue).getValue();
        } else {
            Log.e("HMValue", "::" + hmValue);
        }
        return null;
    }

    public HMValue invoke(InvokeFunction invokeFunction) {
        return null;
    }

    public void addEventListener(String eventName, HMFunction hmFunction) {
        renderView.addEventListener(eventName, new HVJSCallback(hmFunction));
    }

    public void removeEventListener(String eventName, HMFunction hmFunction) {
        renderView.removeEventListener(eventName, new HVJSCallback(hmFunction));
    }


}
