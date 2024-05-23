package com.didi.hummer2.module.component.notifycenter;

/**
 * didi Create on 2024/5/23 .
 * <p>
 * Copyright (c) 2024/5/23 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/5/23 2:54 PM
 * @Description 用户外部监听全局事件通知
 */

public interface OnNotifyCenterEventListener {


    void onReceiveNotifyCenterEvent(String namespace, String key, NotifyCenterEvent event);
}
