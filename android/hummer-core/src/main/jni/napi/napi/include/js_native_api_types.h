#ifndef js_native_api_types_h
#define js_native_api_types_h

#ifdef __cplusplus
#define EXTERN_C_START                                                                                                 \
    extern "C"                                                                                                         \
    {
#define EXTERN_C_END }
#else
#define EXTERN_C_START
#define EXTERN_C_END
#endif

EXTERN_C_START

typedef struct OpaqueNAPIEnv *NAPIEnv;
typedef struct OpaqueNAPIValue *NAPIValue;
typedef struct OpaqueNAPIRef *NAPIRef;
typedef struct OpaqueNAPIHandleScope *NAPIHandleScope;
typedef struct OpaqueNAPIEscapableHandleScope *NAPIEscapableHandleScope;
typedef struct OpaqueNAPICallbackInfo *NAPICallbackInfo;

typedef enum
{
    // { writable: false, enumerable: false, configurable: false }
    // napi_set_property 默认为 { writable: true, enumerable: true, configurable: true }
    NAPIDefault = 0,
    NAPIWritable = 1 << 0,
    NAPIEnumerable = 1 << 1,
    NAPIConfigurable = 1 << 2,

    // napi_define_class 用于区分静态属性和实例属性，napi_define_properties 忽略该枚举
    NAPIStatic = 1 << 10,

    // 方法默认
    NAPIDefaultMethod = NAPIWritable | NAPIConfigurable,

    // 属性默认
    NAPIDefaultJSProperty = NAPIWritable | NAPIEnumerable | NAPIConfigurable,
} NAPIPropertyAttributes;

typedef enum
{
    NAPIUndefined,
    NAPINull,
    NAPIBoolean,
    NAPINumber,
    NAPIString,
    // 未来建议判断到 Object 即可，提供 NAPIIsFunction 和 NAPIIsExternal
    NAPIObject,
    NAPIFunction,
    NAPIExternal,
} NAPIValueType;

typedef enum
{
    NAPIOK,
    NAPIInvalidArg,
    NAPIObjectExpected,
    NAPIStringExpected,
    NAPINameExpected,
    NAPIFunctionExpected,
    NAPINumberExpected,
    NAPIBooleanExpected,
    NAPIArrayExpected,
    NAPIGenericFailure,
    NAPIPendingException,
    NAPICancelled,
    NAPIEscapeCalledTwice,
    NAPIHandleScopeMismatch,
    NAPICallbackScopeMismatch,
    NAPIQueueFull,
    NAPIClosing,
    NAPIBigIntExpected,
    NAPIDateExpected,
    NAPIArrayBufferExpected,
    NAPIDetachableArrayBufferExpected,
    NAPIWouldDeadLock,
    // 自定义添加错误
    NAPIMemoryError
} NAPIStatus;
// 当添加新枚举值的时候，需要同时更新：
// * 每个 js_native_api_{engine}.c/cc 文件 napi_get_last_error_info 函数的 LAST_STATUS 或者 const int lastStatus
// * const char *errorMessages[] 也需要更新

typedef NAPIValue (*NAPICallback)(NAPIEnv env, NAPICallbackInfo callbackInfo);

typedef void (*NAPIFinalize)(NAPIEnv env, void *finalizeData, void *finalizeHint);

typedef struct
{
    const char *utf8name;
    NAPIValue name;

    NAPICallback method;

    NAPICallback getter;
    NAPICallback setter;

    NAPIValue value;

    NAPIPropertyAttributes attributes;
    void *data;
} NAPIPropertyDescriptor;

EXTERN_C_END

#endif /* js_native_api_types_h */
