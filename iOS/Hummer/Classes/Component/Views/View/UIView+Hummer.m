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

@implementation UIView(Hummer)

HM_EXPORT_CLASS(View, UIView)

- (instancetype)initWithHMValues:(NSArray *)values {
    self = [self init];
    if (self) {
        self.viewID = values.count > 0 ? [values[0] toString] : nil;
        [[HMAttrManager sharedManager] loadViewAttrForClass:[self class]];
        self.userInteractionEnabled = YES;
        [self hm_configureLayoutWithBlock:nil];

    }
    return self;
}

@end
