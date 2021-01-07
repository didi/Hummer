//
//  HMExportMethod.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef NS_ENUM(NSUInteger, HMMethodType) {
    HMInstanceMethod    = 0,
    HMClassMethod       = 1,
};

@interface HMExportMethod : NSObject

@property (nonatomic, strong) NSString *funcName;
@property (nonatomic, assign) HMMethodType methodType;
@property (nonatomic, assign) SEL selector;

@end
