package com.didi.hummer.adapter.location;

import android.content.Context;

/**
 * 定位信息获取适配器接口
 *
 * Created by XiaoFeng on 2019-12-26.
 */
public interface ILocationAdapter {

    /**
     * 无定位权限
     */
    int ERR_CODE_NO_LOCATION_PERMISSION     = 1001;
    /**
     * 无定位服务
     */
    int ERR_CODE_NO_LOCATION_SERVICE        = 1002;

    String ERR_MSG_NO_LOCATION_PERMISSION   = "ERROR_NO_LOCATION_PERMISSION";
    String ERR_MSG_NO_LOCATION_SERVICE      = "ERROR_NO_LOCATION_SERVICE";

    /**
     * 获取上一次缓存的位置信息（不是最新的位置信息，不会开启GPS）
     *
     * @param context
     * @param callback
     */
    void getLastLocation(Context context, LocationCallback callback);

    /**
     * 开启位置定位
     *
     * @param context
     * @param callback
     * @param intervalTime 位置变化的时间间隔（单位：毫秒），不传默认是1000毫秒
     * @param intervalDistance 位置变化的距离改变范围（单位：米），不传默认是0米
     */
    void startLocation(Context context, LocationCallback callback, long intervalTime, long intervalDistance);

    /**
     * 停止位置定位
     */
    void stopLocation();
}
