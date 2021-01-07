//
//  HMConfig.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMConfig.h"

@implementation HMConfig

static HMConfig *__globalConfig;

+ (instancetype)sharedInstance {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        __globalConfig = [[HMConfig alloc] init];
        __globalConfig.scale = 1;
        __globalConfig.pixel = 750;
    });
    return __globalConfig;
}

- (void)addResourcePath:(NSString *)resourcePath {
    NSMutableArray * list = [NSMutableArray arrayWithArray:(self.resourcePathList?:@[])];
    [list addObject:resourcePath];
    self.resourcePathList = list.copy;
}

@end
