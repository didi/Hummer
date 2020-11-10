//
//  HMDialog.m
//  Pods
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMDialog.h"
#import "HMExportManager.h"
#import "HMUtility.h"
#import "HMBaseValue.h"
#import "UIView+HMRenderObject.h"

static NSInteger kHMDialogPopoverViewTag = 517212;

@interface HMDialogPopoverView : UIView

NS_ASSUME_NONNULL_BEGIN

@property (nonatomic, nullable, strong) HMBaseValue *viewManagedValue;

NS_ASSUME_NONNULL_END

@property (nonatomic) BOOL shouldDismissPopover;
@property (nonatomic, copy, nullable) dispatch_block_t didDismissPopover;
@property (nonatomic, assign) BOOL isJSContent;

@end

@implementation HMDialogPopoverView

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.backgroundColor = [UIColor colorWithRed:37.0/255.0 green:38.0/255.0 blue:45.0/255.0 alpha:0.4];
        self.tag = kHMDialogPopoverViewTag;
    }
    return self;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    
    if (self.isJSContent) {
        [self hm_applyLayoutPreservingOrigin:YES];
    }
}

- (void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [super touchesEnded:touches withEvent:event];
    
    if (self.shouldDismissPopover) {
        
        [self removeFromSuperview];
        
        if (self.didDismissPopover) {
            self.didDismissPopover();
        }
    }
}

- (void)addJSContentView:(UIView *)view presentingViewController:(UIViewController *)presenting
{
    if (!view) {
        return;
    }
    self.isJSContent = YES;
    self.isHmLayoutEnabled = YES;
    UIWindow *window = presenting.view.window;
    self.frame = CGRectMake(0, 0, window.bounds.size.width, window.bounds.size.height);
    [window addSubview:self];
    
    [self addSubview:view];
    [self hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
        layout.width = HMPointValueMake(window.bounds.size.width);
        layout.height = HMPointValueMake(window.bounds.size.height);
        layout.alignContent = YGAlignCenter;
        layout.alignItems = YGAlignCenter;
        layout.justifyContent = YGJustifyCenter;
    }];
    CGSize size = [view hm_sizeThatFits:CGSizeMake(CGFLOAT_MAX, CGFLOAT_MAX)];
    [self addView:view size:size presentingViewController:presenting];
}

- (void)addContentView:(UIView *)view presentingViewController:(UIViewController *)presenting
{
    if (!view) {
        return;
    }
    self.isJSContent = NO;
    self.isHmLayoutEnabled = NO;
    CGSize size = view.bounds.size;

    [self addView:view size:size presentingViewController:presenting];
}

- (void)addView:(UIView *)view size:(CGSize)size presentingViewController:(UIViewController *)presenting
{
    UIWindow *window = presenting.view.window;
    self.frame = CGRectMake(0, 0, window.bounds.size.width, window.bounds.size.height);
    [window addSubview:self];
    
    
    view.frame = CGRectMake((window.bounds.size.width - size.width) * 0.5,
                            (window.bounds.size.height - size.height) * 0.5,
                            size.width,
                            size.height);
    [self addSubview:view];
    
    [window setNeedsDisplay];
    [window layoutIfNeeded];
}

@end

@implementation HMDialog

#pragma mark - Export

HM_EXPORT_CLASS(Dialog, HMDialog)

HM_EXPORT_METHOD(alert, __alertWithMessage:btnText:callback:)
HM_EXPORT_METHOD(confirm, __confirmWithTitle:message:okBtnText:cancelBtnText:okCallback:cancelCallback:)
HM_EXPORT_METHOD(custom, __customWithView:)
HM_EXPORT_METHOD(dismiss, __dismiss)

HM_EXPORT_PROPERTY(cancelable, __isCancelabled, __setCancelabled:)

- (void)dealloc
{
    NSLog(@"%s", __func__);
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _cancelable = YES;
    }
    return self;
}

// MARK: - properties

- (NSNumber *)__isCancelabled {
    return @(self.isCancelabled);
}

- (void)__setCancelabled:(BOOL)value {
    self.cancelable = value;
    
    if (_popover) {
        _popover.shouldDismissPopover = self.isCancelabled;
    }
}

// MARK: - custom view

static HMDialogPopoverView *_popover;

- (void)customView:(UIView *)view {
    if (!view) {
        return;
    }
    UIViewController *presenting = [HMDialog fix_getCurrentViewController];
    if (!presenting) {
        return;
    }
    if (_popover) {
        [self dismiss];
    }
    UIView *poped = [presenting.view.window viewWithTag:kHMDialogPopoverViewTag];
    if (poped && [poped isKindOfClass:HMDialogPopoverView.class]) {
        _popover = (HMDialogPopoverView *) poped;
        [self dismiss];
    }
    _popover = [[HMDialogPopoverView alloc] init];
    _popover.shouldDismissPopover = self.isCancelabled;
    [_popover addContentView:view presentingViewController:presenting];
}

- (void)__customWithView:(HMBaseValue *)jsView
{
    if (!jsView || [jsView.executor valueIsNullOrUndefined:jsView]) {
        return;
    }
    UIView *view = (UIView *) [jsView.executor convertValueToNativeObject:jsView];
    if (!view || ![view isKindOfClass:UIView.class]) {
        return;
    }
    UIViewController *presenting = [HMDialog fix_getCurrentViewController];
    if (!presenting) {
        return;
    }
    if (_popover) {
        [self dismiss];
    }
    UIView *poped = [presenting.view.window viewWithTag:kHMDialogPopoverViewTag];
    if (poped && [poped isKindOfClass:HMDialogPopoverView.class]) {
        _popover = (HMDialogPopoverView *) poped;
        [self dismiss];
    }
    _popover = [[HMDialogPopoverView alloc] init];
    _popover.shouldDismissPopover = self.isCancelabled;
    if (_popover.viewManagedValue) {
        // 不做内存持有了
        id viewObject = _popover.viewManagedValue.toNativeObject;
        if ([viewObject isKindOfClass:UIView.class]) {
            [((UIView *) viewObject) removeFromSuperview];
        }
        _popover.viewManagedValue = nil;
    }
    _popover.viewManagedValue = jsView;
    [_popover addJSContentView:view presentingViewController:presenting];
}

- (void)__dismiss
{
    if (_popover) {
        [_popover removeFromSuperview];
        _popover = nil;
    } else {
        [self dismissViewControllerAnimated:NO completion:nil];
    }
}

- (void)dismiss
{
    [self __dismiss];
}

// MARK: - Alert

/**
* 显示提示用户的警示框。当警示框出现后，用户需要点击[确定]按钮才能继续进行操作。
*
* @param jsMsg 内容
* @param jsBtnText 按钮内容
* @param callback 按钮点击回调
*/
- (void)__alertWithMessage:(HMBaseValue *)jsMsg btnText:(HMBaseValue *)jsBtnText callback:(HMClosureType)callback
{
    NSString *title = jsMsg.toString ?: @"";
    NSString *btnText = jsBtnText.toString ?: @"确认";
    
    [HMDialog dialogWithTitle:title message:nil showData:@[btnText] dialogType:HMDialogTypeCustomOneSure complement:^(NSInteger index) {
        HMExecOnMainQueue(^{
            HM_SafeRunBlock(callback,@[]);
        });
    }];
}

- (void)__confirmWithTitle:(HMBaseValue *)jsTitle message:(HMBaseValue *)jsMsg okBtnText:(HMBaseValue *)jsOkBtnText cancelBtnText:(HMBaseValue *)jsCancelBtnText okCallback:(HMClosureType)okCallback cancelCallback:(HMClosureType)cancelCallback
{
    NSString *title = jsTitle.toString ?: @"";
    NSString *message = jsMsg.toString ?: nil;
    NSString *okBtnText = jsOkBtnText.toString ?: @"确认";
    NSString *cancelBtnText = jsCancelBtnText.toString ?: @"取消";
    
    [HMDialog dialogWithTitle:title message:message showData:@[okBtnText, cancelBtnText] dialogType:HMDialogTypeCustomDefault complement:^(NSInteger index) {
        HMExecOnMainQueue(^{
            if (index == 0) {
                HM_SafeRunBlock(okCallback,@[]);
            } else if (index == 1) {
                HM_SafeRunBlock(cancelCallback,@[]);
            } else {
                HM_SafeRunBlock(cancelCallback,@[]);
            }
        });
    }];
}

#pragma mark - helper

/**
 *  根据自定义传入的中间弹框选择的数据创建系统弹框的类型 点击选择第几个选项的回调
 *
 *  @pram title      标题
 *  @pram showData   显示的数据
 *  @pram dialogType 弹框类型
 *  @pram complement 点击确认的回调
 */
+ (instancetype)dialogWithTitle:(NSString *)title
                        message:(NSString *)message
                       showData:(NSArray<NSString *> *)showData
                     dialogType:(HMDialogType)dialogType
                     complement:(void(^)(NSInteger index))complement
{
    return [self dialogWithViewController:[self getCurrentViewController] title:title message:message showData:showData dialogType:dialogType complement:complement];
}

+ (instancetype)dialogWithViewController:(UIViewController *)viewController
                                   title:(NSString *)title
                                 message:(NSString *)message
                                showData:(NSArray<NSString *> *)showData
                              dialogType:(HMDialogType)dialogType
                              complement:(void(^)(NSInteger index))complement
{
    HMDialog *dialog = [HMDialog alertControllerWithTitle:title message:message preferredStyle:UIAlertControllerStyleAlert];
    if (showData.count == 1) {
        if (dialogType == HMDialogTypeCustomOneSure) {
            [dialog addAction:[self creatActionWithTitle:showData.firstObject complement:^{
                if (complement) {
                    complement(0);
                }
            }]];
        } else if (dialogType == HMDialogTypeCustomDestructiveCenter) {
            [dialog addAction:[self creatActionWithTitle:showData.firstObject style:UIAlertActionStyleDestructive complement:^{
                if (complement) {
                    complement(0);
                }
            }]];
        }
    } else if (showData.count == 2) {
        if (dialogType == HMDialogTypeCustomDefault) {
            [dialog addAction:[self creatActionWithTitle:showData.firstObject complement:^{
                if (complement) {
                    complement(0);
                }
            }]];
            [dialog addAction:[self creatActionWithTitle:showData.lastObject complement:^{
                if (complement) {
                    complement(1);
                }
            }]];
        } else if (dialogType == HMDialogTypeCustomDestructiveLeft) {
            [dialog addAction:[self creatActionWithTitle:showData.firstObject style:UIAlertActionStyleDestructive complement:^{
                if (complement) {
                    complement(0);
                }
            }]];
            [dialog addAction:[self creatActionWithTitle:showData.lastObject style:UIAlertActionStyleCancel complement:^{
                if (complement) {
                    complement(1);
                }
            }]];
        } else if (dialogType == HMDialogTypeCustomDestructiveRight) {
            [dialog addAction:[self creatActionWithTitle:showData.firstObject style:UIAlertActionStyleCancel complement:^{
                if (complement) {
                    complement(0);
                }
            }]];
            [dialog addAction:[self creatActionWithTitle:showData.lastObject style:UIAlertActionStyleDestructive complement:^{
                if (complement) {
                    complement(1);
                }
            }]];
        }
    }
    [viewController presentViewController:dialog animated:YES completion:nil];
    return dialog;
}

#pragma mark - 创建选项按钮

/**
 *  创建默认的按钮
 *
 *  @pram title        按钮标题
 *  @pram complement   点击确认的回调
 */
+ (UIAlertAction *)creatActionWithTitle:(NSString *)title complement:(void(^)(void))complement
{
    return [self creatActionWithTitle:title style:UIAlertActionStyleDefault complement:complement];
}

/**
 *  创建默认的按钮
 *
 *  @pram title        按钮标题
 *  @pram style        按钮类型
 *  @pram complement   点击确认的回调
 */
+ (UIAlertAction *)creatActionWithTitle:(NSString *)title style:(UIAlertActionStyle)style complement:(void(^)(void))complement
{
    UIAlertAction *action = [UIAlertAction actionWithTitle:title style:style handler:^(UIAlertAction * _Nonnull action) {
        if (complement) {
            complement();
        }
    }];
    return action;
}

#pragma mark - 获取当前窗口的控制器

+ (UIViewController *)fix_getCurrentViewController
{
    UIViewController *ctrl = nil;
    UIApplication *app = [UIApplication sharedApplication];
    if (!ctrl) {
        ctrl = app.keyWindow.rootViewController;
    }
    if (!ctrl) {
        ctrl = [app.windows.firstObject rootViewController];
    }
    if (!ctrl) {
        ctrl = [self viewController];
    }
    if (!ctrl) {
        return nil;
    }
    
    while (ctrl.presentedViewController) {
        ctrl = ctrl.presentedViewController;
    }
    if (!ctrl.view.window) {
        return nil;
    }
    return ctrl;
}

+ (UIViewController *)getCurrentViewController
{
    UIViewController *ctrl = nil;
    UIApplication *app = [UIApplication sharedApplication];
    if (!ctrl) {
        ctrl = app.keyWindow.rootViewController;
    }
    if (!ctrl) {
        ctrl = [app.windows.firstObject rootViewController];
    }
    if (!ctrl) {
        ctrl = [self viewController];
    }
    if (!ctrl) {
        return nil;
    }
    
    while (!ctrl.view.window && ctrl.presentedViewController) {
        ctrl = ctrl.presentedViewController;
    }
    if (!ctrl.view.window) {
        return nil;
    }
    return ctrl;
}

+ (UIViewController *)viewController
{
    UIViewController *currentViewController = nil;
    UIWindow * window = [[UIApplication sharedApplication] keyWindow];
    if ([window subviews].count == 0) return nil;
    if (window.windowLevel != UIWindowLevelNormal) {
        NSArray *windows = [[UIApplication sharedApplication] windows];
        for (UIWindow * subWindow in windows) {
            if (subWindow.windowLevel == UIWindowLevelNormal) {
                window = subWindow;
                break;
            }
        }
    }
    UIView *frontView = [[window subviews] objectAtIndex:0];
    id nextResponder = [frontView nextResponder];
    if ([nextResponder isKindOfClass:[UIViewController class]]) {
        currentViewController = nextResponder;
    } else {
        currentViewController = window.rootViewController;
    }
    return currentViewController;
}

@end



