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
#import "JSValue+Hummer.h"
#import "NSObject+Hummer.h"
#import "HMUtility.h"
#import "UIView+HMEvent.h"
#import "HMSwitchEvent.h"

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
    JSValue *value = [JSValue hm_valueWithClass:[HMSwitchEvent class] inContext:self.hmContext];
    NSDictionary *dict = @{kHMSwitchType:@"switch",kHMSwitchState:@(self.isOn)};
    [self hm_notifyEvent:HMSwitchEventName withValue:value withArgument:dict];
}

#pragma mark - Export Property

- (JSValue *)__isOn {
    return [JSValue valueWithBool:self.isOn inContext:self.hmContext];
}

- (void)__setOn:(JSValue *)on {
    if (!on || on.isNull) {
        return;
    }
    BOOL newValue = on.toBool;
    if (newValue == self.isOn) {
        return;
    }
    self.on = newValue;
    [self switchDidChanged];
}

- (void)hm_addEvent:(JSValue *)eventName withListener:(JSValue *)listener {
    if(!eventName || !listener) return;
    
    NSString *nameStr = [eventName toString];
    if([nameStr isEqualToString:HMSwitchEventName]){
        [self addTarget:self
                 action:@selector(switchDidChanged)
       forControlEvents:UIControlEventValueChanged];
    }
    
    [super hm_addEvent:eventName withListener:listener];
}

- (void)hm_removeEvent:(JSValue *)eventName withListener:(JSValue *)listener {
    if(!eventName || !listener) return;
    
    NSString *nameStr = [eventName toString];
    if([nameStr isEqualToString:HMSwitchEventName]){
        [self removeTarget:self
                    action:@selector(switchDidChanged)
          forControlEvents:UIControlEventValueChanged];
    }
    [super hm_removeEvent:eventName withListener:listener];
}

@end
