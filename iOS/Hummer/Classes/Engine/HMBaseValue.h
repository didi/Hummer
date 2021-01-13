//
//  HMBaseValue.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/3.
//

#import <Hummer/HMBaseExecutorProtocol.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMBaseValueProtocol <NSObject>

@required

@property (nonatomic, weak, readonly, nullable) id <HMBaseExecutorProtocol> executor;

#pragma mark - 类型判断

/// isUndefined 和 isNull 实际上是一样的，因为原生不需要区分
@property (nonatomic, assign, readonly) BOOL isUndefined;

@property (nonatomic, assign, readonly) BOOL isNull;

@property (nonatomic, assign, readonly) BOOL isBoolean;

/// 布尔类型不是数字
@property (nonatomic, assign, readonly) BOOL isNumber;

/// new String() 是对象不是标量
@property (nonatomic, assign, readonly) BOOL isString;

@property (nonatomic, assign, readonly) BOOL isObject DEPRECATED_MSG_ATTRIBUTE("兼容 JavaScriptCore 需要，废弃接口，单纯判断是否为 JavaScriptCore 对象");

/**
 * 包括 Proxy 代理的 Array
 */
@property (nonatomic, assign, readonly) BOOL isArray;

#pragma mark - 新加类型判断方法

/// 是否为字典
@property (nonatomic, assign, readonly) BOOL isDictionary DEPRECATED_MSG_ATTRIBUTE("兼容 JavaScriptCore 需要，废弃接口，单纯判断是否为 JavaScriptCore 对象");

@property (nonatomic, assign, readonly) BOOL isNativeObject;

@property (nonatomic, assign, readonly) BOOL isFunction;

@property (nonatomic, assign, readonly) BOOL hm_isArray DEPRECATED_MSG_ATTRIBUTE("兼容，替换为 isArray");

#pragma mark - 构造方法

- (nullable instancetype)initWithExecutor:(nullable id <HMBaseExecutorProtocol>)executor;

+ (nullable id <HMBaseValueProtocol>)valueWithObject:(nullable id)value inContext:(nullable id <HMBaseExecutorProtocol>)context;

+ (nullable id <HMBaseValueProtocol>)valueWithBool:(BOOL)value inContext:(nullable id <HMBaseExecutorProtocol>)context;

+ (nullable id <HMBaseValueProtocol>)valueWithDouble:(double)value inContext:(nullable id <HMBaseExecutorProtocol>)context;

+ (nullable id <HMBaseValueProtocol>)valueWithInt32:(int32_t)value inContext:(nullable id <HMBaseExecutorProtocol>)context;

+ (nullable id <HMBaseValueProtocol>)valueWithUInt32:(uint32_t)value inContext:(nullable id <HMBaseExecutorProtocol>)context;

+ (nullable id <HMBaseValueProtocol>)valueWithNullInContext:(nullable id <HMBaseExecutorProtocol>)context DEPRECATED_MSG_ATTRIBUTE("兼容 JavaScriptCore 需要，业务方不存在需求，废弃接口，空实现");

+ (nullable id <HMBaseValueProtocol>)valueWithUndefinedInContext:(nullable id <HMBaseExecutorProtocol>)context DEPRECATED_MSG_ATTRIBUTE("兼容 JavaScriptCore 需要，业务方不存在需求，废弃接口，空实现");

#pragma mark - 转换方法

/// 转换为实际类型
/// 存在 BREAKING CHANGE
/// 业务方需要注意一下，JavaScriptCore toObject 方法会将原生对象转换为字典，而这个方法会正确转换出原生对象
/// 主要是因为 Hermes 引擎无法模拟 JavaScriptCore 的 toObject 转换逻辑
- (nullable id)toObject;

/// 本质上下面 4 个方法都是先转 NSNumber 再转换为标量，因此需要注意 nil 情况
- (BOOL)toBool;

- (double)toDouble;

- (int32_t)toInt32;

- (uint32_t)toUInt32;

- (nullable NSNumber *)toNumber;

- (nullable NSString *)toString;

/**
 * 包括 Proxy 代理的 Array
 */
- (nullable NSArray *)toArray;

#pragma mark - 新增转换方法

- (nullable NSArray *)hm_toObjcArray DEPRECATED_MSG_ATTRIBUTE("兼容老接口，替换为 - toArray");

- (nullable NSDictionary<NSString *, id> *)toDictionary;

/// 不包括原生对象和闭包
/// 1. 字符串
/// 2. 数字
/// 3. 数组
/// 4. 字典
- (nullable id)toPortableObject;

- (nullable NSDictionary<NSString *, NSObject *> *)toPortableDictionary;

- (nullable NSArray<NSObject *> *)toPortableArray;

- (nullable NSObject *)toNativeObject;

- (nullable id)hm_toObjCObject DEPRECATED_MSG_ATTRIBUTE("兼容老接口，替换为 - toNativeObject + - toObject");

- (nullable HMFunctionType)toFunction;

#pragma mark - Misc

/// JavaScript ===
/// @param value 值
- (BOOL)isEqualToObject:(nullable id <HMBaseValueProtocol>)value;

/// 纯函数
- (nullable id <HMBaseValueProtocol>)callWithArguments:(nullable NSArray *)arguments;

/// 包含 this 指针
- (nullable id <HMBaseValueProtocol>)invokeMethod:(NSString *)method withArguments:(nullable NSArray *)arguments;

/**
 * 先支持字符串，后支持 id<HMBaseValueProtocol>
 */
- (nullable id <HMBaseValueProtocol>)objectForKeyedSubscript:(id)key;

- (void)setObject:(nullable id)object forKeyedSubscript:(id)key;

@optional

/**
 * 暂时不实现
 */
- (nullable id <HMBaseValueProtocol>)objectAtIndexedSubscript:(NSUInteger)index;

- (void)setObject:(nullable id)object atIndexedSubscript:(NSUInteger)index;

@end

@interface HMBaseValue : NSObject <HMBaseValueProtocol>

@property (nonatomic, weak, readonly, nullable) id <HMBaseExecutorProtocol> executor;

// 不能用可失败构造函数重载非可失败构造函数
- (instancetype)init NS_UNAVAILABLE;

- (nullable instancetype)initWithExecutor:(nullable id <HMBaseExecutorProtocol>)executor NS_DESIGNATED_INITIALIZER;

@end

NS_ASSUME_NONNULL_END
