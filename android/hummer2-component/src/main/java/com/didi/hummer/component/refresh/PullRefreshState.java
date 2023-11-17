package com.didi.hummer.component.refresh;


import androidx.annotation.IntDef;

/**
 * Created by XiaoFeng on 2020/10/10.
 */
@IntDef
public @interface PullRefreshState {
    /**
     * 初始状态/结束刷新
     */
    int IDLE = 0;
    /**
     * 开始下拉
     */
    int START_PULL_DOWN = 1;
    /**
     * 正在刷新
     */
    int REFRESHING = 2;
}
