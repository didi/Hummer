//
//  HMToast.m
//  Pods
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMToast.h"
#import "HMExportManager.h"
#import "UIView+HMToast.h"
#import "HMBaseValue.h"

@implementation HMToast

#pragma mark - Export

HM_EXPORT_CLASS(Toast, HMToast)

HM_EXPORT_CLASS_METHOD(show, __showWithText:duration:)

HM_EXPORT_CLASS_METHOD(custom, __showWithView:duration:)

+ (void)__showWithText:(HMBaseValue *)jsText duration:(HMBaseValue *)jsTime
{
    NSString *text = jsText.toString ? jsText.toString : @"";
    NSInteger time = jsTime.toNumber ? [jsTime.toNumber integerValue] : 2000;
    CGFloat duration = time / 1000;
    [[UIApplication sharedApplication].keyWindow hm_showToastWithText:text duration:duration];
}

+ (void)__showWithView:(HMBaseValue *)jsView duration:(HMBaseValue *)jsTime
{
    UIView *view = (UIView *)jsView.toNativeObject;
    if (!view) {
        return;
    }
    NSInteger time = jsTime.toNumber ? [jsTime.toNumber integerValue] : 2000;
    CGFloat duration = time / 1000;
    [[UIApplication sharedApplication].keyWindow hm_showToastWithView:view duration:duration];
}

@end
