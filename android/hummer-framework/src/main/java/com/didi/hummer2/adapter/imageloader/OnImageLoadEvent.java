package com.didi.hummer2.adapter.imageloader;

import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.render.event.base.Event;

/**
 * didi Create on 2024/6/3 .
 * <p>
 * Copyright (c) 2024/6/3 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/6/3 2:44 PM
 * @Description 用一句话说明文件功能
 */


// 1、编译产物相对路径 （工程资源）
// 2、APP图片资源名称（id）---()
// 3、APP文件资源路径（assets）
// 4、APP存储文件，绝对路径（访问截图等）
// 5、http网络资源（线上资源）
// 6、base64（直接数据）

public class OnImageLoadEvent extends Event {


    public static final int SRC_TYPE_LOCAL = 1;
    public static final int SRC_TYPE_APP_ID = 2;
    public static final int SRC_TYPE_ASSET = 3;
    public static final int SRC_TYPE_APP_FILE = 4;
    public static final int SRC_TYPE_REMOTE = 5;
    public static final int SRC_TYPE_BASE64 = 6;

    private int srcType;

    public OnImageLoadEvent(int srcType, int state) {
        this.type = "__onImageLoad__";
        this.srcType = srcType;
        this.state = state;
        this.timestamp = System.currentTimeMillis();
    }

    public void setSrcType(int srcType) {
        this.srcType = srcType;
    }

    @Override
    public JsiObject toJsiValue() {
        JsiObject object = super.toJsiValue();
        object.put("srcType", new JsiNumber(srcType));
        return object;
    }
}