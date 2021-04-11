package com.didi.hummer.context;

import java.io.Serializable;

/**
 * 执行JS之后返回的错误信息
 *
 * Created by XiaoFeng on 2021/4/6.
 */
public class HummerError implements Serializable {

    public int errCode;
    public String errMsg;

    public HummerError(int errCode, String errMsg) {
        this.errCode = errCode;
        this.errMsg = errMsg;
    }
}
