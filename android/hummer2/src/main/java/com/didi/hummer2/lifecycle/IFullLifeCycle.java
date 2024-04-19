package com.didi.hummer2.lifecycle;

public interface IFullLifeCycle extends ILifeCycle {
    void onStart();
    void onResume();
    void onPause();
    void onStop();
}
