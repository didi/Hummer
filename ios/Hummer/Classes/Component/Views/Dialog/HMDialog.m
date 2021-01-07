//
//  HMDialog.m
//  Pods
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMDialog.h"
#import "HMExportManager.h"
#import <JavaScriptCore/JavaScriptCore.h>
#import "HMUtility.h"
#import "JSValue+Hummer.h"
#import "UIView+HMRenderObject.h"
#import "UIView+HMDom.h"

static NSInteger kHMDialogPopoverViewTag = 517212;

@interface HMDialogPopoverView : UIView

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
        [self hm_applyLayoutPreservingOrigin:YES affectedShadowViews:nil];
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
    
    
//    view.frame = CGRectMake((window.bounds.size.width - size.width) * 0.5,
//                            (window.bounds.size.height - size.height) * 0.5,
//                            size.width,
//                            size.height);
    [self addSubview:view];
    
//    [window setNeedsDisplay];
//    [window layoutIfNeeded];
    
    [self hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
        layout.width = HMPointValueMake(window.bounds.size.width);
        layout.height = HMPointValueMake(window.bounds.size.height);
        layout.alignContent = YOGA_TYPE_WRAPPER(YGAlignCenter);
        layout.alignItems = YOGA_TYPE_WRAPPER(YGAlignCenter);
        layout.justifyContent = YOGA_TYPE_WRAPPER(YGJustifyCenter);
    }];
    [self hm_markDirty];
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

/**
 /Users/didi/Workspace/hummer/native-js-ios/Hummer/Classes/Core/Utility/HMUtility.m
 } else if ([rootVC isKindOfClass:[UINavigationController class]]){
     UINavigationController* navigationController = (UINavigationController*)rootVC;
     if ([navigationController.visibleViewController isKindOfClass:NSClassFromString(@"HMPopoverViewController")]) {
         return HMTopViewControllerWithRootVC(navigationController.topViewController);
     } else {
         return HMTopViewControllerWithRootVC(navigationController.visibleViewController);
     }
 } else if (rootVC.presentedViewController && !([rootVC.presentedViewController isKindOfClass:NSClassFromString(@"HMPopoverViewController")])){
     UIViewController* presentedViewController = rootVC.presentedViewController;
     return HMTopViewControllerWithRootVC(presentedViewController);
 }
 */
@interface HMPopoverViewController : UIViewController <UIPopoverPresentationControllerDelegate>

@property (nonatomic) BOOL shouldDismissPopover;

@property (nonatomic, copy, nullable) dispatch_block_t didDismissPopover;

- (instancetype)init;

@end

@implementation HMPopoverViewController

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.view.backgroundColor = UIColor.clearColor;
        self.modalPresentationStyle = UIModalPresentationPopover;
        self.popoverPresentationController.delegate = self;
        self.popoverPresentationController.permittedArrowDirections = 0;
        self.popoverPresentationController.sourceRect = [self sourceRect];
    }
    return self;
}

- (void)addJSContentView:(UIView *)view presentingViewController:(UIViewController *)presenting
{
    if (!view) {
        return;
    }
    CGSize size = [view hm_sizeThatFits:CGSizeMake(CGFLOAT_MAX, CGFLOAT_MAX)];

    [self.view addSubview:view];
    
//    view.frame = view.bounds;
    view.frame = CGRectMake(0, 0, size.width, size.height);
    self.preferredContentSize = view.bounds.size;
    
    self.popoverPresentationController.sourceView = presenting.view.window;
}

- (void)addContentView:(UIView *)view presentingViewController:(UIViewController *)presenting
{
    if (!view) {
        return;
    }
    CGSize size = view.bounds.size;

    [self.view addSubview:view];
    
    view.frame = CGRectMake(0, 0, size.width, size.height);
    self.preferredContentSize = size;
    
    self.popoverPresentationController.sourceView = presenting.view.window;
}

- (CGRect)sourceRect
{
    CGSize ksize = UIScreen.mainScreen.bounds.size;
    return CGRectMake(ksize.width * 0.5, ksize.height * 0.5, 1, 1);
}

- (UIModalPresentationStyle)adaptivePresentationStyleForPresentationController:(UIPresentationController *)controller
{
    return UIModalPresentationNone;
}

- (BOOL)popoverPresentationControllerShouldDismissPopover:(UIPopoverPresentationController *)popoverPresentationController
{
    return self.shouldDismissPopover;
}

- (void)popoverPresentationControllerDidDismissPopover:(UIPopoverPresentationController *)popoverPresentationController
{
    if (self.didDismissPopover) {
        self.didDismissPopover();
    }
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

- (BOOL)__isCancelabled {
    return self.isCancelabled;
}

- (void)__setCancelabled:(JSValue *)value {
    if(!value.isBoolean) {
        return;
    }
    self.cancelable = value.toBool;
    
    if (_popover) {
        _popover.shouldDismissPopover = self.isCancelabled;
    }
}

// MARK: - custom view

static HMDialogPopoverView *_popover;

//static void dismissPopover()
//{
//   if (_popover) {
//       [_popover removeFromSuperview];
//       _popover = nil;
//   }
//}

- (void)__customWithView:(JSValue *)jsView
{
    UIView *view = jsView.hm_toObjCObject;
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
        _popover = poped;
        [self dismiss];
    }
    _popover = [[HMDialogPopoverView alloc] init];
    _popover.shouldDismissPopover = self.isCancelabled;
    [_popover addJSContentView:view presentingViewController:presenting];
}

- (void)customView:(UIView *)view
{
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
        _popover = poped;
        [self dismiss];
    }
    _popover = [[HMDialogPopoverView alloc] init];
    _popover.shouldDismissPopover = self.isCancelabled;
    [_popover addContentView:view presentingViewController:presenting];
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

//static HMPopoverViewController *_popover;
//
//- (void)__customWithView:(JSValue *)jsView
//{
//    UIView *view = jsView.hm_toObjCObject;
//    if (!view) {
//        return;
//    }
//    UIViewController *presenting = [HMDialog fix_getCurrentViewController];
//    if (!presenting) {
//        return;
//    }
//    if (_popover) {
//        [_popover dismissViewControllerAnimated:NO completion:nil];
//    }
//    _popover = [[HMPopoverViewController alloc] init];
//    _popover.shouldDismissPopover = self.isCancelabled;
//    [_popover addJSContentView:view presentingViewController:presenting];
//    [presenting presentViewController:_popover animated:NO completion:nil];
//}
//
//- (void)customView:(UIView *)view
//{
//    if (!view) {
//        return;
//    }
//    UIViewController *presenting = [HMDialog fix_getCurrentViewController];
//    if (!presenting) {
//        return;
//    }
//    if (_popover) {
//        [_popover dismissViewControllerAnimated:NO completion:nil];
//    }
//    _popover = [[HMPopoverViewController alloc] init];
//    _popover.shouldDismissPopover = self.isCancelabled;
//    [_popover addContentView:view presentingViewController:presenting];
//    [presenting presentViewController:_popover animated:NO completion:nil];
//}
//
//- (void)__dismiss
//{
//    if (_popover) {
//        [_popover dismissViewControllerAnimated:NO completion:nil];
//        [_popover removeFromParentViewController];
//        [_popover didMoveToParentViewController:nil];
//        _popover = nil;
//    } else {
//        [self dismissViewControllerAnimated:NO completion:nil];
//    }
//}
//
//- (void)dismiss
//{
//    [self __dismiss];
//}

// MARK: - Alert

/**
* 显示提示用户的警示框。当警示框出现后，用户需要点击[确定]按钮才能继续进行操作。
*
* @param msg 内容
* @param btnText 按钮内容
* @param callback 按钮点击回调
*/
- (void)__alertWithMessage:(JSValue *)jsMsg btnText:(JSValue *)jsBtnText callback:(HMFuncCallback)callback
{
    NSString *title = jsMsg.isString ? jsMsg.toString : @"";
    NSString *btnText = jsBtnText.isString ? jsBtnText.toString : @"确认";
    
    [HMDialog dialogWithTitle:title message:nil showData:@[btnText] dialogType:HMDialogTypeCustomOneSure complement:^(NSInteger index) {
        HMExecOnMainQueue(^{
            HM_SafeRunBlock(callback,@[]);
        });
    }];
}

- (void)__confirmWithTitle:(JSValue *)jsTitle message:(JSValue *)jsMsg okBtnText:(JSValue *)jsOkBtnText cancelBtnText:(JSValue *)jsCancelBtnText okCallback:(HMFuncCallback)okCallback cancelCallback:(HMFuncCallback)cancelCallback
{
    NSString *title = jsTitle.isString ? jsTitle.toString : @"";
    NSString *message = jsMsg.isString ? jsMsg.toString : nil;
    NSString *okBtnText = jsOkBtnText.isString ? jsOkBtnText.toString : @"确认";
    NSString *cancelBtnText = jsCancelBtnText.isString ? jsCancelBtnText.toString : @"取消";
    
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
    
    while (ctrl.presentedViewController && ![ctrl.presentedViewController isKindOfClass:HMPopoverViewController.class]) {
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



