//
//  HMBaseWeakValue.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/3.
//

#import <Foundation/Foundation.h>

@protocol HMBaseValueProtocol;

NS_ASSUME_NONNULL_BEGIN

@protocol HMBaseWeakValueProtocol

@required

@property (readonly, strong, nullable, nonatomic) id <HMBaseValueProtocol> value;

+ (nullable id <HMBaseWeakValueProtocol>)managedValueWithValue:(nullable id <HMBaseValueProtocol>)value;

- (nullable instancetype)initWithValue:(nullable id <HMBaseValueProtocol>)value;

@end

NS_ASSUME_NONNULL_END
