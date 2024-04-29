package com.didi.hummer2.component.module;

import com.didi.hummer2.Hummer;
import com.didi.hummer2.HummerContext;
import com.didi.hummer2.HummerScriptContext;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.component.Component;
import com.didi.hummer2.component.module.hummer.notifycenter.NotifyCenterEvent;


/**
 * didi Create on 2024/4/29 .
 * <p>
 * Copyright (c) 2024/4/29 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/29 11:46 AM
 * @Description 用一句话说明文件功能
 */

@HMComponent("NotifyCenter")
public class NotifyCenterComponent extends Component {

    public NotifyCenterComponent(HummerContext hummerContext) {
        super(hummerContext);
        if (hummerContext instanceof HummerScriptContext) {
            ((HummerScriptContext) hummerContext).setNotifyCenterComponent(this);
        }
    }


    @HMMethod("triggerEvent")
    public void triggerEvent(String key, NotifyCenterEvent event) {
        String namespace = hummerContext.getNamespace();
        Hummer.getHummerEngine().triggerEvent(namespace, key, event);
    }

}
