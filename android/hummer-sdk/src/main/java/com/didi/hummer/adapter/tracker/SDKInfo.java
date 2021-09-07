package com.didi.hummer.adapter.tracker;

import com.didi.hummer.HummerSDK;

import java.io.Serializable;

/**
 * 框架（SDK）相关信息
 *
 * Created by XiaoFeng on 2021/8/27.
 */
public class SDKInfo implements Serializable {

    /**
     * JS引擎类型
     */
    public @HummerSDK.JsEngine int jsEngine;
    /**
     * SDK初始化耗时
     */
    public long sdkInitTimeCost;
    /**
     * SDK初始化是否成功
     */
    public boolean isSdkInitSuccess;
}
