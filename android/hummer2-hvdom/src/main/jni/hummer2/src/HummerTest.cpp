//
// Created by didi on 2024/1/4.
//

#include "HummerTest.h"
#include "Logger.h"
#include "jsi/jsi_value.h"
#include "HummerBridge.h"
#include "FalconEngine.h"


static jclass _HummerTestCls;
static jmethodID _HummerTestToJavaNumber1;
static jmethodID _HummerTestToJavaNumber2;
static jmethodID _HummerTestToJavaString1;
static jmethodID _HummerTestToJavaString2;
static jmethodID _HummerTestToJavaObject1;
static jmethodID _HummerTestToJavaObject2;

static jmethodID _HummerTestToCreateJavaNumber;

JNIEnv *env_;
static int size = 1000 * 1000 * 10;

void HummerTest::init(JavaVM *vm, JNIEnv *env) {
    env_ = env;

    //HummerTest
    _HummerTestCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/HummerTest"));
    _HummerTestToJavaNumber1 = env->GetStaticMethodID(_HummerTestCls, "toJavaNumber1", "(D)V");
    _HummerTestToJavaNumber2 = env->GetStaticMethodID(_HummerTestCls, "toJavaNumber2", "(Lcom/didi/hummer2/bridge/HMNumber;)V");
    _HummerTestToJavaString1 = env->GetStaticMethodID(_HummerTestCls, "toJavaString1", "(Ljava/lang/String;)V");
    _HummerTestToJavaString2 = env->GetStaticMethodID(_HummerTestCls, "toJavaString2", "(Lcom/didi/hummer2/bridge/HMString;)V");
    _HummerTestToJavaObject1 = env->GetStaticMethodID(_HummerTestCls, "toJavaObject1", "(Ljava/lang/Object;)V");
    _HummerTestToJavaObject2 = env->GetStaticMethodID(_HummerTestCls, "toJavaObject2", "(Ljava/lang/Object;)V");


    _HummerTestToCreateJavaNumber = env->GetStaticMethodID(_HummerTestCls, "toCreateJavaNumber", "(D)V");


}


void HummerTest::toCreateJavaNumber() {
    JNIEnv *env_ = JNI_GetEnv();
    clock_t start;
    clock_t end;

    //--------------------------------HMBoolean------------------------------------
    start = clock();
    for (int i = 0; i < size; i++) {
        JsiBoolean *hmString = new JsiBoolean(true);
    }
    end = clock();
    LOGE("HummerTest::testCreateValue() use C++ [new HMBoolean()] count=%d, time=%dms", size, (end - start) / 1000);

    start = clock();
    for (int i = 0; i < size; i++) {
        JsiBoolean hmString = JsiBoolean(true);
    }
    end = clock();
    LOGE("HummerTest::testCreateValue() use C++ [HMBoolean()] count=%d, time=%dms", size, (end - start) / 1000);


    JsiBoolean *hmBoolean = new JsiBoolean(true);
    start = clock();
    for (int i = 0; i < size; i++) {
        new(hmBoolean)  JsiBoolean(true);
    }
    end = clock();
    LOGE("HummerTest::testCreateValue() use C++ [HMBoolean()] X count=%d, time=%dms", size, (end - start) / 1000);


    //-------------------------------HMNumber-------------------------------------
    start = clock();
    for (int i = 0; i < size; i++) {
        JsiNumber *hmString = new JsiNumber(1000);
    }
    end = clock();
    LOGE("HummerTest::testCreateValue() use C++ [new HMNumber()] count=%d, time=%dms", size, (end - start) / 1000);

    start = clock();
    for (int i = 0; i < size; i++) {
        JsiNumber hmString = JsiNumber(1000);
    }
    end = clock();
    LOGE("HummerTest::testCreateValue() use C++ [HMNumber()] count=%d, time=%dms", size, (end - start) / 1000);

    //-------------------------------HMString-------------------------------------
    start = clock();
    for (int i = 0; i < size; i++) {
        JsiString *hmString = new JsiString("HMString");
    }
    end = clock();
    LOGE("HummerTest::testCreateValue() use C++ [new HMString()] count=%d, time=%dms", size, (end - start) / 1000);

    start = clock();
    for (int i = 0; i < size; i++) {
        JsiString hmString = JsiString("HMString");
    }
    end = clock();
    LOGE("HummerTest::testCreateValue() use C++ [HMString()] count=%d, time=%dms", size, (end - start) / 1000);

    //-------------------------------HMString-------------------------------------
    start = clock();
    for (int i = 0; i < size; i++) {
        JsiObject *hmString = new JsiObject();
    }
    end = clock();
    LOGE("HummerTest::testCreateValue() use C++ [new HMObject()] count=%d, time=%dms", size, (end - start) / 1000);

    start = clock();
    for (int i = 0; i < size; i++) {
        JsiObject hmString = JsiObject();
    }
    end = clock();
    LOGE("HummerTest::testCreateValue() use C++ [HMObject()] count=%d, time=%dms", size, (end - start) / 1000);

    JsiObject * hmObject = new JsiObject();

    start = clock();
    for (int i = 0; i < size; i++) {
        new(hmObject)  JsiObject();
    }
    end = clock();
    LOGE("HummerTest::testCreateValue() use C++ [HMObject()] X count=%d, time=%dms", size, (end - start) / 1000);

//    hmObject->release();
//    start = clock();
//    for (int i = 0; i < size; i++) {
//        JsiObject *value;
//        if (hmObject->next != nullptr) {
//            value = hmObject->next;
//        }
//        value->release();
//    }
    end = clock();
    LOGE("HummerTest::testCreateValue() use C++ [HMObject()] XX count=%d, time=%dms", size, (end - start) / 1000);


    //-------------------------------HMString-------------------------------------
    start = clock();
    for (int i = 0; i < size; i++) {
        JsiArray *hmString = new JsiArray();
    }
    end = clock();
    LOGE("HummerTest::testCreateValue() use C++ [new HMArray()] count=%d, time=%dms", size, (end - start) / 1000);

    start = clock();
    for (int i = 0; i < size; i++) {
        JsiArray hmString = JsiArray();
    }
    end = clock();
    LOGE("HummerTest::testCreateValue() use C++ [HMArray()] count=%d, time=%dms", size, (end - start) / 1000);


    jdouble value = size;
    env_->CallStaticVoidMethod(_HummerTestCls, _HummerTestToCreateJavaNumber, value);
}


void HummerTest::testNumber1() {
    JNIEnv *env_ = JNI_GetEnv();
    clock_t start = clock();
    for (int i = 0; i < size; i++) {
        double value = 100;
        env_->CallStaticVoidMethod(_HummerTestCls, _HummerTestToJavaNumber1, value);
    }
    clock_t end = clock();
    LOGE("HummerTest::testNumber1() %d", (end - start) / 1000);
}

void HummerTest::testNumber2() {
    JNIEnv *env_ = JNI_GetEnv();
    clock_t start = clock();
    for (int i = 0; i < size; i++) {
//        HMNumber value = HMNumber(100);
//        jobject obj = HMNumberGetJObject_(env_, &value);
        JsiNumber *value = new JsiNumber(100);
        jobject obj = HMNumberGetJObject_(env_, value);
        env_->CallStaticVoidMethod(_HummerTestCls, _HummerTestToJavaNumber2, obj);
    }
    clock_t end = clock();
    LOGE("HummerTest::testNumber2() %d", (end - start) / 1000);
}

void HummerTest::testString1() {
    JNIEnv *env_ = JNI_GetEnv();
    JsiObject *hmObject = new JsiObject();
    hmObject->setValue("key1", new JsiString("v1"));
    hmObject->setValue("key2", new JsiString("v2"));
    hmObject->setValue("key3", new JsiBoolean(false));
    hmObject->setValue("key4", new JsiNumber(10));
    hmObject->setValue("key5", new JsiString("v5"));
    hmObject->setValue("key6", new JsiString("v6"));
    hmObject->setValue("key7", new JsiString("v7"));
    hmObject->setValue("key8", new JsiString("v8"));
    hmObject->setValue("key9", new JsiString("v9"));
    hmObject->setValue("key10", new JsiString("v10"));

    const char *utf = hmObject->toString().c_str();
    clock_t start = clock();
    for (int i = 0; i < size; i++) {

        jstring obj = env_->NewStringUTF(utf);
        env_->CallStaticVoidMethod(_HummerTestCls, _HummerTestToJavaString1, obj);
//        env_->ReleaseStringUTFChars(obj, utf);
    }
    clock_t end = clock();
    LOGE("HummerTest::testString1() %d", (end - start) / 1000);
}

void HummerTest::testString2() {
    JNIEnv *env_ = JNI_GetEnv();
    JsiString value = JsiString("test124");
    clock_t start = clock();
    for (int i = 0; i < size; i++) {
        jobject obj = HMStringGetJObject_(env_, &value);
        env_->CallStaticVoidMethod(_HummerTestCls, _HummerTestToJavaString2, obj);
    }
    clock_t end = clock();
    LOGE("HummerTest::testString2() %d", (end - start) / 1000);
}

void HummerTest::testObject1() {
    JNIEnv *env_ = JNI_GetEnv();

    jclass _MapCls = (jclass) env_->NewGlobalRef(env_->FindClass("java/util/HashMap"));
    jmethodID _MapInit = env_->GetMethodID(_MapCls, "<init>", "()V");
    jmethodID _MapPut = env_->GetMethodID(_MapCls, "put", "(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;");

    clock_t start = clock();
    for (int i = 0; i < size; i++) {
        jobject obj = env_->NewObject(_MapCls, _MapInit);

        jobject key1 = env_->NewStringUTF("name-key-1");
        jobject value1 = env_->NewStringUTF("name-v-1");
        env_->CallObjectMethod(obj, _MapPut, key1, value1);

        jobject key2 = env_->NewStringUTF("name-key-2");
//        jobject value2 = env_->NewStringUTF("name-v-1");
        env_->CallObjectMethod(obj, _MapPut, key2, value1);

        jobject key3 = env_->NewStringUTF("name-key-3");
//        jobject value3 = env_->NewStringUTF("name-v-1");
        env_->CallObjectMethod(obj, _MapPut, key3, value1);

        jobject key4 = env_->NewStringUTF("name-key-4");
//        jobject value4 = env_->NewStringUTF("name-v-1");
        env_->CallObjectMethod(obj, _MapPut, key4, value1);


        jobject key5 = env_->NewStringUTF("name-key-5");
//        jobject value5 = env_->NewStringUTF("name-v-1");
        env_->CallObjectMethod(obj, _MapPut, key5, value1);

        jobject key6 = env_->NewStringUTF("name-key-6");
        env_->CallObjectMethod(obj, _MapPut, key6, value1);

        jobject key7 = env_->NewStringUTF("name-key-7");
        env_->CallObjectMethod(obj, _MapPut, key7, value1);

        jobject key8 = env_->NewStringUTF("name-key-8");
        env_->CallObjectMethod(obj, _MapPut, key8, value1);

        jobject key9 = env_->NewStringUTF("name-key-9");
        env_->CallObjectMethod(obj, _MapPut, key9, value1);

        jobject key10 = env_->NewStringUTF("name-key-10");
        env_->CallObjectMethod(obj, _MapPut, key10, value1);

        env_->CallStaticVoidMethod(_HummerTestCls, _HummerTestToJavaObject1, obj);
    }
    clock_t end = clock();
    LOGE("HummerTest::testObject1() %d", (end - start) / 1000);
}

void HummerTest::testObject2() {
    JNIEnv *env_ = JNI_GetEnv();
    JsiObject *value = new JsiObject();
    JsiString *value1 = new JsiString("name-v-1");

    value->setValue("name-key-1", value1);
    value->setValue("name-key-2", value1);
    value->setValue("name-key-3", value1);
    value->setValue("name-key-4", value1);
    value->setValue("name-key-5", value1);

    value->setValue("name-key-6", value1);
    value->setValue("name-key-7", value1);
    value->setValue("name-key-8", value1);
    value->setValue("name-key-9", value1);
    value->setValue("name-key-10", value1);

    clock_t start = clock();
    for (int i = 0; i < size; i++) {
        jobject obj = HMObjectGetJObject_(env_, value);
        env_->CallStaticVoidMethod(_HummerTestCls, _HummerTestToJavaObject2, obj);
        value->obj = NULL;
    }
    clock_t end = clock();
    LOGE("HummerTest::testObject2() %d", (end - start) / 1000);
}

