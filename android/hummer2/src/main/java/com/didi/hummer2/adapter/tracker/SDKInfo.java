package com.didi.hummer2.adapter.tracker;


import java.io.Serializable;

/**
 * 框架（SDK）相关信息
 * <p>
 * Created by XiaoFeng on 2021/8/27.
 */
public class SDKInfo implements Serializable {

    /**
     * JS引擎类型
     */
    public int jsEngine;
    /**
     * SDK初始化耗时
     */
    public long sdkInitTimeCost;
    /**
     * SDK初始化是否成功
     */
    public boolean isSdkInitSuccess;
}
