//
//  HMConfigEntryManager.m
//  Hummer
//
//  Created by didi on 2021/7/6.
//

#import "HMConfigEntryManager.h"
#import "HMUtility.h"
#import <Hummer/HMFileManager.h>
#import <Hummer/HMMemCache.h>
#import "NSObject+HMDescription.h"
#import <Hummer/HMJSContext.h>
#import <Hummer/HMRequest.h>

#ifdef DEBUG
#if __has_include(<HMDevTools/HMDevTools.h>)
#import <HMDevTools/HMJSContext+HMDevTools.h>
#endif
#endif

//默认适配器
#import <Hummer/HMStorage.h>
#import <Hummer/HMNamespaceScope.h>
#import <Hummer/HMJavaScriptLoader.h>
#import <Hummer/HMInterceptor.h>
#import <Hummer/HMLogger.h>
#import <Hummer/HMUpgradeManager.h>

NSString * const HMDefaultNamespace = @"namespace.hummer.default";
NSString * const HMDefaultNamespaceUnderline = @"namespace_hummer_default";

@implementation HMConfigEntry

@end


@interface HMConfigEntryManager ()
@property(nonatomic, strong)NSMutableDictionary<NSString *,HMConfigEntry *> *configMap;

@property(nonatomic, strong)HMConfigEntry *defaultConfig;

@end

@implementation HMConfigEntryManager

#define HMCEMInstance [HMConfigEntryManager manager]

+ (instancetype)manager {
    static HMConfigEntryManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [HMConfigEntryManager new];
        [manager setupDefaultConfig];
        manager.configMap = [NSMutableDictionary new];
    });
    return manager;
}

- (void)setupDefaultConfig {

    HMConfigEntry *defaultConfig = [HMConfigEntry new];
    defaultConfig.jsLoaderInterceptor = HMJavaScriptLoader.class;
    defaultConfig.loggerInterceptor = [HMLogger new];
    self.defaultConfig = defaultConfig;
    [HMUpgradeManager upgrageStorageForDefaultNamespace];
}

- (void)addConfig:(HMConfigEntry *)config {
    
    HMAssert(config.namespace, @"缺少 namespace 字段");
    if ([self.configMap objectForKey:config.namespace]) {
        HMAssert(YES, [NSString stringWithFormat:@"namespace = %@ 重复设置", config.namespace]);
    }
    [self.configMap setObject:config forKey:config.namespace];
    [HMUpgradeManager upgrageStorageForNamespace:config.namespace];
}

@end



@implementation HMRouterInterceptor

/// 自定义方式打开视图控制器
///
/// @return 返回YES表示处理，返回NO表示不处理;
///
+ (BOOL)handleOpenViewController:(__kindof UIViewController *)viewController pageInfo:(HMNavigatorPageInfo *)pageInfo namespace:(NSString *)namespace {
    
    // 兼容老代码
    __block BOOL isHandled = NO;
    [HMInterceptor enumerateInterceptor:HMInterceptorTypeRouter
                              withBlock:^(id<HMRouterProtocol> interceptor,
                                          NSUInteger idx,
                                          BOOL * _Nonnull stop) {
        if (![interceptor respondsToSelector:@selector(handleOpenViewController:pageInfo:)]) {
            return;
        }
        BOOL ret = [interceptor handleOpenViewController:viewController pageInfo:pageInfo];
        if (ret) {
            isHandled = YES;
            *stop = YES;
        }
    }];
    if (isHandled) {
        // 注解已经处理，则忽略新版拦截器。
        return YES;
    }
    
    // 新版拦截器
    id<HMRouterProtocol> router = [HMCEMInstance.configMap objectForKey:namespace].routerInterceptor;
    if ([router respondsToSelector:@selector(handleOpenViewController:pageInfo:)]) {
        return [router handleOpenViewController:viewController pageInfo:pageInfo];
    }
    
    return NO;
    
}

+ (BOOL)handlePopWithViewController:(nullable UIViewController *)viewController animated:(BOOL)animated namespace:(NSString *)namespace {
    
    
    // 兼容老代码
    __block BOOL isHandled = NO;
    [HMInterceptor enumerateInterceptor:HMInterceptorTypeRouter
                              withBlock:^(id<HMRouterProtocol> interceptor,
                                          NSUInteger idx,
                                          BOOL * _Nonnull stop) {
        if (![interceptor respondsToSelector:@selector(handlePopWithViewController:animated:)]) {
            return;
        }
        BOOL ret = [interceptor handlePopWithViewController:viewController animated:animated];
        if (ret) {
            isHandled = YES;
            *stop = YES;
        }
    }];
    if (isHandled) {
        // 注解已经处理，则忽略新版拦截器。
        return YES;
    }
    
    // 新版拦截器
    id<HMRouterProtocol> router = [HMCEMInstance.configMap objectForKey:namespace].routerInterceptor;
    if ([router respondsToSelector:@selector(handlePopWithViewController:animated:)]) {
        return [router handlePopWithViewController:viewController animated:animated];
    }    
    return NO;
}

+ (BOOL)handlePopToRootWithParams:(NSDictionary *)params namespace:(NSString *)namespace {
    
    // 兼容老代码
    __block BOOL isHandled = NO;
    [HMInterceptor enumerateInterceptor:HMInterceptorTypeRouter
                              withBlock:^(id<HMRouterProtocol> interceptor,
                                          NSUInteger idx,
                                          BOOL * _Nonnull stop) {
        if (![interceptor respondsToSelector:@selector(handlePopToRootWithParams:)]) {
            return;
        }
        BOOL ret = [interceptor handlePopToRootWithParams:params];
        if (ret) {
            isHandled = YES;
            *stop = YES;
        }
    }];
    if (isHandled) {
        // 注解已经处理，则忽略新版拦截器。
        return YES;
    }
    
    // 新版拦截器
    id<HMRouterProtocol> router = [HMCEMInstance.configMap objectForKey:namespace].routerInterceptor;
    
    if ([router respondsToSelector:@selector(handlePopToRootWithParams:)]) {
        return [router handlePopToRootWithParams:params];
    }
    return NO;
}

+ (BOOL)handlePopBackWithCount:(NSUInteger)count params:(NSDictionary *)params namespace:(NSString *)namespace {
    
    
    // 兼容老代码
    __block BOOL isHandled = NO;
    // 兼容老拦截器
    [HMInterceptor enumerateInterceptor:HMInterceptorTypeRouter withBlock:^(id<HMRouterProtocol> interceptor, NSUInteger idx, BOOL * _Nonnull stop) {
        
        if (![interceptor respondsToSelector:@selector(handlePopBackWithCount:params:)]) {
            return;
        }
        BOOL ret = [interceptor handlePopBackWithCount:count params:params];
        if (ret) {
            isHandled = YES;
            *stop = YES;
        }
    }];
    
    if (isHandled) {
        // 注解已经处理，则忽略新版拦截器。
        return YES;
    }
    
    // 新版拦截器
    id<HMRouterProtocol> router = [HMCEMInstance.configMap objectForKey:namespace].routerInterceptor;
    
    if ([router respondsToSelector:@selector(handlePopBackWithCount:params:)]) {
        return [router handlePopBackWithCount:count params:params];
    }
    return NO;
}

@end


@implementation HMImageLoaderInterceptor
// 不需要兼容
+ (id<HMImageLoader>)canLoad:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource namespace:(NSString *)namespace {
    
    id<HMImageLoader> loader = [HMCEMInstance.configMap objectForKey:namespace].imageLoaderInterceptor;
    return loader;
}

@end



@implementation HMJSLoaderInterceptor
// 不需要兼容

+ (BOOL)loadWithSource:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource namespace:(NSString *)namespace completion:(HMJSLoaderCompleteBlock)completion {
    
    Class<HMJSLoader> loader = [HMCEMInstance.configMap objectForKey:namespace].jsLoaderInterceptor;
    if ([loader loadWithSource:source inJSBundleSource:bundleSource completion:completion]) {
        return YES;
    }
    Class<HMJSLoader> defaultLoader = HMCEMInstance.defaultConfig.jsLoaderInterceptor;
    return [defaultLoader loadWithSource:source inJSBundleSource:bundleSource completion:completion];
}    

@end



@implementation HMJSCallerInterceptor

+ (void)callNativeWithClassName:(NSString *)className functionName:(NSString *)functionName objectRef:(NSString *)objectRef args:(nonnull NSArray<HMBaseValue *> *)args context:(nonnull HMJSContext *)context {
    
    id<HMJSCallerProtocol> interceptor = [HMCEMInstance.configMap objectForKey:context.nameSpace].jsCallerInterceptor;
    if ([interceptor respondsToSelector:@selector(callNativeWithClassName:functionName:objRef:args:namespace:)]) {
        [interceptor callNativeWithClassName:className functionName:functionName objRef:objectRef args:args namespace:context.nameSpace];
    }

    // devtool
#ifdef DEBUG
#if __has_include(<HMDevTools/HMDevTools.h>)
    [context.hm_jsCallerInterceptor callNativeWithClassName:className functionName:functionName objRef:objectRef args:args namespace:context.nameSpace];
#endif
#endif
}


+ (void)callJSWithTarget:(HMBaseValue *)target functionName:(NSString *)functionName args:(NSArray *)args context:(nonnull HMJSContext *)context {
    
    id<HMJSCallerProtocol> interceptor = [HMCEMInstance.configMap objectForKey:context.nameSpace].jsCallerInterceptor;
    BOOL hasDevTool = NO;
#ifdef DEBUG
#if __has_include(<HMDevTools/HMDevTools.h>)
    hasDevTool = YES;
#endif
#endif
    if (!interceptor && !hasDevTool) {
        return;
    }
    NSObject *nativeObj = target.toObject;;
    NSString *className = nativeObj.hm_objcClassName;
    NSString *objRefStr = @"";
    if (nativeObj) {
        objRefStr = [NSString stringWithFormat:@"%p", nativeObj];
    }
    
    if ([interceptor respondsToSelector:@selector(callJSWithClassName:functionName:objRef:args:namespace:)]) {
                
        [interceptor callJSWithClassName:className functionName:functionName objRef:objRefStr args:args namespace:context.nameSpace];
    }

    // devtool
#ifdef DEBUG
#if __has_include(<HMDevTools/HMDevTools.h>)
        [context.hm_jsCallerInterceptor callJSWithClassName:className functionName:functionName objRef:objRefStr args:args namespace:context.nameSpace];
#endif
#endif
}

@end



@implementation HMReporterInterceptor

+ (void)handleJSException:(NSDictionary *)exception namespace:(nonnull NSString *)namespace{
    
    // 兼容老拦截器
    NSArray<id<HMReporterProtocol>> *interceptors = [HMInterceptor interceptor:HMInterceptorTypeReporter];
    if (interceptors.count <= 0) {
        return;
    }
    [interceptors enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
        if ([obj respondsToSelector:@selector(handleJSException:)]) {
            [obj handleJSException:exception];
        }
    }];
    
    // 新拦截器
    id<HMReporterProtocol> interceptor = [HMCEMInstance.configMap objectForKey:namespace].reporterInterceptor;
    [interceptor handleJSException:exception];
    
    //无默认实现
}
+ (void)handleJSException:(NSDictionary *)exception context:(HMJSContext *)context namespace:(nonnull NSString *)namespace{
    
    // 兼容老拦截器
    NSArray<id<HMReporterProtocol>> *interceptors = [HMInterceptor interceptor:HMInterceptorTypeReporter];
    if (interceptors.count <= 0) {
        return;
    }
    [interceptors enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
        if ([obj respondsToSelector:@selector(handleJSException:context:)]) {
            [obj handleJSException:exception context:context];
        }
    }];
    
    // 新拦截器
    id<HMReporterProtocol> interceptor = [HMCEMInstance.configMap objectForKey:namespace].reporterInterceptor;
    [interceptor handleJSException:exception context:context];
    //无默认实现
    
}
+ (void)handleJSPerformanceWithKey:(NSString *)key info:(NSDictionary *)info namespace:(nonnull NSString *)namespace{
    // 兼容老拦截器
    NSArray<id<HMReporterProtocol>> *interceptors = [HMInterceptor interceptor:HMInterceptorTypeReporter];
    if (interceptors.count <= 0) {
        return;
    }
    [interceptors enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
        if ([obj respondsToSelector:@selector(handleJSPerformanceWithKey:info:)]) {
            [obj handleJSPerformanceWithKey:key info:info];
        }
    }];
    
    // 新拦截器
    id<HMReporterProtocol> interceptor = [HMCEMInstance.configMap objectForKey:namespace].reporterInterceptor;
    [interceptor handleJSPerformanceWithKey:key info:info];
    //无默认实现
    
}

@end




@implementation HMLoggerInterceptor


+ (BOOL)handleJSLog:(NSString *)log level:(HMLogLevel)level namespace:(nonnull NSString *)namespace{
    
    // 兼容老拦截器
    NSArray *interceptors = [HMInterceptor interceptor:HMInterceptorTypeLog];
    BOOL isIntercept = NO;
    if (interceptors.count > 0) {
        for (id <HMLoggerProtocol> interceptor in interceptors) {
            if ([interceptor respondsToSelector:@selector(handleJSLog:level:)]) {
                isIntercept = [interceptor handleJSLog:log level:level];
            }
        }
    }
    
    // 新拦截器
    id<HMLoggerProtocol> interceptor = [HMCEMInstance.configMap objectForKey:namespace].loggerInterceptor;
    if ([interceptor respondsToSelector:@selector(handleJSLog:level:)]) {
        [interceptor handleJSLog:log level:level];
    }
    //默认实现
    return [HMCEMInstance.defaultConfig.loggerInterceptor handleJSLog:log level:level];
}

+ (BOOL)handleNativeLog:(NSString *)log level:(HMLogLevel)level namespace:(nonnull NSString *)namespace{
    // 兼容老拦截器
    NSArray *interceptors = [HMInterceptor interceptor:HMInterceptorTypeLog];
    BOOL isIntercept = NO;
    if (interceptors.count > 0) {
        for (id <HMLoggerProtocol> interceptor in interceptors) {
            if ([interceptor respondsToSelector:@selector(handleNativeLog:level:)]) {
                isIntercept = [interceptor handleNativeLog:log level:level];
            }
        }
    }
    
    // 新拦截器
    id<HMLoggerProtocol> interceptor = [HMCEMInstance.configMap objectForKey:namespace].loggerInterceptor;
    if ([interceptor respondsToSelector:@selector(handleNativeLog:level:)]) {
        [interceptor handleNativeLog:log level:level];
    }
    //默认实现
    return [HMCEMInstance.defaultConfig.loggerInterceptor handleNativeLog:log level:level];
}


@end


@implementation HMEventTrackInterceptor


+ (void)asyncHandleTrackEvent:(NSDictionary *)event namespace:(nonnull NSString *)namespace{
    
    // 兼容老拦截器
    NSArray *interceptors = [HMInterceptor interceptor:HMInterceptorTypeEventTrack];
    if (interceptors.count > 0) {
        
        for (id <HMEventTrackProtocol> interceptor in interceptors) {
            
            if ([interceptor respondsToSelector:@selector(asyncHandleTrackEvent:)]) {
                
                [interceptor asyncHandleTrackEvent:event];
            }
        }
    }
    
    // 新拦截器
    id<HMEventTrackProtocol> interceptor = [HMCEMInstance.configMap objectForKey:namespace].eventTrackInterceptor;
    if ([interceptor respondsToSelector:@selector(asyncHandleTrackEvent:)]) {
        
        [interceptor asyncHandleTrackEvent:event];
    }
}

@end



#pragma mark <adaptor>

@implementation HMStorageAdaptor
static NSMutableDictionary<NSString *, id<HMStorage>> *__HMStorageAdaptor_map;

+ (void)initialize {
    
    __HMStorageAdaptor_map = [NSMutableDictionary new];
}

+ (id<HMStorage>)storageWithNamespace:(NSString *)namespace {
    
    // 如果实现了 业务线自定义拦截器。则直接返回
    id<HMStorage> _storage = [HMCEMInstance.configMap objectForKey:namespace].storage;
    if (_storage) {
        return _storage;
    }
    
    // 按业务线 分配实例。
    NSString *_namespace = [NSString hm_isValidString:namespace] ? namespace : HMDefaultNamespaceUnderline;
    _storage = [__HMStorageAdaptor_map objectForKey:_namespace];
    if (!_storage) {
        _storage = [[HMStorageImp alloc] initWithPath:_namespace];
    }
    [__HMStorageAdaptor_map setObject:_storage forKey:_namespace];
    return _storage;
}

@end



@implementation HMMemoryAdaptor
static NSMutableDictionary<NSString *, id<HMMemoryComponent>> *__HMMemoryAdaptor_map;

+ (void)initialize {
    
    __HMMemoryAdaptor_map = [NSMutableDictionary new];
}

+ (id<HMMemoryComponent>)memoryWithNamespace:(NSString *)namespace {
    // 按业务线 分配实例。
    NSString *_namespace = [NSString hm_isValidString:namespace] ? namespace : HMDefaultNamespaceUnderline;
    id<HMMemoryComponent> _memory = [__HMMemoryAdaptor_map objectForKey:_namespace];
    if (!_memory) {
        _memory = [[HMMemoryComponent alloc] initWithNamespace:_namespace];
    }
    [__HMMemoryAdaptor_map setObject:_memory forKey:_namespace];
    return _memory;
}
@end

@implementation HMRequestAdaptor

+ (nullable id<HMRequestComponent>)createComponentWithNamespace:(NSString *)namespace {
    Class<HMRequestComponent> _com = [HMCEMInstance.configMap objectForKey:namespace].request;
    if (_com) {
        return [_com create];
    }
    return nil;
}
@end

@implementation HMRequestInterceptor

+ (void)willSendRequest:(HMRequest *)request inContext:(HMJSContext *)context {
    
    id<HMRequestInterceptor> interceptor = [HMCEMInstance.configMap objectForKey:context.nameSpace].requestInterceptor;
    [interceptor willsendRequest:request inContext:context];
    
    // devtool


}
+ (void)HMRequest:(HMRequest *)request didReceiveResponse:(NSDictionary *)response inContext:(HMJSContext *)context {
    
    id<HMRequestInterceptor> interceptor = [HMCEMInstance.configMap objectForKey:context.nameSpace].requestInterceptor;
    [interceptor HMRequest:request didReceiveResponse:response inContext:context];
    
    // devtool

}

@end

@implementation HMFontAdaptor

+ (nullable id<HMFontProtocol>)fontWithNamespace:(NSString *)namespace {
    id<HMFontProtocol> font = [HMCEMInstance.configMap objectForKey:namespace].fontAdapter;
    return font;
}
@end
