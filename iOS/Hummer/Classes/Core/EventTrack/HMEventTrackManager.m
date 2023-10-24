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
#import "HMEventDefines.h"


@implementation HMEventTrackManager

static dispatch_queue_t trackHandleQueue;
+ (void)initialize {
    
    if (!trackHandleQueue) {
        
        trackHandleQueue = dispatch_queue_create("hummer.track.thread", DISPATCH_QUEUE_SERIAL);
    }
}
+ (void)trackWithEventName:(NSString *)eventName view:(UIView *)view params:(NSDictionary *)params namespace:(NSString *)namespace {
    id<HMEventTrackViewProperty> _view = (id<HMEventTrackViewProperty>)view;
    if (_view && eventName) {
        @try {
            NSArray *trackList = @[HMTapEventName,HMLongPressEventName];
                
            if ([trackList containsObject:eventName]) {
                
                NSMutableDictionary *dic = [HMEventTrackUtils propertiesWithTrackObject:_view];
                [dic setValue:eventName forKey:HM_EVENT_PROPERTY_TYPE];
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
