//
//  HMInterceptorManager.m
//  Hummer
//
//  Created by didi on 2021/6/10.
//

#import "HMInterceptorManager.h"
#import "HMUtility.h"
#import <HMImageLoader.h>
#import <objc/runtime.h>


@implementation HMConfigEntry

@end


@interface HMInterceptorManager ()

@end

@implementation HMInterceptorManager

+ (instancetype)manager {
    static HMInterceptorManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [HMInterceptorManager new];
        manager.configMap = [NSMutableDictionary new];
    });
    return manager;
}

- (void)setupDefaultConfig {
    
}

- (void)addConfig:(HMConfigEntry *)config {
    
    HMAssert(config.namespace, @"缺少 namespace 字段");
    [self.configMap setObject:config forKey:config.namespace];
}
@end

@implementation HMJSLoaderInterceptor

- (void)handleUrlString:(NSString *)urlString completion:(void(^)(NSString *))completion{
    
    HMConfigEntry *entry = [[HMInterceptorManager manager].configMap objectForKey:[HMInterceptorManager manager].namespaceScope];
    if (entry.jsLoaderInterceptor) {
        [entry.jsLoaderInterceptor handleUrlString:urlString completion:^(NSString * _Nonnull jsString) {
            
        }];
    }
}

@end

@implementation HMImageLoaderInterceptor


+ (id<HMImageLoader>)interceptorCanLoad:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource{

    HMConfigEntry *entry = [[HMInterceptorManager manager].configMap objectForKey:[HMInterceptorManager manager].namespaceScope];
    if ([entry.imageLoader canLoad:source inJSBundleSource:bundleSource]) {
        return entry.imageLoader;
    }
    return nil;
}


@end



