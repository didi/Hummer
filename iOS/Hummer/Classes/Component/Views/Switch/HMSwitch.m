//
//  HMSwitch.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMSwitch.h"
#import "HMExportManager.h"
#import "HMAttrManager.h"
#import "HMConverter.h"
#import "NSObject+Hummer.h"
#import "HMUtility.h"
#import "UIView+HMEvent.h"
#import "HMSwitchEvent.h"
#import "HMBaseValue.h"
#import <Hummer/UIView+HMInspector.h>

@interface HMSwitch ()<HMViewInspectorDescription>

@end
@implementation HMSwitch

HM_EXPORT_CLASS(Switch, HMSwitch)

HM_EXPORT_PROPERTY(checked, __isOn, __setOn:)

HM_EXPORT_ATTRIBUTE(onColor, onTintColor, HMStringToColor:)
HM_EXPORT_ATTRIBUTE(offColor, backgroundColor, HMStringToColor:)
HM_EXPORT_ATTRIBUTE(thumbColor, thumbTintColor, HMStringToColor:)

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.layer.cornerRadius = 16.0;
    }
    return self;
}

- (void)setBackgroundColor:(UIColor *)backgroundColor {
    [super setBackgroundColor:backgroundColor];
}

- (void)switchDidChanged {

    NSDictionary *dict = @{kHMSwitchType:@"switch",kHMSwitchState:@(self.isOn),@"timestamp":@(floor(NSDate.date.timeIntervalSince1970) * 1000)};
    [self hm_notifyWithEventName:HMSwitchEventName argument:dict];
}

#pragma mark - Export Property

- (BOOL)__isOn {
    return self.isOn;
}

- (void)__setOn:(HMBaseValue *)on {
    NSNumber *num_on = [on toNumber];
    if (!num_on) {
        return;
    }
    BOOL newValue = [num_on boolValue];
    if (newValue == self.isOn) {
        return;
    }
    self.on = newValue;
    [self switchDidChanged];
}

- (void)hm_addEvent:(HMBaseValue *)eventName withListener:(HMBaseValue *)listener {
    if(!eventName || !listener) return;
    
    NSString *nameStr = [eventName toString];
    if([nameStr isEqualToString:HMSwitchEventName]){
        [self addTarget:self
                 action:@selector(switchDidChanged)
       forControlEvents:UIControlEventValueChanged];
    }
    
    [super hm_addEvent:eventName withListener:listener];
}

- (void)hm_removeEvent:(HMBaseValue *)eventName withListener:(HMBaseValue *)listener {
    if(!eventName || !listener) return;
    
    NSString *nameStr = [eventName toString];
    if([nameStr isEqualToString:HMSwitchEventName]){
        [self removeTarget:self
                    action:@selector(switchDidChanged)
          forControlEvents:UIControlEventValueChanged];
    }
    [super hm_removeEvent:eventName withListener:listener];
}

#pragma mark - <HMDescription>
- (NSString *)hm_content {
    
    return self.isOn ? @"YES" : @"NO";
}

- (nullable NSArray<id<HMViewInspectorDescription>> *)hm_displayJsChildren {
    
    return nil;
}
@end
