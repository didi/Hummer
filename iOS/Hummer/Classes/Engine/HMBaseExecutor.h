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
typedef id _Nullable (^HMClosureType)(NSArray *_Nullable value);

// 兼容类型
typedef HMClosureType HMFuncCallback;

@class HMExceptionModel;

@protocol HMBaseExecutorProtocol

@required

@property (nonatomic, nullable, copy) NSString *name;

@property (nonatomic, readonly, strong) id <HMBaseValueProtocol> globalObject;

@property (nonatomic, copy, nullable) void (^exceptionHandler)(HMExceptionModel *exception);

+ (nullable id <HMBaseExecutorProtocol>)currentContext;

+ (nullable NSArray<id <HMBaseValueProtocol>> *)currentArguments;

- (nullable id <HMBaseValueProtocol>)evaluateScript:(nullable NSString *)script withSourceURL:(nullable NSURL *)sourceURL;

/// 使用下标获取属性
/// @param key 可以为 HMBaseValue，也可以为字符串，当前只支持字符串，如果支持 Number 等，改成 id<NSCopying>
- (nullable id <HMBaseValueProtocol>)objectForKeyedSubscript:(id)key;

- (void)setObject:(nullable id)object forKeyedSubscript:(id)key;

@optional

/**
 * 下面两个先不实现，暂时不满足
 */
- (nullable id <HMBaseValueProtocol>)objectAtIndexedSubscript:(NSUInteger)idx;

- (void)setObject:(nullable id)obj atIndexedSubscript:(NSUInteger)idx;

@end

@interface HMBaseExecutor : NSObject <HMBaseExecutorProtocol>

@property (nonatomic, copy, nullable) void (^exceptionHandler)(HMExceptionModel *exception);

@end

NS_ASSUME_NONNULL_END
