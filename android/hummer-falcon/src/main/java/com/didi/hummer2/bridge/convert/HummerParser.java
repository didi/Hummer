package com.didi.hummer2.bridge.convert;


import com.didi.hummer2.bridge.JsiValueBuilder;
import com.didi.hummer2.bridge.convert.adapter.Array$$JsiValueAdapter;
import com.didi.hummer2.bridge.convert.adapter.List$$JsiValueAdapter;
import com.didi.hummer2.bridge.convert.adapter.Map$$JsiValueAdapter;

/**
 * didi Create on 2024/7/3 .
 * <p>
 * Copyright (c) 2024/7/3 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/3 12:21 PM
 * @Description 用一句话说明文件功能
 */

public class HummerParser extends ValueParser {


    private final HummerJsiValueRegister hummerJsiValueRegister;

    public HummerParser() {
        super(new JsiValueBuilder());
        this.hummerJsiValueRegister = HummerJsiValueAdapterLoader.instance().getJsiValueRegister();
        initBaseAdapter();
    }

    public HummerParser(JsiValueBuilder jsiValueBuilder, HummerJsiValueRegister hummerJsiValueRegister) {
        super(jsiValueBuilder);
        this.hummerJsiValueRegister = hummerJsiValueRegister;
        initBaseAdapter();

    }

    protected void initBaseAdapter() {
        hummerJsiValueRegister.register(new List$$JsiValueAdapter());
        hummerJsiValueRegister.register(new Array$$JsiValueAdapter());
        hummerJsiValueRegister.register(new Map$$JsiValueAdapter());
    }


    @Override
    public HummerJsiValueRegister getJsiValueRegister() {
        return hummerJsiValueRegister;
    }

}
