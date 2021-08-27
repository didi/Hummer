package com.didi.hummer.adapter.performance;

/**
 * 页面相关性能信息
 *
 * Created by XiaoFeng on 2021/8/27.
 */
public class PerfInfo {

    public String sdkVersion;
    public String pageUrl;

    /**
     * 容器初始化耗时
     */
    public long ctxInitTimeCost;
    /**
     * js网络获取耗时
     */
    public long jsFetchTimeCost;
    /**
     * js执行耗时
     */
    public long jsEvalTimeCost;
    /**
     * 页面渲染耗时
     */
    public long pageRenderTimeCost;
    /**
     * js包大小（KB）
     */
    public float jsBundleSize;
}
