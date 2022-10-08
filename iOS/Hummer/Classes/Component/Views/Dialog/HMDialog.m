//
//  HMDialog.m
//  Pods
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMDialog.h"
#import "HMExportManager.h"
#import <Hummer/HMBaseExecutorProtocol.h>
#import "HMUtility.h"
#import "UIView+HMRenderObject.h"
#import "UIView+HMDom.h"
#import "HMBaseExecutorProtocol.h"
#import "HMConverter.h"
#import <Hummer/HMJSGlobal.h>
#import "HMConfigEntryManager.h"
#import <Hummer/UIView+HMInspector.h>


@interface HMDialogPopoverView : UIView

@property (nonatomic) BOOL shouldDismissPopover;
@property (nonatomic, copy, nullable) dispatch_block_t didDismissPopover;
@property (nonatomic, assign) BOOL isJSContent;

@property (nonatomic, copy) NSString *message;
@property (nonatomic, strong) HMBaseValue *contentViewJsValue;

@end

@implementation HMDialogPopoverView

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.backgroundColor = [UIColor colorWithRed:37.0/255.0 green:38.0/255.0 blue:45.0/255.0 alpha:0.4];
    }
    return self;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    
    if (self.isJSContent) {
        NSHashTable<id<HMLayoutStyleProtocol>> *affectedShadowViews = NSHashTable.weakObjectsHashTable;
        [self hm_applyLayoutPreservingOrigin:NO affectedShadowViews:affectedShadowViews];
        if (affectedShadowViews.count > 0) {
            NSEnumerator<id<HMLayoutStyleProtocol>> *enumerator = affectedShadowViews.objectEnumerator;
            id<HMLayoutStyleProtocol> value = nil;
            while ((value = enumerator.nextObject)) {
                [value.view hm_layoutBackgroundColorImageBorderShadowCornerRadius];
            }
        }
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

@interface HMDialog ()<HMViewInspectorDescription>

@property (nonatomic, assign, readwrite) HMDialogStyle dStyle;
@end

/**
 * 规范：
 * 1.同一个实例：如果已经展示一个弹窗(不论是alert，还是custom等)，在不调用dismiss的情况下，直接调用下一个alert或者custom 等，此时不展示弹框。
 * 2.多个实例： 多个实例弹窗叠加，后面的盖在前面的上层。
 * 3.iOS 机制导致 cancelable 在 alertView 下 cancelable 属性失效
 */
@implementation HMDialog{
    
    HMDialogPopoverView *_popover;
    BOOL _isPresenting;//是否已经展示弹窗
    
    
    NSString *_title;
    NSString *_content;
}

#pragma mark - Export

HM_EXPORT_CLASS(Dialog, HMDialog)

HM_EXPORT_METHOD(alert, __alertWithMessage:btnText:callback:)
HM_EXPORT_METHOD(confirm, __confirmWithTitle:message:okBtnText:cancelBtnText:okCallback:cancelCallback:)
HM_EXPORT_METHOD(custom, __customWithView:)
HM_EXPORT_METHOD(dismiss, __dismiss)
HM_EXPORT_METHOD(loading, __loading:)

HM_EXPORT_PROPERTY(cancelable, __isCancelabled, __setCancelabled:)

HM_EXPORT_PROPERTY(lowLayer, isLowLayer, setIsLowLayer:)

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

- (void)__setCancelabled:(HMBaseValue *)value {
    if(!value.isBoolean) {
        return;
    }
    self.cancelable = value.toBool;
    
    if (_popover) {
        _popover.shouldDismissPopover = self.isCancelabled;
    }
}

- (void)__loading:(HMBaseValue *)jsContent {
    if (_isPresenting) {return;}
    _isPresenting = YES;
    NSString *content = jsContent.toString;
    if (!content) {
        return;
    }
    _dStyle = HMDialogStyleLoading;
    UIViewController *presenting = [HMDialog fix_getCurrentViewController];
    _popover = [[HMDialogPopoverView alloc] init];
    _popover.shouldDismissPopover = self.isCancelabled;
    
    int labLeftIndentation = 5;
    UIView *contentView = [UIView new];
    contentView.layer.cornerRadius = 2;
    contentView.layer.masksToBounds = YES;
    contentView.backgroundColor = [HMConverter HMStringToColor:@"#25262D"];
    UIActivityIndicatorView *loadingView = [[UIActivityIndicatorView alloc] initWithFrame:CGRectMake(0, 0, 45, 40)];
    loadingView.activityIndicatorViewStyle = UIActivityIndicatorViewStyleWhite;
    [loadingView startAnimating];
    UILabel *titleLab = [UILabel new];
    titleLab.text = content;
    titleLab.textColor = [HMConverter HMStringToColor:@"#CCCCCC"];
    NSString *fontFamily = [HMFontAdaptor fontWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace].defaultFontFamily;
    titleLab.font = fontFamily ? [UIFont fontWithName:fontFamily size:14] : [UIFont systemFontOfSize:14];
    titleLab.lineBreakMode = NSLineBreakByTruncatingTail;
    [titleLab sizeToFit];
    
    [contentView addSubview:loadingView];
    [contentView addSubview:titleLab];
    CGFloat maxWidth = CGRectGetWidth(titleLab.frame)+CGRectGetWidth(loadingView.frame)-labLeftIndentation + 16;//16右边距
    maxWidth = maxWidth > 240 ? 240 : maxWidth;
    contentView.frame = CGRectMake(0, 0, maxWidth, 40);
    titleLab.frame = CGRectMake(CGRectGetMaxX(loadingView.frame)-labLeftIndentation, 0, maxWidth - CGRectGetWidth(loadingView.frame)-16+labLeftIndentation, 40);
    _popover.message = content;
    [_popover addContentView:contentView presentingViewController:presenting];
}

- (void)__customWithView:(HMBaseValue *)jsView
{
    if (_isPresenting) {return;}
    _isPresenting = YES;
    UIView *view = jsView.hm_toObjCObject;
    if (!view) {
        return;
    }

    UIViewController *presenting = nil;
    if (!self.isLowLayer) {
        presenting = [HMDialog fix_getCurrentViewController];
    } else {
        if (!HMCurrentExecutor) {
            NSAssert(NO, @"HMCurrentExecutor must be non-nil");
            
            return;
        }
        HMJSContext *context = [HMJSGlobal.globalObject currentContext:HMCurrentExecutor];
        if (!context) {
            NSAssert(NO, @"Current HMJSContext must be non-nil");
            
            return;
        }
        presenting = context.rootView.window.rootViewController;
        if (!presenting) {
            presenting = [HMDialog fix_getCurrentViewController];
        }
    }
    _dStyle = HMDialogStyleCustom;
    _popover = [[HMDialogPopoverView alloc] init];
    _popover.shouldDismissPopover = self.isCancelabled;
    _popover.contentViewJsValue = jsView;
    [_popover addJSContentView:view presentingViewController:presenting];
}

- (void)customView:(UIView *)view
{
    if (_isPresenting) {return;}
    _isPresenting = YES;
    if (!view) {
        return;
    }
    UIViewController *presenting = [HMDialog fix_getCurrentViewController];
    _popover = [[HMDialogPopoverView alloc] init];
    _popover.shouldDismissPopover = self.isCancelabled;
    [_popover addContentView:view presentingViewController:presenting];
}

- (void)__dismiss
{
    _isPresenting = NO;
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


/**
* 显示提示用户的警示框。当警示框出现后，用户需要点击[确定]按钮才能继续进行操作。
*
* @param msg 内容
* @param btnText 按钮内容
* @param callback 按钮点击回调
*/
- (void)__alertWithMessage:(HMBaseValue *)jsMsg btnText:(HMBaseValue *)jsBtnText callback:(HMFuncCallback)callback
{
    NSString *title = jsMsg.isString ? jsMsg.toString : @"";
    NSString *btnText = jsBtnText.isString ? jsBtnText.toString : @"确认";
    if (_isPresenting) {return;}
    _dStyle = HMDialogStyleAlert;
    _isPresenting = YES;
    _popover = nil;
    [HMDialog dialogWithTitle:title message:nil showData:@[btnText] dialogType:HMDialogTypeCustomOneSure complement:^(NSInteger index) {
        self->_isPresenting = NO;
        HMExecOnMainQueue(^{
            HM_SafeRunBlock(callback,@[]);
        });
    }];
}

- (void)__confirmWithTitle:(HMBaseValue *)jsTitle message:(HMBaseValue *)jsMsg okBtnText:(HMBaseValue *)jsOkBtnText cancelBtnText:(HMBaseValue *)jsCancelBtnText okCallback:(HMFuncCallback)okCallback cancelCallback:(HMFuncCallback)cancelCallback
{
    if (_isPresenting) {return;}
    _dStyle = HMDialogStyleConfirm;
    _isPresenting = YES;
    _popover = nil;
    NSString *title = jsTitle.isString ? jsTitle.toString : @"";
    NSString *message = jsMsg.isString ? jsMsg.toString : nil;
    NSString *okBtnText = jsOkBtnText.isString ? jsOkBtnText.toString : @"确认";
    NSString *cancelBtnText = jsCancelBtnText.isString ? jsCancelBtnText.toString : @"取消";

    [HMDialog dialogWithTitle:title message:message showData:@[okBtnText, cancelBtnText] dialogType:HMDialogTypeCustomDefault complement:^(NSInteger index) {
        self->_isPresenting = NO;
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
    
    while (ctrl.presentedViewController) {
        ctrl = ctrl.presentedViewController;
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

#pragma mark  <HMViewInspectorDescription>

- (nullable NSArray<id<HMViewInspectorDescription>> *)hm_displayJsChildren {
    
    if (self.dStyle == HMDialogStyleCustom) {
        return @[(UIView *)[_popover.contentViewJsValue toNativeObject]];
    }
    // loading, alert, confirm
    return nil;
}

- (NSString *)hm_displayAlias {
    NSString *alias = @"Custom";
    switch (self.dStyle) {
        case HMDialogStyleLoading:
            alias = @"Loading";
            break;
            
        case HMDialogStyleAlert:
            alias = @"Alert";
            break;
            
        case HMDialogStyleConfirm:
            alias = @"Confirm";
            break;
        default:
            break;
    }
    return alias;
}

- (NSString *)hm_content {
    
    NSString *content = nil;
    switch (self.dStyle) {
        case HMDialogStyleLoading:
            content = _popover.message;
            break;
            
        case HMDialogStyleAlert:
            content = self.message;
            break;
            
        case HMDialogStyleConfirm:
            content = [NSString stringWithFormat:@"%@ - %@", self.title, self.message];
            break;
        default:
            break;
    }
    return content;
}

- (nullable id)hm_displayContent {
    
    if (self.dStyle == HMDialogStyleLoading) {
        return _popover.message;
    }
    
     if (_popover) {
        return _popover.message;
    }
    return [NSString stringWithFormat:@"%@ - %@", self.title, self.message];
}


@end



