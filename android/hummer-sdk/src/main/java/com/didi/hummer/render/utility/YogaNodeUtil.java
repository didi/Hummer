package com.didi.hummer.render.utility;

import com.facebook.yoga.YogaNode;
import com.facebook.yoga.YogaNodeFactory;

import java.lang.reflect.Constructor;
import java.lang.reflect.Modifier;

/**
 * YogaNode 相关帮助类
 *
 * Created by XiaoFeng on 2020/11/12.
 */
public class YogaNodeUtil {

    /**
     * 创建YogaNdde
     *
     * 为了兼容Hummer和RN共存的情况下，RN中Yoga版本过低的问题（新老版本创建YogaNode的方式不同）
     *
     * @return
     */
    public static YogaNode createYogaNode() {
        YogaNode node = null;
        if ((YogaNode.class.getModifiers() & Modifier.ABSTRACT) != 0) {
            // 新版（YogaNode是abstract类）
            node = YogaNodeFactory.create();
        } else {
            // 旧版（YogaNode是普通类）
            try {
                Constructor<?> constructor = YogaNode.class.getDeclaredConstructor();
                node = (YogaNode) constructor.newInstance();
            } catch (Exception e2) {}
        }
        return node;
    }
}
