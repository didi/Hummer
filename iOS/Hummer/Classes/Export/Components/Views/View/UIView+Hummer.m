//
//  UIView+Hummer.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "UIView+Hummer.h"
#import <objc/runtime.h>
#import "HMAttrManager.h"
#import "HMExportManager.h"
#import "UIView+HMDom.h"
#import "UIView+HMRenderObject.h"

#import <Hummer/NSObject+HMDescription.h>

@implementation UIView(Hummer)

HM_EXPORT_CLASS(View, UIView)

static long long __hummer_object_id = 0;
- (instancetype)initWithHMValues:(NSArray *)values {
    self = [self init];
    if (self) {
        self.viewID = values.count > 0 ? [values[0] toString] : nil;
        self.hummerId = @(__hummer_object_id++);
        [[HMAttrManager sharedManager] loadViewAttrForClass:[self class]];
        self.userInteractionEnabled = YES;
        [self hm_configureLayoutWithBlock:nil];

    }
    return self;
}

@end
