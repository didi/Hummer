//
//  HMTimer.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMTimer.h"

@interface HMTimer ()

@property (nonatomic, strong, nullable) dispatch_source_t timer;

@property (nonatomic, assign) BOOL isClearedTimeout;

@end

@implementation HMTimer

HM_EXPORT_CLASS(Timer, HMTimer)

HM_EXPORT_METHOD(setInterval, setCallback:interval:)
HM_EXPORT_METHOD(clearInterval, clearInterval)
HM_EXPORT_METHOD(setTimeout, setCallback:timeout:)
HM_EXPORT_METHOD(clearTimeout, clearTimeout)

- (void)dealloc {
    [self clearInterval];
}

- (void)setCallback:(HMFunctionType)callback interval:(NSTimeInterval)interval {
    [self clearInterval];

    if (!callback) {
        return;
    }
    
    self.timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, dispatch_get_main_queue());
    int64_t intervalNanoseconds = interval * NSEC_PER_MSEC;
    dispatch_source_set_timer(self.timer, dispatch_time(DISPATCH_TIME_NOW, intervalNanoseconds), intervalNanoseconds, 0);
    
    __weak typeof(self) weakSelf = self;
    dispatch_source_set_event_handler(self.timer, ^() {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (weakSelf && callback) {
                callback(nil);
            }
        });
    });
    dispatch_resume(self.timer);
}

#pragma mark - Export Method

- (void)clearInterval {
    if (self.timer) {
        dispatch_source_cancel(self.timer);
        self.timer = nil;
    }
}

- (void)setCallback:(HMFunctionType)callback timeout:(NSTimeInterval)interval  {
    if (!callback) {
        return;
    }
    
    self.isClearedTimeout = NO;
    
    __weak typeof(self) weakSelf = self;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(interval * NSEC_PER_MSEC)), dispatch_get_main_queue(), ^{
        if (weakSelf && !weakSelf.isClearedTimeout && callback) {
            callback(nil);
        }
    });
}

- (void)clearTimeout {
    self.isClearedTimeout = YES;
}

@end
