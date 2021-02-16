package com.didi.hummer.adapter.scriptloader.impl;

import android.text.TextUtils;

import com.didi.hummer.adapter.http.HttpCallback;
import com.didi.hummer.adapter.scriptloader.IScriptLoaderAdapter;
import com.didi.hummer.adapter.scriptloader.ScriptLoadCallback;
import com.didi.hummer.utils.NetworkUtil;

/**
 * 默认脚本加载适配器
 *
 * Created by XiaoFeng on 2021/2/16.
 */
public class DefaultScriptLoaderAdapter implements IScriptLoaderAdapter {

    @Override
    public void loadScriptWithUrl(String url, ScriptLoadCallback callback) {
        if (TextUtils.isEmpty(url)) {
            return;
        }

        if (url.toLowerCase().startsWith("http://") || url.startsWith("https://")) {
            NetworkUtil.httpGet(url, (HttpCallback<String>) response -> {
                if (callback != null) {
                    if (response == null || response.error.code != 0) {
                        callback.onScriptLoad(null);
                    } else {
                        callback.onScriptLoad(response.data);
                    }
                }
            });
        }
    }
}
