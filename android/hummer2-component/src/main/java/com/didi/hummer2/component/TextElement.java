package com.didi.hummer2.component;

import android.content.Context;
import android.graphics.Color;

import com.didi.hummer.component.text.Text;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.bridge.JsiValue;

/**
 * didi Create on 2023/12/4 .
 * <p>
 * Copyright (c) 2023/12/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/12/4 3:59 PM
 * @Description 用一句话说明文件功能
 */

public class TextElement extends Element<Text> {

    public TextElement(Context context, JsiValue properties) {
        super(context, properties);
    }

    @Override
    public Text createRenderView() {
        return new Text(GlobalRef.getHummerContext(context), null, null);
    }


    public void setAttribute(String name, JsiValue hmValue) {
        if ("text".equals(name)) {
            JsiString hmString = (JsiString) hmValue;
            renderView.setText(hmString.valueString());
        } else if ("color".equals(name)) {
            JsiString hmString = (JsiString) hmValue;
            renderView.setColor(Color.parseColor(hmString.valueString()));
        }
    }


    @Override
    public void setStyle(JsiValue hmValue) {
        super.setStyle(hmValue);


    }

    public JsiValue invoke(InvokeFunction invokeFunction) {
        return null;
    }


}
