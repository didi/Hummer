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
#import "HMBaseValue.h"
#import "UIView+HMRenderObject.h"

@implementation UIView(Hummer)

HM_EXPORT_CLASS(View, UIView)

- (instancetype)initWithHMValues:(NSArray<__kindof HMBaseValue *> *)values {
    self = [self init];
//    self = [self initWithFrame:CGRectMake(50, 50, 200, 200)];
    if (self) {
//        self.backgroundColor = UIColor.redColor;
        self.viewID = values.count > 0 ? [values[0] toString] : nil;
        [[HMAttrManager sharedManager] loadViewAttrForClass:[self class]];
        self.userInteractionEnabled = YES;
        self.isHmLayoutEnabled = YES;
    }
    return self;
}

@end
