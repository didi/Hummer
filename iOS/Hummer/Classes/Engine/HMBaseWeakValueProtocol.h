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

@property (readonly, strong, nullable, nonatomic) id <HMBaseWeakValueProtocol> value;

+ (id <HMBaseWeakValueProtocol>)managedValueWithValue:(id <HMBaseValueProtocol>)value;

- (instancetype)initWithValue:(id <HMBaseValueProtocol>)value;

@end

NS_ASSUME_NONNULL_END
