package com.didi.hummer2.component;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMAttribute;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMStyle;
import com.didi.hummer2.component.hummer.switchview.Switch;

/**
 * didi Create on 2024/4/9 .
 * <p>
 * Copyright (c) 2024/4/9 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/9 8:07 PM
 * @Description Switch
 */

@HMComponent("Switch")
public class SwitchElement extends Element<Switch> {


    public SwitchElement(HummerContext context, Object[] properties) {
        super(context, properties);
    }

    @Override
    public Switch createRenderView() {
        return new Switch(context,null,null);
    }

    @HMStyle("onColor")
    public void setColor(int value) {
        getView().setOnColor(value);
    }

    @HMStyle("offColor")
    public void setOffColor(int value) {
        getView().setOffColor(value);
    }


    @HMStyle("thumbColor")
    public void setThumbColor(int value) {
        getView().setThumbColor(value);
    }


    @HMAttribute("checked")
    private boolean checked;


    public void setChecked(boolean checked) {
        this.checked = checked;
        getView().setChecked(checked);
    }

}
