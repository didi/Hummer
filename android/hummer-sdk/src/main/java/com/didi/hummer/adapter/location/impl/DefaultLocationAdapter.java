package com.didi.hummer.adapter.location.impl;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.Context;
import android.location.Location;
import android.os.Bundle;
import android.widget.Toast;

import com.blankj.utilcode.constant.PermissionConstants;
import com.blankj.utilcode.util.PermissionUtils;
import com.didi.hummer.adapter.location.ILocationAdapter;
import com.didi.hummer.adapter.location.LocationCallback;
import com.didi.hummer.sdk.R;
import com.didi.hummer.utils.LocationUtils;

/**
 * 默认定位信息获取
 *
 * Created by XiaoFeng on 2019-12-26.
 */
public class DefaultLocationAdapter implements ILocationAdapter {

    @SuppressLint("MissingPermission")
    @Override
    public void getLastLocation(Context context, LocationCallback callback) {
        requestLocation(context, () -> {
            boolean enabled = LocationUtils.register(0, 0, new LocationUtils.OnLocationChangeListener() {
                @Override
                public void getLastKnownLocation(Location location) {
                    LocationUtils.unregister();
                    if (callback != null) {
                        callback.onLocationChanged(location);
                    }
                }

                @Override
                public void onLocationChanged(Location location) {
                    LocationUtils.unregister();
                    if (callback != null) {
                        callback.onLocationChanged(location);
                    }
                }

                @Override
                public void onStatusChanged(String provider, int status, Bundle extras) {

                }
            });
            if (!enabled) {
                Toast.makeText(context, "Need Location Service!", Toast.LENGTH_SHORT).show();
                if (callback != null) {
                    callback.onError(ERR_CODE_NO_LOCATION_SERVICE, ERR_MSG_NO_LOCATION_SERVICE);
                }
            }
        }, () -> {
            Toast.makeText(context, "Need Location Permission!", Toast.LENGTH_SHORT).show();
            if (callback != null) {
                callback.onError(ERR_CODE_NO_LOCATION_PERMISSION, ERR_MSG_NO_LOCATION_PERMISSION);
            }
        });
    }

    @SuppressLint("MissingPermission")
    @Override
    public void startLocation(Context context, LocationCallback callback, long intervalTime, long intervalDistance) {
        requestLocation(context, () -> {
            boolean enabled = LocationUtils.register(intervalTime, intervalDistance, new LocationUtils.OnLocationChangeListener() {
                @Override
                public void getLastKnownLocation(Location location) {
                    if (callback != null) {
                        callback.onLocationChanged(location);
                    }
                }

                @Override
                public void onLocationChanged(Location location) {
                    if (callback != null) {
                        callback.onLocationChanged(location);
                    }
                }

                @Override
                public void onStatusChanged(String provider, int status, Bundle extras) {

                }
            });
            if (!enabled) {
                Toast.makeText(context, "Need Location Service!", Toast.LENGTH_SHORT).show();
                if (callback != null) {
                    callback.onError(ERR_CODE_NO_LOCATION_SERVICE, ERR_MSG_NO_LOCATION_SERVICE);
                }
            }
        }, () -> {
            Toast.makeText(context, "Need Location Permission!", Toast.LENGTH_SHORT).show();
            if (callback != null) {
                callback.onError(ERR_CODE_NO_LOCATION_PERMISSION, ERR_MSG_NO_LOCATION_PERMISSION);
            }
        });
    }

    @SuppressLint("MissingPermission")
    @Override
    public void stopLocation() {
        LocationUtils.unregister();
    }

    private void requestLocation(Context context, OnPermissionGrantedListener grantedListener, OnPermissionDeniedListener deniedListener) {
        PermissionUtils.permission(PermissionConstants.LOCATION)
//                .rationale((activity, shouldRequest) -> showRationaleDialog(context, shouldRequest))
                .rationale((activity, shouldRequest) -> shouldRequest.again(true))
                .callback(new PermissionUtils.SimpleCallback() {
                    @Override
                    public void onGranted() {
                        if (grantedListener != null) {
                            grantedListener.onPermissionGranted();
                        }
                    }

                    @Override
                    public void onDenied() {
                        if (deniedListener != null) {
                            deniedListener.onPermissionDenied();
                        }
                    }
                })
                .request();
    }

    private void showRationaleDialog(Context context, PermissionUtils.OnRationaleListener.ShouldRequest shouldRequest) {
        new AlertDialog.Builder(context)
                .setMessage(R.string.permission_rationale_message)
                .setPositiveButton(android.R.string.ok, (dialog, which) -> {
                    shouldRequest.again(true);
                })
                .setPositiveButton(android.R.string.cancel, (dialog, which) -> {
                    shouldRequest.again(false);
                })
                .show();
    }

    interface OnPermissionGrantedListener {
        void onPermissionGranted();
    }

    interface OnPermissionDeniedListener {
        void onPermissionDenied();
    }
}
