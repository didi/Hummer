package com.didi.hummer.devtools.manager;

import com.didi.hummer.devtools.bean.LogBean;

import java.util.ArrayList;
import java.util.List;

/**
 * @author: linjizong
 * @date: 2020-04-20
 * @desc:
 */
public class HummerLogManager {
    private List<LogBean> logs = new ArrayList<>();
    private ILogListener mListener;

    public void registerListener(ILogListener listener) {
        mListener = listener;
    }

    public List<LogBean> getLogs() {
        return logs;
    }

    public void addLog(int type, String msg) {
        LogBean log = new LogBean(type, msg);
        logs.add(log);
        if (mListener != null) {
            mListener.onLogAdd(log);
        }
    }

    public void addException(String exception) {
        addLog(LogBean.TYPE_EXCEPTION, exception);
    }

    public interface ILogListener {
        void onLogAdd(LogBean log);
    }
}
