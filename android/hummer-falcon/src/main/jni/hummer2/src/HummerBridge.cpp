//
// Created by didi on 2023/11/20.
//

#include "jni.h"
#include "FalconEngine.h"
#include "HummerBridge.h"

#include "jsi/jsi_value.h"

//******************************************************************************
//
//                 JsiValue
//******************************************************************************


jlong HMValue_init_value_(JNIEnv *env, jobject obj) {
    LOGI("HummerBridge::hmValue_init_value_() ");
    auto *hmValue = new JsiValue(TYPE_VALUE);
    hmValue->obj = reinterpret_cast<uintptr_t>(obj);
    uintptr_t identify = reinterpret_cast<uintptr_t>(hmValue);
    return identify;
}

jstring HMValue_string_(JNIEnv *env, jobject obj, jlong identify) {
//    LOGI("HummerBridge::HMValue_string_() identify=%lld", identify);
    JsiValue *value = (JsiValue *) identify;
    string result = value->toString();

    jstring resultString = env->NewStringUTF(result.c_str());
    return resultString;
}

void HMValue_protect_(JNIEnv *env, jobject obj, jlong identify) {
//    LOGI("HummerBridge::HMValue_protect_() identify=%lld", identify);
    JsiValue *value = (JsiValue *) identify;
    value->protect();
}

void HMValue_unprotect_(JNIEnv *env, jobject obj, jlong identify) {
//    LOGI("HummerBridge::HMValue_unprotect_() identify=%lld", identify);
    JsiValue *value = (JsiValue *) identify;
    value->unprotect();
}


jobject HMValueGetJObject_(JNIEnv *env, JsiValue *hmValue) {
//    if (hmValue->obj == NULL) {
    jlong identify = reinterpret_cast<uintptr_t>(hmValue);
    jobject obj = env->NewObject(_HMValueCls, _HMValueInit, identify);
    hmValue->obj = reinterpret_cast<uintptr_t>(obj);
//    }
    return (jobject) hmValue->obj;
}

//******************************************************************************
//
//                 JsiFunction
//******************************************************************************


jobject HMFunction_calls_(JNIEnv *env, jobject obj, jlong id, jlongArray arrValue) {
    JsiValue *result = nullptr;
    if (arrValue != nullptr) {
        jsize size = env->GetArrayLength(arrValue);
        // 分配本地内存来保存数组元素
        jlong *array = env->GetLongArrayElements(arrValue, NULL);

        JsiValue *jsiValue[size];
        for (int i = 0; i < size; i++) {
            jsiValue[i] = (JsiValue *) array[i];
        }
        //释放本地内存
        env->ReleaseLongArrayElements(arrValue, array, 0);
        result = F4NContextUtils::call(id, 0, size, jsiValue);

    } else {
        result = F4NContextUtils::call(id, 0, 0, nullptr);
    }

    if (result != nullptr) {
        jobject resultObj = value2JObject(env, result);
        return resultObj;
    }
    return nullptr;
}


jobject HMFunctionGetJObject_(JNIEnv *env, JsiFunction *jsiFunction) {
    jlong functionId = jsiFunction->id;
    jobject obj = env->NewObject(_HMFunctionCls, _HMFunctionInit, functionId);
    jsiFunction->obj = reinterpret_cast<uintptr_t>(obj);
    return (jobject) jsiFunction->obj;
}

//******************************************************************************
//
//                 JsiString
//******************************************************************************

jlong HMString_init_string_(JNIEnv *env, jobject obj, jstring value) {
    JsiString *hmString = new JsiString();
    hmString->obj = reinterpret_cast<uintptr_t>(obj);
    hmString->value_ = env->GetStringUTFChars(value, hm_true_ptr);
    uintptr_t identify = reinterpret_cast<uintptr_t>(hmString);
    return identify;
}


jobject HMStringGetJObject_(JNIEnv *env, JsiString *hmString) {
//    if (hmString->obj == NULL) {
    jlong identify = reinterpret_cast<uintptr_t>(hmString);
    jstring value = env->NewStringUTF(hmString->value_.c_str());
    jobject obj = env->NewObject(_HMStringCls, _HMStringInit, identify, value);
//        obj = env->NewGlobalRef(obj);
    hmString->obj = reinterpret_cast<uintptr_t>(obj);
//    }
    return (jobject) hmString->obj;
}


//******************************************************************************
//
//                 JsiObject
//******************************************************************************



jlong HMObject_init_object_(JNIEnv *env, jobject obj) {
    JsiObject *hmObject = new JsiObject();
    hmObject->obj = reinterpret_cast<uintptr_t>(obj);
    uintptr_t identify = reinterpret_cast<uintptr_t>(hmObject);
    return identify;
}

jobject HMObject_get_value_(JNIEnv *env, jobject obj, jlong identify, jstring key) {
    JsiObject *hmObject = (JsiObject *) identify;

    const char *keyValue = env->GetStringUTFChars(key, nullptr);
    JsiValue *hmValue = hmObject->getValue(keyValue);
    jobject result = 0;
    if (hmValue != nullptr) {
        result = value2JObject(env, hmValue);
        hmValue->obj = 0;
    }
    env->ReleaseStringUTFChars(key, keyValue);
    return result;
}

int HMObject_get_value_type_(JNIEnv *env, jobject obj, jlong identify, jstring key) {
    JsiObject *hmObject = (JsiObject *) identify;

    const char *keyValue = env->GetStringUTFChars(key, nullptr);
    ValueType result = hmObject->getValueType(keyValue);
    env->ReleaseStringUTFChars(key, keyValue);
    return result;
}

jboolean HMObject_set_value_(JNIEnv *env, jobject obj, jlong identify, jstring key, jlong value) {
    JsiObject *hmObject = (JsiObject *) identify;
    JsiValue *hmValue = (JsiValue *) value;

    const char *keyValue = env->GetStringUTFChars(key, nullptr);
    hmObject->setValue(keyValue, hmValue);

    env->ReleaseStringUTFChars(key, keyValue);
    return JNI_TRUE;
}

jboolean HMObject_remove_value_(JNIEnv *env, jobject obj, jlong identify, jstring key) {
    JsiObject *hmObject = (JsiObject *) identify;

    const char *keyValue = env->GetStringUTFChars(key, nullptr);
    hmObject->removeValue(keyValue);
    env->ReleaseStringUTFChars(key, keyValue);

    return JNI_FALSE;
}

jobject HMObject_keys_(JNIEnv *env, jobject obj, jlong identify) {
    JsiObject *hmObject = (JsiObject *) identify;

    list<string> keys = hmObject->allKeys();
    jobject result = HMUtils::getJavaList(env, &keys);
    return result;
}

jobject HMObject_keys_array_(JNIEnv *env, jobject obj, jlong identify) {
    JsiObject *hmObject = (JsiObject *) identify;
    JsiArray *keys = hmObject->allKeysArray();
    return value2JObject(env, keys);
}


jobject HMObjectGetJObject_(JNIEnv *env, JsiObject *hmObject) {
//    if (hmObject->obj == NULL) {
    jlong identify = reinterpret_cast<uintptr_t>(hmObject);
    jobject obj = env->NewObject(_HMObjectCls, _HMObjectInit, identify);
    hmObject->obj = reinterpret_cast<uintptr_t>(obj);
//    }
    return (jobject) hmObject->obj;
}


//******************************************************************************
//
//                 JsiNumber
//******************************************************************************



jlong HMNumber_init_number_(JNIEnv *env, jobject obj, jdouble value) {
    JsiNumber *hmNumber = new JsiNumber(value);
    hmNumber->obj = reinterpret_cast<uintptr_t>(obj);
    uintptr_t identify = reinterpret_cast<uintptr_t>(hmNumber);
    return identify;
}

jobject HMNumberGetJObject_(JNIEnv *env, JsiNumber *hmNumber) {
//    if (hmNumber->obj == NULL) {
    jlong identify = reinterpret_cast<uintptr_t>(hmNumber);
    jobject obj = env->NewObject(_HMNumberCls, _HMNumberInit, identify, hmNumber->value_);
    hmNumber->obj = reinterpret_cast<uintptr_t>(obj);
//    }
    return (jobject) hmNumber->obj;
}


//******************************************************************************
//
//                 JsiBoolean
//******************************************************************************



jlong HMBoolean_init_boolean_(JNIEnv *env, jobject obj, jboolean value) {
    JsiBoolean *hmBoolean = new JsiBoolean();
    hmBoolean->obj = reinterpret_cast<uintptr_t>(obj);
    hmBoolean->value_ = value;
    uintptr_t identify = reinterpret_cast<uintptr_t>(hmBoolean);
    return identify;
}


jobject HMBooleanGetJObject_(JNIEnv *env, JsiBoolean *hmBoolean) {
//    if (hmBoolean->obj == NULL) {
    jlong identify = reinterpret_cast<uintptr_t>(hmBoolean);
    jobject obj = env->NewObject(_HMBooleanCls, _HMBooleanInit, identify, hmBoolean->value_);
    hmBoolean->obj = reinterpret_cast<uintptr_t>(obj);
//    }
    return (jobject) hmBoolean->obj;
}

//******************************************************************************
//
//                 JsiArray
//******************************************************************************


jlong HMArray_init_array_(JNIEnv *env, jobject obj) {
    JsiArray *hmArray = new JsiArray();
    hmArray->obj = reinterpret_cast<uintptr_t>(obj);
    uintptr_t identify = reinterpret_cast<uintptr_t>(hmArray);
    return identify;
}

//

jint HMArray_length_(JNIEnv *env, jobject obj, jlong identify) {
    JsiArray *hmArray = (JsiArray *) identify;
    return hmArray->length();
}

jobject HMArray_get_value_(JNIEnv *env, jobject obj, jlong identify, jint index) {
    JsiArray *hmArray = (JsiArray *) identify;
    JsiValue *result = hmArray->getValue(index);
    return value2JObject(env, result);
}


jboolean HMArray_set_value_(JNIEnv *env, jobject obj, jlong identify, jint index, jlong value) {
    JsiArray *hmArray = (JsiArray *) identify;
    JsiValue *hmValue = (JsiValue *) value;
    hmArray->setValue(index, hmValue);
    return JNI_TRUE;
}


void HMArray_push_(JNIEnv *env, jobject obj, jlong identify, jlong value) {
    JsiArray *hmArray = (JsiArray *) identify;
    JsiValue *hmValue = (JsiValue *) value;
    hmArray->pushValue(hmValue);
}

jobject HMArray_pop_(JNIEnv *env, jobject obj, jlong identify) {
    JsiArray *hmArray = (JsiArray *) identify;
    JsiValue *jsiValue = hmArray->popValue();

    return value2JObject(env, jsiValue);
}

jobject HMArray_remove_value_at_(JNIEnv *env, jobject obj, jlong identify, jint index) {
    JsiArray *hmArray = (JsiArray *) identify;
    hmArray->removeValueAt(index);
    return nullptr;
}

jobject HMArray_remove_value_(JNIEnv *env, jobject obj, jlong identify, jlong value) {
    JsiArray *hmArray = (JsiArray *) identify;
    JsiValue *hmValue = (JsiValue *) value;
    hmArray->removeValue(hmValue);
    return nullptr;
}

void HMArray_clear_(JNIEnv *env, jobject obj, jlong identify) {
    JsiArray *hmArray = (JsiArray *) identify;
    hmArray->clear();
}


jobject HMArrayGetJObject_(JNIEnv *env, JsiArray *hmArray) {
//    if (hmArray->obj == NULL) {
    jlong identify = reinterpret_cast<uintptr_t>(hmArray);
    jobject obj = env->NewObject(_HMArrayCls, _HMArrayInit, identify);
    hmArray->obj = reinterpret_cast<uintptr_t>(obj);
//    }
    return (jobject) hmArray->obj;
}

jobject value2JObject(JNIEnv *env, JsiValue *hmValue) {
//    if (hmValue->obj == NULL) {
    if (hmValue == nullptr) {
        return 0;
    }
    ValueType type = hmValue->getType();
    switch (type) {

        case TYPE_BOOLEAN:
            return HMBooleanGetJObject_(env, (JsiBoolean *) hmValue);
        case TYPE_NUMBER:
            return HMNumberGetJObject_(env, (JsiNumber *) hmValue);
        case TYPE_STRING:
            return HMStringGetJObject_(env, (JsiString *) hmValue);
        case TYPE_OBJECT:
            return HMObjectGetJObject_(env, (JsiObject *) hmValue);
        case TYPE_ARRAY:
            return HMArrayGetJObject_(env, (JsiArray *) hmValue);
        case TYPE_NAPIFunction:
            return HMFunctionGetJObject_(env, (JsiFunction *) hmValue);
        case TYPE_VALUE_REF:
        case TYPE_COMPONENT:
        case TYPE_NAPIExternal:
        case TYPE_VALUE:
        case TYPE_NAPIUndefined:
        case TYPE_NULL:
//            return HMValueGetJObject_(env, (JsiValue *) hmValue);
            break;
    }
//    }
    return (jobject) hmValue->obj;
}

static JNINativeMethod _HMValueMethods[] = {{"init_value_", "()J",                   (void *) HMValue_init_value_},
                                            {"string_",     "(J)Ljava/lang/String;", (void *) HMValue_string_},
                                            {"protect_",    "(J)V",                  (void *) HMValue_protect_},
                                            {"unprotect_",  "(J)V",                  (void *) HMValue_unprotect_},};

static JNINativeMethod _HMFunctionMethods[] = {{"calls_", "(J[J)Lcom/didi/hummer2/bridge/JsiValue;", (void *) HMFunction_calls_}};

static JNINativeMethod _HMBooleanMethods[] = {{"init_boolean_", "(Z)J", (void *) HMBoolean_init_boolean_},};

static JNINativeMethod _HMStringMethods[] = {{"init_string_", "(Ljava/lang/String;)J", (void *) HMString_init_string_},};

static JNINativeMethod _HMNumberMethods[] = {{"init_number_", "(D)J", (void *) HMNumber_init_number_},};


static JNINativeMethod _HMArrayMethods[] = {{"init_array_",      "()J",                                    (void *) HMArray_init_array_},
                                            {"length_",          "(J)I",                                   (void *) HMArray_length_},
                                            {"get_value_",       "(JI)Lcom/didi/hummer2/bridge/JsiValue;", (void *) HMArray_get_value_},
                                            {"set_value_",       "(JIJ)Z",                                 (void *) HMArray_set_value_},
                                            {"push_",            "(JJ)V",                                  (void *) HMArray_push_},
                                            {"pop_",             "(J)Lcom/didi/hummer2/bridge/JsiValue;",  (void *) HMArray_pop_},
                                            {"remove_value_at_", "(JI)Lcom/didi/hummer2/bridge/JsiValue;", (void *) HMArray_remove_value_at_},
                                            {"remove_value_",    "(JJ)Lcom/didi/hummer2/bridge/JsiValue;", (void *) HMArray_remove_value_},
                                            {"clear_",           "(J)V",                                   (void *) HMArray_clear_},};


static JNINativeMethod _HMObjectMethods[] = {{"init_object_",    "()J",                                                     (void *) HMObject_init_object_},
                                             {"get_value_",      "(JLjava/lang/String;)Lcom/didi/hummer2/bridge/JsiValue;", (void *) HMObject_get_value_},
                                             {"set_value_",      "(JLjava/lang/String;J)Z",                                 (void *) HMObject_set_value_},
                                             {"get_value_type_", "(JLjava/lang/String;)I",                                  (void *) HMObject_get_value_type_},
                                             {"remove_value_",   "(JLjava/lang/String;)Z",                                  (void *) HMObject_remove_value_},
                                             {"keys_",           "(J)Ljava/util/List;",                                     (void *) HMObject_keys_},
                                             {"keys_array_",     "(J)Lcom/didi/hummer2/bridge/JsiArray;",                   (void *) HMObject_keys_array_},};

void HummerBridge::init(JNIEnv *env) {
    LOGI("HummerBridge::init()");

    jint state;

    //HMValue
    _HMValueCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/bridge/JsiValue"));
    _HMValueInit = env->GetMethodID(_HMValueCls, "<init>", "(J)V");

    state = env->RegisterNatives(_HMValueCls, _HMValueMethods, 4);
    if (state == JNI_OK) {
        LOGD("HMValue::init() OK");
    }

    //JsiFunction
    _HMFunctionCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/bridge/JsiFunction"));
    _HMFunctionInit = env->GetMethodID(_HMFunctionCls, "<init>", "(J)V");

    state = env->RegisterNatives(_HMFunctionCls, _HMFunctionMethods, 1);
    if (state == JNI_OK) {
        LOGD("JsiFunction::init() OK");
    }

    //HMString
    _HMStringCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/bridge/JsiStringNative"));
    _HMStringInit = env->GetMethodID(_HMStringCls, "<init>", "(JLjava/lang/String;)V");

    state = env->RegisterNatives(_HMStringCls, _HMStringMethods, 1);
    if (state == JNI_OK) {
        LOGD("HMString::init() OK");
    }

    //HMObject
    _HMObjectCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/bridge/JsiObjectNative"));
    _HMObjectInit = env->GetMethodID(_HMObjectCls, "<init>", "(J)V");

    state = env->RegisterNatives(_HMObjectCls, _HMObjectMethods, 7);
    if (state == JNI_OK) {
        LOGD("HMObject::init() OK");
    }

    //HMNumber
    _HMNumberCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/bridge/JsiNumberNative"));
    _HMNumberInit = env->GetMethodID(_HMNumberCls, "<init>", "(JD)V");

    state = env->RegisterNatives(_HMNumberCls, _HMNumberMethods, 1);
    if (state == JNI_OK) {
        LOGD("HMNumber::init() OK");
    }

    //HMBoolean
    _HMBooleanCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/bridge/JsiBooleanNative"));
    _HMBooleanInit = env->GetMethodID(_HMBooleanCls, "<init>", "(JZ)V");

    state = env->RegisterNatives(_HMBooleanCls, _HMBooleanMethods, 1);
    if (state == JNI_OK) {
        LOGD("HMBoolean::init() OK");
    }

    //HMArray
    _HMArrayCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/bridge/JsiArrayNative"));
    _HMArrayInit = env->GetMethodID(_HMArrayCls, "<init>", "(J)V");

    state = env->RegisterNatives(_HMArrayCls, _HMArrayMethods, 9);
    if (state == JNI_OK) {
        LOGD("HMArray::init() OK");
    }

    LOGI("HummerBridge::init() OK");
}
