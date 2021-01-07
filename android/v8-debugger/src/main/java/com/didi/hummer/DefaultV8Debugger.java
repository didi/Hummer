package com.didi.hummer;

import android.content.Context;
import android.text.TextUtils;

import com.alexii.j2v8debugger.ScriptSourceProvider;
import com.alexii.j2v8debugger.StethoHelper;
import com.didi.hummer.adapter.http.HttpCallback;
import com.didi.hummer.context.HummerContextFactory;
import com.didi.hummer.context.V8HummerContext;
import com.didi.hummer.plugin.interfaze.IV8Debugger;
import com.didi.hummer.utils.AssetsUtil;
import com.didi.hummer.utils.FileUtil;
import com.didi.hummer.utils.NetworkUtil;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by XiaoFeng on 2019-11-07.
 */
public class DefaultV8Debugger implements IV8Debugger, ScriptSourceProvider {

    /**
     * js源文件Map，key是文件名，value是文件内容
     */
    private Map<String, String> scriptSources = new HashMap<>();

    public DefaultV8Debugger(Context context) {
        StethoHelper.initializeDebugger(context, this);
        HummerContextFactory.setHummerContextCreator(V8HummerContext::new);
    }

    @Override
    public void addScriptSource(String scriptId) {
        addScriptSource(scriptId, null);
    }

    @Override
    public void addScriptSource(String scriptId, String scriptSource) {
        if (TextUtils.isEmpty(scriptId)) {
            return;
        }
        if (TextUtils.isEmpty(scriptSource)) {
            if (scriptId.toLowerCase().startsWith("http")) {
                NetworkUtil.httpGet(scriptId, (HttpCallback<String>) response -> {
                    if (!TextUtils.isEmpty(response.data)) {
                        addScriptSource(scriptId, response.data);
                    }
                });
                return;
            } else if (scriptId.startsWith("/")) {
                scriptSource = FileUtil.readFile(scriptId);
            } else {
                scriptSource = AssetsUtil.readFile(scriptId);
            }
        }
        scriptSources.put(scriptId, scriptSource);
    }

    @Override
    public Collection<String> getAllScriptIds() {
        return scriptSources.keySet();
    }

    @Override
    public String getSource(String scriptId) {
        return scriptSources.get(scriptId);
    }
}
