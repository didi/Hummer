//
//  HMBaseExecutor.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/3.
//

#import <Foundation/Foundation.h>

@protocol HMBaseValueProtocol;

NS_ASSUME_NONNULL_BEGIN

/**
 * 如果是原生给 JS 的闭包，由 JS 调用，参数为 NSArray<id<HMBaseValueProtocol>> *，返回值为 id
 * 如果是 JS 给原生的闭包，由原生调用，参数为 NSArray *，返回值为 id<HMBaseValueProtocol>
 * 如果是原生给 JS 的闭包，由原生调用，参数为 NSArray *，返回值为 id，不考虑
 * 如果是 JS 给原生的闭包，由 JS 调用，参数为 NSArray<id<HMBaseValueProtocol>> *，返回值为 id<HMBaseValueProtocol>，不考虑
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

@property (nonatomic, readonly, strong) id <HMBaseValueProtocol> globalObject;

@property (nonatomic, copy, nullable) void (^exceptionHandler)(HMExceptionModel *exception);

+ (nullable id <HMBaseExecutorProtocol>)currentContext;

+ (nullable NSArray<id <HMBaseValueProtocol>> *)currentArguments;

- (nullable id <HMBaseValueProtocol>)evaluateScript:(nullable NSString *)script withSourceURL:(nullable NSURL *)sourceURL;

/// 使用下标获取属性
/// @param key 可以为 id<HMBaseValueProtocol>，也可以为字符串，当前只支持字符串，如果支持 Number 等，改成 id<NSCopying>
- (nullable id <HMBaseValueProtocol>)objectForKeyedSubscript:(id)key;

- (void)setObject:(nullable id)object forKeyedSubscript:(id)key;

#pragma mark - 私有代码 业务方请勿使用

#pragma mark - 类型判断

/// nil 参数被认为是 JavaScript undefined

- (BOOL)valueIsNullOrUndefined:(nullable id <HMBaseValueProtocol>)value;

- (BOOL)valueIsBoolean:(nullable id <HMBaseValueProtocol>)value;

/// 布尔类型不是数字
/// @param value id<HMBaseValueProtocol>
- (BOOL)valueIsNumber:(nullable id <HMBaseValueProtocol>)value;

/// new String() 是对象不是标量
/// @param value id<HMBaseValueProtocol>
- (BOOL)valueIsString:(nullable id <HMBaseValueProtocol>)value;

/// 单纯判断是否为 JavaScript Object
/// @param value id<HMBaseValueProtocol>
- (BOOL)valueIsObject:(nullable id <HMBaseValueProtocol>)value DEPRECATED_MSG_ATTRIBUTE("兼容 JavaScriptCore 需要，废弃接口，业务方实际上需要的是判断是否为字典");

/// 包括 Proxy 代理的 Array
/// @param value id<HMBaseValueProtocol>
- (BOOL)valueIsArray:(nullable id <HMBaseValueProtocol>)value;

#pragma mark - 私有方法 业务方请勿调用

#pragma mark - 新增类型判断

- (BOOL)valueIsDictionary:(nullable id <HMBaseValueProtocol>)value DEPRECATED_MSG_ATTRIBUTE("兼容 JavaScriptCore 需要，废弃接口，直接转换成 dictionary + 判空");

- (BOOL)valueIsNativeObject:(nullable id <HMBaseValueProtocol>)value;

- (BOOL)valueIsFunction:(nullable id <HMBaseValueProtocol>)value;

#pragma mark - Native -> JavaScriptCore

- (nullable id <HMBaseValueProtocol>)convertToValueWithObject:(nullable id)object;

- (nullable id <HMBaseValueProtocol>)convertToValueWithNumber:(nullable NSNumber *)number;

#pragma mark - JavaScriptCore -> Native

- (nullable id)convertToObjectWithValue:(nullable id <HMBaseValueProtocol>)value isPortableConvert:(BOOL)isPortableConvert;

- (nullable NSNumber *)convertToNumberWithValue:(nullable id <HMBaseValueProtocol>)value;

- (nullable NSString *)convertToStringWithValue:(nullable id <HMBaseValueProtocol>)value;

- (nullable NSArray *)convertToArrayWithValue:(nullable id <HMBaseValueProtocol>)value isPortableConvert:(BOOL)isPortableConvert;

- (nullable NSDictionary<NSString *, id> *)convertToDictionaryWithValue:(nullable id <HMBaseValueProtocol>)value isPortableConvert:(BOOL)isPortableConvert;

- (nullable NSObject *)convertToNativeObjectWithValue:(nullable id <HMBaseValueProtocol>)value;

- (nullable HMFunctionType)convertToFunctionWithValue:(nullable id <HMBaseValueProtocol>)value;

#pragma mark - Misc

- (BOOL)compareWithValue:(nullable id <HMBaseValueProtocol>)value anotherValue:(nullable id <HMBaseValueProtocol>)anotherValue;

- (nullable id <HMBaseValueProtocol>)callWithValue:(nullable id <HMBaseValueProtocol>)value arguments:(nullable NSArray *)arguments;

- (nullable id <HMBaseValueProtocol>)invokeMethodWithValue:(nullable id <HMBaseValueProtocol>)value method:(NSString *)method withArguments:(nullable NSArray *)arguments;

- (nullable id <HMBaseValueProtocol>)getWithValue:(nullable id <HMBaseValueProtocol>)value propertyName:(nullable NSString *)propertyName;

- (void)setWithValue:(nullable id <HMBaseValueProtocol>)value propertyName:(nullable NSString *)propertyName propertyObject:(nullable id)propertyObject;

@optional

/// 这个只有 JavaScriptCore 才有
@property (nonatomic, nullable, copy) NSString *name;

/**
 * 下面两个先不实现，暂时不满足
 */
- (nullable id <HMBaseValueProtocol>)objectAtIndexedSubscript:(NSUInteger)idx;

- (void)setObject:(nullable id)obj atIndexedSubscript:(NSUInteger)idx;

@end

//FOUNDATION_EXPORT NSArray<id<HMBaseValueProtocol>> *_Nullable hm_otherArguments;

//FOUNDATION_EXPORT id<HMBaseExecutorProtocol> _Nullable hm_currentExecutor;

FOUNDATION_EXPORT NSMapTable<NSValue *, id <HMBaseExecutorProtocol>> *_Nullable HMExecutorMap;

FOUNDATION_EXPORT void HMAssertMainQueue(void);

FOUNDATION_EXPORT void HMSafeMainThread(dispatch_block_t _Nullable block);

NS_ASSUME_NONNULL_END
