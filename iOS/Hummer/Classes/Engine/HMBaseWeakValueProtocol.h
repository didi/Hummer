//
//  HMBaseWeakValueProtocol.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/3.
//

#import <Foundation/Foundation.h>

@class HMBaseValue;

NS_ASSUME_NONNULL_BEGIN

@protocol HMBaseWeakValueProtocol <NSObject>

@required

@property (readonly, strong, nullable, nonatomic) HMBaseValue *value;

@end

NS_ASSUME_NONNULL_END
