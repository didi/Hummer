//
//  UIView+HMEventTrigger.m
//  AFDownloadRequestOperation
//
//  Created by didi on 2020/8/17.
//

#import "UIView+HMEventTrigger.h"
#import "UIView+HMDom.h"
#import "HMUtility.h"
#import "HMEventTrackManager.h"
#import "UIView+HMEvent.h"


@implementation UIView (HMEventTrigger)
+ (void)load {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wundeclared-selector"
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        hm_method_swizzling(UIView.class, @selector(hm_onEventGesture:), @selector(hm_trigger_onEventGesture:));
    });
#pragma clang diagnostic pop
}

- (void)hm_trigger_onEventGesture:(UIGestureRecognizer *)gesture {
    
    if (gesture.hm_eventName) {
        [HMEventTrackManager trackWithGesture:gesture];
    }
    [self hm_trigger_onEventGesture:gesture];
}

@end
