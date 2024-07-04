package com.didi.hummer2.test.convert;

import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.bridge.convert.JsiValueAdapter;
import com.didi.hummer2.bridge.convert.ValueParser;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.Map;

/**
 * didi Create on 2024/7/3 .
 * <p>
 * Copyright (c) 2024/7/3 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/3 12:01 PM
 * @Description 用一句话说明文件功能
 */

public final class Request$$JsiValueParser implements JsiValueAdapter<Request> {

    @Override
    public Class<Request> getJavaClass() {
        return Request.class;
    }

    @Override
    public Request toJavaValue(ValueParser parser, JsiValue jsiValue, Type type) {
        if (jsiValue != null) {
            Request request = new Request();
            JsiObject jsiObject = (JsiObject) jsiValue;
            request.url = parser.optString(jsiObject.get("url"));
            request.headers = parser.toJavaValue(jsiObject.get("headers"), new TypeToken<Map<String, String>>() {}.getType());
            request.data = parser.toJavaValue(jsiObject.get("data"), parser.getArgumentType(type, 0));
            request.web = parser.toJavaValue(jsiObject.get("web"), parser.getArgumentType(type, 1));
            return request;
        }
        return null;

    }

    @Override
    public JsiValue toJsiValue(ValueParser parser, Request value) {
        if (value != null) {
            JsiObject object = new JsiObject();
            object.put("url", parser.toJsiValue(value.url));
            object.put("headers", parser.toJsiValue(value.headers));
            object.put("data", parser.toJsiValue(value.data));
            object.put("web", parser.toJsiValue(value.web));
            return object;
        }
        return null;
    }
}
