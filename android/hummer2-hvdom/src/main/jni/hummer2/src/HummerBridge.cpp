//
// Created by didi on 2023/11/20.
//

#include "jni.h"
#include "Hummer2JNI.h"
#include "HummerBridge.h"

#include "hvdom/hm_object.h"


jlong HMValue_init_value_(JNIEnv *env, jobject obj) {
    LOGI("HummerBridge::hmValue_init_value_() ");
    auto *hmValue = new HMValue();
    hmValue->obj = reinterpret_cast<uintptr_t>(obj);
    uintptr_t identify = reinterpret_cast<uintptr_t>(hmValue);
    return identify;
}

jstring HMValue_string_(JNIEnv *env, jobject obj, jlong identify) {
    LOGI("HummerBridge::HMValue_string_() identify=%lld", identify);
    HMValue *value = (HMValue *) identify;
    string result = value->toString();

    jstring resultString = env->NewStringUTF(result.c_str());
    return resultString;
}

void HMValue_protect_(JNIEnv *env, jobject obj, jlong identify) {
    LOGI("HummerBridge::HMValue_protect_() identify=%lld", identify);
    HMValue *value = (HMValue *) identify;
    value->protect();
}

void HMValue_unprotect_(JNIEnv *env, jobject obj, jlong identify) {
    LOGI("HummerBridge::HMValue_unprotect_() identify=%lld", identify);
    HMValue *value = (HMValue *) identify;
    value->unprotect();
}


jobject HMValueGetJObject_(JNIEnv *env, HMValue *hmValue) {
    if (hmValue->obj == NULL) {
        jlong identify = reinterpret_cast<uintptr_t>(hmValue);
        jobject obj = env->NewObject(_HMValueCls, _HMValueInit, identify);
        hmValue->obj = reinterpret_cast<uintptr_t>(obj);
    }
    return (jobject) hmValue->obj;
}


jobject HMFunction_call_(JNIEnv *env, jobject obj, jlong identify, jlong value) {
    HMFunction *hmFunction = (HMFunction *) identify;
    HMValue *hmValue = (HMValue *) value;

    HMValue *result = hmFunction->call(hmValue);
    if (result == nullptr) {
        return nullptr;
    }
    jobject resultObj = value2JObject(env, result);
    return resultObj;
}


jobject HMFunctionGetJObject_(JNIEnv *env, HMFunction *hmFunction) {
    if (hmFunction->obj == NULL) {
        jlong identify = reinterpret_cast<uintptr_t>(hmFunction);
        jobject obj = env->NewObject(_HMFunctionCls, _HMFunctionInit, identify);
        hmFunction->obj = reinterpret_cast<uintptr_t>(obj);
    }
    return (jobject) hmFunction->obj;
}

jlong HMString_init_string_(JNIEnv *env, jobject obj, jstring value) {
    HMString *hmString = new HMString();
    hmString->obj = reinterpret_cast<uintptr_t>(obj);
    hmString->value_ = env->GetStringUTFChars(value, hm_true_ptr);
    uintptr_t identify = reinterpret_cast<uintptr_t>(hmString);
    return identify;
}


jobject HMStringGetJObject_(JNIEnv *env, HMString *hmString) {
    if (hmString->obj == NULL) {
        jlong identify = reinterpret_cast<uintptr_t>(hmString);
        jstring value = env->NewStringUTF(hmString->value_.c_str());
        jobject obj = env->NewObject(_HMStringCls, _HMStringInit, identify, value);
        hmString->obj = reinterpret_cast<uintptr_t>(obj);

        env->NewGlobalRef(obj);
    }
    return (jobject) hmString->obj;
}


jlong HMObject_init_object_(JNIEnv *env, jobject obj) {
    HMObject *hmObject = new HMObject();
    hmObject->obj = reinterpret_cast<uintptr_t>(obj);
    uintptr_t identify = reinterpret_cast<uintptr_t>(hmObject);
    return identify;
}

jobject HMObject_get_value_(JNIEnv *env, jobject obj, jlong identify, jstring key) {
    HMObject *hmObject = (HMObject *) identify;

    const char *keyValue = env->GetStringUTFChars(key, nullptr);
    HMValue *hmValue = hmObject->getValue(keyValue);
    jobject result = value2JObject(env, hmValue);

    return result;
}

void HMObject_set_value_(JNIEnv *env, jobject obj, jlong identify, jstring key, jlong value) {
    HMObject *hmObject = (HMObject *) identify;
    HMValue *hmValue = (HMValue *) value;

    const char *keyValue = env->GetStringUTFChars(key, nullptr);
    hmObject->setValue(keyValue, hmValue);

    env->ReleaseStringUTFChars(key, keyValue);
}

jboolean HMObject_is_boolean_(JNIEnv *env, jobject obj, jlong identify, jstring key) {
    HMObject *hmObject = (HMObject *) identify;

    const char *keyValue = env->GetStringUTFChars(key, nullptr);
    bool result = hmObject->isBoolean(keyValue);

    env->ReleaseStringUTFChars(key, keyValue);
    return result;
}

jboolean HMObject_is_number_(JNIEnv *env, jobject obj, jlong identify, jstring key) {
    HMObject *hmObject = (HMObject *) identify;

    const char *keyValue = env->GetStringUTFChars(key, nullptr);
    bool result = hmObject->isNumber(keyValue);

    env->ReleaseStringUTFChars(key, keyValue);
    return result;
}

jboolean HMObject_is_string_(JNIEnv *env, jobject obj, jlong identify, jstring key) {
    HMObject *hmObject = (HMObject *) identify;

    const char *keyValue = env->GetStringUTFChars(key, nullptr);
    bool result = hmObject->isString(keyValue);

    env->ReleaseStringUTFChars(key, keyValue);
    return result;
}

jboolean HMObject_is_object_(JNIEnv *env, jobject obj, jlong identify, jstring key) {
    HMObject *hmObject = (HMObject *) identify;

    const char *keyValue = env->GetStringUTFChars(key, nullptr);
    bool result = hmObject->isObject(keyValue);

    env->ReleaseStringUTFChars(key, keyValue);
    return result;
}

jboolean HMObject_is_array_(JNIEnv *env, jobject obj, jlong identify, jstring key) {
    HMObject *hmObject = (HMObject *) identify;

    const char *keyValue = env->GetStringUTFChars(key, nullptr);
    bool result = hmObject->isArray(keyValue);

    env->ReleaseStringUTFChars(key, keyValue);
    return result;
}

jboolean HMObject_get_boolean_(JNIEnv *env, jobject obj, jlong identify, jstring key) {
    HMObject *hmObject = (HMObject *) identify;

    const char *keyValue = env->GetStringUTFChars(key, nullptr);
    bool result = hmObject->getBoolean(keyValue);

    env->ReleaseStringUTFChars(key, keyValue);
    return result;
}

jstring HMObject_get_string_(JNIEnv *env, jobject obj, jlong identify, jstring key) {
    HMObject *hmObject = (HMObject *) identify;

    const char *keyValue = env->GetStringUTFChars(key, nullptr);
    string result = hmObject->getString(keyValue);

    env->ReleaseStringUTFChars(key, keyValue);
    return env->NewStringUTF(result.c_str());
}

jdouble HMObject_get_number_(JNIEnv *env, jobject obj, jlong identify, jstring key) {
    HMObject *hmObject = (HMObject *) identify;

    const char *keyValue = env->GetStringUTFChars(key, nullptr);
    double result = hmObject->getNumber(keyValue);

    env->ReleaseStringUTFChars(key, keyValue);
    return result;
}

jobject HMObject_all_keys_(JNIEnv *env, jobject obj, jlong identify) {
    HMObject *hmObject = (HMObject *) identify;

    HMArray *hmArray = hmObject->allKeys();

    jobject result = HMArrayGetJObject_(env, hmArray);
    return result;
}

jobject HMObjectGetJObject_(JNIEnv *env, HMObject *hmObject) {
    if (hmObject->obj == NULL) {
        jlong identify = reinterpret_cast<uintptr_t>(hmObject);
        jobject obj = env->NewObject(_HMObjectCls, _HMObjectInit, identify);
        hmObject->obj = reinterpret_cast<uintptr_t>(obj);
    }
    return (jobject) hmObject->obj;
}

jlong HMNumber_init_number_(JNIEnv *env, jobject obj, jdouble value) {
    HMNumber *hmNumber = new HMNumber();
    hmNumber->obj = reinterpret_cast<uintptr_t>(obj);
    hmNumber->value_ = value;
    uintptr_t identify = reinterpret_cast<uintptr_t>(hmNumber);
    return identify;
}

jobject HMNumberGetJObject_(JNIEnv *env, HMNumber *hmNumber) {
    if (hmNumber->obj == NULL) {
        jlong identify = reinterpret_cast<uintptr_t>(hmNumber);
        jobject obj = env->NewObject(_HMNumberCls, _HMNumberInit, identify, hmNumber->value_);
        hmNumber->obj = reinterpret_cast<uintptr_t>(obj);
    }
    return (jobject) hmNumber->obj;
}

jlong HMBoolean_init_boolean_(JNIEnv *env, jobject obj, jboolean value) {
    HMBoolean *hmBoolean = new HMBoolean();
    hmBoolean->obj = reinterpret_cast<uintptr_t>(obj);
    hmBoolean->value_ = value;
    uintptr_t identify = reinterpret_cast<uintptr_t>(hmBoolean);
    return identify;
}


jobject HMBooleanGetJObject_(JNIEnv *env, HMBoolean *hmBoolean) {
    if (hmBoolean->obj == NULL) {
        jlong identify = reinterpret_cast<uintptr_t>(hmBoolean);
        jobject obj = env->NewObject(_HMBooleanCls, _HMBooleanInit, identify, hmBoolean->value_);
        hmBoolean->obj = reinterpret_cast<uintptr_t>(obj);
    }
    return (jobject) hmBoolean->obj;
}

jlong HMArray_init_array_(JNIEnv *env, jobject obj) {
    HMArray *hmArray = new HMArray();
    hmArray->obj = reinterpret_cast<uintptr_t>(obj);
    uintptr_t identify = reinterpret_cast<uintptr_t>(hmArray);
    return identify;
}

jint HMArray_length_(JNIEnv *env, jobject obj, jlong identify) {
    HMArray *hmArray = (HMArray *) identify;
    return hmArray->length();
}

jobject HMArray_get_value_(JNIEnv *env, jobject obj, jlong identify, jint index) {
    HMArray *hmArray = (HMArray *) identify;
    HMValue *result = hmArray->getValue(index);
    return value2JObject(env, result);
}


jboolean HMArray_set_value_(JNIEnv *env, jobject obj, jlong identify, jint index, jlong value) {
    HMArray *hmArray = (HMArray *) identify;
    HMValue *hmValue = (HMValue *) value;
    hmArray->setValue(index, hmValue);
    return JNI_TRUE;
}

void HMArray_add_value_(JNIEnv *env, jobject obj, jlong identify, jlong value) {
    HMArray *hmArray = (HMArray *) identify;
    HMValue *hmValue = (HMValue *) value;
    hmArray->addValue(hmValue);
}

jobject HMArray_remove_value_(JNIEnv *env, jobject obj, jlong identify, jint index) {
    HMArray *hmArray = (HMArray *) identify;
    hmArray->removeValue(index);
    return nullptr;
}

jobject HMArray_remove_value2_(JNIEnv *env, jobject obj, jlong identify, jobject value) {
    HMArray *hmArray = (HMArray *) identify;
    HMValue *hmValue = (HMValue *) value;
    hmArray->removeValue(hmValue);
    return nullptr;
}

jobject HMArrayGetJObject_(JNIEnv *env, HMArray *hmArray) {
    if (hmArray->obj == NULL) {
        jlong identify = reinterpret_cast<uintptr_t>(hmArray);
        jobject obj = env->NewObject(_HMArrayCls, _HMArrayInit, identify);
        hmArray->obj = reinterpret_cast<uintptr_t>(obj);
    }
    return (jobject) hmArray->obj;
}

jobject value2JObject(JNIEnv *env, HMValue *hmValue) {
    if (hmValue->obj == NULL) {
        ValueType type = hmValue->getType();
        switch (type) {
            case TYPE_NULL:
                return HMValueGetJObject_(env, (HMValue *) hmValue);
            case TYPE_BOOLEAN:
                return HMBooleanGetJObject_(env, (HMBoolean *) hmValue);
            case TYPE_NUMBER:
                return HMNumberGetJObject_(env, (HMNumber *) hmValue);
            case TYPE_STRING:
                return HMStringGetJObject_(env, (HMString *) hmValue);
            case TYPE_OBJECT:
                return HMObjectGetJObject_(env, (HMObject *) hmValue);
            case TYPE_ARRAY:
                return HMArrayGetJObject_(env, (HMArray *) hmValue);
            case TYPE_NAPIFunction:
                return HMFunctionGetJObject_(env, (HMFunction *) hmValue);
        }
    }
    return (jobject) hmValue->obj;
}



void HummerBridge::init(JNIEnv *env) {
    LOGI("HummerBridge::init()");

    jint state;

    //HMValue
    _HMValueCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/bridge/HMValue"));
    _HMValueInit = env->GetMethodID(_HMValueCls, "<init>", "(J)V");

    state = env->RegisterNatives(_HMValueCls, _HMValueMethods, 4);
    if (state == JNI_OK) {
        LOGD("HMValue::init() OK");
    }

    //HMFunction
    _HMFunctionCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/bridge/HMFunction"));
    _HMFunctionInit = env->GetMethodID(_HMFunctionCls, "<init>", "(J)V");

    state = env->RegisterNatives(_HMFunctionCls, _HMFunctionMethods, 1);
    if (state == JNI_OK) {
        LOGD("HMFunction::init() OK");
    }

    //HMString
    _HMStringCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/bridge/HMString"));
    _HMStringInit = env->GetMethodID(_HMStringCls, "<init>", "(JLjava/lang/String;)V");

    state = env->RegisterNatives(_HMStringCls, _HMStringMethods, 1);
    if (state == JNI_OK) {
        LOGD("HMString::init() OK");
    }

    //HMObject
    _HMObjectCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/bridge/HMObject"));
    _HMObjectInit = env->GetMethodID(_HMObjectCls, "<init>", "(J)V");

    state = env->RegisterNatives(_HMObjectCls, _HMObjectMethods, 12);
    if (state == JNI_OK) {
        LOGD("HMObject::init() OK");
    }

    //HMNumber
    _HMNumberCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/bridge/HMNumber"));
    _HMNumberInit = env->GetMethodID(_HMNumberCls, "<init>", "(JD)V");

    state = env->RegisterNatives(_HMNumberCls, _HMNumberMethods, 1);
    if (state == JNI_OK) {
        LOGD("HMNumber::init() OK");
    }

    //HMBoolean
    _HMBooleanCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/bridge/HMBoolean"));
    _HMBooleanInit = env->GetMethodID(_HMBooleanCls, "<init>", "(JZ)V");

    state = env->RegisterNatives(_HMBooleanCls, _HMBooleanMethods, 1);
    if (state == JNI_OK) {
        LOGD("HMBoolean::init() OK");
    }

    //HMArray
    _HMArrayCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/bridge/HMArray"));
    _HMArrayInit = env->GetMethodID(_HMArrayCls, "<init>", "(J)V");

    state = env->RegisterNatives(_HMArrayCls, _HMArrayMethods, 7);
    if (state == JNI_OK) {
        LOGD("HMArray::init() OK");
    }

    LOGI("HummerBridge::init() OK");
}
