package com.didi.hummer.component.input;


import androidx.annotation.StringDef;

/**
 * @author: linjizong
 * @date: 2019/3/28
 * @desc:
 */
@StringDef
public @interface NJInputType {
    String DEFAULT = "default";
    String NUMBER = "number";
    String TEL = "tel";
    String EMAIL = "email";
    String PASSWORD = "password";
}
