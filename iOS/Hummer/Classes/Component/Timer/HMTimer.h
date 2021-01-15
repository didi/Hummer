//
//  HMTimer.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HMExportManager.h"
#import <Hummer/HMJSCExecutor.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMTimer : NSObject

- (void)setCallback:(nullable HMFunctionType)callback interval:(NSTimeInterval)interval;

- (void)clearInterval;

- (void)setCallback:(nullable HMFunctionType)callback timeout:(NSTimeInterval)interval;

- (void)clearTimeout;

@end

NS_ASSUME_NONNULL_END
