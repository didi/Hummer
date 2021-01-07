//
//  HMTimer.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMTimer.h"

@interface HMTimer ()

@property (nonatomic, strong) dispatch_source_t timer;
@property (nonatomic, assign) BOOL isClearTimeout;

@end

@implementation HMTimer

HM_EXPORT_CLASS(Timer, HMTimer)

HM_EXPORT_METHOD(setInterval, setCallback:interval:)
HM_EXPORT_METHOD(clearInterval, clearInterval)
HM_EXPORT_METHOD(setTimeout, setCallback:timeout:)
HM_EXPORT_METHOD(clearTimeout, clearTimeout)

- (void)dealloc {
    if (self.timer) { dispatch_source_cancel(self.timer); self.timer = nil;}
}

- (void)setCallback:(HMFuncCallback)callback interval:(NSTimeInterval)interval {
    
    if (!callback) { return; }
    
    [self clearInterval];
    
    self.timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER,
                                        0,
                                        0,
                                        dispatch_get_main_queue());
    uint64_t intervalNanoseconds = interval*1000*1000;
    dispatch_time_t start = dispatch_walltime(DISPATCH_TIME_NOW, intervalNanoseconds);
    dispatch_source_set_timer(self.timer, start, intervalNanoseconds, 0);
    
    __weak typeof(self)weakSelf = self;
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
    if (self.timer) { dispatch_source_cancel(self.timer); self.timer = nil;}
}

- (void)setCallback:(HMFuncCallback)callback timeout:(NSTimeInterval)interval  {
    
    if (!callback) { return; }
    
    self.isClearTimeout = NO;
    __weak typeof(self)weakSelf = self;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(interval/1000.f * NSEC_PER_SEC)),
                   dispatch_get_main_queue(),
                   ^{
        if (weakSelf && !weakSelf.isClearTimeout && callback) { callback(nil); }
    });
}

- (void)clearTimeout {
    self.isClearTimeout = YES;
}

@end
