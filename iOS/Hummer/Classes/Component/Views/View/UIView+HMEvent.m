//
//  UIView+HMEvent.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "UIView+HMEvent.h"
#import <objc/runtime.h>
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "HMUtility.h"
#import "HMJSGlobal.h"
#import "HMBaseValue.h"
#import <Hummer/HMConfigEntryManager.h>
#import <Hummer/HMEventTrackManager.h>
#import "HMEventHandler.h"

@implementation UIView(HMEvent)

HM_EXPORT_METHOD(addEventListener, hm_addEvent:withListener:)
HM_EXPORT_METHOD(removeEventListener, hm_removeEvent:withListener:)

- (HMEventHandler *)hm_eventHandler {
    HMEventHandler *eventHandler = objc_getAssociatedObject(self, _cmd);
    if(eventHandler == nil){
        eventHandler = [[HMEventHandler alloc] initWithView:self];
        objc_setAssociatedObject(self, _cmd, eventHandler, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }
    return eventHandler;
}

- (void)hm_notifyWithEventName:(NSString *)eventName params:(NSDictionary *)params {
    if(eventName == nil||eventName.length == 0){
        return;
    }
    [self.hm_eventHandler fireEvent:eventName withParams:params];
}

#pragma mark - Export Method

- (void)hm_addEvent:(HMBaseValue *)eventName withListener:(HMBaseValue *)listener {
    
    if (!eventName || !listener) return;
    [self.hm_eventHandler addJSEvent:eventName withListener:listener];
}

- (void)hm_removeEvent:(HMBaseValue *)eventName withListener:(HMBaseValue *)listener {
    if (!eventName) return;
    [self.hm_eventHandler removeJSEvent:eventName withListener:listener];
}

@end
