package com.didi.hummer.module;

import android.content.Context;
import android.location.Location;

import com.didi.hummer.adapter.HummerAdapter;
import com.didi.hummer.adapter.location.ILocationAdapter;
import com.didi.hummer.adapter.location.LocationCallback;
import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.lifecycle.ILifeCycle;

import java.io.Serializable;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * GPS定位组件
 *
 * Created by XiaoFeng on 2019-12-26.
 */
@Component("Location")
public class HMLocation implements ILifeCycle {

    private static final int ONE_MINUTE = 60000;

    private JSValue jsValue;
    private JSCallback onLocationCallback;
    private JSCallback onErrorCallback;

    private AtomicBoolean isDestroyed = new AtomicBoolean(false);

    private class LocationInfo implements Serializable {
        double latitude;
        double longitude;
        double altitude;
        float accuracy;
        float speed;
        float bearing;
        long timestamp;

        LocationInfo(Location location) {
            latitude = location.getLatitude();
            longitude = location.getLongitude();
            altitude = location.getAltitude();
            accuracy = location.getAccuracy();
            speed = location.getSpeed();
            bearing = location.getBearing();
            timestamp = location.getTime();
        }
    }

    private Context context;
    private ILocationAdapter locationAdapter;

    public HMLocation(HummerContext context, JSValue jsValue) {
        this.context = context;
        this.jsValue = jsValue;
        locationAdapter = HummerAdapter.getLocationAdapter(context.getNamespace());
    }

    @Override
    public void onCreate() {}

    @Override
    public void onDestroy() {
        isDestroyed.set(true);
        stopLocation();
    }

    @JsMethod("getLastLocation")
    public void getLastLocation(JSCallback callback) {
        jsValue.protect();
        locationAdapter.getLastLocation(context, new LocationCallback() {
            @Override
            public void onLocationChanged(Location location) {
                if (isDestroyed.get()) {
                    return;
                }
                if (callback != null) {
                    callback.call(new LocationInfo(location));
                    callback.release();
                }
                jsValue.unprotect();
            }

            @Override
            public void onError(int errCode, String errMsg) {
                if (isDestroyed.get()) {
                    return;
                }
                if (onErrorCallback != null) {
                    onErrorCallback.call(errCode, errMsg);
                }
                jsValue.unprotect();
            }
        });
    }

    @JsMethod("startLocation")
    public void startLocation(JSCallback callback, long intervalTime, long intervalDistance) {
        jsValue.protect();
        if (intervalTime <= 0) {
            intervalTime = ONE_MINUTE;
        }
        onLocationCallback = callback;
        locationAdapter.startLocation(context, new LocationCallback() {
            @Override
            public void onLocationChanged(Location location) {
                if (isDestroyed.get()) {
                    return;
                }
                if (callback != null) {
                    callback.call(new LocationInfo(location));
                }
            }

            @Override
            public void onError(int errCode, String errMsg) {
                if (isDestroyed.get()) {
                    return;
                }
                if (onErrorCallback != null) {
                    onErrorCallback.call(errCode, errMsg);
                }
                jsValue.unprotect();
            }
        }, intervalTime, intervalDistance);
    }

    @JsMethod("stopLocation")
    public void stopLocation() {
        locationAdapter.stopLocation();

        if (onLocationCallback != null) {
            onLocationCallback.release();
            onLocationCallback = null;
        }
        jsValue.unprotect();
    }

    @JsMethod("onError")
    public void onError(JSCallback callback) {
        onErrorCallback = callback;
    }
}
