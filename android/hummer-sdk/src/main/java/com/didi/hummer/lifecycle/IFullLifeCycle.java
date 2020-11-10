package com.didi.hummer.lifecycle;

public interface IFullLifeCycle extends ILifeCycle {
    void onStart();
    void onResume();
    void onPause();
    void onStop();
}
