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

//默认适配器
#import <Hummer/HMStorage.h>
#import <Hummer/HMNamespaceScope.h>
#import <Hummer/HMJavaScriptLoader.h>
#import <Hummer/HMInterceptor.h>
#import <Hummer/HMLogger.h>
#import <Hummer/HMUpgradeManager.h>


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



@implementation HMJSCallerIterceptor
// 不需要兼容
+ (void)callWithJSClassName:(nonnull NSString *)className functionName:(nonnull NSString *)functionName namespace:(nonnull NSString *)namespace{
    
    id<HMJSCallerIterceptor> interceptor = [HMCEMInstance.configMap objectForKey:namespace].jsCallerInterceptor;
    if ([interceptor respondsToSelector:@selector(callWithJSClassName:functionName:)]) {
        [interceptor callWithJSClassName:className functionName:functionName];
    }
    //todo dev tool
}

+ (void)callWithTarget:(nonnull id)target selector:(nonnull SEL)selector namespace:(nonnull NSString *)namespace{
    
    id<HMJSCallerIterceptor> interceptor = [HMCEMInstance.configMap objectForKey:namespace].jsCallerInterceptor;
    if ([interceptor respondsToSelector:@selector(callWithTarget:selector:)]) {
        [interceptor callWithTarget:target selector:selector];
    }
    //todo dev tool
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
    NSString *_namespace = [NSString hm_isValidString:namespace] ? namespace : HMCacheDirectoryDefaultKey;
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
    NSString *_namespace = [NSString hm_isValidString:namespace] ? namespace : HMCacheDirectoryDefaultKey;
    id<HMMemoryComponent> _memory = [__HMMemoryAdaptor_map objectForKey:_namespace];
    if (!_memory) {
        _memory = [[HMMemoryComponent alloc] initWithNamespace:_namespace];
    }
    [__HMMemoryAdaptor_map setObject:_memory forKey:_namespace];
    return _memory;
}
@end
