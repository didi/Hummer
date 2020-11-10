//
//  HMAnimationConverter.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <QuartzCore/QuartzCore.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMAnimationConverter : NSObject

+ (NSString * _Nullable)convertAnimationKeyPath:(NSString *)value;
+ (id _Nullable)convertAnimationValue:(id)value keyPath:(NSString *)keyPath;
+ (CAMediaTimingFunction * _Nullable)convertMediaTimingFunction:(NSString *)timingFunctionName;

@end

NS_ASSUME_NONNULL_END
