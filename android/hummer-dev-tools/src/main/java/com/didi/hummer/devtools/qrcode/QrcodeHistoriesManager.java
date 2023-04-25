package com.didi.hummer.devtools.qrcode;


import java.util.ArrayList;

/**
 * didi Create on 2023/4/25 .
 * <p>
 * Copyright (c) 2023/4/25 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/4/25 4:25 下午
 * @Description 用一句话说明文件功能
 */

public class QrcodeHistoriesManager {


    private QrcodeCallback qrcodeCallback;
    private ArrayList<String> mHistory;

    public QrcodeCallback getQrcodeCallback() {
        return qrcodeCallback;
    }

    public void setQrcodeCallback(QrcodeCallback qrcodeCallback) {
        this.qrcodeCallback = qrcodeCallback;
    }

    public void removeQrcodeCallback() {
        qrcodeCallback = null;
    }

    public void saveHistory(String text) {

        if (mHistory == null) {
            mHistory = (ArrayList<String>) CacheUtils.readObject(CachesKey.QRCODE_HISTORY_HUMMER);
        }
        if (mHistory == null) {
            mHistory = new ArrayList<>();
        }
        if (mHistory.contains(text)) {
            mHistory.remove(text);
        }
        if (mHistory.size() == 30) {
            mHistory.remove(mHistory.size() - 1);
        }
        mHistory.add(0, text);
        CacheUtils.saveObject(CachesKey.QRCODE_HISTORY_HUMMER, mHistory);
    }

    public ArrayList<String> getHistory() {
        if (mHistory == null) {
            mHistory = (ArrayList<String>) CacheUtils.readObject(CachesKey.QRCODE_HISTORY_HUMMER);
        }
        if (mHistory == null) {
            mHistory = new ArrayList<>();
        }
        return mHistory;
    }

    public void onQrcodeReceive(String text) {
        if (qrcodeCallback != null) {
            qrcodeCallback.onQrcodeReceive(text);
        }
    }

    private static class Holder {
        private static QrcodeHistoriesManager INSTANCE = new QrcodeHistoriesManager();
    }

    public static QrcodeHistoriesManager getInstance() {
        return Holder.INSTANCE;
    }

    public interface QrcodeCallback {
        void onQrcodeReceive(String url);
    }


}
