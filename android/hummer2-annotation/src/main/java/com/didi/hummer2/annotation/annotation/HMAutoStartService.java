package com.didi.hummer2.annotation.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 自启动服务注册
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.CLASS)
public @interface HMAutoStartService {
    String value() default "";

    int priority() default 0;
}
