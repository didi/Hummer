//
//  HMYogaConfig.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface HMYogaConfig : NSObject

+ (instancetype)defaulfConfig;

- (NSString *)ygPropertyWithCSSAttr:(NSString *)cssAttr;

- (SEL)converterWithCSSAttr:(NSString *)cssAttr;

- (NSArray *)yogaProperties;

@end
