//
//  HMEventTrackManager.m
//  AFDownloadRequestOperation
//
//  Created by didi on 2020/8/13.
//

#import "HMEventTrackManager.h"
#import "HMEventTrackUtils.h"
#import "HMInterceptor.h"
#import "UIView+HMDom.h"
#import "UIView+HMEvent.h"
#import <Hummer/HMConfigEntryManager.h>


@implementation HMEventTrackManager

static dispatch_queue_t trackHandleQueue;
+ (void)initialize {
    
    if (!trackHandleQueue) {
        
        trackHandleQueue = dispatch_queue_create("hummer.track.thread", DISPATCH_QUEUE_SERIAL);
    }
}
+ (void)trackWithGesture:(UIGestureRecognizer *)gesture namespace:(NSString *)namespace {

    id<HMEventTrackViewProperty> view = (id<HMEventTrackViewProperty>)gesture.view;
    if (view && gesture.hm_eventName) {
        @try {
            NSArray *trackList = @[HMTapEventName,HMLongPressEventName];
                
            if ([trackList containsObject:gesture.hm_eventName]) {
                
                NSMutableDictionary *dic = [HMEventTrackUtils propertiesWithTrackObject:view];
                [dic setValue:gesture.hm_eventName forKey:HM_EVENT_PROPERTY_TYPE];
                [dic setValue:[NSNumber numberWithLongLong:[HMEventTrackUtils getCurrentTime]] forKey:HM_EVENT_PROPERTY_TIMESTAMP];
                dispatch_async(trackHandleQueue, ^{
                    [HMEventTrackInterceptor asyncHandleTrackEvent:dic namespace:namespace];
                });
            }
        } @catch (NSException *exception) {
            
        }
    }
}

@end
