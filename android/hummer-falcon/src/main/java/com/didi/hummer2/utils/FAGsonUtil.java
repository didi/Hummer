package com.didi.hummer2.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

public class FAGsonUtil {
//    private static CustomizedObjectTypeAdapter adapter = new CustomizedObjectTypeAdapter();
    private static Gson sGson = new GsonBuilder()
//            .registerTypeAdapter(Map.class, adapter)
//            .registerTypeAdapter(List.class, adapter)
//            .registerTypeAdapter(new TypeToken<Map<String, Object>>(){}.getType(), adapter)
//            .registerTypeAdapter(new TypeToken<List<Object>>(){}.getType(), adapter)
//            .registerTypeAdapterFactory(new GsonTypeAdapterFactory())
            .create();

    public static Gson gson() {
        return sGson;
    }

    public static <T> T fromJson(String json, Type type) {
        try {
            return sGson.fromJson(json, type);
        } catch (Exception e) {
            return null;
        }
    }

    public static String toJson(Object object) {
        try {
            return sGson.toJson(object);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 判断此json字符串是否可以正常解析
     *
     * @param jsonString
     * @return
     */
    public static boolean isValidJsonString(String jsonString) {
        try {
            return sGson.fromJson(jsonString, Object.class) != null;
        } catch(Exception e) {
            return false;
        }
    }

    /**
     * 判断此json字符串是否是的基本数据类型
     * 
     * 注：对"#aaa"这类字符串解析不准，会返回false
     *
     * @param strJson
     * @return
     */
    public static boolean isJsonPrimitive(String strJson) {
        try {
            return new JsonParser().parse(strJson).isJsonPrimitive();
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 判断此json字符串是否是Object类型
     *
     * @param strJson
     * @return
     */
    public static boolean isJsonObject(String strJson) {
        try {
            return new JsonParser().parse(strJson).isJsonObject();
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 判断此json字符串是否是Array类型
     *
     * @param strJson
     * @return
     */
    public static boolean isJsonArray(String strJson) {
        try {
            return new JsonParser().parse(strJson).isJsonArray();
        } catch (Exception e) {
            return false;
        }
    }
}
