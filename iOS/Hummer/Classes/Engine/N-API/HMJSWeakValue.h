//
//  HMJSWeakValue.h
//  Hummer
//
//  Created by 唐佳诚 on 2021/8/9.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMBaseWeakValueProtocol.h>
#import <Hummer/HMJSValue.h>
#import <Hummer/HMJSExecutor+Private.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMJSWeakValue : NSObject <HMBaseWeakValueProtocol, HMJSValue>

@property (nonatomic, weak, readonly) HMJSExecutor *executor;

- (instancetype)init NS_UNAVAILABLE;

- (nullable instancetype)initWithValue:(nullable HMBaseValue *)value NS_DESIGNATED_INITIALIZER;

- (nullable instancetype)initWithValueRef:(nullable NAPIValue)valueRef executor:(nullable HMJSExecutor*)executor NS_DESIGNATED_INITIALIZER;

@end

NS_ASSUME_NONNULL_END
