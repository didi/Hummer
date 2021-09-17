package com.didi.hummer.adapter.tracker;

import java.io.Serializable;

/**
 * 页面性能相关信息
 *
 * Created by XiaoFeng on 2021/8/27.
 */
public class PerfInfo implements Serializable {

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
