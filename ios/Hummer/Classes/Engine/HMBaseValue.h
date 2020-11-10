//
//  HMBaseValue.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/3.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMBaseExecutor.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * 创建 HMBaseValue 的时候，必须保证传入的 JSValueRef uint64_t 有效，单线程情况下 JSValueRef 一定有效，Hermes 则需要使用 Handle
 */
@interface HMBaseValue : NSObject

@property (nonatomic, nullable, weak) HMBaseExecutor *executor;

- (instancetype)init NS_UNAVAILABLE;

- (instancetype)initWithExecutor:(HMBaseExecutor *)executor NS_DESIGNATED_INITIALIZER;

- (nullable NSString *)toString;

- (nullable NSNumber *)toNumber;

- (BOOL)toBool DEPRECATED_MSG_ATTRIBUTE("废弃接口，使用 toNumber");

- (nullable NSArray<id> *)toArray;

- (nullable NSDictionary<NSString *, id> *)toDictionary;

- (nullable NSObject *)toNativeObject;

- (nullable NSObject *)hm_toObjCObject DEPRECATED_MSG_ATTRIBUTE("废弃接口，使用 toNativeObject");

- (nullable id)toObject;

- (nullable HMClosureType)toClosure;

- (BOOL)isNull DEPRECATED_MSG_ATTRIBUTE("废弃接口，使用 isNullOrUndefined");

- (BOOL)isUndefined DEPRECATED_MSG_ATTRIBUTE("废弃接口，使用 isNullOrUndefined");

- (BOOL)isNullOrUndefined;

- (BOOL)isBoolean;

- (BOOL)isNumber;

- (BOOL)isString;

- (BOOL)isArray;

- (BOOL)isNativeObject DEPRECATED_MSG_ATTRIBUTE("废弃接口，建议使用 toNativeObject，然后判空");

- (BOOL)isDictionary DEPRECATED_MSG_ATTRIBUTE("废弃接口，建议使用 toDictionary，然后判空");

- (BOOL)isEqualToValue:(nullable HMBaseValue *)value;

- (nullable HMBaseStrongValue *)callWithFunctionName:(NSString *)functionName arguments:(NSArray *)arguments;

- (BOOL)setValue:(nullable id)value forProperty:(NSString *)property;

@end

NS_ASSUME_NONNULL_END
