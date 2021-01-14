//
//  HMBaseWeakValueProtocol.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/3.
//

#import <Foundation/Foundation.h>

@class HMBaseValue;

NS_ASSUME_NONNULL_BEGIN

@protocol HMBaseWeakValueProtocol

@required

@property (readonly, strong, nullable, nonatomic) HMBaseValue *value;

- (nullable instancetype)initWithValue:(nullable HMBaseValue *)value;

@end

NS_ASSUME_NONNULL_END
