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
#import <Hummer/HMJSCallerIterceptor.h>
#import <Hummer/HMLoggerProtocol.h>
#import <Hummer/HMReporterProtocol.h>
#import <Hummer/HMEventTrackProtocol.h>
#import <Hummer/HMMemoryComponent.h>
#import <Hummer/HMPluginManager.h>

NS_ASSUME_NONNULL_BEGIN


/**
 * hummer sdk 初始化注入配置, 分为拦截器和插件。使用 namespace 区分
 * 拦截器：有消费拦截事件的概念。
 */

@interface HMConfigEntry : NSObject

@property (nonatomic, copy)NSString *namespace;

//替换默认 storage 实现
@property (nonatomic, strong) id<HMStorage> storage;

// 如 canLoad 返回false。则继续使用 sdk 内部 imageloader。
@property (nonatomic, strong) id<HMImageLoader> imageLoaderInterceptor;

// 如 canLoad 返回false。则继续使用 sdk 内部 imageloader。
@property (nonatomic, strong) Class<HMJSLoader> jsLoaderInterceptor;

@property (nonatomic, strong) id<HMJSCallerIterceptor> jsCallerInterceptor;

@property (nonatomic, strong) id<HMLoggerProtocol> loggerInterceptor;

@property (nonatomic, strong) id<HMReporterProtocol> reporterInterceptor;

@property (nonatomic, strong, readwrite) id<HMEventTrackProtocol> eventTrackInterceptor;

@property(nonatomic, nullable, strong) id <HMTrackEventPluginProtocol> trackEventPlugin;

@end


@interface HMConfigEntryManager : NSObject

@property(nonatomic, nullable, strong, readonly) NSMutableDictionary<NSString *, HMConfigEntry *> *configMap DEPRECATED_MSG_ATTRIBUTE("参照其他 Interceptor 做处理");;

+ (instancetype)manager;
- (void)addConfig:(HMConfigEntry *)config;


@end

/**
 * 注意 注解 和 addConfig 只能使用一种方式。
 */

@interface HMImageLoaderInterceptor : NSObject

+ (id<HMImageLoader>)canLoad:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource namespace:(NSString *)namespace;
@end


@interface HMJSLoaderInterceptor : NSObject

+ (BOOL)loadWithSource:(id<HMURLConvertible>)source namespace:(NSString *)namespace completion:(HMJSLoaderCompleteBlock)completion;
@end


@interface HMJSCallerIterceptor : NSObject

+ (void)callWithTarget:(id)target selector:(SEL)selector namespace:(NSString *)namespace;
+ (void)callWithJSClassName:(NSString *)className functionName:(NSString *)functionName namespace:(NSString *)namespace;
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



@interface HMStorageAdaptor : NSObject

/**
 * 业务线实例隔离。架构如下：
 *       HMConfigEntryManager : namespace <---> id<HMStorage>
 *         HMStorageAdaptor   : namespace <--> id<HMStorage>(HMStorageImp)
 *
 * js->call(Storage.removeAll):
 * HMConfigEntryManager.storageForNamespace(namespace) != nil ----> storage.removeAll
 * HMStorageAdaptor.storageForNamespace(namespace)            ----> storage.removeAll
 *
 * 由适配器根据业务线分配 storage 分配实例。规则如下：
 * 1. namespace 为空，则不区分业务线(使用hummer默认文件目录)，removeall 会删除默认文件目录下所有文件。
 * 2. namespace 存在，则区分业务线，removeall 只删除默认对应业务线 文件。
 * 3. namespace 存在且注册了适配器，则由对应 业务线的拦截器自己负责处理。
 */
+ (id<HMStorage>)storageWithNamespace:(NSString *)namespace;

@end

@interface HMMemoryAdaptor : NSObject

/**
 * 类似 HMStorageAdaptor 的设计。
 */
+ (id<HMMemoryComponent>)memoryWithNamespace:(NSString *)namespace;

@end

NS_ASSUME_NONNULL_END
