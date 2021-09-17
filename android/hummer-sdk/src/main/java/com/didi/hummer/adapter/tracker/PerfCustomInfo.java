package com.didi.hummer.adapter.tracker;

import java.io.Serializable;

/**
 * 页面性能相关自定义信息
 *
 * Created by XiaoFeng on 2021/8/27.
 */
public class PerfCustomInfo implements Serializable {

    /**
     * 分类
     */
    public String category;
    /**
     * 名称
     */
    public String name;
    /**
     * 值
     */
    public Object value;
    /**
     * 单位
     */
    public String unit;

    public PerfCustomInfo(String category, String name) {
        this.category = category;
        this.name = name;
    }

    public PerfCustomInfo(String category, String name, String unit) {
        this.category = category;
        this.name = name;
        this.unit = unit;
    }

    public PerfCustomInfo(String category, String name, String unit, Object value) {
        this.category = category;
        this.name = name;
        this.unit = unit;
        this.value = value;
    }
}
