//
//  HMConfigEntryManager.h
//  Hummer
//
//  Created by didi on 2021/7/6.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMStorageProtocol.h>
#import <Hummer/HMNamespaceScope.h>
#import <Hummer/HMImageLoader.h>
#import <Hummer/HMJSLoaderProtocol.h>
#import <Hummer/HMJSCallerProtocol.h>
#import <Hummer/HMLoggerProtocol.h>
#import <Hummer/HMReporterProtocol.h>
#import <Hummer/HMEventTrackProtocol.h>
#import <Hummer/HMMemoryComponent.h>
#import <Hummer/HMPluginManager.h>
#import <Hummer/HMRouterProtocol.h>
#import <Hummer/HMRequestComponent.h>
#import <Hummer/HMNetworkProtocol.h>
#import <Hummer/HMFontProtocol.h>
#import "HMApplicationRouterProtocol.h"
#import "HMNotificationCenter.h"


NS_ASSUME_NONNULL_BEGIN

extern NSString * const HMDefaultNamespace;
extern NSString * const HMDefaultNamespaceUnderline;

/**
 * hummer sdk 初始化注入配置, 分为拦截器和插件。使用 namespace 区分
 * 拦截器：有消费拦截事件的概念。
 */

@interface HMConfigEntry : NSObject

@property (nonatomic, copy)NSString *namespace;

@property (nonatomic, nullable, strong) HMNotificationCenter *notifyCenter;

//替换默认 storage 实现
@property (nonatomic, strong) id<HMStorage> storage;

//替换默认 request 实现
@property (nonatomic, strong) Class<HMRequestComponent> request;

@property (nonatomic, strong) id<HMImageLoader> imageLoaderInterceptor;

@property (nonatomic, strong) Class<HMJSLoader> jsLoaderInterceptor;

@property (nonatomic, strong) id<HMJSCallerProtocol> jsCallerInterceptor;

@property (nonatomic, strong) id<HMLoggerProtocol> loggerInterceptor;

@property (nonatomic, strong) id<HMReporterProtocol> reporterInterceptor;

@property (nonatomic, strong) id<HMRequestInterceptor> requestInterceptor;

@property (nonatomic, strong, readwrite) id<HMEventTrackProtocol> eventTrackInterceptor;

@property(nonatomic, nullable, strong) id <HMTrackEventPluginProtocol> trackEventPlugin;

@property(nonatomic, nullable, strong) id <HMRouterProtocol> routerInterceptor;

@property(nonatomic, nullable, strong) id <HMFontProtocol> fontAdapter;

/// 应用间跳转
@property(nonatomic, nullable, strong) id <HMApplicationRouterProtocol> appRouter;

@end


@interface HMConfigEntryManager : NSObject

@property(nonatomic, nullable, strong, readonly) NSMutableDictionary<NSString *, HMConfigEntry *> *configMap;
+ (instancetype)manager;

/**
 * 注意 注解 和 addConfig 只能使用一种方式。
 */
- (void)addConfig:(HMConfigEntry *)config;
- (nullable HMConfigEntry *)getConfig:(NSString *)nameSpace;
@end




@interface HMRouterInterceptor : NSObject

/// 自定义方式打开视图控制器
///
/// @return 返回YES表示处理，返回NO表示不处理;
///
+ (BOOL)handleOpenViewController:(__kindof UIViewController *)viewController pageInfo:(HMNavigatorPageInfo *)pageInfo namespace:(NSString *)namespace;

+ (BOOL)handlePopWithViewController:(nullable UIViewController *)viewController animated:(BOOL)animated namespace:(NSString *)namespace;

+ (BOOL)handlePopToRootWithParams:(NSDictionary *)params  namespace:(NSString *)namespace;

+ (BOOL)handlePopBackWithCount:(NSUInteger)count params:(NSDictionary *)params namespace:(NSString *)namespace;

@end

@interface HMImageLoaderInterceptor : NSObject

+ (id<HMImageLoader>)canLoad:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource namespace:(NSString *)namespace;
@end

@class HMRequest;
@interface HMRequestInterceptor : NSObject

+ (void)willSendRequest:(HMRequest *)request inContext:(HMJSContext *)context;
+ (void)HMRequest:(HMRequest *)request didReceiveResponse:(NSDictionary *)response inContext:(HMJSContext *)context;
@end

@interface HMJSLoaderInterceptor : NSObject

/**
 * @brief jsLoader 拦截器方法。
 * @param source 原始参数，如果传递相对路径，则根据 bundleSource 解析。
 * @param bundleSource 容器原始Url。
*/
+ (BOOL)loadWithSource:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource  namespace:(NSString *)namespace completion:(HMJSLoaderCompleteBlock)completion;
@end


@interface HMJSCallerInterceptor : NSObject

+ (void)callNativeWithClassName:(NSString *)className functionName:(NSString *)functionName objectRef:(NSString *)objectRef args:(NSArray<HMBaseValue *> *)args context:(HMJSContext *)context;
+ (void)callJSWithTarget:(HMBaseValue *)target functionName:(NSString *)functionName args:(NSArray *)args context:(HMJSContext *)context;
@end


@interface HMReporterInterceptor : NSObject

+ (void)handleJSException:(NSDictionary *)exception namespace:(NSString *)namespace;
+ (void)handleJSException:(NSDictionary *)exception context:(HMJSContext *)context namespace:(NSString *)namespace;
+ (void)handleJSPerformanceWithKey:(NSString *)key info:(NSDictionary *)info namespace:(NSString *)namespace;
@end


@interface HMLoggerInterceptor : NSObject

+ (BOOL)handleJSLog:(NSString *)log level:(HMLogLevel)level namespace:(NSString *)namespace;
+ (BOOL)handleNativeLog:(NSString *)log level:(HMLogLevel)level namespace:(NSString *)namespace;
@end


@interface HMEventTrackInterceptor : NSObject

+ (void)asyncHandleTrackEvent:(NSDictionary *)event namespace:(NSString *)namespace;
@end


@interface HMRequestAdaptor : NSObject

+ (nullable id<HMRequestComponent>)createComponentWithNamespace:(NSString *)namespace;

@end

@interface HMFontAdaptor : NSObject

+ (nullable id<HMFontProtocol>)fontWithNamespace:(NSString *)namespace;

@end

/// 应用间跳转
@interface HMApplicationRouterInterceptor : NSObject

+ (BOOL)handleOpenUrl:(NSURL *)url namespace:(nonnull NSString *)namespace;
@end
NS_ASSUME_NONNULL_END
