//
//  UIView+HMToast.m
//  Pods
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "UIView+HMToast.h"
#import <objc/runtime.h>

static char hm_toastViewKey;

@implementation UIView (HMToast)

#pragma mark - getter & setter

- (HMToastView *)hm_toastView
{
    return objc_getAssociatedObject(self, &hm_toastViewKey);
}

- (void)hm_setToastView:(HMToastView *)toastView
{
    objc_setAssociatedObject(self, &hm_toastViewKey, toastView, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

#pragma mark -

- (HMToastView *)hm_checkCreateToast
{
    if ([self hm_toastView]) {
        return [self hm_toastView];
    }
    
    HMToastView *toast = [[HMToastView alloc] initWithView:self];
    toast.delegate = self;
    toast.userInteractionEnabled = YES;
    [self addSubview:toast];
    [self bringSubviewToFront:toast];
    
    [self hm_setToastView:toast];
    return toast;
}

- (HMToastView *)hm_showToastWithText:(NSString *)text duration:(NSTimeInterval)duration
{
    if (text.length == 0) {
        return nil;
    }
    
    HMToastView *toast = [self hm_checkCreateToast];
    
    [toast updateWithText:text];
    
    [self showToast:toast duration:duration];
    
    return toast;
}

- (HMToastView *)hm_showToastWithView:(UIView *)view duration:(NSTimeInterval)duration
{
    if (!view) {
        return nil;
    }
    
    HMToastView *toast = [self hm_checkCreateToast];
    
    [toast updateWithView:view];
    
    [self showToast:toast duration:duration];
    
    return toast;
}

- (void)hm_hideToast:(BOOL)animated
{
    [[self hm_toastView] hide:animated];
}

#pragma mark - HMToastViewDelegate

- (void)hm_didToastViewHide
{
    if ([self hm_toastView]) {
        [[self hm_toastView] removeFromSuperview];
        [self hm_toastView].delegate = nil;
        [self hm_setToastView:nil];
    }
}

// MARK: - helper

- (void)showToast:(HMToastView *)toast duration:(NSTimeInterval)duration
{
    CGFloat safeAreaBottom = 0.0;
    if (@available(iOS 11.0,*)) {
        safeAreaBottom = [[[UIApplication sharedApplication] delegate] window].safeAreaInsets.bottom > 0.0 ? 34.0 : 0.0;
    }
    CGFloat width = CGRectGetWidth(self.frame);
    CGFloat height = CGRectGetHeight(self.frame);
    CGFloat toastWidth = CGRectGetWidth(toast.frame);
    CGFloat toastHeight = CGRectGetHeight(toast.frame);
    CGFloat toastX = (width - toastWidth) / 2;
    CGFloat toastY = (height - toastHeight - 60 - safeAreaBottom);
    toast.frame = CGRectMake(toastX, toastY, toastWidth, toastHeight);
    
    [toast showWithDuration:duration];
}

@end
