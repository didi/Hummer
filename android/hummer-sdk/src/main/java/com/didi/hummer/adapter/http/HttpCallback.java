package com.didi.hummer.adapter.http;

/**
 * 网络请求回调（主线程中使用）
 *
 * Created by XiaoFeng on 2019-12-27.
 */
public interface HttpCallback<T> {

    void onResult(HttpResponse<T> response);
}
