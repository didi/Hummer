//
//  HMJSCWeakValue.h
//  Hummer
//
//  Created by 唐佳诚 on 2021/1/13.
//

#import <Hummer/HMBaseValue.h>
#import <Hummer/HMBaseWeakValueProtocol.h>

@class HMJSCStrongValue;

NS_ASSUME_NONNULL_BEGIN

@interface HMJSCWeakValue : NSObject <HMBaseWeakValueProtocol>

@property (readonly, strong, nullable, nonatomic) HMBaseValue *value;

- (instancetype)init NS_UNAVAILABLE;

- (nullable instancetype)initWithValue:(nullable HMBaseValue *)value NS_DESIGNATED_INITIALIZER;

@end

NS_ASSUME_NONNULL_END
