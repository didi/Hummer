package com.didi.hummer.adapter.navigator.impl.router;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;

/**
 * Activity跳转封装类，把OnActivityResult方式改为Callback方式
 *
 * Created by XiaoFeng on 2018/9/5.
 */
public class ActivityLauncher {

    private static final String TAG = "ActivityLauncher";
    private Context mContext;
    /** V4兼容包下的Fragment */
    private RouterFragmentV4 mRouterFragmentV4;
    /** 标准SDK下的Fragment */
    private RouterFragment mRouterFragment;

    public static ActivityLauncher init(Context context) {
        return new ActivityLauncher(context);
    }

    public static ActivityLauncher init(Fragment fragment) {
        return init(fragment.getActivity());
    }

    private ActivityLauncher(Context context) {
        mContext = context;
        if (context instanceof FragmentActivity) {
            mRouterFragmentV4 = getRouterFragmentV4((FragmentActivity) context);
        } else if (context instanceof Activity) {
            mRouterFragment = getRouterFragment((Activity) context);
        }
    }

    private RouterFragmentV4 getRouterFragmentV4(FragmentActivity activity) {
        RouterFragmentV4 routerFragment = findRouterFragmentV4(activity);
        if (routerFragment == null) {
            routerFragment = RouterFragmentV4.newInstance();
            FragmentManager fragmentManager = activity.getSupportFragmentManager();
            fragmentManager
                    .beginTransaction()
                    .add(routerFragment, TAG)
                    .commitAllowingStateLoss();
            fragmentManager.executePendingTransactions();
        }
        return routerFragment;
    }

    private RouterFragmentV4 findRouterFragmentV4(FragmentActivity activity) {
        return (RouterFragmentV4) activity.getSupportFragmentManager().findFragmentByTag(TAG);
    }

    private RouterFragment getRouterFragment(Activity activity) {
        RouterFragment routerFragment = findRouterFragment(activity);
        if (routerFragment == null) {
            routerFragment = RouterFragment.newInstance();
            android.app.FragmentManager fragmentManager = activity.getFragmentManager();
            fragmentManager
                    .beginTransaction()
                    .add(routerFragment, TAG)
                    .commitAllowingStateLoss();
            fragmentManager.executePendingTransactions();
        }
        return routerFragment;
    }

    private RouterFragment findRouterFragment(Activity activity) {
        return (RouterFragment) activity.getFragmentManager().findFragmentByTag(TAG);
    }

    public void startActivityForResult(Class<?> clazz, Callback callback) {
        Intent intent = new Intent(mContext, clazz);
        startActivityForResult(intent, callback);
    }

    public void startActivityForResult(Intent intent, Callback callback) {
        if (mRouterFragmentV4 != null) {
            mRouterFragmentV4.startActivityForResult(intent, callback);
        } else if (mRouterFragment != null) {
            mRouterFragment.startActivityForResult(intent, callback);
        } else if (mContext != null) {
            mContext.startActivity(intent);
        } else {
            throw new RuntimeException("please do init first!");
        }
    }

    public interface Callback {
        void onActivityResult(int resultCode, Intent data);
    }
}
