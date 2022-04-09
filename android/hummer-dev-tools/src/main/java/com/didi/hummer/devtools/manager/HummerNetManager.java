package com.didi.hummer.devtools.manager;

import com.didi.hummer.devtools.bean.NetBean;

import java.util.ArrayList;
import java.util.List;

/**
 * @author: xingjingmin
 * @date: 2020-04-08
 * @desc:
 */
public class HummerNetManager {

    private List<NetBean> nets = new ArrayList<>();

    public List<NetBean> getNets() {
        return nets;
    }

    public void addData(String url, Object data, Object error) {
        NetBean bean = new NetBean(url, data, error);
        nets.add(bean);
    }
}
