//
//  HMInterceptorManager.h
//  Hummer
//
//  Created by didi on 2021/6/10.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMImageLoader.h>
#import <Hummer/HMImageDecoder.h>
#import <Hummer/HMJSLoadInterceptor.h>
#import <Hummer/HMPluginManager.h>


NS_ASSUME_NONNULL_BEGIN


@interface HMConfigEntry : NSObject

@property (nonatomic, copy)NSString *namespace;

@property (nonatomic, strong) id<HMImageLoader> imageLoader;

//todo
@property (nonatomic, strong) id<HMImageDecoder> imageDecoder;
//todo
@property (nonatomic, strong) id<HMJSLoadInterceptor> jsLoaderInterceptor;

@property(nonatomic, nullable, strong) id <HMTrackEventPluginProtocol> trackEventPlugin;

@end

/**
 * 图片加载拦截器
 */
@interface HMImageLoaderInterceptor : NSObject

+ (id<HMImageLoader>)interceptorCanLoad:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource;

@end


@interface HMJSLoaderInterceptor : NSObject
- (void)handleUrlString:(NSString *)urlString completion:(void(^)(NSString *))completion;

@end

/**
 * 规则：
 * 1. 优先触发 对应 namespace 的拦截器。
 * 2. 当一个拦截器被调用，如果 成功消费事件，则后面的拦截器不被触发。如果没有消费，则只 触发框架默认的 拦截器。
 * 3. 带有 namespace 的事件会先发触发 对应的拦截器，(如未消费)在调用默认的拦截器，不带有 namespace 的事件只会 使用框架默认 拦截器实现。
 *
 * 示例：
 * 触发一次 日志 事件(namespce)
 * 1. 查找对应 namespce 的 拦截器。
 *    1.1 存在 && 消费。 -> 3
 *    1.2 存在 && 未消费 -> 2
 * 2. 调用框架默认拦截器。
 * 3. 结束。
 *
 * 触发一次 日志 事件(没有namespce)
 * 1. 使用框架默认拦截器。
 *
 */
@interface HMInterceptorManager : NSObject

@property (nonatomic, copy, nullable) NSString *namespaceScope;
@property(nonatomic, strong)NSMutableDictionary<NSString *, HMConfigEntry *> *configMap;

+ (instancetype)manager;
- (void)addConfig:(HMConfigEntry *)config;

@end
typedef void(^InterceptWorker)(void);
static inline void HMInterceptorScope(NSString *namespace,InterceptWorker worker) {
    [HMInterceptorManager manager].namespaceScope = namespace;
    if (worker) {
        worker();
    }
    [HMInterceptorManager manager].namespaceScope = nil;
}

NS_ASSUME_NONNULL_END
