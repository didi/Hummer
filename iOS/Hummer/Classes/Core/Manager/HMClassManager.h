//
//  HMClassManager.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

@class HMJSClass;

@interface HMClassManager : NSObject

+ (instancetype)defaultManager;

- (instancetype)init NS_UNAVAILABLE;

- (HMJSClass *)createJSClass:(NSString *)className;

@end
