//
//  HMBaseExecutorProtocol.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/3.
//

#import <Foundation/Foundation.h>

@class HMBaseValue;

@protocol HMBaseWeakValueProtocol;

NS_ASSUME_NONNULL_BEGIN

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

@property (nonatomic, copy, nullable) void (^exceptionHandler)(HMExceptionModel *exception);

+ (nullable id <HMBaseExecutorProtocol>)currentContext DEPRECATED_MSG_ATTRIBUTE("兼容 JavaScriptCore 需要，废弃接口，使用 HMCurrentExecutor 替代");;

- (nullable HMBaseValue *)evaluateScript:(nullable NSString *)script withSourceURL:(nullable NSURL *)sourceURL;

/// 使用下标获取属性
/// @param key 可以为 HMBaseValue *，也可以为字符串，当前只支持字符串，如果支持 Number 等，改成 id<NSCopying>
- (nullable HMBaseValue *)objectForKeyedSubscript:(id)key;

- (void)setObject:(nullable id)object forKeyedSubscript:(id)key;

#pragma mark - 私有代码 业务方请勿使用

#pragma mark - 类型判断

/// nil 参数被认为是 JavaScript undefined

- (BOOL)valueIsNullOrUndefined:(nullable HMBaseValue *)value;

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

- (nullable HMBaseValue *)convertToValueWithObject:(nullable id)object;

- (nullable HMBaseValue *)convertToValueWithNumber:(nullable NSNumber *)number;

#pragma mark - JavaScriptCore -> Native

- (nullable id)convertToObjectWithValue:(nullable HMBaseValue *)value isPortableConvert:(BOOL)isPortableConvert;

- (nullable NSNumber *)convertToNumberWithValue:(nullable HMBaseValue *)value;

- (nullable NSString *)convertToStringWithValue:(nullable HMBaseValue *)value;

- (nullable NSArray *)convertToArrayWithValue:(nullable HMBaseValue *)value isPortableConvert:(BOOL)isPortableConvert;

- (nullable NSDictionary<NSString *, id> *)convertToDictionaryWithValue:(nullable HMBaseValue *)value isPortableConvert:(BOOL)isPortableConvert;

- (nullable NSObject *)convertToNativeObjectWithValue:(nullable HMBaseValue *)value;

- (nullable HMFunctionType)convertToFunctionWithValue:(nullable HMBaseValue *)value;

#pragma mark - Misc

- (BOOL)compareWithValue:(nullable HMBaseValue *)value anotherValue:(nullable HMBaseValue *)anotherValue;

- (nullable HMBaseValue *)callWithValue:(nullable HMBaseValue *)value arguments:(nullable NSArray *)arguments;

- (nullable HMBaseValue *)invokeMethodWithValue:(nullable HMBaseValue *)value method:(NSString *)method withArguments:(nullable NSArray *)arguments;

- (nullable HMBaseValue *)getWithValue:(nullable HMBaseValue *)value propertyName:(nullable NSString *)propertyName;

- (void)setWithValue:(nullable HMBaseValue *)value propertyName:(nullable NSString *)propertyName propertyObject:(nullable id)propertyObject;

- (nullable id <HMBaseWeakValueProtocol>)createWeakValueWithStrongValue:(nullable HMBaseValue *)strongValue;

@optional

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

NS_ASSUME_NONNULL_END
