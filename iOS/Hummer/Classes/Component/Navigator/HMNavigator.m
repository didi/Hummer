//
//  HMImageView.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMNavigator.h"
#import "HMNavigatorSchemes.h"
#import "HMExportManager.h"
#import "HMRouterProtocol.h"
#import "HMInterceptor.h"
#import <Hummer/HMBaseExecutorProtocol.h>
#import "HMContainerModel.h"
#import <Hummer/HMBaseValue.h>
#import <Hummer/HMConfigEntryManager.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMNavigator ()

@property (nullable, copy, nonatomic) HMNavigatorSchemes *schemeMapper;

+ (nullable UIViewController *)viewControllerForPageID:(NSString *)pageId;

+ (void)popPage:(BOOL)animated;

+ (void)popToPage:(NSString *)pageID animated:(BOOL)animated;

+ (void)popToRootPage:(NSDictionary *)pageInfo;

@end

NS_ASSUME_NONNULL_END

@implementation HMNavigator

#pragma mark Export

HM_EXPORT_CLASS(Navigator, HMNavigator)

HM_EXPORT_METHOD(openPage, openPage:
    callback:)

HM_EXPORT_METHOD(popPage, __popPage:)

HM_EXPORT_METHOD(popToPage, __popToPage:)

HM_EXPORT_METHOD(popToRootPage, __popToRootPage:)

HM_EXPORT_METHOD(popBack, __popBackWithCount:pageInfo:)

+ (instancetype)sharedInstance {
    static id _sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _sharedInstance = [[self alloc] init];
    });

    return _sharedInstance;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _schemeMapper = [[HMNavigatorSchemes alloc] init];
    }
    return self;
}

+ (void)registerScheme:(NSString *)scheme nameSpace:(NSString *)nameSpace pageBuilder:(HMPageBuilder)pageBuilder
{
    if (!scheme) {
        HMLogDebug(@"参数为nil scheme:%@, nameSpace:%@", scheme, nameSpace);
        return;
    }
    [HMNavigator.sharedInstance.schemeMapper addScheme:scheme nameSpace:nameSpace builder:pageBuilder];
}

+ (void)registerScheme:(NSString *)scheme pageBuilder:(HMPageBuilder)pageBuilder {
    [self registerScheme:scheme nameSpace:nil pageBuilder:pageBuilder];
}

+ (void)registerPages:(NSDictionary<NSString *, HMPageBuilder> *)pages {
    if (!pages || pages.count <= 0) {
        return;
    }
    [pages enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull key, HMPageBuilder  _Nonnull obj, BOOL * _Nonnull stop) {
        [self registerScheme:key pageBuilder:obj];
    }];
}

+ (void)registerPage:(NSString *)route builder:(HMPageBuilder)builder {
    [self registerScheme:route pageBuilder:builder];
}

+ (void)removePage:(NSString *)route {
    [self removePageBuilderForScheme:route];
}

+ (void)removePageBuilderForScheme:(NSString *)scheme {
    [self removePageBuilderForScheme:scheme nameSpace:nil];
}

+ (void)removePageBuilderForScheme:(NSString *)scheme nameSpace:(NSString *)nameSpace {
    [HMNavigator.sharedInstance.schemeMapper removeScheme:scheme nameSpace:nameSpace];
}

+ (void)openPage:(HMBaseValue *)params callback:(HMFuncCallback)callback {
    NSDictionary *pageParameterDictionary = params.toDictionary;
    id urlObject = pageParameterDictionary[@"url"];
    if (![urlObject isKindOfClass:NSString.class] || ((NSString *) urlObject).length == 0) {
        NSAssert(NO, @"url 必须传入");
        return;
    }
    HMJSContext *context = [HMJSGlobal.globalObject currentContext:HMCurrentExecutor];
    
    NSURL *url = [NSURL URLWithString:urlObject];
    if (url.scheme.length == 0) {
        // 相对路径解析
        if (context) {
            url = [[NSURL alloc] initWithString:urlObject relativeToURL:context.url];
            if (url.scheme.length == 0) {
                NSAssert(NO, @"无法解析相对路径");
                return;
            }
        } else {
            // 兜底逻辑，基本不可能存在，如果遇到需要警惕
            NSAssert(NO, @"url 必须为标准格式，并且找不到当前的 HMJSContext");
            return;
        }
    }
    BOOL animated = YES;
    id animatedObject = pageParameterDictionary[@"animated"];
    if ([animatedObject isKindOfClass:NSNumber.class]) {
        animated = ((NSNumber *) animatedObject).boolValue;
    }
    id parameterObject = pageParameterDictionary[@"params"];
    NSDictionary *parameterDictioniary = nil;
    if ([parameterObject isKindOfClass:NSDictionary.class]) {
        parameterDictioniary = parameterObject;
    }

    id pageIdObject = pageParameterDictionary[@"id"];
    NSString *pageId = nil;
    if ([pageIdObject isKindOfClass:NSString.class]) {
        pageId = pageIdObject;
    }
    
    BOOL closeSelf = NO;
    id closeSelfObj = pageParameterDictionary[@"closeSelf"];
    if (closeSelfObj && [closeSelfObj isKindOfClass:NSNumber.class]) {
        closeSelf = [(NSNumber *)closeSelfObj boolValue];
    }
    if (closeSelf) {
        [self popPage:NO];
    }
    
    HMNavigatorPageInfo *info = [[HMNavigatorPageInfo alloc] init];
    info.nameSpace = context.nameSpace;
    info.pageId = pageId;
    info.url = url.absoluteString;
    info.params = parameterDictioniary;
    info.animated = animated;
    info.callback = ^(id  _Nullable userInfo) {
        HM_SafeRunBlock(callback, @[userInfo ?: @{}]);
    };
    dispatch_async(dispatch_get_main_queue(), ^{
        [self pushPageWithInfo:info];
    });
}

+ (void)__popPage:(HMBaseValue *)params {
    BOOL animated = YES;
    NSDictionary *pageInfo = params.toDictionary;
    if (pageInfo) {
        id animatedObject = pageInfo[@"animated"];
        if ([animatedObject isKindOfClass:NSNumber.class]) {
            animated = ((NSNumber *) animatedObject).boolValue;
        }
    } else if (params.isBoolean) {
        animated = params.toBool;
    }
    [self popPage:animated];
}

+ (void)__popToPage:(HMBaseValue *)params {
    NSDictionary *pageInfo = params.toDictionary;
    if (!pageInfo) {
        return;
    }
    NSDictionary *parameterDictioinary = params.toDictionary;
    id pageIdObject = parameterDictioinary[@"id"];
    if (![pageIdObject isKindOfClass:NSString.class]) {
        return;
    }
    BOOL animated = YES;
    id animatedObject = parameterDictioinary[@"animated"];
    if ([animatedObject isKindOfClass:NSNumber.class]) {
        animated = ((NSNumber *) animatedObject).boolValue;
    }
    NSString *pageID = pageIdObject;
    if (pageID.length == 0) {
        return;
    }
    [self popToPage:pageID animated:animated];
}

+ (void)__popToRootPage:(HMBaseValue *)params {
    NSDictionary *pageInfo = params.toDictionary;
    [self popToRootPage:pageInfo];
}

+ (void)__popBackWithCount:(HMBaseValue *)count pageInfo:(HMBaseValue *)pageInfo {
    NSParameterAssert(count);
    NSParameterAssert(pageInfo);
    __block uint32_t countValue = count.toUInt32;
    
    BOOL animated = YES;
    NSDictionary *params = pageInfo.toDictionary;

    HMJSContext *context = [HMJSGlobal.globalObject currentContext:HMCurrentExecutor];
    BOOL isHandled = [HMRouterInterceptor handlePopBackWithCount:countValue params:params namespace:context.nameSpace];
    if (isHandled) {
        return;
    }
    id animatedObject = params[@"animated"];
    if ([animatedObject isKindOfClass:NSNumber.class]) {
        animated = ((NSNumber *) animatedObject).boolValue;
    }
    UIViewController *topViewController = HMTopViewController();
    HMContainerModel *containerModel = hm_nearest_container(topViewController);
    if (!containerModel.viewController || containerModel.containerType != HMContainerTypeNavigation) {
        return;
    }
    UINavigationController *navigationController = (UINavigationController *) containerModel.viewController;
    NSInteger newCount = ((NSInteger) navigationController.viewControllers.count) - ((int32_t) countValue);
    if (newCount <= 0) {
        return;
    }
    
    NSMutableArray<__kindof UIViewController *> *newViewControllerMutableArray = [NSMutableArray arrayWithCapacity:newCount];
    
    [navigationController.viewControllers enumerateObjectsWithOptions:NSEnumerationReverse usingBlock:^(__kindof UIViewController * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        if (countValue > 0) {
            countValue--;
            return;
        } else {
            [newViewControllerMutableArray addObject:obj];
        }
    }];
    NSArray<__kindof UIViewController *> *reversedArray = [[newViewControllerMutableArray reverseObjectEnumerator] allObjects];
    
    [navigationController setViewControllers:reversedArray animated:animated];
}

#pragma mark - Navigation

+ (NSString *)schemeWithURL:(NSURL *)url
{
    NSString *scheme = url.scheme;
    if ((([url.scheme hasPrefix:@"http"] || [url.scheme isEqualToString:@"file"]) &&
         [url.pathExtension isEqualToString:@"js"]) || [url.scheme isEqualToString:@"ws"]) {
        scheme = @"hummer";
    }
    if ([url.scheme hasPrefix:@"http"] && ![url.pathExtension isEqualToString:@"js"]) {
        scheme = @"https";
    }
    return scheme;
}

+ (void)pushPage:(NSURL *)url params:(nullable NSDictionary *)params pageId:(NSString *)pageId animated:(BOOL)animated callback:(HMVoidIDBlock)callback
{
    HMNavigatorPageInfo *info = [[HMNavigatorPageInfo alloc] init];
    info.pageId = pageId;
    info.url = url.absoluteString;
    info.params = params;
    info.animated = animated;
    info.callback = ^(id  _Nullable userInfo) {
        HM_SafeRunBlock(callback, @[userInfo ?: @{}]);
    };
    dispatch_async(dispatch_get_main_queue(), ^{
        [self pushPageWithInfo:info];
    });
}

+ (void)pushPageWithInfo:(HMNavigatorPageInfo *)info {
    NSURL *url = [NSURL URLWithString:info.url];
    
    // 优先判断是否可打开三方APP，未来也许可以移除？
    if (![url.scheme containsString:@"http"] && ![url.scheme containsString:@"file"]  && [UIApplication.sharedApplication canOpenURL:url]) {
        if (@available(iOS 10, *)) {
            [UIApplication.sharedApplication openURL:url options:@{} completionHandler:nil];
        } else {
            [[UIApplication sharedApplication] openURL:url];
        }
        return;
    }
    
    UIViewController *viewController = nil;
    NSString *scheme = [self schemeWithURL:url];
    HMPageBuilder pageBuilder = [HMNavigator.sharedInstance.schemeMapper builderForScheme:scheme nameSpace:info.nameSpace];
    if (pageBuilder) {
        viewController = HM_SafeRunBlock(pageBuilder,
                                         info.url,
                                         info.params,
                                         info.pageId,
                                         info.callback);
    }
    
    // 兜底逻辑 - 本地文件，远程文件，ws
    if ([scheme isEqualToString:@"hummer"] && !viewController) {
        HMViewController *hummerViewController = [[HMViewController alloc] init];
        hummerViewController.URL = info.url;
        hummerViewController.params = info.params;
        hummerViewController.hm_dismissBlock = info.callback;
        viewController = hummerViewController;
    }
    
    if (!viewController) {
        NSAssert(NO, @"无法构造 UIViewController");
        return;
    }
    
    // 检查页面路由插件
    BOOL isHandled = [HMRouterInterceptor handleOpenViewController:viewController pageInfo:info namespace:info.nameSpace];
    if (isHandled) {
        return;
    }
    
    // 打开页面
    UIViewController *topViewController = HMTopViewController();
    if (!topViewController) {
        UIWindow *keyWindow = hm_key_window();
        keyWindow.rootViewController = viewController;
        // 本来就是 keyWindow，所以不需要 makeKeyAndVisible，也不需要 keyWindow.hidden = NO
    }
    // UINavigationController 显示 UINavigationController，实际上是模态显示，会被存放在 _childModalViewController
    [topViewController showViewController:viewController sender:nil];
}

+ (void)popPage:(BOOL)animated {

    HMJSContext *context = [HMJSGlobal.globalObject currentContext:HMCurrentExecutor];
    BOOL isHandled = [HMRouterInterceptor handlePopWithViewController:nil animated:animated namespace:context.nameSpace];
    
    if (isHandled) {
        return;
    }
    
    UIViewController *topViewController = HMTopViewController();
    HMContainerModel *containerModel = hm_nearest_container(topViewController);
    // UINavigationController.viewControllers.count == 1 作为一个单容器，无法 popViewController，因此应当再查找上一级容器
    containerModel = hm_strip_single_child_navigation(containerModel);
    if (!containerModel.viewController) {
        hm_key_window().rootViewController = nil;
    } else if (containerModel.containerType == HMContainerTypeNavigation) {
        // TODO(唐佳诚): 优化 pop 逻辑
        [((UINavigationController *) containerModel.viewController) popViewControllerAnimated:animated];
    } else {
        [containerModel.viewController dismissViewControllerAnimated:animated completion:nil];
    }
}

+ (void)popToPage:(NSString *)pageID animated:(BOOL)animated {
    UIViewController *viewController = [self viewControllerForPageID:pageID];
    if (!viewController) {
        return;
    }
    HMJSContext *context = [HMJSGlobal.globalObject currentContext:HMCurrentExecutor];
    BOOL isHandled = [HMRouterInterceptor handlePopWithViewController:viewController animated:animated namespace:context.nameSpace];
    if (isHandled) {
        return;
    }
    
    if (viewController.navigationController) {
        // TODO(唐佳诚): 优化 pop 逻辑
        [viewController.navigationController popToViewController:viewController animated:animated];
    } else if (viewController.presentingViewController) {
        [viewController dismissViewControllerAnimated:animated completion:nil];
    }
}

+ (void)popToRootPage:(NSDictionary *)pageInfo {
    
    HMJSContext *context = [HMJSGlobal.globalObject currentContext:HMCurrentExecutor];
    BOOL isHandled = [HMRouterInterceptor handlePopToRootWithParams:pageInfo namespace:context.nameSpace];
    if (isHandled) {
        return;
    }
    BOOL animated = YES;
    id animatedObject = pageInfo[@"animated"];
    if ([animatedObject isKindOfClass:NSNumber.class]) {
        animated = ((NSNumber *) animatedObject).boolValue;
    }
    
    UIViewController *topViewController = HMTopViewController();
    HMContainerModel *containerModel = hm_nearest_container(topViewController);
    if (containerModel.containerType == HMContainerTypeNavigation) {
        [((UINavigationController *) containerModel.viewController) popToRootViewControllerAnimated:animated];
    } else if (containerModel.viewController) {
        for (HMContainerModel *inlineContainerModel = hm_nearest_container(containerModel.viewController); inlineContainerModel.containerType == HMContainerTypeModal; inlineContainerModel = hm_nearest_container(inlineContainerModel.viewController)) {
            if (inlineContainerModel.containerType == HMContainerTypeModal) {
                containerModel = inlineContainerModel;
            }
        }
        [containerModel.viewController dismissViewControllerAnimated:animated completion:nil];
    }
}

#pragma mark - Private

+ (UIViewController *)viewControllerForPageID:(NSString *)pageID {
    UIViewController *topViewController = HMTopViewController();
    if ([topViewController conformsToProtocol:@protocol(HummerContainerProtocol)] && [((UIViewController <HummerContainerProtocol> *) topViewController).hm_pageID isEqualToString:pageID]) {
        return topViewController;
    }
    HMContainerModel *containerModel = hm_nearest_container(topViewController);
    if (containerModel.containerType == HMContainerTypeNavigation) {
        __block UIViewController *pageViewController = nil;
        [((UINavigationController *) containerModel.viewController).viewControllers enumerateObjectsUsingBlock:^(__kindof UIViewController *obj, NSUInteger idx, BOOL *stop) {
            if ([obj conformsToProtocol:@protocol(HummerContainerProtocol)] && [((UIViewController <HummerContainerProtocol> *) obj).hm_pageID isEqualToString:pageID]) {
                pageViewController = obj;
                *stop = YES;
            }
        }];
        if (pageViewController) {
            return pageViewController;
        }
    }
    for (HMContainerModel *inlineContainerModel = hm_nearest_container(containerModel.viewController); inlineContainerModel.containerType == HMContainerTypeModal; inlineContainerModel = hm_nearest_container(inlineContainerModel.viewController)) {
        if (inlineContainerModel.containerType == HMContainerTypeModal) {
            if ([inlineContainerModel conformsToProtocol:@protocol(HummerContainerProtocol)] && [((UIViewController <HummerContainerProtocol> *) inlineContainerModel).hm_pageID isEqualToString:pageID]) {
                return inlineContainerModel.viewController;
            }
        }
    }

    return nil;
}

@end
