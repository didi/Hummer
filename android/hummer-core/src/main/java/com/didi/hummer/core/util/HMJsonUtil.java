package com.didi.hummer.core.util;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * 使用原生方法转换JSON性能会比GSON要好
 *
 * Created by XiaoFeng on 2019-12-05.
 */
public class HMJsonUtil {

    public static Map<String, Object> toMap(String strJson) {
        try {
            return toMap(new JSONObject(strJson));
        } catch (Exception e) {

        }
        return new HashMap<>();
    }

    public static List<Object> toList(String strJson) {
        try {
            return toList(new JSONArray(strJson));
        } catch (Exception e) {

        }
        return new ArrayList<>();
    }

    public static Map<String, Object> toMap(JSONObject object) throws JSONException {
        Map<String, Object> map = new HashMap<>();
        if (object == null || object == JSONObject.NULL) {
            return map;
        }
        Iterator<String> keysItr = object.keys();
        while (keysItr.hasNext()) {
            String key = keysItr.next();
            Object value = object.get(key);

            if (value instanceof JSONArray) {
                value = toList((JSONArray) value);
            } else if (value instanceof JSONObject) {
                value = toMap((JSONObject) value);
            }
            map.put(key, value);
        }
        return map;
    }

    public static List<Object> toList(JSONArray array) throws JSONException {
        List<Object> list = new ArrayList<>();
        if (array == null || list == JSONObject.NULL) {
            return list;
        }
        for (int i = 0; i < array.length(); i++) {
            Object value = array.get(i);
            if (value instanceof JSONArray) {
                value = toList((JSONArray) value);
            } else if (value instanceof JSONObject) {
                value = toMap((JSONObject) value);
            }
            list.add(value);
        }
        return list;
    }

}
