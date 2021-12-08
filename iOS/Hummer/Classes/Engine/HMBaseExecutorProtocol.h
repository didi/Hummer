//
//  HMBaseExecutorProtocol.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/3.
//

#import <Foundation/Foundation.h>

@class HMBaseValue;

@protocol HMBaseWeakValueProtocol;
@class HMExceptionModel;

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSUInteger, HMEngineType) {
    HMEngineTypeJSC,
    HMEngineTypeNAPI
};

typedef NS_ENUM(NSUInteger, HMLogLevel) {
  HMLogLevelTrace = 0,
  HMLogLevelInfo,
  HMLogLevelWarning,
  HMLogLevelError,
  HMLogLevelFatal
};

HMEngineType HMGetEngineType(void);

HMEngineType HMSetEngineType(HMEngineType newEngineType);

typedef void (^HMExceptionHandler)(HMExceptionModel *exceptionModel);

typedef void (^HMLogHandler)(NSString *_Nullable logString, HMLogLevel logLevel);

typedef HMLogHandler HMConsoleHandler;
typedef HMLogHandler HMWebSocketHandler;

/**
 * 如果是原生给 JS 的闭包，由 JS 调用，参数为 NSArray<HMBaseValue *> *，返回值为 id
 * 如果是 JS 给原生的闭包，由原生调用，参数为 NSArray *，返回值为 HMBaseValue *
 * 如果是原生给 JS 的闭包，由原生调用，参数为 NSArray *，返回值为 id，不考虑
 * 如果是 JS 给原生的闭包，由 JS 调用，参数为 NSArray<HMBaseValue *> *，返回值为 HMBaseValue *，不考虑
 * 未来需要探测 block 参数
 * 并支持任意类型参数
 *
 * 注意：如果闭包不返回任何值，会导致崩溃
 */
typedef id _Nullable (^HMFunctionType)(NSArray *_Nullable value);


// 兼容以前代码
typedef HMFunctionType HMFuncCallback;

@class HMExceptionModel;

@protocol HMBaseExecutorProtocol <NSObject>

@required

@property (nonatomic, readonly, strong) HMBaseValue *globalObject;

 /// 添加异常回调，不需要手动移除，内部为 NSMapTable，handler 生命周期跟随 key 的生命周期。
 /// @param key 普通对象。
- (void)addExceptionHandler:(HMExceptionHandler)handler key:(id)key;

/// 添加 console 回调，不需要手动移除，内部为 NSMapTable，handler 生命周期跟随 key 的生命周期。
/// @param key 普通对象。
- (void)addConsoleHandler:(HMConsoleHandler)handler key:(id)key;


- (nullable HMBaseValue *)evaluateScript:(nullable NSString *)script withSourceURL:(nullable NSURL *)sourceURL;

/// 使用下标获取属性
/// @param key 可以为 HMBaseValue *，也可以为字符串，当前只支持字符串，如果支持 Number 等，改成 id<NSCopying>
- (nullable HMBaseValue *)objectForKeyedSubscript:(id)key;

- (void)setObject:(nullable id)object forKeyedSubscript:(id)key;

#pragma mark - 私有代码 业务方请勿使用

#pragma mark - 类型判断

- (BOOL)valueIsNull:(nullable HMBaseValue *)value;

- (BOOL)valueIsUndefined:(nullable HMBaseValue *)value;

- (BOOL)valueIsBoolean:(nullable HMBaseValue *)value;

/// 布尔类型不是数字
/// @param value HMBaseValue *
- (BOOL)valueIsNumber:(nullable HMBaseValue *)value;

/// new String() 是对象不是标量
/// @param value HMBaseValue *
- (BOOL)valueIsString:(nullable HMBaseValue *)value;

/// 单纯判断是否为 JavaScript Object
/// @param value HMBaseValue *
- (BOOL)valueIsObject:(nullable HMBaseValue *)value DEPRECATED_MSG_ATTRIBUTE("兼容 JavaScriptCore 需要，废弃接口，业务方实际上需要的是判断是否为字典");

/// 包括 Proxy 代理的 Array
/// @param value HMBaseValue *
- (BOOL)valueIsArray:(nullable HMBaseValue *)value;

#pragma mark - 私有方法 业务方请勿调用

#pragma mark - 新增类型判断

- (BOOL)valueIsDictionary:(nullable HMBaseValue *)value DEPRECATED_MSG_ATTRIBUTE("兼容 JavaScriptCore 需要，废弃接口，直接转换成 dictionary + 判空");

- (BOOL)valueIsNativeObject:(nullable HMBaseValue *)value;

- (BOOL)valueIsFunction:(nullable HMBaseValue *)value;

#pragma mark - Native -> JavaScriptCore

/// 下面两个函数都是 HMBaseValue 类方法要求
- (nullable HMBaseValue *)convertToValueWithObject:(nullable id)object;

- (nullable HMBaseValue *)convertToValueWithNumber:(nullable NSNumber *)number;

#pragma mark - JavaScriptCore -> Native

- (nullable id)convertToObjectWithValue:(nullable HMBaseValue *)value isPortableConvert:(BOOL)isPortableConvert;

- (nullable NSNumber *)convertToNumberWithValue:(nullable HMBaseValue *)value isForce:(BOOL)isForce;

- (nullable NSString *)convertToStringWithValue:(nullable HMBaseValue *)value isForce:(BOOL)isForce;

- (nullable NSArray *)convertToArrayWithValue:(nullable HMBaseValue *)value isPortableConvert:(BOOL)isPortableConvert;

- (nullable NSDictionary<NSString *, id> *)convertToDictionaryWithValue:(nullable HMBaseValue *)value isPortableConvert:(BOOL)isPortableConvert;

- (nullable NSObject *)convertToNativeObjectWithValue:(nullable HMBaseValue *)value;

- (nullable HMFunctionType)convertToFunctionWithValue:(nullable HMBaseValue *)value;

#pragma mark - Misc

/// 如果非同一个 VM 比较，会直接返回 NO，不是同一个 VM，不需要做任何比较
- (BOOL)compareWithValue:(nullable HMBaseValue *)value anotherValue:(nullable HMBaseValue *)anotherValue;

- (nullable HMBaseValue *)callWithValue:(nullable HMBaseValue *)value arguments:(nullable NSArray *)arguments;

- (nullable HMBaseValue *)invokeMethodWithValue:(nullable HMBaseValue *)value method:(NSString *)method withArguments:(nullable NSArray *)arguments;

- (nullable HMBaseValue *)getWithValue:(nullable HMBaseValue *)value propertyName:(nullable NSString *)propertyName;

- (void)setWithValue:(nullable HMBaseValue *)value propertyName:(nullable NSString *)propertyName propertyObject:(nullable id)propertyObject;

@optional

- (nullable id <HMBaseWeakValueProtocol>)createWeakValueWithStrongValue:(nullable HMBaseValue *)strongValue DEPRECATED_MSG_ATTRIBUTE("HMJSCExecutor 使用，未来将被废弃");

/// 这个只有 JavaScriptCore 才有
@property (nonatomic, nullable, copy) NSString *name;

/**
 * 下面两个先不实现，暂时不满足
 */
- (nullable HMBaseValue *)objectAtIndexedSubscript:(NSUInteger)idx;

- (void)setObject:(nullable id)obj atIndexedSubscript:(NSUInteger)idx;

@end

FOUNDATION_EXPORT NSArray<HMBaseValue *> *_Nullable HMOtherArguments;

FOUNDATION_EXPORT id <HMBaseExecutorProtocol> _Nullable HMCurrentExecutor;

FOUNDATION_EXPORT NSMapTable<NSValue *, id <HMBaseExecutorProtocol>> *_Nullable HMExecutorMap;

FOUNDATION_EXPORT void HMAssertMainQueue(void);

FOUNDATION_EXPORT void HMSafeMainThread(dispatch_block_t _Nullable block);

FOUNDATION_EXPORT NSString *const HUMMER_RETAIN_TEMPLATE;

FOUNDATION_EXPORT NSString *const HUMMER_CREATE_TEMPLATE;

FOUNDATION_EXPORT NSString *const HUMMER_OPAQUE_POINTER_IS_NULL;

FOUNDATION_EXPORT NSString *const HUMMER_DESTROY_TEMPLATE;

FOUNDATION_EXPORT NSString *const HUMMER_CALL_PARAMETER_ERROR;

FOUNDATION_EXPORT NSString *const HUMMER_DOWNGRADE_TO_CLASS_CALL;

FOUNDATION_EXPORT NSString *const HUMMER_CREATE_CLASS_NOT_FOUND;

FOUNDATION_EXPORT NSString *const HUMMER_CALL_NATIVE_TARGET_ERROR;

FOUNDATION_EXPORT NSString *const HUMMER_CALL_NATIVE_SELECTOR_ERROR;

FOUNDATION_EXPORT NSString *const HUMMER_CALL_NATIVE_METHOD_SIGNATURE_ERROR;

FOUNDATION_EXPORT NSString *const HUMMER_UN_SUPPORT_TYPE_TEMPLATE;

FOUNDATION_EXPORT NSString *const HUMMER_UN_MATCH_ARGS_TYPE_TEMPLATE;

FOUNDATION_EXPORT NSString *const HUMMER_CREATE_ERROR;

FOUNDATION_EXPORT NSString *const HUMMER_CAN_NOT_CREATE_NATIVE_OBJECT;

FOUNDATION_EXPORT NSString *const HUMMER_CALL_CLOSURE_MUST_HAVE_PARAMETER;

FOUNDATION_EXPORT NSString *const HUMMER_FIRST_PARAMETER_NOT_NATIVE_CLOSURE;

FOUNDATION_EXPORT NSString *const HUMMER_GET_SET_ERROR;

NS_ASSUME_NONNULL_END
