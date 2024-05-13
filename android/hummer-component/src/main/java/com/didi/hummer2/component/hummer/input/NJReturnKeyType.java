package com.didi.hummer2.component.hummer.input;


import androidx.annotation.StringDef;

/**
 * @author: linjizong
 * @date: 2019/3/28
 * @desc:
 */
@StringDef
public @interface NJReturnKeyType {
    String DONE = "done";
    String GO = "go";
    String NEXT = "next";
    String SEARCH = "search";
    String SEND = "send";

}
