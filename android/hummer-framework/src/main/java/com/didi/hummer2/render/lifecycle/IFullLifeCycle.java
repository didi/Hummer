package com.didi.hummer2.render.lifecycle;

public interface IFullLifeCycle extends ILifeCycle {
    void onStart();
    void onResume();
    void onPause();
    void onStop();
}
