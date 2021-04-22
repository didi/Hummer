package com.didi.hummer.devtools.manager;

import com.didi.hummer.core.util.HMGsonUtil;
import com.didi.hummer.devtools.bean.LogBean;
import com.didi.hummer.devtools.ws.WebSocketManager;
import com.didi.hummer.devtools.ws.WSMsg;

import java.util.ArrayList;
import java.util.List;

/**
 * @author: linjizong
 * @date: 2020-04-20
 * @desc:
 */
public class HummerLogManager {

    public interface ILogListener {
        void onLogAdd(LogBean log);
    }

    private WebSocketManager wsManager;
    private List<LogBean> logs = new ArrayList<>();
    private ILogListener mListener;

    public HummerLogManager(WebSocketManager manager) {
        wsManager = manager;
    }

    public void registerListener(ILogListener listener) {
        mListener = listener;
    }

    public List<LogBean> getLogs() {
        return logs;
    }

    public void addLog(int level, String msg) {
        LogBean bean = new LogBean(level, msg);
        logs.add(bean);
        if (mListener != null) {
            mListener.onLogAdd(bean);
        }

        sendLog2Cli(bean);
    }

    public void addException(String exception) {
        addLog(LogBean.LEVEL_EXCEPTION, exception);
    }

    /**
     * 命令行显示日志，发送格式如下
     * {
     *   type: 'log',
     *   data: {
     *      level: '', // Log Level：log 1, debug 2, info 3, warn 4, error 5
     *      message: '' // Log Message
     *   }
     * }
     */
    public void sendLog2Cli(LogBean bean) {
        WSMsg<LogBean> wsMsg = new WSMsg<>(WSMsg.TYPE_LOG, bean);
        wsManager.sendMsg(HMGsonUtil.toJson(wsMsg));
    }
}
