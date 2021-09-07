package com.didi.hummer.adapter.tracker;

import java.io.Serializable;

/**
 * 框架（SDK）相关自定义信息
 *
 * Created by XiaoFeng on 2021/8/27.
 */
public class SDKCustomInfo implements Serializable {

    /**
     * 分类
     */
    public String category;
    /**
     * 名称
     */
    public String name;
    /**
     * 是否成功
     */
    public boolean success;
    /**
     * 耗时
     */
    public long duration;
    /**
     * 错误信息
     */
    public String errorMsg;

    public SDKCustomInfo(String category, String name) {
        this.category = category;
        this.name = name;
    }
}
