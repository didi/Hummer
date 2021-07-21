#ifndef SRC_JS_NATIVE_API_H_
#define SRC_JS_NATIVE_API_H_

#include <js_native_api_types.h>

EXTERN_C_START

#include <stdbool.h> // NOLINT(modernize-deprecated-headers)
#include <stddef.h>  // NOLINT(modernize-deprecated-headers)
#include <stdint.h>  // NOLINT(modernize-deprecated-headers)

NAPIStatus napi_get_undefined(NAPIEnv env, NAPIValue *result);

NAPIStatus napi_get_null(NAPIEnv env, NAPIValue *result);

NAPIStatus napi_get_global(NAPIEnv env, NAPIValue *result);

NAPIStatus napi_get_boolean(NAPIEnv env, bool value, NAPIValue *result);

NAPIStatus napi_create_double(NAPIEnv env, double value, NAPIValue *result);

// 推荐实现层针对 str 为空情况做处理，比如当做 ""
NAPIStatus napi_create_string_utf8(NAPIEnv env, const char *str, NAPIValue *result);

// 推荐实现层针对 utf8name 为空情况做处理，比如当做 ""
// data 可空
NAPIStatus napi_create_function(NAPIEnv env, const char *utf8name, NAPICallback cb, void *data, NAPIValue *result);

NAPIStatus napi_typeof(NAPIEnv env, NAPIValue value, NAPIValueType *result);

NAPIStatus napi_get_value_double(NAPIEnv env, NAPIValue value, double *result);

NAPIStatus napi_get_value_bool(NAPIEnv env, NAPIValue value, bool *result);

NAPIStatus napi_coerce_to_bool(NAPIEnv env, NAPIValue value, NAPIValue *result);

NAPIStatus napi_coerce_to_number(NAPIEnv env, NAPIValue value, NAPIValue *result);

NAPIStatus napi_coerce_to_string(NAPIEnv env, NAPIValue value, NAPIValue *result);

NAPIStatus napi_set_property(NAPIEnv env, NAPIValue object, NAPIValue key, NAPIValue value);

NAPIStatus napi_has_property(NAPIEnv env, NAPIValue object, NAPIValue key, bool *result);

NAPIStatus napi_get_property(NAPIEnv env, NAPIValue object, NAPIValue key, NAPIValue *result);

// result 可空
NAPIStatus napi_delete_property(NAPIEnv env, NAPIValue object, NAPIValue key, bool *result);

NAPIStatus napi_is_array(NAPIEnv env, NAPIValue value, bool *result);

// thisValue/result 可空
NAPIStatus napi_call_function(NAPIEnv env, NAPIValue thisValue, NAPIValue func, size_t argc, const NAPIValue *argv,
                              NAPIValue *result);

NAPIStatus napi_new_instance(NAPIEnv env, NAPIValue constructor, size_t argc, const NAPIValue *argv, NAPIValue *result);

NAPIStatus napi_instanceof(NAPIEnv env, NAPIValue object, NAPIValue constructor, bool *result);

// argv/thisArg/data 可空，当 argv 非空时，argc 也必须非空
// env callbackInfo 入参，argc 为 inout，其他出参
NAPIStatus napi_get_cb_info(NAPIEnv env, NAPICallbackInfo callbackInfo, size_t *argc, NAPIValue *argv,
                            NAPIValue *thisArg, void **data);

NAPIStatus napi_get_new_target(NAPIEnv env, NAPICallbackInfo callbackInfo, NAPIValue *result);

// finalizeCB/data/finalizeHint 可空
NAPIStatus napi_create_external(NAPIEnv env, void *data, NAPIFinalize finalizeCB, void *finalizeHint,
                                NAPIValue *result);

NAPIStatus napi_get_value_external(NAPIEnv env, NAPIValue value, void **result);

// Set initial_refcount to 0 for a weak reference, >0 for a strong reference.
NAPIStatus napi_create_reference(NAPIEnv env, NAPIValue value, uint32_t initialRefCount, NAPIRef *result);

NAPIStatus napi_delete_reference(NAPIEnv env, NAPIRef ref);

// result 可空
NAPIStatus napi_reference_ref(NAPIEnv env, NAPIRef ref, uint32_t *result);

// result 可空
NAPIStatus napi_reference_unref(NAPIEnv env, NAPIRef ref, uint32_t *result);

NAPIStatus napi_get_reference_value(NAPIEnv env, NAPIRef ref, NAPIValue *result);

NAPIStatus napi_open_handle_scope(NAPIEnv env, NAPIHandleScope *result);

NAPIStatus napi_close_handle_scope(NAPIEnv env, NAPIHandleScope scope);

NAPIStatus napi_open_escapable_handle_scope(NAPIEnv env, NAPIEscapableHandleScope *result);

NAPIStatus napi_close_escapable_handle_scope(NAPIEnv env, NAPIEscapableHandleScope scope);

NAPIStatus napi_escape_handle(NAPIEnv env, NAPIEscapableHandleScope scope, NAPIValue escapee, NAPIValue *result);

NAPIStatus napi_throw(NAPIEnv env, NAPIValue error);

NAPIStatus napi_get_and_clear_last_exception(NAPIEnv env, NAPIValue *result);

// 自定义函数
// utf8Script/utf8SourceUrl/result 可空
NAPIStatus NAPIRunScript(NAPIEnv env, const char *script, const char *sourceUrl, NAPIValue *result);

// 推荐实现层针对 utf8name 为空情况做处理，比如当做 ""
// data 可空
NAPIStatus NAPIDefineClass(NAPIEnv env, const char *utf8name, NAPICallback constructor, void *data, NAPIValue *result);

NAPIStatus NAPICreateEnv(NAPIEnv *env);

NAPIStatus NAPIFreeEnv(NAPIEnv env);

NAPIStatus NAPIGetValueStringUTF8(NAPIEnv env, NAPIValue value, const char **result);

NAPIStatus NAPIFreeUTF8String(NAPIEnv env, const char *cString);

#pragma mark - 间接函数

NAPIStatus napi_set_named_property(NAPIEnv env, NAPIValue object, const char *utf8name, NAPIValue value);

NAPIStatus napi_get_named_property(NAPIEnv env, NAPIValue object, const char *utf8name, NAPIValue *result);

NAPIStatus napi_strict_equals(NAPIEnv env, NAPIValue lhs, NAPIValue rhs, bool *result);

NAPIStatus NAPIParseUTF8JSONString(NAPIEnv env, const char *utf8String, NAPIValue *result);

EXTERN_C_END

#endif // SRC_JS_NATIVE_API_H_
