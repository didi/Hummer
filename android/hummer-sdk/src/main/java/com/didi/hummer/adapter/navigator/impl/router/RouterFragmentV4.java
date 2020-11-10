package com.didi.hummer.adapter.navigator.impl.router;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.SparseArray;

import java.util.Random;

/**
 * 把OnActivityResult方式转换为Callback方式的空Fragment（V4兼容包）
 *
 * Created by XiaoFeng on 2018/9/5.
 */
public class RouterFragmentV4 extends Fragment {

    private SparseArray<ActivityLauncher.Callback> mCallbacks = new SparseArray<>();
    private Random mCodeGenerator = new Random();

    public RouterFragmentV4() {
        // Required empty public constructor
    }

    public static RouterFragmentV4 newInstance() {
        return new RouterFragmentV4();
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRetainInstance(true);
    }

    public void startActivityForResult(Intent intent, ActivityLauncher.Callback callback) {
        int requestCode = makeRequestCode();
        mCallbacks.put(requestCode, callback);
        startActivityForResult(intent, requestCode);
    }

    /**
     * 随机生成唯一的requestCode，最多尝试10次
     *
     * @return
     */
    private int makeRequestCode() {
        int requestCode;
        int tryCount = 0;
        do {
            requestCode = mCodeGenerator.nextInt(0x0000FFFF);
            tryCount++;
        } while (mCallbacks.indexOfKey(requestCode) >= 0 && tryCount < 10);
        return requestCode;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        ActivityLauncher.Callback callback = mCallbacks.get(requestCode);
        mCallbacks.remove(requestCode);
        if (callback != null) {
            callback.onActivityResult(resultCode, data);
        }
    }
}
