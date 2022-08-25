package com.didi.hummer.adapter.http.impl;

import android.text.TextUtils;

import com.didi.hummer.adapter.http.HttpCallback;
import com.didi.hummer.adapter.http.HttpResponse;
import com.didi.hummer.adapter.http.IHttpAdapter;
import com.didi.hummer.core.util.HMGsonUtil;
import com.didi.hummer.utils.UIThreadUtil;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.Headers;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;

/**
 * 默认网络接口适配器
 *
 * Created by XiaoFeng on 2019-12-24.
 */
public class DefaultHttpAdapter implements IHttpAdapter {

    /**
     * "application/x-www-form-urlencoded"，是默认的MIME内容编码类型，一般可以用于所有的情况，但是在传输比较大的二进制或者文本数据时效率低。
     * 这时候应该使用"multipart/form-data"。如上传文件或者二进制数据和非ASCII数据。
     */
    public static final MediaType MEDIA_TYPE_NORMAL_FORM = MediaType.parse("application/x-www-form-urlencoded;charset=utf-8");

    /**
     * 既可以提交普通键值对，也可以提交(多个)文件键值对。
     */
    public static final MediaType MEDIA_TYPE_MULTIPART_FORM = MediaType.parse("multipart/form-data;charset=utf-8");

    /**
     * 只能提交二进制，而且只能提交一个二进制，如果提交文件的话，只能提交一个文件,后台接收参数只能有一个，而且只能是流（或者字节数组）
     */
    public static final MediaType MEDIA_TYPE_STREAM = MediaType.parse("application/octet-stream");

    /**
     * 文本类型
     */
    public static final MediaType MEDIA_TYPE_TEXT = MediaType.parse("text/plain;charset=utf-8");

    /**
     * json格式类型
     */
    public static final MediaType MEDIA_TYPE_JSON = MediaType.parse("application/json;charset=utf-8");

    public static final String CONTENT_TYPE = "content-type";

    private OkHttpClient httpClient;

    public DefaultHttpAdapter() {
        httpClient = new OkHttpClient.Builder()
                .sslSocketFactory(FakeX509TrustManager.allowAllSSL(), new FakeX509TrustManager())
                .build();
    }

    @Override
    public String onUrlIntercept(String orgUrl) {
        return null;
    }

    @Override
    public <T> void request(String url, String method, int timeout, Map<String, Object> headers, Map<String, Object> param, HttpCallback<T> callback, Type type) {
        if (TextUtils.isEmpty(url) || TextUtils.isEmpty(method)) {
            return;
        }

        method = method.toUpperCase();
        switch (method) {
            case METHOD_GET:
                get(url, timeout, headers, param, callback, type);
                break;
            case METHOD_POST:
                post(url, timeout, headers, param, callback, type);
                break;
            default:
                break;
        }
    }

    /**
     * Get请求
     */
    private <T> void get(String url, int timeout, Map<String, Object> headers, Map<String, Object> params, HttpCallback<T> callback, Type type) {
        // build url
        url = buildUrlWithParams(url, params);

        // build client & set timeout
        OkHttpClient client = httpClient.newBuilder()
                .connectTimeout(timeout, TimeUnit.MILLISECONDS)
                .readTimeout(timeout, TimeUnit.MILLISECONDS)
                .writeTimeout(timeout, TimeUnit.MILLISECONDS)
                .build();

        // set url
        Request.Builder builder = new Request.Builder()
                .url(url);

        // add headers
        addHeaders(builder, headers);

        // build request
        Request request = builder.build();

        // do request
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                HttpResponse resp = processResponse(response, type);
                UIThreadUtil.runOnUiThread(() -> {
                    if (callback != null) {
                        callback.onResult(resp);
                    }
                });
            }

            @Override
            public void onFailure(Call call, IOException e) {
                UIThreadUtil.runOnUiThread(() -> {
                    if (callback != null) {
                        callback.onResult(processError(e));
                    }
                });
            }
        });
    }

    /**
     * Post请求
     */
    private <T> void post(String url, int timeout, Map<String, Object> headers, Map<String, Object> params, HttpCallback<T> callback, Type type){
        // build client & set timeout
        OkHttpClient client = httpClient.newBuilder()
                .connectTimeout(timeout, TimeUnit.MILLISECONDS)
                .readTimeout(timeout, TimeUnit.MILLISECONDS)
                .writeTimeout(timeout, TimeUnit.MILLISECONDS)
                .build();

        // set url
        Request.Builder builder = new Request.Builder()
                .url(url);

        // add headers
        addHeaders(builder, headers);

        // create body
        RequestBody body = createBody(headers, params);

        // build request
        Request request = builder.post(body).build();

        // do request
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                HttpResponse resp = processResponse(response, type);
                UIThreadUtil.runOnUiThread(() -> {
                    if (callback != null) {
                        callback.onResult(resp);
                    }
                });
            }

            @Override
            public void onFailure(Call call, IOException e) {
                UIThreadUtil.runOnUiThread(() -> {
                    if (callback != null) {
                        callback.onResult(processError(e));
                    }
                });
            }
        });
    }

    /**
     * 根据params构造url
     *
     * @param url
     * @param params
     * @return
     */
    private String buildUrlWithParams(String url, Map<String, Object> params) {
        StringBuilder strUrl = new StringBuilder(url);
        String strParams = encodeEachParam(params);
        if (!TextUtils.isEmpty(strParams)) {
            if (url.contains("?")) {
                strUrl.append("&");
            } else {
                strUrl.append("?");
            }
            strUrl.append(strParams);
        }
        return strUrl.toString();
    }

    /**
     * 添加headers
     *
     * @param builder
     * @param headers
     */
    private void addHeaders(Request.Builder builder, Map<String, Object> headers) {
        if (headers != null) {
            for (String key : headers.keySet()) {
                String value = String.valueOf(headers.get(key));
                if (!TextUtils.isEmpty(value)) {
                    builder.addHeader(key, value);
                }
            }
        }
    }

    /**
     * 创建RequestBody
     *
     * @param headers
     * @param params
     * @return
     */
    private RequestBody createBody(Map<String, Object> headers, Map<String, Object> params) {
        RequestBody body;
        MediaType mediaType = getMediaTypeFromHeaders(headers);
        if (String.valueOf(mediaType).contains("text/plain")) {
            body = createTextRequestBody(mediaType, params);
        } else if (String.valueOf(mediaType).contains("application/x-www-form-urlencoded")) {
            body = createFormRequestBody(params);
        } else {
            body = createJsonRequestBody(mediaType, params);
        }

        return body;
    }

    private RequestBody createJsonRequestBody(MediaType mediaType, Map<String, Object> params) {
        return RequestBody.create(mediaType, getWholeParamsString(params));
    }

    private RequestBody createTextRequestBody(MediaType mediaType, Map<String, Object> params) {
        return RequestBody.create(mediaType, encodeWholeParamsString(params));
    }

    private RequestBody createFormRequestBody(Map<String, Object> params) {
        FormBody.Builder builder = new FormBody.Builder();
        if (params != null && !params.isEmpty()) {
            for (String key : params.keySet()) {
                builder.add(key, String.valueOf(params.get(key)));
            }
        }
        return builder.build();
    }

    /**
     * 根据 Header 中的 content-type 来获取对应的 mediaType
     *
     * @param headers
     * @return
     */
    private MediaType getMediaTypeFromHeaders(Map<String, Object> headers) {
        if (headers == null) {
            return MEDIA_TYPE_JSON;
        }

        String contentType = null;
        for (String key : headers.keySet()) {
            if (key != null && key.toLowerCase().equals(CONTENT_TYPE)) {
                if (headers.get(key) != null) {
                    contentType = String.valueOf(headers.get(key));
                    break;
                }
            }
        }

        if (TextUtils.isEmpty(contentType)) {
            return MEDIA_TYPE_JSON;
        }

        return MediaType.parse(contentType);
    }

    /**
     * 对单个键值对分别做encode
     *
     * @param params
     * @return
     */
    private String encodeEachParam(Map<String, Object> params) {
        if (params == null || params.isEmpty()) {
            return "";
        }

        StringBuilder result = new StringBuilder();
        boolean first = true;

        for (String key : params.keySet()) {
            if (first) {
                first = false;
            } else {
                result.append("&");
            }

            String value = String.valueOf(params.get(key));
            try {
                key = URLEncoder.encode(key,"UTF-8");
                value = URLEncoder.encode(value, "UTF-8");
            } catch (Exception e) {
                e.printStackTrace();
            }

            result.append(key).append("=").append(value);
        }
        return result.toString();
    }

    /**
     * 获取整个键值对字符串
     *
     * @param params
     * @return
     */
    private String getWholeParamsString(Map<String, Object> params) {
        String paramStr = HMGsonUtil.toJson(params);
        if (paramStr == null) {
            paramStr = "";
        }
        return paramStr;
    }

    /**
     * 对整个键值对字符串做encode
     *
     * @param params
     * @return
     */
    private String encodeWholeParamsString(Map<String, Object> params) {
        String paramStr = HMGsonUtil.toJson(params);
        if (paramStr == null) {
            paramStr = "";
        }
        try {
            paramStr = URLEncoder.encode(paramStr,"UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return paramStr;
    }

    /**
     * 处理Response
     *
     * @param response
     * @return
     * @throws IOException
     */
    private HttpResponse processResponse(Response response, Type type) throws IOException {
        HttpResponse resp = new HttpResponse();
        Headers headers = response.headers();
        if (headers != null && headers.size() > 0) {
            resp.header = new HashMap<>();
            for (String key : headers.names()) {
                resp.header.put(key, headers.get(key));
            }
        }
        resp.status = response.code();
        resp.message = response.message();
        resp.data = parseResponseBody(response.body(), type);

        if (!response.isSuccessful()) {
            resp.error = new HttpResponse.Error(resp.status, resp.message);
            return resp;
        }

        return resp;
    }

    private Object parseResponseBody(ResponseBody body, Type type) throws IOException {
        if (body == null) {
            return null;
        }
        String respStr = body.string();
        if (HMGsonUtil.isValidJsonString(respStr) && type != null) {
            return HMGsonUtil.fromJson(respStr, type);
        }
        return respStr;
    }

    /**
     * 处理异常
     *
     * @param e
     * @return
     */
    private HttpResponse processError(Exception e) {
        HttpResponse resp = new HttpResponse();
        resp.message = e.toString();
        resp.error = new HttpResponse.Error(-102, e.toString());
        return resp;
    }
}
