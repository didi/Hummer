package com.didi.hummer2.component.hummer.refresh;


import androidx.annotation.IntDef;

/**
 * Created by XiaoFeng on 2020/10/10.
 */
@IntDef
public @interface LoadMoreState {
    /**
     * 初始状态/结束加载
     */
    int IDLE = 0;
    /**
     * 正在加载
     */
    int LOADING = 1;
    /**
     * 无更多数据
     */
    int NO_MORE_DATA = 2;
}
