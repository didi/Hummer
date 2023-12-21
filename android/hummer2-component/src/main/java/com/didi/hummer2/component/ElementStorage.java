package com.didi.hummer2.component;


import java.util.HashMap;
import java.util.Map;

/**
 * didi Create on 2023/12/5 .
 * <p>
 * Copyright (c) 2023/12/5 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/12/5 5:04 PM
 * @Description 用一句话说明文件功能
 */

public class ElementStorage {

    private Map<Long, Element> elementMap;

    private long currentId;

    public ElementStorage() {
        currentId = 0;
        elementMap = new HashMap<>();
    }

    public void saveElement(Element element) {
        elementMap.put(element.getId(), element);
    }

    public Element removeElement(long id) {
        return elementMap.remove(id);
    }

    public Element removeElement(Element element) {
        return elementMap.remove(element.getId());
    }

    public Element findElement(long id) {
        return elementMap.get(id);
    }

    public long nextElementId() {
        return --currentId;
    }
}
