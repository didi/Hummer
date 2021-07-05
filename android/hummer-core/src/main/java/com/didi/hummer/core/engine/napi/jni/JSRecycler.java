package com.didi.hummer.core.engine.napi.jni;

/**
 * Hummer内存自动回收类
 *
 * 原理：当JS对象被回收时，内部Recycler对象也会被回收，会触发Recycler的析构方法，从而触发这里的recycle方法，通过objId把Java对象移出对象池，释放对应的Java对象。
 * 缺陷：这里有一个逻辑缺陷，当JS对象某个方法参数是一个Callback闭包函数时，如果闭包内部不显式引用外部对象，外部对象是不会被隐式持有的，当该方法走完后该JS对象就会被回收，但此时闭包并没有释放，还在继续执行逻辑（如定时器）。
 * 此时如果想让对应的Java对象也不被回收，需要手动调用jsValue.protect()方法使JS对象引用计数+1，JS对象不回收，Java对象就不会被回收，注意这种情况需要在页面退出时的onDestroy方法中调用jsValue.unprotect()，使引用计数平衡，这样JS对象就会正常被回收了。
 *
 * Created by XiaoFeng on 2021/6/29.
 */
public class JSRecycler {

    private long jsContext;
    private RecycleCallback mCallback;

    public JSRecycler(long jsContext, RecycleCallback callback) {
        this.jsContext = jsContext;
        this.mCallback = callback;
        init(jsContext);
    }

    public void onDestroy() {
        release(jsContext);
        mCallback = null;
    }

    private void recycle(long objId) {
        if (mCallback != null) {
            mCallback.onRecycle(objId);
        }
    }

    private native void init(long jsContext);

    private native void release(long jsContext);

    public interface RecycleCallback {

        void onRecycle(long objectID);
    }
}
