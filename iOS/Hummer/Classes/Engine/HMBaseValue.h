//
//  HMBaseValue.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/3.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMBaseValueProtocol

@required

@property (nonatomic, weak, readonly, nullable) id <HMBaseValueProtocol> executor;

@property (nonatomic, assign, readonly) BOOL isUndefined;

@property (nonatomic, assign, readonly) BOOL isNull;

@property (nonatomic, assign, readonly) BOOL isBoolean;

@property (nonatomic, assign, readonly) BOOL isNumber;

@property (nonatomic, assign, readonly) BOOL isString;

@property (nonatomic, assign, readonly) BOOL isObject;

/**
 * 包括 Proxy 代理的 Array
 */
@property (nonatomic, assign, readonly) BOOL isArray;

- (nullable instancetype)initWithExecutor:(nullable id <HMBaseValueProtocol>)executor;

+ (nullable id <HMBaseValueProtocol>)valueWithObject:(id)value inContext:(id <HMBaseValueProtocol>)context;

+ (nullable id <HMBaseValueProtocol>)valueWithBool:(BOOL)value inContext:(id <HMBaseValueProtocol>)context;

+ (nullable id <HMBaseValueProtocol>)valueWithDouble:(double)value inContext:(id <HMBaseValueProtocol>)context;

+ (nullable id <HMBaseValueProtocol>)valueWithInt32:(int32_t)value inContext:(id <HMBaseValueProtocol>)context;

+ (nullable id <HMBaseValueProtocol>)valueWithUInt32:(uint32_t)value inContext:(id <HMBaseValueProtocol>)context;

+ (nullable id <HMBaseValueProtocol>)valueWithNullInContext:(id <HMBaseValueProtocol>)context;

+ (nullable id <HMBaseValueProtocol>)valueWithUndefinedInContext:(id <HMBaseValueProtocol>)context;

- (nullable id)toObject;

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

- (nullable NSDictionary *)toDictionary;

/**
 * 同时实现 - isEqual:
 */
- (BOOL)isEqualToObject:(nullable id <HMBaseValueProtocol>)value;

- (nullable id <HMBaseValueProtocol>)callWithArguments:(nullable NSArray *)arguments;

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

@property (nonatomic, weak, readonly, nullable) id <HMBaseValueProtocol> executor;

- (nullable instancetype)init;

- (nullable instancetype)initWithExecutor:(nullable id <HMBaseValueProtocol>)executor NS_DESIGNATED_INITIALIZER;

@end

NS_ASSUME_NONNULL_END
