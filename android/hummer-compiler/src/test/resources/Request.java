package com.didi.hummer2.compiler;

import com.didi.hummer2.annotation.HMJsiValue;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * didi Create on 2024/7/4 .
 * <p>
 * Copyright (c) 2024/7/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/4 8:16 PM
 * @Description 用一句话说明文件功能
 */
@HMJsiValue
public class Request<T, W, DATA>  implements Serializable {

    public static final String URL_T = "100;

    public String url;

    public String name;

    public String namespace;

    public W owner;

    public T data;

    public List<? extends Number> d1;

    public List<? extends W> d2;

    public List<W> dd;

    public Map<W, T> tt;

    public Map<W, Map<T, DATA>> DX;


    public String getNamespace() {
        return namespace;
    }

    public void setNamespace(String namespace) {
        this.namespace = namespace;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public W getOwner() {
        return owner;
    }

    public void setOwner(W owner) {
        this.owner = owner;
    }

}
