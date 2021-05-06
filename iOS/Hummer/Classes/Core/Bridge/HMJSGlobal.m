//
//  HMJSGlobal.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMJSGlobal.h"
#import "HMExportClass.h"

#import "HMUtility.h"
#import "UIView+HMRenderObject.h"
#import "HMJSObject.h"
#import "NSObject+Hummer.h"
#import "HMConfig.h"
#import "HMJSCExecutor.h"
#import "HMBaseValue.h"
#import "HMBaseWeakValueProtocol.h"
#import "UIView+HMDom.h"
#import "HMJavaScriptLoader.h"
#import "HMJSGlobal+Private.h"
#import "HMExceptionModel.h"

NS_ASSUME_NONNULL_BEGIN

static HMJSGlobal *_Nullable _sharedInstance = nil;

@interface HMJSGlobal ()

- (NSDictionary<NSString *, NSObject *> *)getEnvironmentInfo;

- (void)render:(nullable HMBaseValue *)page;

- (void)setBasicWidth:(nullable HMBaseValue *)basicWidth;

@property (nonatomic, strong) NSMapTable<NSObject *, NSObject *> *contextGraph;

@property (nonatomic, copy, nullable) NSMutableDictionary<NSString *, NSObject *> *envParams;

// 根据 namespace 获取不同的 envParams;
@property (nonatomic, strong, nullable) NSMutableDictionary<NSString *, NSMutableDictionary *> *envParamsMap;


+ (nullable HMBaseValue *)env;

+ (void)setEnv:(nullable HMBaseValue *)value;

+ (nullable HMBaseValue *)notifyCenter;

+ (void)setNotifyCenter:(nullable HMBaseValue *)notifyCenter;

+ (nullable NSDictionary<NSString *, NSObject *> *)pageInfo;

+ (void)setPageInfo:(HMBaseValue *)pageInfo;

+ (HMFunctionType)setTitle;

+ (void)setSetTitle:(HMFunctionType)setTitle;

+ (void)render:(nullable HMBaseValue *)page;

+ (void)setBasicWidth:(nullable HMBaseValue *)basicWidth;

NS_ASSUME_NONNULL_END

@end

@implementation HMJSGlobal

HM_EXPORT_CLASS(Hummer, HMJSGlobal)

HM_EXPORT_CLASS_PROPERTY(setTitle, setTitle, setSetTitle:)

HM_EXPORT_CLASS_PROPERTY(env, env, setEnv:)

HM_EXPORT_CLASS_PROPERTY(notifyCenter, notifyCenter, setNotifyCenter:)

HM_EXPORT_CLASS_PROPERTY(pageInfo, pageInfo, setPageInfo:)

HM_EXPORT_CLASS_METHOD(render, render:)

HM_EXPORT_CLASS_METHOD(setBasicWidth, setBasicWidth:)

HM_EXPORT_CLASS_METHOD(evaluateScript, evaluateScript:)

HM_EXPORT_CLASS_METHOD(evaluateScriptWithUrl, evaluateScriptWithUrl:callback:)

HM_EXPORT_CLASS_METHOD(postException, postException:)


+ (void)postException:(HMBaseValue *)exception{
    
    NSDictionary *exceptionDic = exception.toDictionary;
    if (exceptionDic && HMCurrentExecutor.exceptionHandler) {
        HMExceptionModel *model = [[HMExceptionModel alloc] initWithParams:exceptionDic];
        HMCurrentExecutor.exceptionHandler(model);
    }
}

+ (HMBaseValue *)evaluateScript:(HMBaseValue *)script {
    NSString *jsString = [script toString];
    HMExceptionModel *_exception = [self _evaluateString:jsString fileName:@""];
    HMJSContext *context = [HMJSGlobal.globalObject currentContext:HMCurrentExecutor];
    if (_exception) {
        NSDictionary *err = @{@"code":@(-1),
                               @"message":@"javascript evalute exception"};
        return [HMBaseValue valueWithObject:err inContext:context.context];
    }
    return [HMBaseValue valueWithObject:[NSNull null] inContext:context.context];
}

+ (void)evaluateScriptWithUrl:(HMBaseValue *)urlString callback:(HMFunctionType)callback {
    
    NSString *_urlString = [urlString toString];
    NSURL *url = [NSURL URLWithString:_urlString];
    HMJSContext *context = [HMJSGlobal.globalObject currentContext:HMCurrentExecutor];
    
    void(^checkException)(NSString *) = ^(NSString *jsString){
        HMExceptionModel *_exception = [self _evaluateString:jsString fileName:_urlString inContext:context];
        if (_exception) {
            NSDictionary *err = @{@"code":@(-1),
                                   @"message":@"javascript evalute exception"};
            callback(@[err]);
        }else{
            callback(@[[NSNull null]]);
        }
    };
    
    // TODO：拦截器
    if ([HMInterceptor hasInterceptor:HMInterceptorTypeJSLoad]) {
        [HMInterceptor enumerateInterceptor:HMInterceptorTypeJSLoad
                                  withBlock:^(id<HMJSLoadInterceptor> interceptor,
                                              NSUInteger idx,
                                              BOOL * _Nonnull stop) {
            [interceptor handleUrlString:_urlString completion:^(NSString * _Nonnull jsString) {
                if (jsString) {
                    *stop = YES;
                    checkException(jsString);
                    return;
                }
            }];
        }];
    }
    
    [HMJavaScriptLoader loadBundleWithURL:url onProgress:nil onComplete:^(NSError *error, HMDataSource *source) {
        if (error) {
            NSDictionary *err = @{@"code":@(error.code),
                                  @"message":error.userInfo[NSLocalizedDescriptionKey] ? error.userInfo[NSLocalizedDescriptionKey] : @"http error"};
            callback(@[err]);
            return;
        }
        NSString *script = nil;
        if(!error) script = [[NSString alloc] initWithData:source.data encoding:NSUTF8StringEncoding];
        dispatch_async(dispatch_get_main_queue(), ^{
            checkException(script);
            return;
        });
    }];
}

+ (HMNotifyCenter *)notifyCenter {
    HMJSContext *context = [HMJSGlobal.globalObject currentContext:HMCurrentExecutor];
    
    return context.notifyCenter;
}

+ (void)setNotifyCenter:(HMBaseValue *)notifyCenter {
    id notifyCenterObject = notifyCenter.toNativeObject;
    if ([notifyCenterObject isKindOfClass:HMNotifyCenter.class]) {
        HMJSContext *context = [HMJSGlobal.globalObject currentContext:HMCurrentExecutor];
        context.notifyCenter = notifyCenterObject;
    }
}

+ (NSDictionary<NSString *,NSObject *> *)pageInfo {
    return HMJSGlobal.globalObject.pageInfo;
}

+ (void)setPageInfo:(HMBaseValue *)pageInfo {
    HMJSGlobal.globalObject.pageInfo = pageInfo.toDictionary;
}

+ (HMFunctionType)setTitle {
    return HMJSGlobal.globalObject.setTitle;
}

+ (void)setSetTitle:(HMFunctionType)setTitle {
    HMJSGlobal.globalObject.setTitle = setTitle;
}

+ (void)render:(HMBaseValue *)page {
    [HMJSGlobal.globalObject render:page];
}

+ (void)setBasicWidth:(HMBaseValue *)basicWidth {
    [HMJSGlobal.globalObject setBasicWidth:basicWidth];
}

- (instancetype)init {
    self = [super init];
    NSPointerFunctionsOptions weakOption = NSPointerFunctionsWeakMemory |
            NSPointerFunctionsObjectPersonality;
    _contextGraph = [[NSMapTable alloc] initWithKeyOptions:weakOption
                                              valueOptions:weakOption
                                                  capacity:0];
    _envParamsMap = [NSMutableDictionary new];

    return self;
}

+ (instancetype)globalObject {
    static id _sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _sharedInstance = [[self alloc] init];
    });
    return _sharedInstance;
}

/**
 * envParams 为 namespace 独立。
 * 如果 当前不存在 namespace 则默认为全局容器。
 * phase1：hummerCall(JS调用)会区分 namespace，返回 _envParams + envParamsMap[namespace]
 * phase2：native 调用 addGlobalEnviroment 不区分 namespace。
 */
- (NSMutableDictionary<NSString *, NSObject*> *)envParams {
    if (!_envParams) {
        _envParams = NSMutableDictionary.dictionary;
        [_envParams addEntriesFromDictionary:[self getEnvironmentInfo]];
    }
    if (HMCurrentExecutor) {
        HMJSContext *context = [self currentContext:HMCurrentExecutor];
        NSString *nameSpace = context.nameSpace;
        if (nameSpace) {
            // _envParams + envParamsMap[namespace]
            NSMutableDictionary *params = [self.envParamsMap objectForKey:nameSpace];
            NSDictionary *globalEnv = _envParams.copy;
            params = params ? params : [NSMutableDictionary new];
            [params addEntriesFromDictionary:globalEnv];
            params[@"namespace"] = nameSpace;
            [self.envParamsMap setObject:params forKey:nameSpace];
            return params;
        }
        //不存在 namespace 则默认 到全局容器
        return _envParams;
    }
    return _envParams;
}

- (NSDictionary *)getEnvironmentInfo {
    NSString *platform = @"iOS";
    NSString *sysVersion = [[UIDevice currentDevice] systemVersion] ?: @"";
    NSString *appVersion = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"] ?: @"";
    NSString *appName = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleDisplayName"] ?: @"";

    CGFloat screenWidth = [UIScreen mainScreen].bounds.size.width;
    CGFloat screenHeight = [UIScreen mainScreen].bounds.size.height;

    CGFloat deviceWidth = MIN(screenWidth, screenHeight);
    NSString *widthString = [NSString stringWithFormat:@"%.0f", deviceWidth];
    CGFloat deviceHeight = MAX(screenWidth, screenHeight);
    NSString *heightString = [NSString stringWithFormat:@"%.0f", deviceHeight];
    // TODO(唐佳诚): iOS 13 适配
    CGFloat statusBarHeight = [UIApplication sharedApplication].statusBarFrame.size.height;
    NSString *statusBarHeightString = [NSString stringWithFormat:@"%.0f", statusBarHeight];
    NSString *availableHeightString = [NSString stringWithFormat:@"%.0f", deviceHeight - statusBarHeight];
    CGFloat safeAreaBottom = 0.0;
    if (@available(iOS 11.0, *)) {
        safeAreaBottom = [[[UIApplication sharedApplication] delegate] window].safeAreaInsets.bottom > 0.0 ? 34.0 : 0.0;
    }
    NSString *safeAreaBottomString = [NSString stringWithFormat:@"%.0f", safeAreaBottom];
    CGFloat scale = [[UIScreen mainScreen] scale];

    return @{@"platform": platform,
            @"osVersion": sysVersion,
            @"appName": appName,
            @"appVersion": appVersion,
            @"deviceWidth": widthString,
            @"deviceHeight": heightString,
            @"availableWidth": widthString,
            @"availableHeight": availableHeightString,
            @"statusBarHeight": statusBarHeightString,
            @"safeAreaBottom": safeAreaBottomString,
            @"scale": @(scale)};
}

- (void)weakReference:(HMJSContext *)context {
    [HMJSGlobal.globalObject.contextGraph setObject:context forKey:(NSObject *) context.context];
}

- (HMJSContext *)currentContext:(id <HMBaseExecutorProtocol>)context {
    return (HMJSContext *) [HMJSGlobal.globalObject.contextGraph objectForKey:(NSObject *) context];
}

- (void)addGlobalEnviroment:(NSDictionary<NSString *, NSObject *> *)params {
    if (params.count == 0) {
        return;
    }

    [self.envParams addEntriesFromDictionary:params];
}

#pragma mark - HMGlobalExport

- (void)render:(HMBaseValue *)page {
    if (!page) {
        return;
    }
    NSObject *viewObject = page.toNativeObject;
    if (![viewObject isKindOfClass:UIView.class]) {
        return;
    }
    UIView *view = (UIView *) viewObject;
    HMJSContext *context = [HMJSGlobal.globalObject currentContext:page.context];
    context.componentView = page;
    [context.rootView addSubview:view];
    context.rootView.isHmLayoutEnabled = YES;
    [context.rootView hm_markDirty];
    if (context.renderCompletion) {
        context.renderCompletion();
    }
    [UIView hm_reSortFixedView:context];
}

- (void)setBasicWidth:(HMBaseValue *)basicWidth {
    NSString *widthString = basicWidth.toString;
    CGFloat width = [widthString floatValue];
    [HMConfig sharedInstance].pixel = width;
}

+ (NSMutableDictionary<NSString *, NSObject*> *)env {
    return HMJSGlobal.globalObject.envParams;
}

+ (void)setEnv:(HMBaseValue *)value {
    // 空实现
}

@end
