package com.didi.hummer.adapter.storage.impl;

import android.content.Context;
import android.content.SharedPreferences;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.adapter.storage.IStorageAdapter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 默认存储适配器
 *
 * Created by XiaoFeng on 2019-12-24.
 */
public class DefaultStorageAdapter implements IStorageAdapter {

    private static final String SP_NAME = "HummerStorage";
    private static final String KEY_VERSION = "_#_hummer_shared_preferences_version_#_";
    private static final int version = 1;

    private String namespace;
    private SharedPreferences sp;

    private SharedPreferences getSP() {
        if (sp == null) {
            sp = HummerSDK.appContext.getSharedPreferences(getSpName(namespace), Context.MODE_PRIVATE);
            checkUpgrade(sp);
        }
        return sp;
    }

    /**
     * 获取 SP 的名字
     *
     * SP 的默认名字是SP_NAME，如果有自定义namespace，则拼接上namespace
     */
    private String getSpName(String namespace) {
        String spName;
        if (namespace != null && !HummerSDK.NAMESPACE_DEFAULT.equals(namespace)) {
            spName = SP_NAME + "_" + namespace;
        } else {
            spName = SP_NAME + "_default";
        }
        return spName;
    }

    /**
     * 检查版本更新
     */
    private void checkUpgrade(SharedPreferences sp) {
        try {
            // 比对版本号
            int oldVer = sp.getInt(KEY_VERSION, 0);
            if (version > oldVer) {
                // 需要升级
                SharedPreferences.Editor editor = sp.edit();
                SharedPreferences oldSP = HummerSDK.appContext.getSharedPreferences(SP_NAME, Context.MODE_PRIVATE);
                Set<String> keys = oldSP.getAll().keySet();
                for (String k : keys) {
                    if (k != null && !k.equals(KEY_VERSION)) {
                        try {
                            editor.putString(k, oldSP.getString(k, ""));
                        } catch (Exception ignored) {}
                    }
                }
                editor.putInt(KEY_VERSION, version);
                editor.apply();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void setNamespace(String namespace) {
        this.namespace = namespace;
    }

    @Override
    public void set(String key, Object value) {
        if (!(value instanceof String)) {
            return;
        }
        getSP().edit().putString(key, (String) value).apply();
    }

    @Override
    public Object get(String key) {
        return getSP().getString(key, "");
    }

    @Override
    public void remove(String key) {
        getSP().edit().remove(key).apply();
    }

    @Override
    public void removeAll() {
        getSP().edit().clear().putInt(KEY_VERSION, version).apply();
    }

    @Override
    public Map<String, Object> getAll() {
        Map<String, Object> map = new HashMap<>(getSP().getAll());
        map.remove(KEY_VERSION);
        return map;
    }

    @Override
    public List<String> allKeys() {
        List<String> keys = new ArrayList<>(getSP().getAll().keySet());
        keys.remove(KEY_VERSION);
        return keys;
    }

    @Override
    public boolean exist(String key) {
        return getSP().contains(key);
    }
}
