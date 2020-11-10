//
//  HMJSCWeakValue.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/7/21.
//

#import <Hummer/HMBaseWeakValue.h>
#import <Hummer/HMJSCValue.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMJSCWeakValue : HMBaseWeakValue <HMJSCValue>

- (instancetype)initWithExecutor:(HMBaseExecutor *)executor NS_UNAVAILABLE;;

- (nullable instancetype)initWithValueRef:(JSValueRef)valueRef executor:(HMBaseExecutor *)executor NS_DESIGNATED_INITIALIZER;

@end

NS_ASSUME_NONNULL_END
