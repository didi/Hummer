package com.didi.hummer2.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Hummer2.0 配置注册
 */
@Documented
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.CLASS)
public @interface HMConfig {
    Class<?>[] value();

    String namespace() default "default";

    int priority() default 0;
}
