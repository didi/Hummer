package com.didi.hummer2.component;


import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.component.hummer.toast.Toast;

/**
 * didi Create on 2024/4/10 .
 * <p>
 * Copyright (c) 2024/4/10 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/10 3:08 PM
 * @Description Toast
 */

@HMComponent("Toast")
public class ToastComponent extends Component {

    private HummerContext context;

    public ToastComponent(HummerContext context) {
        this.context = context;
    }

    @HMMethod("show")
    public void show(String msg, int duration) {
        Toast.show(msg, duration);
    }

    @HMMethod("custom")
    public void custom(Element element, int duration) {
        Toast.custom(element.getView(), duration);
    }

}
