package com.didi.hummer.adapter.location;

import android.location.Location;

/**
 * Created by XiaoFeng on 2019-12-26.
 */
public interface LocationCallback {

    void onLocationChanged(Location location);

    void onError(int errCode, String errMsg);
}
