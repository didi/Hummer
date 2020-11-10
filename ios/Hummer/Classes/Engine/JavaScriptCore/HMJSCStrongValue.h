//
//  HMJSCManagedValue.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/7/7.
//

#import <Hummer/HMBaseStrongValue.h>
#import <Hummer/HMJSCValue.h>

NS_ASSUME_NONNULL_BEGIN
@class HMJSCExecutor;

@interface HMJSCStrongValue : HMBaseStrongValue <HMJSCValue>

- (instancetype)initWithExecutor:(HMBaseExecutor *)executor NS_UNAVAILABLE;

- (nullable instancetype)initWithValueRef:(JSValueRef)valueRef executor:(HMBaseExecutor *)executor NS_DESIGNATED_INITIALIZER;

@end

NS_ASSUME_NONNULL_END
