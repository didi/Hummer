package com.didi.hummer2.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Documented
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.CLASS)
public @interface HMJsiValue {

    String namespace() default "ALL";

    int priority() default 0;
}
