#ifndef SRC_JS_NATIVE_API_H_
#define SRC_JS_NATIVE_API_H_

#include <js_native_api_types.h>

EXTERN_C_START

#include <stdbool.h> // NOLINT(modernize-deprecated-headers)
#include <stddef.h>  // NOLINT(modernize-deprecated-headers)
#include <stdint.h>  // NOLINT(modernize-deprecated-headers)

#define NAPI_NATIVE

#define NAPI_DEPRECATED

#define NAPI_AUTO_LENGTH SIZE_MAX

NAPI_NATIVE NAPIStatus napi_get_undefined(NAPIEnv env, NAPIValue *result);

NAPI_NATIVE NAPIStatus napi_get_null(NAPIEnv env, NAPIValue *result);

NAPI_NATIVE NAPIStatus napi_get_global(NAPIEnv env, NAPIValue *result);

NAPI_NATIVE NAPIStatus napi_get_boolean(NAPIEnv env, bool value, NAPIValue *result);

NAPIStatus napi_create_object(NAPIEnv env, NAPIValue *result);

NAPIStatus napi_create_array(NAPIEnv env, NAPIValue *result);

NAPIStatus napi_create_array_with_length(NAPIEnv env, size_t length, NAPIValue *result);

NAPI_NATIVE NAPIStatus napi_create_double(NAPIEnv env, double value, NAPIValue *result);

NAPI_NATIVE NAPI_DEPRECATED NAPIStatus napi_create_int32(NAPIEnv env, int32_t value, NAPIValue *result);

NAPI_NATIVE NAPI_DEPRECATED NAPIStatus napi_create_uint32(NAPIEnv env, uint32_t value, NAPIValue *result);

NAPI_NATIVE NAPI_DEPRECATED NAPIStatus napi_create_int64(NAPIEnv env, int64_t value, NAPIValue *result);

// 推荐实现层针对 str 为空情况做处理，比如当做 ""
NAPI_NATIVE NAPIStatus napi_create_string_utf8(NAPIEnv env, const char *str, size_t length, NAPIValue *result);

// 推荐实现层针对 utf8name 为空情况做处理，比如当做 ""
// data 可空
NAPI_NATIVE NAPIStatus napi_create_function(NAPIEnv env, const char *utf8name, size_t length, NAPICallback cb,
                                            void *data, NAPIValue *result);

// code 可空
NAPIStatus napi_create_error(NAPIEnv env, NAPIValue code, NAPIValue msg, NAPIValue *result);

// code 可空
NAPIStatus napi_create_type_error(NAPIEnv env, NAPIValue code, NAPIValue msg, NAPIValue *result);

// code 可空
NAPIStatus napi_create_range_error(NAPIEnv env, NAPIValue code, NAPIValue msg, NAPIValue *result);

NAPI_NATIVE NAPIStatus napi_typeof(NAPIEnv env, NAPIValue value, NAPIValueType *result);

NAPI_NATIVE NAPIStatus napi_get_value_double(NAPIEnv env, NAPIValue value, double *result);

NAPI_NATIVE NAPI_DEPRECATED NAPIStatus napi_get_value_int32(NAPIEnv env, NAPIValue value, int32_t *result);

NAPI_NATIVE NAPI_DEPRECATED NAPIStatus napi_get_value_uint32(NAPIEnv env, NAPIValue value, uint32_t *result);

NAPI_NATIVE NAPI_DEPRECATED NAPIStatus napi_get_value_int64(NAPIEnv env, NAPIValue value, int64_t *result);

NAPI_NATIVE NAPIStatus napi_get_value_bool(NAPIEnv env, NAPIValue value, bool *result);

// buf 可空，表示计算长度（不包括 \0），当 buf 为空时候，result 不能为空
// 实际上 buf 不为空，bufSize == 0 也能用来表示计算长度，但是暂时返回 0，建议不要依赖这个行为
NAPI_NATIVE NAPI_DEPRECATED NAPIStatus napi_get_value_string_utf8(NAPIEnv env, NAPIValue value, char *buf,
                                                                  size_t bufSize, size_t *result);

NAPI_NATIVE NAPIStatus napi_coerce_to_bool(NAPIEnv env, NAPIValue value, NAPIValue *result);

NAPI_NATIVE NAPIStatus napi_coerce_to_number(NAPIEnv env, NAPIValue value, NAPIValue *result);

NAPIStatus napi_coerce_to_object(NAPIEnv env, NAPIValue value, NAPIValue *result);

NAPI_NATIVE NAPIStatus napi_coerce_to_string(NAPIEnv env, NAPIValue value, NAPIValue *result);

// NAPIStatus napi_get_prototype(NAPIEnv env, NAPIValue object, NAPIValue *result);

NAPI_NATIVE NAPIStatus napi_set_property(NAPIEnv env, NAPIValue object, NAPIValue key, NAPIValue value);

NAPI_NATIVE NAPIStatus napi_has_property(NAPIEnv env, NAPIValue object, NAPIValue key, bool *result);

NAPI_NATIVE NAPIStatus napi_get_property(NAPIEnv env, NAPIValue object, NAPIValue key, NAPIValue *result);

// result 可空
NAPI_NATIVE NAPIStatus napi_delete_property(NAPIEnv env, NAPIValue object, NAPIValue key, bool *result);

NAPIStatus napi_set_named_property(NAPIEnv env, NAPIValue object, const char *utf8name, NAPIValue value);

NAPIStatus napi_get_named_property(NAPIEnv env, NAPIValue object, const char *utf8name, NAPIValue *result);

NAPIStatus napi_set_element(NAPIEnv env, NAPIValue object, uint32_t index, NAPIValue value);

NAPIStatus napi_has_element(NAPIEnv env, NAPIValue object, uint32_t index, bool *result);

NAPIStatus napi_get_element(NAPIEnv env, NAPIValue object, uint32_t index, NAPIValue *result);

// result 可空
NAPIStatus napi_delete_element(NAPIEnv env, NAPIValue object, uint32_t index, bool *result);

NAPIStatus napi_define_properties(NAPIEnv env, NAPIValue object, size_t propertyCount,
                                  const NAPIPropertyDescriptor *properties);

NAPI_NATIVE NAPIStatus napi_is_array(NAPIEnv env, NAPIValue value, bool *result);

NAPIStatus napi_get_array_length(NAPIEnv env, NAPIValue value, uint32_t *result);

NAPIStatus napi_strict_equals(NAPIEnv env, NAPIValue lhs, NAPIValue rhs, bool *result);

// result 可空
NAPI_NATIVE NAPIStatus napi_call_function(NAPIEnv env, NAPIValue thisValue, NAPIValue func, size_t argc,
                                          const NAPIValue *argv, NAPIValue *result);

NAPI_NATIVE NAPIStatus napi_new_instance(NAPIEnv env, NAPIValue constructor, size_t argc, const NAPIValue *argv,
                                         NAPIValue *result);

NAPI_NATIVE NAPIStatus napi_instanceof(NAPIEnv env, NAPIValue object, NAPIValue constructor, bool *result);

// argv/thisArg/data 可空，当 argv 非空时，argc 也必须非空
// env callbackInfo 入参，argc 为 inout，其他出参
NAPI_NATIVE NAPIStatus napi_get_cb_info(NAPIEnv env, NAPICallbackInfo callbackInfo, size_t *argc, NAPIValue *argv,
                                        NAPIValue *thisArg, void **data);

NAPI_NATIVE NAPIStatus napi_get_new_target(NAPIEnv env, NAPICallbackInfo callbackInfo, NAPIValue *result);

// utf8name/data/properties 可空
NAPIStatus napi_define_class(NAPIEnv env, const char *utf8name, size_t length, NAPICallback constructor, void *data,
                             size_t propertyCount, const NAPIPropertyDescriptor *properties, NAPIValue *result);

// finalizeCB/data/finalizeHint 可空
NAPI_NATIVE NAPIStatus napi_create_external(NAPIEnv env, void *data, NAPIFinalize finalizeCB, void *finalizeHint,
                                            NAPIValue *result);

NAPI_NATIVE NAPIStatus napi_get_value_external(NAPIEnv env, NAPIValue value, void **result);

// Set initial_refcount to 0 for a weak reference, >0 for a strong reference.
NAPI_NATIVE NAPIStatus napi_create_reference(NAPIEnv env, NAPIValue value, uint32_t initialRefCount, NAPIRef *result);

NAPI_NATIVE NAPIStatus napi_delete_reference(NAPIEnv env, NAPIRef ref);

// result 可空
NAPI_NATIVE NAPIStatus napi_reference_ref(NAPIEnv env, NAPIRef ref, uint32_t *result);

// result 可空
NAPI_NATIVE NAPIStatus napi_reference_unref(NAPIEnv env, NAPIRef ref, uint32_t *result);

NAPI_NATIVE NAPIStatus napi_get_reference_value(NAPIEnv env, NAPIRef ref, NAPIValue *result);

NAPI_NATIVE NAPIStatus napi_open_handle_scope(NAPIEnv env, NAPIHandleScope *result);

NAPI_NATIVE NAPIStatus napi_close_handle_scope(NAPIEnv env, NAPIHandleScope scope);

NAPI_NATIVE NAPIStatus napi_open_escapable_handle_scope(NAPIEnv env, NAPIEscapableHandleScope *result);

NAPI_NATIVE NAPIStatus napi_close_escapable_handle_scope(NAPIEnv env, NAPIEscapableHandleScope scope);

NAPI_NATIVE NAPIStatus napi_escape_handle(NAPIEnv env, NAPIEscapableHandleScope scope, NAPIValue escapee,
                                          NAPIValue *result);

NAPI_NATIVE NAPIStatus napi_throw(NAPIEnv env, NAPIValue error);

// code/msg 建议能传入 NULL
NAPIStatus napi_throw_error(NAPIEnv env, const char *code, const char *msg);

// code/msg 建议能传入 NULL
NAPIStatus napi_throw_type_error(NAPIEnv env, const char *code, const char *msg);

// code/msg 建议能传入 NULL
NAPIStatus napi_throw_range_error(NAPIEnv env, const char *code, const char *msg);

NAPIStatus napi_is_error(NAPIEnv env, NAPIValue value, bool *result);

NAPI_NATIVE NAPIStatus napi_get_and_clear_last_exception(NAPIEnv env, NAPIValue *result);

// 自定义函数
// utf8Script/utf8SourceUrl/result 可空
NAPI_NATIVE NAPIStatus NAPIRunScript(NAPIEnv env, const char *script, const char *sourceUrl, NAPIValue *result);

// 推荐实现层针对 utf8name 为空情况做处理，比如当做 ""
// data 可空
NAPI_NATIVE NAPIStatus NAPIDefineClass(NAPIEnv env, const char *utf8name, size_t length, NAPICallback constructor,
                                       void *data, NAPIValue *result);

NAPI_NATIVE NAPIStatus NAPICreateEnv(NAPIEnv *env);

NAPI_NATIVE NAPIStatus NAPIFreeEnv(NAPIEnv env);

NAPI_NATIVE NAPIStatus NAPIGetValueStringUTF8(NAPIEnv env, NAPIValue value, const char **result);

NAPI_NATIVE NAPIStatus NAPIFreeUTF8String(NAPIEnv env, const char *cString);

NAPIStatus NAPIParseUTF8JSONString(NAPIEnv env, const char *utf8String, NAPIValue *result);

EXTERN_C_END

#endif // SRC_JS_NATIVE_API_H_
