//
//  HMBaseExecutor.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/3.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class HMBaseValue, HMBaseStrongValue;

/**
 * 如果是原生给 JS 的闭包，由 JS 调用，参数为 NSArray<HMBaseValue *> *，返回值为 id
 * 如果是 JS 给原生的闭包，由原生调用，参数为 NSArray *，返回值为 HMBaseValue *
 * 如果是原生给 JS 的闭包，由原生调用，参数为 NSArray *，返回值为 id，不考虑
 * 如果是 JS 给原生的闭包，由 JS 调用，参数为 NSArray<HMBaseValue *> *，返回值为 HMBaseValue *，不考虑
 * 未来需要探测 block 参数
 * 支持任意类型参数
 *
 * 注意：如果闭包不返回任何值，会导致崩溃
 */
typedef id _Nullable (^HMClosureType)(NSArray *_Nullable value);

// 兼容类型
typedef HMClosureType HMFuncCallback;

@class HMExceptionModel;

@protocol HMBaseExecutorProtocol

@optional

- (void)enableDebuggerWithTitle:(nullable NSString *)title;

- (nullable HMBaseStrongValue *)evaluateWithScript:(nullable NSString *)script sourceUrl:(nullable NSString *)sourceUrl;

- (nullable HMBaseStrongValue *)executeCallWithTarget:(HMBaseValue *)value functionName:(NSString *)functionName arguments:(nullable NSArray *)arguments;

- (BOOL)setPropertyWithObject:(HMBaseValue *)object value:(nullable id)value property:(NSString *)propertyString;

- (void)registerWithName:(NSString *)name closure:(HMClosureType)closure DEPRECATED_MSG_ATTRIBUTE("兼容需要，废弃接口，使用 - setPropertyWithObject:value:property: 做上下文隔离");

#pragma mark - JS 转对象

- (nullable NSString *)convertValueToString:(nullable HMBaseValue *)value;

- (nullable NSNumber *)convertValueToNumber:(nullable HMBaseValue *)value;

/**
 * 包含闭包在内
 * @param value 值
 * @return OC 对象
 */
- (nullable NSArray *)convertValueToArray:(nullable HMBaseValue *)value;

- (nullable NSDictionary<NSString *, id> *)convertValueToDictionary:(nullable HMBaseValue *)value;

- (nullable HMClosureType)convertValueToClosure:(nullable HMBaseValue *)value;

- (nullable id)convertValueToObject:(nullable HMBaseValue *)value;

- (nullable NSObject *)convertValueToNativeObject:(nullable HMBaseValue *)value;

- (nullable NSObject<NSCoding> *)convertValueToPortableObject:(nullable HMBaseValue *)value;

#pragma mark - 类型判断

- (BOOL)valueIsNullOrUndefined:(nullable HMBaseValue *)value;

/**
 * 判断是否是布尔类型
 * @param value JSValue
 * @return 判断结果
 */
- (BOOL)valueIsBoolean:(nullable HMBaseValue *)value;

/**
 * 布尔类型不是数字
 * @param value JSValue
 * @return 判断结果
 */
- (BOOL)valueIsNumber:(nullable HMBaseValue *)value;

/**
 * new String() 是对象不是数字
 * @param value JSValue
 * @return 判断结果
 */
- (BOOL)valueIsString:(nullable HMBaseValue *)value;

- (BOOL)valueIsArray:(nullable HMBaseValue *)value;

/**
 * 判断是否为原生对象，CPU 消耗基本和转换一样，建议直接使用 - convertValueToNativeObject:
 * @param value JSValue
 * @return 是否为原生对象
 */
- (BOOL)valueIsNativeObject:(nullable HMBaseValue *)value DEPRECATED_MSG_ATTRIBUTE("使用 - convertValueToNativeObject: 替代");

- (BOOL)valueIsClosure:(nullable HMBaseValue *)value;

/**
 * 只有不是闭包、数组、原生对象的对象才是字典
 * @param value JSValue
 * @return 判断结果
 */
- (BOOL)valueIsDictionary:(nullable HMBaseValue *)value;

@required

- (BOOL)compareValue:(nullable HMBaseValue *)value1 value:(nullable HMBaseValue *)value2;

@end

@interface HMBaseExecutor : NSObject <HMBaseExecutorProtocol>

@property (nonatomic, nullable, copy) void (^exceptionHandler)(HMExceptionModel *exception);

@end

FOUNDATION_EXPORT NSArray<HMBaseStrongValue *> *_Nullable hm_otherArguments;

FOUNDATION_EXPORT HMBaseExecutor *_Nullable hm_currentExecutor;

FOUNDATION_EXPORT NSString *const HUMMER_CALL_PARAMETER_ERROR;

FOUNDATION_EXPORT NSString *const HUMMER_CALL_NATIVE_TARGET_ERROR;

FOUNDATION_EXPORT NSString *const HUMMER_CALL_NATIVE_SELECTOR_ERROR;

FOUNDATION_EXPORT NSString *const HUMMER_CALL_NATIVE_METHOD_SIGNATURE_ERROR;

FOUNDATION_EXPORT NSString *const HUMMER_CREATE_ERROR;

FOUNDATION_EXPORT NSString *const HUMMER_CREATE_CLASS_NOT_FOUND;

FOUNDATION_EXPORT NSString *const HUMMER_GET_SET_ERROR;

FOUNDATION_EXPORT NSString *const HUMMER_UN_SUPPORT_TYPE_TEMPLATE;

FOUNDATION_EXPORT NSString *const HUMMER_DOWNGRADE_TO_CLASS_CALL;

FOUNDATION_EXPORT NSString *const HUMMER_CREATE_TEMPLATE;

FOUNDATION_EXPORT NSString *const HUMMER_RETAIN_TEMPLATE;

FOUNDATION_EXPORT NSString *const HUMMER_CAN_NOT_CREATE_NATIVE_OBJECT;

FOUNDATION_EXPORT NSString *const HUMMER_OPAQUE_POINTER_IS_NULL;

FOUNDATION_EXPORT NSString *const HUMMER_CALL_CLOSURE_MUST_HAVE_PARAMETER;

FOUNDATION_EXPORT NSString *const HUMMER_FIRST_PARAMETER_NOT_NATIVE_CLOSURE;

FOUNDATION_EXPORT NSString *const HUMMER_EXECUTOR_NOT_FOUND;

FOUNDATION_EXPORT NSString *const HUMMER_DESTROY_TEMPLATE;

FOUNDATION_EXPORT NSMapTable<NSValue *, HMBaseExecutor *> *_Nullable hm_executorMap;

NS_ASSUME_NONNULL_END
