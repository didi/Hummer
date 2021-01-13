//
//  HMJSCStrongValue.h
//  Hummer
//
//  Created by 唐佳诚 on 2021/1/13.
//

#import <Hummer/HMBaseValue.h>
#import <Hummer/HMJSCValue.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMJSCStrongValue : HMBaseValue <HMJSCValue>

- (nullable instancetype)initWithValueRef:(nullable JSValueRef)valueRef executor:(nullable id <HMBaseExecutorProtocol>)executor NS_DESIGNATED_INITIALIZER;

@end

NS_ASSUME_NONNULL_END
