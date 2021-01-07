//
//  HMTimer.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HMExportManager.h"


@interface HMTimer : NSObject

- (void)setCallback:(HMFuncCallback)callback interval:(NSTimeInterval)interval;

- (void)clearInterval;

- (void)setCallback:(HMFuncCallback)callback timeout:(NSTimeInterval)interval;

- (void)clearTimeout;

@end
