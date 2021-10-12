#import <Hummer/HMJSExecutor.h>
#import <napi/js_native_api.h>

NS_ASSUME_NONNULL_BEGIN

#define CHECK_COMMON(expr) \
{ \
    NAPICommonStatus commonStatus = expr; \
    assert(commonStatus == NAPICommonOK); \
}

@interface HMJSExecutor (Private)

@property (nonatomic, assign, readonly) NAPIEnv env;

/**
 * @brief 自动处理 JavaScript 异常
 * 通常如下使用
 * if ([self popExceptionWithStatus:napi_get_null(self.env, &nullValue)]) {
 *     NSAssert(NO, @"napi_get_null() error");
 *
 *     return;
 * }
 *
 * @param status N-API 调用结果
 * @return 是否 N-API 调用发生错误
 */
- (BOOL)popExceptionWithStatus:(NAPIExceptionStatus)status;

@end

NS_ASSUME_NONNULL_END
